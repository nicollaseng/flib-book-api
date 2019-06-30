import CheckIn from '../../models/CheckIn'
import { isNullOrUndefined } from 'util'
import calculate from '../../services/CalculatePriceTable'
import PriceTable from '../../models/PriceTable'
import Params from '../../services/Parameters'
import CheckOut from '../../models/CheckOut'

export default async (req, res) => {
  let checkins = [];
  let checkouts = [];
  let parameters = Params(req.user.establishment)
  try {
    let where = isNullOrUndefined(req.body.where) ? {"status":"open"} : JSON.parse(req.body.where)
    let order = isNullOrUndefined(req.body.orderBy) ? undefined : JSON.parse(req.body.orderBy)
    let wherecheckout = isNullOrUndefined(req.body.wherecheckout) ? null : JSON.parse(req.body.wherecheckout)
    let ordercheckout = isNullOrUndefined(req.body.orderBycheckout) ? undefined : JSON.parse(req.body.orderBycheckout)

    checkins = CheckIn.find({establishment: req.user.establishment}).populate('services') 

    if (where) {
      checkins = checkins.where(where)
    }

    if (isNullOrUndefined(order)) {
      checkins = checkins.sort({created_at: order})
    }
  
    let priceTableDefault = await parameters.get('priceTable.default')
    let pricetable = await PriceTable.findOne({_id: priceTableDefault.value})
    var addPriceTable = function(element,index,array){
      let calc = calculate(date, element.created_at)
      total = parseFloat(calc.priceOutput(pricetable, calc.minutes()))
      let checkinTemp ={}
      checkinTemp = Object.assign({pricetables:{valueTotal:total}},element._doc)
      array[index]= checkinTemp;
     
  };
  if (!isNullOrUndefined(pricetable)) { 
    checkins.forEach(addPriceTable)
   
  }

  checkouts= CheckOut.find({establishment: req.user.establishment}).populate('services') .populate('checkIn')

  if (wherecheckout) {
    checkouts = checkouts.where(where)
  }

  if (isNullOrUndefined(ordercheckout)) {
    checkouts = checkouts.sort({created_at: order})
  }

  


    return res.json({ checkins: checkins , checkouts:checkouts})
  } catch (err){
    return res.status(204).json({ checkins })
  }
}
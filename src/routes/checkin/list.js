import CheckIn from '../../models/CheckIn'
import PriceTable from '../../models/PriceTable'
import { isNullOrUndefined } from 'util'
import Params from '../../services/Parameters'
import calculate from '../../services/CalculatePriceTable'
import CheckOut from '../../models/CheckOut'


export default async (req, res) => {
  let checkin = []
  
  try {
    let parameters = Params(req.user.establishment)
    let date = new Date
    let total = 0
    let checkin = await CheckIn
                      .find({establishment: req.user.establishment})
                      .where({ "status" : "open"})
                      .populate('estabelishment')
                      .populate('services')

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
      checkin.forEach(addPriceTable)
    } else{
      console.log('sem tabela')
    }
    
    let checkOut = await CheckOut
                      .find({establishment: req.user.establishment})
                      .populate('estabelishment')
                      .populate('services')
                      .populate('checkIn')

    return res.json({ checkins: checkin ,checkouts:checkOut, date:date})
  } catch (err){
    return res.status(204).json({ checkin })
  }
}
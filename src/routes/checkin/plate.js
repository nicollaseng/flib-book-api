import CheckIn from '../../models/CheckIn'
import PriceTable from '../../models/PriceTable'
import { isNullOrUndefined } from 'util'
import Params from '../../services/Parameters'
import calculate from '../../services/CalculatePriceTable'

export default async (req, res) => {
  let checkin = {}
  try {
    let parameters = Params(req.user.establishment)
    let date = new Date
    let total = 0
    let checkin = await CheckIn
                      .findOne({'vehicle.plate': req.params.plate})
                      .sort({ created_at: -1 })
                      .where({establishment: req.user.establishment, status: "open"})
                      .populate('estabelishment')
                      .populate('services')

    let priceTableDefault = await parameters.get('priceTable.default')
    let pricetable = await PriceTable.findOne({_id: priceTableDefault.value})

    if (!isNullOrUndefined(pricetable)) {
      let calc = calculate(date, checkin.created_at)
      total = parseFloat(calc.priceOutput(pricetable, calc.minutes()))
    }

    return res.json({ checkin: checkin, date: date, pricetable: pricetable, total: total })
  } catch (err){
    return res.status(204).json({ checkin })
  }
}
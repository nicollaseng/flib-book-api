import CheckIn from '../../models/CheckIn'
import PriceTable from '../../models/PriceTable'
import { isNullOrUndefined } from 'util'
import calculate from '../../services/CalculatePriceTable'

export default async (req, res) => {
  let checkin = {}
  try {
    let date = new Date
    let total = 0
    let checkin = await CheckIn
                      .findOne({'vehicle.plate': req.params.plate})
                      .sort({ created_at: -1 })
                      .where({establishment: req.user.establishment})
                      .populate('estabelishment','services')

    let calc = calculate(date, checkin.created_at)
    let pricetable = await PriceTable.findById(req.params.pricetable)
    
    total = parseFloat(calc.priceOutput(pricetable, calc.minutes()))

    return res.json({ checkin: checkin, date: date, pricetable: pricetable, total: total })
  } catch (err){
    return res.status(204).json({ checkin })
  }
}
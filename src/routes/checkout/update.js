import CheckIn from '../../models/CheckIn'
import Service from '../../models/Service'
import { isNullOrUndefined } from 'util';

/**
 * API para criar um checkIn
 * @params: 
 */
export default async (req, res) => {
  try {
    let data = req.body

    if (!isNullOrUndefined(data.customer)) data.customer = JSON.parse(data.customer)
    if (!isNullOrUndefined(data.vehicle)) data.vehicle = JSON.parse(data.vehicle)
    if (!isNullOrUndefined(data.services_create)) {
      data.services = JSON.parse(data.services_create)
      data.services.map(async (el) => await Service.findById(el[0]))
    }

    console.log(data)
    if (
        !isNullOrUndefined(data.customer) || 
        !isNullOrUndefined(data.vehicle)  || 
        !isNullOrUndefined(data)  || 
        !isNullOrUndefined(data.services)) {
          
      await CheckIn.findOneAndUpdate({_id: req.params.id},data)

      let checkin = await CheckIn.findById(req.params.id)
                            .populate('establishment')
                            .populate('services')
                            .populate('user')

    return res.status(202)
                .json({checkin})
    } else {
      return res.status(500)
                .json({})
    }
  } catch (err){
    return res.status(500)
            .json({ err })
  }
}
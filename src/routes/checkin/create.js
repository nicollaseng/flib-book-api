import CheckIn from '../../models/CheckIn'
import User from '../../models/User'
import Establishment from '../../models/Establishment'
import QRCode from '../../services/QRCode';

/**
 * API para criar um checkIn
 * @params: 
 */
export default async (req, res) => {
  try {
    let data = req.body
    data.customer = JSON.parse(data.customer)
    data.vehicle = JSON.parse(data.vehicle)
    data.services = JSON.parse(data.services_create)
    data.establishment = await Establishment.findById(req.user.establishment)
    data.user = await User.findById(req.user._id)

    let checkIn  = new CheckIn(data)
    await checkIn.save()

    let checkin = await CheckIn.findById(checkIn._id)
                          .populate('establishment')
                          .populate('services')
                          .populate('user')

    return res.status(201)
            .json({ checkin })

  } catch (err){
    return res.status(500)
            .json({ err })
  }
}
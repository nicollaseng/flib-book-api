import Service from '../../models/Service'
import Establishment from '../../models/Establishment'

export default async (req, res) => {
  let service  = new Service(req.body)
  let establishment = {}
  try {
    establishment = await Establishment.findById(req.user.establishment)
    await  service.save()
    service = await Service.findByIdAndUpdate(service._id, { establishment: establishment })
    return res.status(201)
        .json({ service })
  } catch (err){
    return res.status(500)
        .json({ err })
  }
}
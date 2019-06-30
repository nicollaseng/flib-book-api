import Service from '../../models/Service'

export default async (req, res) => {
  let services = [];
  try {
    services = await Service.find({establishment: req.user.establishment})
    return res.json({ services })
  } catch (err){
    return res.json({ services })
  }
}
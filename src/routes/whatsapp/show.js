import Whatsapp from '../../models/Whatsapp'

export default async (req, res) => {
  let whatsapp = {};
  try {
    whatsapp = await Whatsapp.findById(req.params.id)
    return res.json({whatsapp})
  } catch (err) {
    return res.status(404).json({err})
  }
}

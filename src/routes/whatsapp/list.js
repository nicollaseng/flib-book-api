import Whatsapp from '../../models/Whatsapp'

export default async (req, res) => {
  try {
    let whatsapp = await Whatsapp.find({})
    return whatsapp.json({ whatsapp })
  } catch (err){
    return res.status(404).json({ whatsapp })
  }
}

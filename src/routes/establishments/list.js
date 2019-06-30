import Establishment from '../../models/Establishment'

export default async (req, res) => {
  let establishments = [];
  try {
    establishments = await Establishment.find({})
    return res.json({ establishments })
  } catch (err){
    return res.status(204).json({ establishments })
  }
}
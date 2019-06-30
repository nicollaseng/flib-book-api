import Monthly from '../../models/Monthly'

export default async (req, res) => {
  let monthly = [];
  try {
    monthly = await Monthly.find({})
    return res.json({ customers })
  } catch (err){
    return res.status(204).json({ monthly })
  }
}

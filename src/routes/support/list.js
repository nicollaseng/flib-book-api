import Support from '../../models/Support'

export default async (req, res) => {
  let support = [];
  try {
    support = await Support.find({})
    return res.json({ support })
  } catch (err){
    return res.status(204).json({ support })
  }
}

import Support from '../../models/Support'

export default async (req, res) => {
  let support = {};
  try {
    support = await Support.findBydId(req.params.id)
    return res.json({ support })
  } catch (err){
    return res.json({ support })
  }
}

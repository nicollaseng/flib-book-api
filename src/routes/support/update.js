import Support from '../../models/Support'

export default async (req, res) => {
  try {
    await Support.findOneAndUpdate({_id:req.body.id}, req.body)
    return res.status(204).end()
  } catch (err) {
    return res.status(500).json({err})
  }
}

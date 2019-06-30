import Support from '../../models/Support'

export default async (req, res) => {
  try {
    await Support.findOneAndRemove(req.params.id)
    return res.status(204).end()
  } catch (err){
    return res.status(500).end()
  }

}

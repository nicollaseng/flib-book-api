import Montlhy from '../../models/Montlhy'

export default async (req, res) => {
  try {
    await Montlhy.findOneAndUpdate({_id:req.body.id}, req.body)
    console.log('PARAMS ID>: '+req.body.id)
    return res.status(204).end()
  } catch (err) {
    return res.status(500).json({err})
  }
}

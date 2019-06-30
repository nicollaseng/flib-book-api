import Subscription from '../../models/Subscription'

export default async (req, res) => {
  try {
    await Subscription.findByIdAndUpdate(req.params.id, req.body)
    return res.status(204).end()
  } catch (err) {
    return res.status(500).json({err})
  }
}

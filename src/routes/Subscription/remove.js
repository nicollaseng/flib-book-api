import Subscription from '../../models/Subscription'

export default async (req, res) => {

  try {
    await Subscription.findByIdAndRemove(req.params.id)
    return res.status(204).end()
  } catch (err){
    return res.status(500).json({err})
  }

}

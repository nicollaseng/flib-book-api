import Subscription from '../../models/Subscription'

export default async (req, res) => {
  let subscriptions = [];
  try {
    subscriptions = await Subscription.find({})
    return res.json({ subscriptions })
  } catch (err){
    return res.status(204).json({ subscriptions })
  }
}

import Subscription from '../../models/Subscription'

export default async (req, res) => {
  let subscription = {};
  try {
    subscription = await Subscription.findBydId(req.params.id)
    return res.json({ subscription })
  } catch (err){
    return res.json({ subscription })
  }
}

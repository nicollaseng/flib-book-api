import Subscription from '../../models/Subscription'

export default async (req, res) => {
  let subscription  = new Subscription(req.body)
  try {
    await  subscription.save()
    return res.status(201)
        .json({ subscription })
  } catch (err){
    return res.status(500)
        .json({ err })
  }
}

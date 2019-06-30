import Payment from '../../models/Payment'

export default async (req, res) => {
  let payment  = new Payment(req.body)
  try {
    await payment.save()
    return res.status(201)
        .json({ payment })
  } catch (err){
    return res.status(500)
        .json({ err })
  }
}

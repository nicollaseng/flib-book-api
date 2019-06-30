import Payment from '../../models/Payment'

export default async (req, res) => {
  let payment = [];
  try {
    payment = await Payment.find({})
    return res.json({ payment })
  } catch (err){
    return res.status(204).json({ payment })
  }
}

import Payment from '../../models/Payment'

export default async (req, res) => {
  let payment = {};
  try {
    payment = await Payment.findById(req.params.id)
    return res.json({payment})
  } catch (err) {
    return res.status(500).json({err})
  }
}

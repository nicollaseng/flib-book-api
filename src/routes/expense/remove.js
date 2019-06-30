import Expense from '../../models/Expense'

export default async (req, res) => {
  try {
    await Expense.findByIdAndRemove(req.params.id)
    return res.status(200).end()
  } catch (err){
    return res.status(500).json({err})
  }
}

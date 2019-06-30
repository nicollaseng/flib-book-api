import Expense from '../../models/Expense'

export default async (req, res) => {
  let expense = {};
  try {
    expense = await Expense.findById(req.params.id)
    return res.json({expense})
  } catch (err) {
    return res.status(404).json({err})
  }
}

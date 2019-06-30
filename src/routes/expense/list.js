import Expense from '../../models/Expense'

export default async (req, res) => {
  try {
    let expense = await Expense.find({})
    return res.json({ expense })
  } catch (err){
    return res.status(404).json({ expense })
  }
}

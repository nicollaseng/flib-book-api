import Expense from '../../models/Expense'

export default async (req, res) => {
  let expense  = new Expense(req.body)
    try {
      await  expense.save()
      return res.status(201)
          .json({ expense })
    } catch (err){
      return res.status(500)
          .json({ err })
    }
  }

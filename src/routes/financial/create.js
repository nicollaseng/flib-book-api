import FinancialIncome from '../../models/FinancialIncome'
import Establishment from '../../models/Establishment'

export default async (req, res) => {
  let financial  = new FinancialIncome(req.body)
  let establishment = {}
  try {
    await  financial.save()
    return res.status(201)
        .json({ financial })
  } catch (err){
    return res.status(500)
        .json({ err })
  }
}
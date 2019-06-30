import FinancialIncome from '../../models/FinancialIncome'

export default async (req, res) => {
  try {
    await FinancialIncome.findOneAndUpdate({_id:req.body.id}, req.body)
    console.log('PARAMS ID>: '+req.body.id)
    return res.status(204).end()
  } catch (err) {
    return res.status(500).json({err})
  }
}
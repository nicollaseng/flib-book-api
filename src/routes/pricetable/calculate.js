import PriceTable from '../../models/PriceTable';
import CheckIn from '../../models/CheckIn'
import calculate from '../../services/CalculatePriceTable'

export default async (req, res) => {
  try {
    let checkIn = await CheckIn.findById(req.params.check_id)
    let priceTable = await PriceTable.findById(req.params.id)

    let calc = calculate(new Date, checkIn.created_at)
    
    // não importa a unidade, sempre será em minutos
    let total = calc.priceOutput(priceTable, calc.minutes())
    
    return res.json({total})
    
  } catch(e) {
    return res.status(500).json({total: 0})
  }
}
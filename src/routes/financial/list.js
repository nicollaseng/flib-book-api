import FinancialIncome from '../../models/FinancialIncome'
import { isNullOrUndefined } from 'util'
import moment from 'moment'

/**
 * Retorna os dados financeiro em 4 etapas:
 * - all / revenue / expenses / null or "" => expenses and revenue
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export default async (req, res) => {

  let financial = []; // retorna os dois separadamente
  let revenue = [];
  let expenses = [];
  let start = null;
  let end = null;
  let closed = [];
  try {
    // Caso haja filtro de tipo
    if (!isNullOrUndefined(req.body.type) && req.body.type == "revenue") {
      revenue = await FinancialIncome.find({type: req.body.type, establishment: req.user.establishment})
      return res.json({revenue})
    } else if (!isNullOrUndefined(req.body.type) && req.body.type == "expenses") {
      expenses = await FinancialIncome.find({type: req.body.type, establishment: req.user.establishment})
      return res.json({expenses})
       } else if (!isNullOrUndefined(req.body.type) && req.body.type == "date") {

         if(!isNullOrUndefined(req.body.startDate)){
          start = moment(req.body.startDate).startOf('day');
          end   = moment(req.body.endDate).endOf('day');
         }
         else{
          start = moment().startOf('day');
          end   = moment(start).endOf('day');

         }
       expenses = await FinancialIncome.find({type: 'expenses',establishment: req.user.establishment,created_at: {$gte:  start,
        $lte:  end} })
        revenue = await FinancialIncome.find({type: 'revenue',establishment: req.user.establishment,created_at: {$gte:  start,
          $lte:  end} })
          closed = await FinancialIncome.find({type: 'close',establishment: req.user.establishment,created_at: {$gte:  start,
          $lte:  end} })


       return res.json({expenses,revenue,closed,user_name: req.user.name})
      } else if (!isNullOrUndefined(req.body.type) && req.body.type == "all") {
      financial = await FinancialIncome.find({establishment: req.user.establishment})
      return res.json({financial})
    } else {
      expenses = await FinancialIncome.find({type: 'expenses', establishment: req.user.establishment})
      revenue = await FinancialIncome.find({type: 'revenue', establishment: req.user.establishment})
      closed = await FinancialIncome.find({type: 'close', establishment: req.user.establishment})
      financial.push({expenses: expenses, revenue: revenue,closed})
      return res.json({expenses,revenue,closed,user_name: req.user.name})
    }
  } catch (err){
    return res.status(204).json({})
  }
}

import FinancialIncome from '../../models/FinancialIncome'
import Establishment from '../../models/Establishment'
import { isNullOrUndefined } from 'util'
import moment from 'moment'

export default async (req, res) => {
  let establishment = {}
  let closed = {}
  let financialRevenue = {}
  let financialCreate ={}
  let expensesTotalCreditCard = 0;
  let expensesTotalDebitCard = 0;
  let expensesTotalMoney =    0;
  let expensesTotalBankCheck = 0;    
  let expensesTotalVoucher = 0;
  let totalExpenses =0;
  let totalRevenue =0;
  let revenueTotalCreditCard = 0;
  let revenueTotalDebitCard = 0;
  let revenueTotalMoney =    0;
  let revenueTotalBankCheck = 0;    
  let revenueTotalVoucher = 0;   
  try {
    var calculeTotal = function(element,index,array){
      if(element.type == 'revenue'){
        if(element.formOfPayment =='credit_card'){revenueTotalCreditCard = revenueTotalCreditCard+element.value}
        if(element.formOfPayment =='debit'){revenueTotalDebitCard = revenueTotalDebitCard+element.value}
        if(element.formOfPayment =='money'){revenueTotalMoney = revenueTotalMoney+element.value}
        if(element.formOfPayment =='bank_check'){revenueTotalBankCheck = revenueTotalBankCheck+element.value}
        if(element.formOfPayment =='voucher'){revenueTotalVoucher = revenueTotalVoucher+element.value}
        
      }
  
        if(element.type == 'expenses'){
          if(element.formOfPayment =='credit_card'){expensesTotalCreditCard = expensesTotalCreditCard+element.value}
          if(element.formOfPayment =='debit'){expensesTotalDebitCard = expensesTotalDebitCard+element.value}
          if(element.formOfPayment =='money'){expensesTotalMoney = expensesTotalMoney+element.value}
          if(element.formOfPayment =='bank_check'){expensesTotalBankCheck = expensesTotalBankCheck+element.value}
          if(element.formOfPayment =='voucher'){exepensesTotalVoucher = expensesTotalVoucher+element.value}
        }
     
    };
    closed = await FinancialIncome.findOne({type:'close',close:'1',establishment: req.user.establishment});
    if(isNullOrUndefined(closed)){
      financialRevenue = await FinancialIncome.find({establishment: req.user.establishment})
      financialRevenue.forEach(calculeTotal)
    }
    if(!isNullOrUndefined(closed)){
      let end   = moment().endOf('day');
      let update = await FinancialIncome.findByIdAndUpdate(closed._id,{close:'0'})
      financialRevenue = await FinancialIncome.find({establishment: req.user.establishment,created_at: {$gte:  closed.created_at,
        $lte:  new Date(end).toISOString()} })
        financialRevenue.forEach(calculeTotal)
        
    }


    
   

    let totalRevenue = {
      revenueTotalCreditCard : revenueTotalCreditCard,
      revenueTotalDebitCard: revenueTotalDebitCard,
      revenueTotalBankCheck : revenueTotalBankCheck,
      revenueTotalMoney : revenueTotalMoney,
      revenueTotalVoucher : revenueTotalVoucher,
      totalRevenue : revenueTotalCreditCard+revenueTotalDebitCard+revenueTotalMoney+revenueTotalBankCheck+revenueTotalVoucher
    }
    let totalExpenses = {
      expensesTotalCreditCard : expensesTotalCreditCard,
      expensesTotalDebitCard: expensesTotalDebitCard,
      expensesTotalBankCheck : expensesTotalBankCheck,
      expensesTotalMoney : expensesTotalMoney,
      expensesTotalVoucher : expensesTotalVoucher,
      totalExpenses : expensesTotalCreditCard+expensesTotalDebitCard+expensesTotalMoney+expensesTotalBankCheck+expensesTotalVoucher
    }

    let dataFinancial = {
      "title" : "Fechamento de Caixa",
      "description" : "Fechamento" ,
      "value" : "0",
      "type" : "close",
      "category" : "F",
      "referer" : "F",
      "formOfPayment" : 'money',
      "close" : '1',
      revenueTotalCreditCard : revenueTotalCreditCard,
      revenueTotalDebitCard: revenueTotalDebitCard,
      revenueTotalBankCheck : revenueTotalBankCheck,
      revenueTotalMoney : revenueTotalMoney,
      revenueTotalVoucher : revenueTotalVoucher,
      expensesTotalCreditCard : expensesTotalCreditCard,
      expensesTotalDebitCard: expensesTotalDebitCard,
      expensesTotalBankCheck : expensesTotalBankCheck,
      expensesTotalMoney : expensesTotalMoney,
      expensesTotalVoucher : expensesTotalVoucher,
      totalRevenue :  totalRevenue.totalRevenue,
      totalExpenses : totalExpenses.totalExpenses,
      balance : totalRevenue.totalRevenue-totalExpenses.totalExpenses
      };
      financialCreate = await new FinancialIncome(dataFinancial)
      financialCreate.save();

      
      


    return res.status(201)
        .json({ financialCreate,totalRevenue,totalExpenses })
  } catch (err){
    return res.status(500)
        .json({ err })
  }
}
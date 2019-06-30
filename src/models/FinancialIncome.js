import mongoose from 'mongoose'

const FinancialIncome  = new mongoose.Schema({
  title : {
    type: String,
    required: false
  },
  description : {
    type: String,
    required: true
  },
  value : {
    type: Number,
    required: true
  },
  type : { // revenue ou expenses
    type: String,
    required: true
  },
  category : {
    type: String,
    required: true
  },
  referer : { // C ou M checkins ou manual
    type: String,
    required: true
  },
  formOfPayment : { // transferencia, dinheiro, cartao de crédito, cartão de débito, cheque
    type: String,
    required: true
  },
    revenueTotalCreditCard : {
      type : Number
    },
    revenueTotalDebitCard : {
      type : Number
    },
    revenueTotalMoney : {
      type : Number
    },
    revenueTotalBankCheck : {
      type : Number
    },
    revenueTotalVoucher : {
      type : Number
    },
    expensesTotalCreditCard : {
      type : Number
    },
    expensesTotalDebitCard : {
      type : Number
    },
    expensesTotalMoney : {
      type : Number
    },
    expensesTotalBankCheck : {
      type : Number
    },
    expensesTotalVoucher : {
      type : Number
    },
    totalRevenue : {
      type : Number
    },
    totalExpenses : {
      type : Number
    },
    balance : {
      type : Number
    },
    close : {
      type : String
    },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  establishment: { type: mongoose.SchemaTypes.ObjectId, ref: 'Establishment' },
})

FinancialIncome.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

export default mongoose.model('FinancialIncome', FinancialIncome)
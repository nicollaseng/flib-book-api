import mongoose from 'mongoose'

const Expense  = new mongoose.Schema({
  expenses : {
    type: String,
    required: true
  },
  paymentReceipt : {
    type: String,
    required: true
  },
  products : {
    type: String,
    required: true
  },
  paymentReceipt : {
    type: String,
    required: true
  },
  outsource : {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
})

Expense.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

export default mongoose.model('Expense', Expense)

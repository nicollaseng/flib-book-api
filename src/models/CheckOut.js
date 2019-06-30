import mongoose from 'mongoose'

const CheckOut = new mongoose.Schema({
  checkIn: { type: mongoose.SchemaTypes.ObjectId, ref: 'CheckIn' },
  priceTable: { type: mongoose.SchemaTypes.ObjectId, ref: 'PriceTable' },
  status: {
    type: String,
    required: true,
    default: 'open' // open, closed
  },
  payment: {
    type: {
        type: String
    },
    discount: {
     type: {
         type: String
     },
     amount: Number
    },
    amount: Number,
    obs: String,
    phone: String,
    print: String,
    status: {
      type: String,
      default: 'pending_payment'
    } // paid, pending_payment, canceled, pending_refunded, refunded
  },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  establishment: { type: mongoose.SchemaTypes.ObjectId, ref: 'Establishment' },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

CheckOut.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

export default mongoose.model('CheckOut', CheckOut)
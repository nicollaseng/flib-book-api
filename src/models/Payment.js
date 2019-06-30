import mongoose from 'mongoose'

const Payment  = new mongoose.Schema({
  date : {
    type: String,
    required: false
  },
  description : {
    type: String,
    required: true
  },
  operation : {
    type: String,
    required: true,
  },
  value : {
    type: Number,
    required: true,
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

Payment.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

export default mongoose.model('Payment', Payment)

import mongoose from 'mongoose'

const Subscription  = new mongoose.Schema({
  description : {
    type: String,
    required: false
  },
  value : {
    type: Number,
    required: true
  },
  amount : {
    type: Number,
    required: true
  },
  weeklyDays : {
    type: String,
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

Subscription.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

export default mongoose.model('Subscription', Subscription)

import mongoose from 'mongoose'

const Monthly  = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  vehiclePlate: {
    type: String,
    required: true,
  },
  vehiclePlate: {
    type: String,
    required: true,
  },
  subscription: { type: mongoose.SchemaTypes.ObjectId, ref: 'Subscription' },
  establishment: { type: mongoose.SchemaTypes.ObjectId, ref: 'Establishment' },
  dueDate: {
    type: String,
    required: false,
  },
  temporary: {
    type: Boolean,
    required: true
  },
  date: {
    type: String,
    required: false,
  },
  paymentType: {
    type: String,
    required: false,
  },
  plan: {
    type: String,
    required: false,
  },
  value: {
    type: Number,
    required: false,
  },
  monthReference: {
    type: String,
    required: false
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

Monthly.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

export default mongoose.model('Monthly', Monthly)

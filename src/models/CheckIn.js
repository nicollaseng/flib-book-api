import mongoose from 'mongoose'

const CheckIn = new mongoose.Schema({
  services: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Service' }],
  customer: {
    full_name: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false
    },
    phone_type: {
      type: String,
      required: false,
      default: 'zap'
    }
  },
  vehicle: {
    model: {
      type: String,
      required: true
    },
    plate: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false,
      default: 'N/A'
    },
    photos: [{
      value: {
        type: String,
        required: false
      }
    }],
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'open' // open / closed
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

CheckIn.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

export default mongoose.model('CheckIn', CheckIn)
import mongoose from 'mongoose'

const Service  = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  description : {
    type: String,
    required: false
  },
  value : {
    type: Number,
    required: true
  },
  establishment: { type: mongoose.SchemaTypes.ObjectId, ref: 'Establishment' },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
})

Service.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

export default mongoose.model('Service', Service)
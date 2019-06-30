import mongoose from 'mongoose'

const VehicleCategory  = new mongoose.Schema({
  category : {
    type: String,
    required: true
  },
  status : {
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

VehicleCategory.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

export default mongoose.model('VehicleCategory', VehicleCategory)

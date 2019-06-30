import mongoose from 'mongoose'
require('mongoose-type-email')

const SecretCode = new mongoose.Schema({
  secretCode: {
    type: String,
    required: true
  },
  secretType: {
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
  }
})

SecretCode.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

export default mongoose.model('SecretCode', SecretCode)

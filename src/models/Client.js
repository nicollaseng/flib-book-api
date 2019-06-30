import mongoose from 'mongoose'
require('mongoose-type-email')

const Client = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true,
  },
  isWhatsapp: {
    type: Boolean,
    required: false,
  },
  checkin: {
    type: Object,
    required: false,
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

Client.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

export default mongoose.model('Client', Client)

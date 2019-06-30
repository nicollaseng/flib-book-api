import mongoose from 'mongoose'

const Whatsapp  = new mongoose.Schema({
  text : {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  clientId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Client' },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
})

Whatsapp.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

export default mongoose.model('Whatsapp', Whatsapp)

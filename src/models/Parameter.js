import mongoose from 'mongoose'

const Parameter  = new mongoose.Schema({
  index : {
    type: String,
    required: true
  },
  value : {
    type: String,
    required: true
  },
  establishment: { type: mongoose.SchemaTypes.ObjectId, ref: 'Establishment' },
})

export default mongoose.model('Parameter', Parameter)
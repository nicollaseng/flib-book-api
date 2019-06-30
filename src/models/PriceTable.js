import mongoose from 'mongoose'

const PriceTable = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'output'
  }, // input or output
  input: {
    amount: Number
  },
  output: [{
    pos: Number,
    quantity: Number,
    amount: Number,
    unit: {
      type: String,
      default: 'H'
    }, // H=Hora, M=Minutos e D=Diária
    metric: {
      type: String,
      default: 'A' // A = Até ou C para A Cada
    }
  }],
  tolerance: {
    type: Number,
    required: true
  }, // Minutos
  active: {
    type: Boolean,
    default: true
  },
  default: {
    type: Boolean,
    default: false
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

PriceTable.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

export default mongoose.model('PriceTable', PriceTable)

import mongoose from 'mongoose'

const Establishment  = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  legalname : {
    type: String,
    required: true
  },
  document_number: {
    type: Number,
    required: true,
    unique: true
  },
  document_type: {
    type: String,
    required: true
  },
  phones: [{
    ddi: {
      type: Number,
      required: true,
      default: '55'
    },
    ddd: {
      type: Number,
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  }],
  street: {
    type: String,
    required: true
  },
  street_number: {
    type: String,
    required: true
  },
  complementary: {
    type: String,
    required: true
  },
  neighborhood: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
    default: "BR"
  },
  active: {
    type: Boolean,
    required: true,
    default: false
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

Establishment.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

export default mongoose.model('Establishment', Establishment)
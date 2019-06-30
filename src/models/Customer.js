import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
require('mongoose-type-email')

const Customer = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  document: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true
  },
  mobile: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  companyAddressNumber: {
    type: Number,
    required: true,
  },
  companyAddressComplement: {
    type: String,
  },
  companyAddressNeighborhood: {
    type: String,
    required: true,
  },
  companyAddressCity: {
    type: String,
    required: true,
  },
  companyAddressState: {
    type: String,
    required: true,
  },
  companyAddressZipcode: {
    type: String,
    required: true,
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

Customer.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

export default mongoose.model('Customer', Customer)

import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
require('mongoose-type-email')

const User = new mongoose.Schema({
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
  active: {
    type: Boolean,
    default: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isManager: {
    type: Boolean,
    required: true,
    default: false,
  },
  isOperational: {
    type: Boolean,
    required: true,
    default: true,
  },
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

User.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

User.methods.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

User.methods.validatePassword = function(password, cb) {
  return bcrypt.compare(password, this.password, cb)
}

export default mongoose.model('User', User)

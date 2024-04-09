const mongoose = require('mongoose');
const Joi = require('joi');

const userValidationSchema = Joi.object({
  userName: Joi.string().min(6).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    validate: {
      validator: value =>
        userValidationSchema.validate({ userName: value }).error === null,
      message: props => 'Invalid username format',
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: value =>
        userValidationSchema.validate({ email: value }).error === null,
      message: props => 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: value =>
        userValidationSchema.validate({ password: value }).error === null,
      message: props => 'Invalid password format',
    },
  },
});

const userModel = mongoose.model('users', userSchema);
module.exports = { userModel };

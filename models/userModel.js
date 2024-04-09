const mongoose = require('mongoose');
const Joi = require('joi');

const userValidationSchema = Joi.object({
  userName: Joi.string().min(3).required(),
  email:Joi.string().min(4).required().email(),
  password:Joi.string().min(6).required()
});

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: value =>
        userValidationSchema.validate({ userName: value }).error === null,
      message: props => 'Invalid username format',
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: value =>
        userValidationSchema.validate({ email: value }).error === null,
      message: props => 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: value =>
        userValidationSchema.validate({ password: value }).error === null,
      message: props => 'Invalid password format',
    },
  },
});

const userModel = mongoose.model('users', userSchema);
module.exports = { userModel };


// const joi = require("joi");
// const errorFunction = require("../../utils/errorFunction");

// const validation = joi.object({
//      userName: joi.string().alphanum().min(3).max(25).trim(true).required(),
//      email: joi.string().email().trim(true).required(),
//      password: joi.string().min(8).trim(true).required(),
//      mobileNumber: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
//      birthYear: joi.number().integer().min(1920).max(2000),
//      skillSet: joi.array().items(joi.string().alphanum().trim(true))
// .default([]),
//     is_active: joi.boolean().default(true),
// });
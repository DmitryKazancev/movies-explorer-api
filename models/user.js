const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../errors/Unauthorized');

// Mongoose DB schema for user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required'],
    minlength: [2, 'Minimum 2 character'],
    maxlength: [30, 'Maximum 30 character'],
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Incorrect email',
    },
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Not authorized');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Not authorized');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

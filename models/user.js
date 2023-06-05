const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Notauthorized = require('../errors/Notauthorized');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле "E-mail" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: ({ value }) => `${value} - некорректный адрес электронной почты`,
    },
  },

  password: {
    type: String,
    required: [true, 'Поле "Пароль" должно быть заполнено'],
    select: false,
  },

  name: {
    type: String,
    required: [true, 'Поле "Имя" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "Имя" - 2'],
    maxlength: [30, 'Максимальная длина поля "Имя" - 30'],
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this
    .findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Notauthorized('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Notauthorized('Неправильные почта или пароль');
          }
          return user;
        });
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);

/* eslint-disable func-names */
const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const { regExp } = require('../utils/regExp');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    name: {
    // у пользователя есть имя — опишем требования к имени в схеме:
      type: String, // имя — это строка
      default: 'Mikhail Leonov',
      minlength: 2, // минимальная длина имени — 2 символа
      maxlength: 30, // а максимальная — 30 символов
    },
    about: {
      type: String,
      default: 'Researcher',
      minlength: 2, // минимальная длина имени — 2 символа
      maxlength: 30,
    },
    avatar: {
      type: String,
      default: 'https://avatars.mds.yandex.net/get-zen_doc/1900370/pub_5e749e02dacda539a4a53cd3_5e749e91c4119657f2f47b35/scale_1200',
      validate: {
        validator: (val) => regExp.test(val),
        message: 'Некорректный формат URL',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (val) => isEmail(val),
        message: 'Некорректный формат Email',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }, { runValidators: true })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

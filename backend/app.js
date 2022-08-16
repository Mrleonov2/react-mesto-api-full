/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { celebrate, Joi, errors } = require('celebrate');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const corsOption = require('./utils/corsOption');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const errHandler = require('./middlewares/errHandler');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const regExp = require('./utils/regExp');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOption));
app.use(helmet());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(new RegExp(regExp)),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.get('/signout', (_, res) => {
  res.status(200).clearCookie('jwt').send({ message: 'Выход' });
});
app.use(auth, routerUser);
app.use(auth, routerCard);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница по указанному URL не найдена'));
});
app.use(errorLogger);
app.use(errors());

app.use(errHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

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

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PATCH,DELETE,PUT,POST';
  const requestHeaders = req.headers['acces-control-request-headers'];
  const allowedCors = [
    'https://api.leonov.nomoredomains.sbs',
    'http://api.leonov.nomoredomains.sbs',
    'http:/localhost:3000',
    'https://leonov.nomoredomains.sbs',
    'http://leonov.nomoredomains.sbs',
    'https://api.leonov.nomoredomains.sbs/signup',
    'https://api.leonov.nomoredomains.sbs/signin',
  ];
  if (allowedCors.includes(origin)) {
    res.header('Acess-Conrol-Allow-Origin', origin);
    if (method === 'OPTIONS') {
      res.header('Acess-Conrol-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Acess-Conrol-Allow-Headers', requestHeaders);
      return res.end();
    }
  }
  next();
});
app.use(cors(corsOption));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cookieParser());
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

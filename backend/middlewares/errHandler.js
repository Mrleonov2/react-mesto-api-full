const errHandler = (err, _, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message || 'Что-то пошло не так!' });
  }
  res.status(500).send({ message: 'Что-то пошло не так!' });
  return next();
};

module.exports = errHandler;

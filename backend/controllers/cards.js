const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => {
  Card.find({}).populate('owner').then((cards) => {
    res.send(cards);
  }).catch(next);
};
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: { _id: req.user._id } })
    .then((card) => { res.send(card); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};
const deleteCard = (req, res, next) => {
  const deleteCardHandler = () => {
    Card.findByIdAndRemove(req.params.cardId)
      .then(() => {
        res.send({ message: 'Карточка удалена' });
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return next(new BadRequestError('Переданный _id некорректный'));
        }
        return next(err);
      });
  };
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      if (req.user._id !== card.owner.toString()) {
        return next(new ForbiddenError('Нет прав на удаление карточки'));
      }
      return deleteCardHandler();
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadRequestError('Переданный _id некорректный'));
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((card) => {
    if (!card) {
      return next(new NotFoundError('Передан несуществующий _id карточки'));
    }
    return res.send(card);
  })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Передан несуществующий _id карточки'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      }
      return next(err);
    });
};

module.exports = {
  likeCard,
  dislikeCard,
  getCards,
  createCard,
  deleteCard,
};

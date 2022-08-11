const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BadRequestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");

const saltRounds = 10;
const MONGO_DUPLICATE_KEY_CODE = 11000;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};
const getUser = (req, res, next) => {
  User.findById(req.params.userId)

    .then((user) => {
      if (!user) {
        return next(
          new NotFoundError("Пользователь по указанному _id не найден")
        );
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return next(new BadRequestError("Переданный _id некорректный"));
      }
      return next(err);
    });
};
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(
          new NotFoundError("Пользователь с указанным _id не найден")
        );
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return next(new BadRequestError("Переданный _id некорректный"));
      }
      return next(err);
    });
};
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Не передан email или пароль"));
  }

  return bcrypt
    .hash(password, saltRounds)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }).then((user) => {
        res.send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email,
        });
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError(
            "Переданы некорректные данные при создании пользователя"
          )
        );
      }
      if (err.code === MONGO_DUPLICATE_KEY_CODE) {
        return next(
          new ConflictError("Пользователь с таким email уже существует")
        );
      }
      return next(err);
    });
};
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(
          new NotFoundError("Пользователь с указанным _id не найден")
        );
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError(
            "Переданы некорректные данные при обновлении аватара"
          )
        );
      }
      return next(err);
    });
};
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return next(
          new NotFoundError("Пользователь с указанным _id не найден")
        );
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError(
            "Переданы некорректные данные при обновлении профиля"
          )
        );
      }
      return next(err);
    });
};
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Не передан email или пароль"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "secret-code", {
        expiresIn: "1d",
      });
      res.cookie("jwt", token, {
        maxAge: 3600000 * 24 * 1,
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  getCurrentUser,
  getUsers,
  createUser,
  updateAvatar,
  updateUser,
  login,
};

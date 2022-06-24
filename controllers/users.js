const User = require('../models/user');
const ERROR_CODE = require('../constants/constants');

function createUser(req, res, next) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res
        .status(201)
        .send({ data: `Пользователь ${user.name} создан.` });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Некорректные данные.');
        error.statusCode = ERROR_CODE;
        next(error);
      } else {
        const error = new Error('Что-то пошло не так');
        error.statusCode = 500;
        next(err);
      }
    });
}

function getUsers(req, res, next) {
  User.find({})
    .then((users) => {
      res
        .status(200)
        .send(users);
    })
    .catch(() => {
      const error = new Error({ message: 'Что-то пошло не так' });
      error.statusCode = 500;
      next(error);
    });
}

function getUserId(req, res, next) {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        const error = new Error('Пользователя с таким id не существует.');
        error.statusCode = ERROR_CODE;
        next(error);
      }
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('Некорректный id.');
        error.statusCode = ERROR_CODE;
        next(error);
      } else {
        const error = new Error('Что-то пошло не так.');
        error.statusCode = 500;
        next(error);
      }
    });
}

function patchUserProfile(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      res
        .status(201)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Некорректные данные.');
        error.statusCode = ERROR_CODE;
        next(error);
      } else {
        const error = new Error('Что-то пошло не так.');
        error.statusCode = 500;
        next(error);
      }
    });
}

function patchUserAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Некорректные данные.');
        error.statusCode = ERROR_CODE;
        next(error);
      } else {
        const error = new Error('Что-то пошло не так.');
        error.statusCode = 500;
        next(error);
      }
    });
}

module.exports = {
  createUser,
  getUsers,
  getUserId,
  patchUserProfile,
  patchUserAvatar,
};

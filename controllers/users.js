const User = require('../models/user');
const {
  ERROR_CODE_400,
  ERROR_CODE_500,
  ERROR_CODE_404,
} = require('../constants/constants');

function createUser(req, res, next) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res
        .status(201)
        .send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Некорректные данные.');
        error.statusCode = ERROR_CODE_400;
        next(error);
      } else {
        const error = new Error('Что-то пошло не так');
        error.statusCode = ERROR_CODE_500;
        next(error);
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
      error.statusCode = ERROR_CODE_500;
      next(error);
    });
}

function getUserId(req, res, next) {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        const error = new Error('Пользователя с таким id не существует.');
        error.statusCode = ERROR_CODE_404;
        next(error);
        return;
      }
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('Некорректный id.');
        error.statusCode = ERROR_CODE_400;
        next(error);
      } else {
        const error = new Error('Что-то пошло не так.');
        error.statusCode = ERROR_CODE_500;
        next(error);
      }
    });
}

function patchUserProfile(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        const error = new Error('Пользователя с таким id не существует.');
        error.statusCode = ERROR_CODE_404;
        next(error);
        return;
      }
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const error = new Error('Некорректные данные.');
        error.statusCode = ERROR_CODE_400;
        next(error);
      } else {
        const error = new Error('Что-то пошло не так.');
        error.statusCode = ERROR_CODE_500;
        next(error);
      }
    });
}

function patchUserAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        const error = new Error('Пользователь с таким id не найден.');
        error.statusCode = ERROR_CODE_404;
        next(error);
        return;
      }
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const error = new Error('Некорректные данные.');
        error.statusCode = ERROR_CODE_400;
        next(error);
      } else {
        const error = new Error('Что-то пошло не так.');
        error.statusCode = ERROR_CODE_500;
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

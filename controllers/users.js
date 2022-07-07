// eslint-disable-next-line import/no-unresolved
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  ERROR_CODE_400,
  ERROR_CODE_500,
  ERROR_CODE_404,
  ERROR_CODE_403,
  RES_CREATED,
  RES_OK,
} = require('../constants/constants');
const SALT_ROUNDS = 10;
const { generateToken } = require('../helpers/jwt');

function getUserProfile(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      res
        .status(RES_CREATED)
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

function login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = new Error('Не передан емейл или пароль');
    error.statusCode = ERROR_CODE_400;
    next(error);
  }
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        const error = new Error('Неправильный емейл или пароль');
        error.statusCode = ERROR_CODE_403;
        next(error);
      }
      return Promise.all([
        user,
        bcrypt.compare(password, user.password),
      ]);
    })
    .then(([user, isPasswordCorrect]) => {
      if (!isPasswordCorrect) {
        const error = new Error('Неправильный емейл или пароль');
        error.statusCode = ERROR_CODE_403;
        next(error);
      }

      return generateToken({ email: user.email, type: 'admin' });
    })
    .then((token) => {
      res.send({ token });
    });
}

function createUser(req, res, next) {
  const {
    name,
    about,
    avatar,
    email,
    password } = req.body;
  bcrypt.hash(req.body.password, SALT_ROUNDS)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          res
            .status(RES_CREATED)
            .send({ data: user });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Некорректные данные.');
        error.statusCode = ERROR_CODE_400;
        next(error);
      } else if (err.code === 11000) {
        const error = new Error('Емейл занят');
        error.statusCode = 409;
        next(error);
      } else if (err.message === 'Некорректный email') {
        const error = new Error('Некорректный email');
        error.statusCode = ERROR_CODE_403;
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
        .status(RES_OK)
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
        .status(RES_OK)
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
        .status(RES_OK)
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
        .status(RES_OK)
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
  login,
  getUserProfile,
};

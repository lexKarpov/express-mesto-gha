const Card = require('../models/card');
const ERROR_CODE = require('../constants/constants');

function createCard(req, res, next) {
  const {
    name, link, likes,
  } = req.body;
  const owner = req.user._id;
  Card.create({
    name, link, owner, likes,
  })
    .then((card) => {
      res
        .status(201)
        .send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Некорректные данные.');
        error.statusCode = ERROR_CODE;
        next(error);
      } else {
        const error = new Error('Что-то пошло не так');
        error.statusCode = 500;
        next(error);
      }
    });
}

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => {
      res
        .status(200)
        .send(cards);
    })
    .catch((err) => {
      const error = new Error('Что-то пошло не так');
      error.statusCode = 500;
      next(error);
    });
}

function deleteCard(req, res, next) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((user) => {
      res
        .status(200)
        .send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('Некорректные данные.');
        error.statusCode = ERROR_CODE;
        next(error);
      } else {
        const error = new Error('Что-то пошло не так');
        error.statusCode = 500;
        next(error);
      }
    });
}

function postlikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('Некорректные данные.');
        error.statusCode = ERROR_CODE;
        next(error);
      } else {
        const error = new Error('Что-то пошло не так');
        error.statusCode = 500;
        next(error);
      }
    });
}

function deletelikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('Некорректные данные.');
        error.statusCode = ERROR_CODE;
        next(error);
      } else {
        const error = new Error('Что-то пошло не так');
        error.statusCode = 500;
        next(error);
      }
    });
}

module.exports = {
  createCard,
  getCards,
  deleteCard,
  postlikeCard,
  deletelikeCard,
};

const Card = require('../models/card');
const {
  ERROR_CODE_400,
  ERROR_CODE_500,
  ERROR_CODE_404,
} = require('../constants/constants');

function createCard(req, res, next) {
  const {
    name,
    link,
    likes,
  } = req.body;
  const owner = req.user.id;
  Card.create({
    name,
    link,
    owner,
    likes,
  })
    .then((card) => {
      res
        .status(201)
        .send({ data: card });
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

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => {
      res
        .status(200)
        .send(cards);
    })
    .catch(() => {
      const error = new Error('Что-то пошло не так');
      error.statusCode = ERROR_CODE_500;
      next(error);
    });
}

function deleteCard(req, res, next) {
  console.log(req.user.id);
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        const error = new Error('Карточка с таким id не найдена.');
        error.statusCode = ERROR_CODE_404;
        next(error);
        return;
      }
      if (card.owner.toString() !== req.user.id.toString()) {
        const error = new Error('Нельзя удалить эту карточку');
        error.statusCode = ERROR_CODE_404;
        next(error);
        return;
      }
      res
        .status(200)
        .send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
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

function postlikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const error = new Error('Карточка с таким id не найдена.');
        error.statusCode = ERROR_CODE_404;
        next(error);
        return;
      }
      res
        .status(200)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
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

function deletelikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const error = new Error('Карточка с таким id не найдена.');
        error.statusCode = ERROR_CODE_404;
        next(error);
        return;
      }
      res
        .status(200)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
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

module.exports = {
  createCard,
  getCards,
  deleteCard,
  postlikeCard,
  deletelikeCard,
};

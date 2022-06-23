const Card = require('../models/card');
const ERROR_CODE = 404;

function createCard(req, res) {
  const { name, link, likes, createdAt } = req.body;
  const owner = req.user._id
  Card.create({ name, link, owner, likes, createdAt })
    .then(card => res.status(201).send({ data: card }))
    .catch(err => res.status(ERROR_CODE).send({ message: `${err.message}` }));
}

function getCards(req, res) {
  Card.find({})
    .then(cards => res.status(201).send(cards))
    .catch(err => res.status(ERROR_CODE).send({ message: `${err.message}` }));
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then(user => res.status(201).send({ data: user }))
    .catch(err => res.status(ERROR_CODE).send({ message: `${err.message}` }));
}

function postlikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => {
      if (!card) {
        res.status(ERROR_CODE).send({ message: 'Не найден id' });
        return;
      }
    })
    .then(user => res.status(201).send(user))
    .catch(err => res.status(ERROR_CODE).send({ message: `${err.message}` }));
}

function deletelikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(user => res.status(201).send(user))
    .catch(err => res.status(ERROR_CODE).send({ message: `${err.message}` }));
}

module.exports = {
  createCard,
  getCards,
  deleteCard,
  postlikeCard,
  deletelikeCard
}


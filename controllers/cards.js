const Card = require('../models/card');

function createCard(req, res) {
  const { name, link, likes, createdAt } = req.body;
  const owner = req.user._id
  Card.create({ name, link, owner, likes, createdAt })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(400).send({ message: `${err.message}` }));
}


function getCards(req, res) {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(err => res.status(400).send({ message: `${err.message}` }));
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: `${err.message}` }));
}

function patchUserAvatar(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: `${err.message}` }));
}

function deletelikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: `${err.message}` }));
}

module.exports = {
  createCard,
  getCards,
  deleteCard,
  patchUserAvatar,
  deletelikeCard
}

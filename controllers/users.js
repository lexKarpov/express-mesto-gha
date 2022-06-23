const User = require('../models/user');
const ERROR_CODE = 404;

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(ERROR_CODE).send({ message: `${err.message}` }));
}

function getUsers(req, res) {
  User.find({})
    .then((users) => {
      res.status(201).send(users);
    })
    .catch(err => res.status(ERROR_CODE).send({ message: `${err.message}` }));
}

function getUserId(req, res) {
  User.findOne({ _id: req.params.userId })
    .then((user) => res.status(201).send(user))
    .catch(err => res.status(ERROR_CODE).send({ message: `${err.message}` }));
}

function patchUserProfile(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(user => res.status(201).send(user))
    .catch(err => res.status(ERROR_CODE).send({ message: `${err.message}` }));
}

function patchUserAvatar(req, res) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(user => res.status(201).send(user))
    .catch(err => res.status(ERROR_CODE).send({ message: `${err.message}` }));
}

module.exports = {
  createUser,
  getUsers,
  getUserId,
  patchUserProfile,
  patchUserAvatar
}


// PATCH /users/me/avatar — обновляет аватар
// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки
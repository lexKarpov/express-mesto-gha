const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExpAvatar } = require('../constants/constants');
const {
  createCard,
  getCards,
  deleteCard,
  postlikeCard,
  deletelikeCard,
} = require('../controllers/cards');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30),
    link: Joi
      .string()
      .required()
      .pattern(new RegExp(regExpAvatar)),
  }),
}), createCard);

router.get('/', getCards);

router.delete('/:cardId', celebrate({
  params: Joi
    .object()
    .keys({
      cardId: Joi
        .string()
        .required(),
    }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi
    .object()
    .keys({
      cardId: Joi
        .string()
        .required(),
    }),
}), postlikeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi
    .object()
    .keys({
      cardId: Joi
        .string()
        .required(),
    }),
}), deletelikeCard);

module.exports = router;

// eslint-disable-next-line no-undef
const router = require('express').Router();
// eslint-disable-next-line no-undef
const { createCard, getCards, deleteCard, postlikeCard, deletelikeCard } = require('../controllers/cards');
router.post('/', createCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', postlikeCard);
router.delete('/:cardId/likes', deletelikeCard);

// eslint-disable-next-line no-undef
module.exports = router;

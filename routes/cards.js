const router = require('express').Router();
const { createCard, getCards, deleteCard, postlikeCard, deletelikeCard } = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', postlikeCard);
router.delete('/:cardId/likes', deletelikeCard);

module.exports = router;

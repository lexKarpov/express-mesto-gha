const router = require('express').Router();
const { createCard, getCards, deleteCard, patchUserAvatar, deletelikeCard } = require('../controllers/cards');
router.post('/', createCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', patchUserAvatar);
router.delete('/:cardId/likes', deletelikeCard);

module.exports = router;

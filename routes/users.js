// eslint-disable-next-line no-undef
const router = require('express').Router();
// eslint-disable-next-line no-undef
const { createUser, getUsers, getUserId, patchUserProfile, patchUserAvatar } = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserId);
router.patch('/me', patchUserProfile);
router.patch('/me/avatar', patchUserAvatar);

// eslint-disable-next-line no-undef
module.exports = router;
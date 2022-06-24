const router = require('express').Router();
const {
  createUser, getUsers, getUserId, patchUserProfile, patchUserAvatar
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserId);
router.patch('/me', patchUserProfile);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;

const router = require('express').Router();
const {
  getUsers,
  getUserId,
  patchUserProfile,
  patchUserAvatar,
  getUserProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.patch('/me', patchUserProfile);
router.get('/me', getUserProfile);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;

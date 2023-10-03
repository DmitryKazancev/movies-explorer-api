const router = require('express').Router();

// Import controllers for users
const {
  getUsers, getUserById, editUserData, getMeInfo,
} = require('../controllers/users');

const {
  userIdValidation,
  userInfoValidation,
} = require('../middlewares/validators/userValidation');

// Routes for users
router.get('/', getUsers);
router.get('/me', getMeInfo);

router.get('/:userId', userIdValidation, getUserById);

router.patch('/me', userInfoValidation, editUserData);

module.exports = router;

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// const httpRegex = require('../utils/constants');

// Import controllers for users
const {
  getUsers, getUserById, editUserData, getMeInfo,
} = require('../controllers/users');

// Routes for users
router.get('/', getUsers);
router.get('/me', getMeInfo);

router.get('/:userId', celebrate(
  {
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  },
), getUserById);

router.patch('/me', celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email({ tlds: { allow: false } }),
    }),
  },
), editUserData);

module.exports = router;

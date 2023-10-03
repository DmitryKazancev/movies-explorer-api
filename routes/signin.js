const router = require('express').Router();
const { login } = require('../controllers/users');
const {
  userLoginValidation,
} = require('../middlewares/validators/userValidation');

router.post('/', userLoginValidation, login);

module.exports = router;

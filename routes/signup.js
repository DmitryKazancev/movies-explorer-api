const router = require('express').Router();
const { addUser } = require('../controllers/users');
const {
  userAddValidation,
} = require('../middlewares/validators/userValidation');

router.post('/', userAddValidation, addUser);

module.exports = router;

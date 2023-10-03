const router = require('express').Router();
const auth = require('../middlewares/auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const signupRoutes = require('./signup');
const signinRoutes = require('./signin');
const NotFound = require('../errors/NotFound');

router.use('/signin', signinRoutes);
router.use('/signup', signupRoutes);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.use('*', (req, res, next) => {
  next(new NotFound('404 Page not found'));
});

module.exports = router;

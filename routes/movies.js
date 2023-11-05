const router = require('express').Router();

// Import controllers for movies
const {
  addMovie, deleteMovie, getMovies,
} = require('../controllers/movies');

// Import validators for movies
const {
  movieInfoValidation,
  movieIdValidation,
} = require('../middlewares/validators/movieValidation');

// Routes for movies
router.get('/', getMovies);

router.delete('/:_id', movieIdValidation, deleteMovie);

router.post('/', movieInfoValidation, addMovie);

module.exports = router;

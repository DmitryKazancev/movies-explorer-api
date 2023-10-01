const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const httpRegex = require('../utils/constants');

// Import controllers for movies
const {
  addMovie, deleteMovie, getMovies,
} = require('../controllers/movies');

// Routes for movies
router.get('/', getMovies);
router.delete('/:movieId', celebrate(
  {
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  },
), deleteMovie);
router.post('/', celebrate(
  {
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(httpRegex),
      trailerLink: Joi.string().required().pattern(httpRegex),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().pattern(httpRegex),
      movieId: Joi.string().length(24).hex().required(),
    }),
  },
), addMovie);

module.exports = router;

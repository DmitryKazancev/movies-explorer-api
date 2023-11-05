const { celebrate, Joi } = require('celebrate');
const httpRegex = require('../../utils/constants');

const movieInfoValidation = celebrate({
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
    movieId: Joi.number().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required(),
  }),
});

module.exports = {
  movieInfoValidation,
  movieIdValidation,
};

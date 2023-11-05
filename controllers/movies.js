const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const ForbiddenStatus = require('../errors/ForbiddenStatus');
const Movie = require('../models/movie');

// Movie add controller
module.exports.addMovie = (req, res, next) => {
  const {
    country, director, duration, year,
    description, image, trailerLink, nameRU,
    nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      Movie.findById(movie._id)
        .orFail()
        .then((data) => res.status(201).send(data))
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new NotFound('Movie not found'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(err.message));
      } else {
        next(err);
      }
    });
};

// Get movies controller
module.exports.getMovies = (req, res, next) => {
  const { _id: userId } = req.user;
  Movie.find({ owner: userId })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// Delete movie controller
module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params._id, owner: req.user._id })
    .then((movie) => {
      if (!movie) {
        next(new NotFound('Movie not found'));
        return;
      }
      if (movie.owner._id.toString() !== req.user._id) {
        next(new ForbiddenStatus('Not permission for movie'));
        return;
      }
      Movie.deleteOne(movie)
        .then(() => {
          Movie.find({ owner: req.user._id })
            .then((movies) => {
              res.send(movies);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

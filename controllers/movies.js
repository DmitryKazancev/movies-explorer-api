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
        .populate('owner')
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
    .populate(['owner'])
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// Delete movie controller
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenStatus('Not permission for movie');
      }
      Movie.deleteOne(movie)
        .orFail()
        .then(() => {
          res.send({ message: 'Movie remove' });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new BadRequest('Incorrect movie id'));
          } else if (err.name === 'DocumentNotFoundError') {
            next(new NotFound('Movie not found'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === 'TypeError') {
        next(new NotFound('Incorrect movie id'));
      } else {
        next(err);
      }
    });
};

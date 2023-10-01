const mongoose = require('mongoose');
const httpRegex = require('../utils/constants');

// Mongoose DB schema for movie
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Country field is required'],
  },
  director: {
    type: String,
    required: [true, 'Director field is required'],
  },
  duration: {
    type: Number,
    required: [true, 'Duration field is required'],
  },
  year: {
    type: String,
    required: [true, 'Year field is required'],
  },
  description: {
    type: String,
    required: [true, 'Description field is required'],
  },
  image: {
    type: String,
    required: [true, 'Image link field is required'],
    validate: {
      validator(link) {
        return httpRegex.test(link);
      },
      message: 'Image link available',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Trailer link field is required'],
    validate: {
      validator(link) {
        return httpRegex.test(link);
      },
      message: 'Trailer link available',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail field is required'],
    validate: {
      validator(link) {
        return httpRegex.test(link);
      },
      message: 'Thumbnail link available',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: String,
    required: [true, 'Movie Id field is required'],
  },
  nameRU: {
    type: String,
    required: [true, 'Russian name film is required'],
  },
  nameEN: {
    type: String,
    required: [true, 'English name is required'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);

const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "страна создания фильма" должно быть заполнено'],
  },

  director: {
    type: String,
    required: [true, 'Поле "режиссёр фильма" должно быть заполнено'],
  },

  duration: {
    type: Number,
    required: [true, 'Поле "длительность фильма" должно быть заполнено'],
  },

  year: {
    type: Number,
    required: [true, 'Поле "год выпуска фильма" должно быть заполнено'],
  },

  description: {
    type: String,
    required: [true, 'Поле "описание фильма" должно быть заполнено'],
  },

  image: {
    type: String,
    required: [true, 'Поле "ссылка на постер к фильму" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: ({ value }) => `${value} - некорректный URL`,
    },
  },

  trailerLink: {
    type: String,
    required: [true, 'Поле "ссылка на трейлер фильма" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: ({ value }) => `${value} - некорректный URL`,
    },
  },

  thumbnail: {
    type: String,
    required: [true, 'Поле "миниатюрное изображение постера к фильму" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: ({ value }) => `${value} - некорректный URL`,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" должно быть заполнено'],
  },

  movieId: {
    type: Number,
    required: [true, 'Поле "id фильма" должно быть заполнено'],
  },

  nameRU: {
    type: String,
    required: [true, 'Поле "название фильма на русском языке" должно быть заполнено'],
  },

  nameEN: {
    type: String,
    required: [true, 'Поле "название фильма на английском языке" должно быть заполнено'],
  },

}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);

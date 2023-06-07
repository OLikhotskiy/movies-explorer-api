const Forbidden = require('../errors/Forbidden');

const Movie = require('../models/movie');
const { CREATED_CODE } = require('../utils/constants');
// GET MOVIE CARDS
module.exports.getMovieCards = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail()
    .then((card) => res.send(card))
    .catch(next);
};
// CREATE MOVIE CARDS
module.exports.createMovieCard = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((card) => res.status(CREATED_CODE).send(card))
    .catch(next);
};
// DELETE MOVIE CARDS
module.exports.deleteMovieCard = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        card.deleteOne()
          .then(() => res.send({ message: 'Карточка удалена' }))
          .catch(next);
      } else {
        next(new Forbidden('Невозможно удалить карточку другого пользователя'));
      }
    })
    .catch(next);
};

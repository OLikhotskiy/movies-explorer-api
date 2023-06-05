const moviesRouter = require('express').Router();
const { validMovieCard, validMovieCardId } = require('../middlewares/validateMovies');

const {
  getMovieCards,
  createMovieCard,
  deleteMovieCard,
} = require('../controllers/movies');

moviesRouter.get('/', getMovieCards);
moviesRouter.post('/', validMovieCard, createMovieCard);
moviesRouter.delete('/:cardId', validMovieCardId, deleteMovieCard);

module.exports = moviesRouter;

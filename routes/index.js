const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const signoutRouter = require('./signout');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');

router.use('/signin', signinRouter);
router.use('/signup', signupRouter);

router.use('/signout', auth, signoutRouter);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFound('Cтраница не найдена'));
});

module.exports = router;

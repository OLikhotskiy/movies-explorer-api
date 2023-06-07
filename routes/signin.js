const signinRouter = require('express').Router();
const { login } = require('../controllers/users');
const { validSignin } = require('../middlewares/validateUsers');

signinRouter.post('/', validSignin, login);
module.exports = signinRouter;

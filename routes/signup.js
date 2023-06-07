const signupRouter = require('express').Router();
const { createUser } = require('../controllers/users');
const { validSignup } = require('../middlewares/validateUsers');

signupRouter.post('/', validSignup, createUser);
module.exports = signupRouter;

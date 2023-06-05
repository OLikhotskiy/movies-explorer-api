const usersRouter = require('express').Router();
const { validUpdateUser } = require('../middlewares/validateUsers');

const { updateUserInfo, getUserInfo } = require('../controllers/users');

usersRouter.get('/me', getUserInfo);

usersRouter.patch('/me', validUpdateUser, updateUserInfo);

module.exports = usersRouter;

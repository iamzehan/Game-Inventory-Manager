const {Router} = require('express');
const logoutRouter = Router();
const controller = require('../controllers/authController');

logoutRouter.get("/", controller.logout);
module.exports = logoutRouter;
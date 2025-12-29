const {Router} = require('express');
const gamesRouter = Router();
const controller = require('../controllers/gamesController');

gamesRouter.get("/", controller.renderGames);

module.exports = gamesRouter;
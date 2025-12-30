const {Router} = require('express');
const gamesRouter = Router();
const controller = require('../controllers/gamesController');

gamesRouter.get("/", controller.renderGames);
gamesRouter.get("/{:id}/edit", controller.renderEditGames);
gamesRouter.post("/{:id}/update", controller.postUpdateGame);
gamesRouter.get("/add", controller.renderAddGames);
gamesRouter.post("/add", controller.postAddNewGame);
module.exports = gamesRouter;
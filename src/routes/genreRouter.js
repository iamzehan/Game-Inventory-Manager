const {Router} = require('express');
const gamesRouter = Router();
const controller = require('../controllers/genreController');

gamesRouter.get("/", controller.renderGenres);
// gamesRouter.get("/{:id}/edit", controller.renderEditGames);
// gamesRouter.post("/{:id}/update", controller.postUpdateGame);
// gamesRouter.post("/delete/{:id}", controller.deleteGame);
// gamesRouter.get("/add", controller.renderAddGames);
// gamesRouter.post("/add", controller.postAddNewGame);
module.exports = gamesRouter;
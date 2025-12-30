const {Router} = require('express');
const genresRouter = Router();
const controller = require('../controllers/genreController');

genresRouter.get("/", controller.renderGenres);
genresRouter.get("/{:id}/edit", controller.renderEditGenres);
genresRouter.post("/{:id}/update", controller.postUpdateGenre);
genresRouter.post("/delete/{:id}", controller.deleteGenre);
genresRouter.get("/add", controller.renderAddGenre);
genresRouter.post("/add", controller.postAddNewGenre);
module.exports = genresRouter;
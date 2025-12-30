const {Router} = require('express');
const genresRouter = Router();
const controller = require('../controllers/genreController');

genresRouter.get("/", controller.renderGenres);
genresRouter.get("/{:id}/edit", controller.renderEditGenres);
// genresRouter.post("/{:id}/update", controller.postUpdategenre);
// genresRouter.post("/delete/{:id}", controller.deletegenre);
// genresRouter.get("/add", controller.renderAddgenres);
// genresRouter.post("/add", controller.postAddNewgenre);
module.exports = genresRouter;
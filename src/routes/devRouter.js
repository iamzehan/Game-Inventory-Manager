const {Router} = require('express');
const developersRouter = Router();
const controller = require('../controllers/devController');

developersRouter.get("/", controller.renderDevelopers);
developersRouter.get("/{:id}/edit", controller.renderEditDevelopers);
// developersRouter.post("/{:id}/update", controller.postUpdateDeveloper);
// developersRouter.post("/delete/{:id}", controller.deleteDeveloper);
// developersRouter.get("/add", controller.renderAddDevelopers);
// developersRouter.post("/add", controller.postAddNewDeveloper);
module.exports = developersRouter;
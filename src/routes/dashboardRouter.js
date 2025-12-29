const {Router} = require('express');
const dashboardRouter = Router();
const controller = require('../controllers/dashboardController');

dashboardRouter.get("/", controller.renderDashboard);

module.exports = dashboardRouter;
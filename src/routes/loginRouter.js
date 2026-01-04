const {Router} = require('express');
const loginRouter = Router();
const controller = require('../controllers/authController');

loginRouter.get("/", (req, res)=> res.render("login", {error: null}));
loginRouter.post("/", controller.postLogin);
module.exports = loginRouter;
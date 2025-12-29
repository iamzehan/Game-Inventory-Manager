// environment
require('dotenv').config()

// express
const express = require('express');
const app = express();

// path 
const path = require('path');

// // Create livereload server watching views & public
if (process.env.NODE_ENV !== "production") {
  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");

  // Create livereload server watching views & public
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch([
    path.join(__dirname, "views/*.ejs"),
    path.join(__dirname, "public/css"),
    path.join(__dirname, "public/js")
  ]);

  // Inject livereload script into Express
  app.use(connectLiveReload());

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => liveReloadServer.refresh("/"), 50);
  });
}

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// static files setup
const assetsPath = path.join(__dirname, "public")
app.use(express.static(assetsPath))

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// routes
const routes = require('./routes');
app.use("/dashboard", routes.dashboardRouter);
// app.use("/", (req, res)=> res.redirect("/dashboard"));
app.use("/games", routes.gamesRouter)


// port
const PORT = process.env.PORT || '3000';

// listen
app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    }
    console.log(`Running server on: http://localhost:${PORT}`);
});
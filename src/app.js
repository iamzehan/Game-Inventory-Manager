// environment
require("dotenv").config();

// express
const express = require("express");
const app = express();

// session
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
// pg pool
const pool = require("./models/pool");
// flash to show error and success messages
const flash = require("connect-flash");
// csrf token to add security in forms
const csrf = require("csurf");

// passport
const passport = require("./auth/passport");

// path
const path = require("path");

// static files setup
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// // Create livereload server watching views & public
if (process.env.NODE_ENV !== "production") {
  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");

  // Create livereload server watching views & public
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch([
    path.join(__dirname, "views/*.ejs"),
    path.join(__dirname, "public/css"),
    path.join(__dirname, "public/js"),
  ]);

  // Inject livereload script into Express
  app.use(connectLiveReload());

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => liveReloadServer.refresh("/"), 50);
  });
}

// middlewares for request body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    name: "sid",
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);
// passport configuration
app.use(passport.initialize());
app.use(passport.session());

// flash messages configuration
app.use(flash());

// csrf configuration
app.use(csrf());

// Global Template variables
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.csrfToken = req.csrfToken();
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// routes
const routes = require("./routes");
const { ensureAuth, ensureGuest } = require("./controllers/authController");

app.use("/login", ensureGuest, routes.loginRouter);
app.use("/logout", ensureAuth, routes.logoutRouter);

app.use("/", ensureAuth, routes.dashboardRouter);
app.use("/games", ensureAuth, routes.gamesRouter);
app.use("/genres", ensureAuth, routes.genreRouter);
app.use("/developers", ensureAuth, routes.developersRouter);

// port
const PORT = process.env.PORT || "3000";

// listen
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Running server on: http://localhost:${PORT}`);
});

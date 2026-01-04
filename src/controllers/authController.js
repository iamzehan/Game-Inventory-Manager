const db = require("../models/queries");
const bcrypt = require("bcryptjs");
const passport = require('../auth/passport');

exports.signupUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const rows = await db.createUser(req.body.username, hashedPassword);
    if (rows) {
      res.redirect("/login");
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.postLogin = async (req, res, next) => {
  await passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.render("login", {
        error: info.message
      });
    }
    req.logIn(user, err => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
}

exports.logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
}

exports.ensureAuth = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

exports.ensureGuest = (req, res, next) => {
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect("/")
}
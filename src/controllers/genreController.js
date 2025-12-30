const { response } = require("express");
const db = require("../models/queries");

exports.renderGenres = async (req, res) => {
  const genres = await db.getAllGenres();
  res.render("genre", { title: "Genre", genres });
};

const { response } = require("express");
const db = require("../models/queries");

exports.renderGenres = async (req, res) => {
  const genres = await db.getAllGenres();
  res.render("genre", { title: "Genre", genres });
};

exports.renderEditGenres = async(req, res) => {
  const genreId = req.params.id;
  const genre = await db.getGenreById(genreId);
  res.render("editGenre", {title: "Edit Genre", genre});
}
const { response } = require("express");
const db = require("../models/queries");

exports.renderGenres = async (req, res) => {
  const genres = await db.getAllGenres();
  res.render("genre", { title: "Genre", genres });
};

exports.renderEditGenres = async (req, res) => {
  const genreId = req.params.id;
  const genre = await db.getGenreById(genreId);
  res.render("editGenre", { title: "Edit Genre", genre });
};

exports.renderAddGenre = async (req, res) => {
  res.render("addNewGenre", { title: "Add New Genre" });
};

exports.postUpdateGenre = async (req, res) => {
  const genreId = Number(req.params.id);
  const { name } = req.body;
  try {
    const genre = await db.updateGenre(genreId, name);
    res.redirect("/genres");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.postAddNewGenre = async (req, res) => {
  const { name } = req.body;
  try {
    await db.createGenre(name);
    res.redirect("/genres");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Delete game
exports.deleteGenre = async (req, res) => {
  const genreId = Number(req.params.id);

  if (!Number.isInteger(genreId)) {
    return res.status(400).send("Invalid genre ID");
  }

  try {
    const isDeleted = await db.deleteGenre(genreId);

    if (!isDeleted) {
      return res.status(404).send("Genre not found");
    }
    
    res.redirect("/genres");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

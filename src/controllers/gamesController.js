const db = require('../models/queries');

exports.renderGames = async (req, res) => {
    const games = await db.getAllGames();
    res.render("games", {title: "Games", games});
}

exports.renderAddGames = async (req, res) => {
    const developers = await db.getDevelopers();
    const genres = await db.getGenre();
    res.render("addNewGame",{title: "Add New Game", developers, genres});
}

exports.postAddNewGame = async (req, res) => {
  try {
    const { title, description, genre_ids = [], developer_ids = [] } = req.body;

    // 1. Create game
    const gameId = await db.createGame(title, description);

    // 2. Associate genres & developers
    await db.addGenres(gameId, genre_ids);
    await db.addDevelopers(gameId, developer_ids);

    res.redirect("/games");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
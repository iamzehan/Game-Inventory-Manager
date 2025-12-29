const db = require('../models/queries');

exports.renderGames = async (req, res) => {
    const games = await db.getAllGames();
    res.render("games", {title: "Games", games});
}
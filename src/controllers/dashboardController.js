const db = require("../models/queries");

exports.renderDashboard = async (req, res) => {
  const totalGames = await db.getTotalGameCount();
  const totalDevelopers = await db.getTotalDevelopersCount();
  const totalGenre = await db.getTotalGenreCount();
  res.render("index", {
    title: "Dashboard",
    counts: {
      Games:totalGames,
      Developers:totalDevelopers,
      Genre: totalGenre,
    },
  });
};

const pool = require("./pool");

exports.getTotalGameCount = async () => {
  const SQL = `SELECT COUNT(*) FROM game;`;
  const { rows } = await pool.query(SQL);
  return rows[0].count;
};
exports.getTotalDevelopersCount = async () => {
  const SQL = `SELECT COUNT(*) FROM developer`;
  const { rows } = await pool.query(SQL);
  return rows[0].count;
};

exports.getTotalGenreCount = async () => {
  const SQL = `SELECT COUNT(*) FROM genre`;
  const { rows } = await pool.query(SQL);
  return rows[0].count;
};

exports.getAllGames = async () => {
  const SQL = `
    SELECT 
    g.id,
    g.title,
    g.description,
    ARRAY_AGG(ge.name) AS genres
FROM game g
LEFT JOIN game_genre gg ON g.id = gg.game_id
LEFT JOIN genre ge ON gg.genre_id = ge.id
GROUP BY g.id, g.title, g.description
ORDER BY g.id;
;
    `;
  const { rows } = await pool.query(SQL);
  return rows;
};

exports.getDevelopers = async () => {
  const SQL = `
    SELECT * from developer
    `;
  const { rows } = await pool.query(SQL);
  return rows;
};

exports.getGenre = async () => {
  const SQL = `
    SELECT * from genre
    `;
  const { rows } = await pool.query(SQL);
  return rows;
};

// create a game
exports.createGame = async (title, description) => {
  const result = await pool.query(
    "INSERT INTO game (title, description) VALUES ($1, $2) RETURNING id",
    [title, description]
  );
  return result.rows[0].id;
};
// Insert genres for a game
exports.addGenres = async (gameId, genreIds = []) => {
  if (genreIds.length === 0) return;
  const values = genreIds.map((id) => `(${gameId}, ${id})`).join(",");
  await pool.query(
    `INSERT INTO game_genre (game_id, genre_id) VALUES ${values}`
  );
};
// Insert developers for a game
exports.addDevelopers = async (gameId, developerIds = []) => {
  if (developerIds.length === 0) return;
  const values = developerIds.map((id) => `(${gameId}, ${id})`).join(",");
  await pool.query(
    `INSERT INTO game_developer (game_id, developer_id) VALUES ${values}`
  );
};

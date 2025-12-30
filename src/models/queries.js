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

exports.getGameById = async (id) => {
  const SQL = `
SELECT 
    g.id,
    g.title,
    g.description,
    ARRAY_AGG(DISTINCT ge.name) AS genres,
    ARRAY_AGG(DISTINCT d.name) AS developers
FROM game g
-- Join genres
LEFT JOIN game_genre gg ON g.id = gg.game_id
LEFT JOIN genre ge ON gg.genre_id = ge.id
-- Join developers
LEFT JOIN game_developer gd ON g.id = gd.game_id
LEFT JOIN developer d ON gd.developer_id = d.id
WHERE g.id = $1
GROUP BY g.id, g.title, g.description;
    `;
  const { rows } = await pool.query(SQL, [id]);
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

// update a game
exports.updateGame = async (gameId, title, description) => {
  const result = await pool.query(
    "UPDATE game SET title = $2, description=$3 WHERE id=$1 RETURNING id",
    [gameId, title, description]
  );
  return result.rows[0].id;
};
// update genres for a game
exports.updateGenres = async (gameId, genreIds = []) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Remove existing genres
    await client.query(
      `DELETE FROM game_genre WHERE game_id = $1`,
      [gameId]
    );

    // Insert new genres
    if (genreIds.length > 0) {
      const values = genreIds
        .map((_, i) => `($1, $${i + 2})`)
        .join(",");

      await client.query(
        `INSERT INTO game_genre (game_id, genre_id)
         VALUES ${values}`,
        [gameId, ...genreIds]
      );
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

// update developers for a game
exports.updateDevelopers = async (gameId, developerIds = []) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Remove existing developers
    await client.query(
      `DELETE FROM game_developer WHERE game_id = $1`,
      [gameId]
    );

    // Insert new developers
    if (developerIds.length > 0) {
      const values = developerIds
        .map((_, i) => `($1, $${i + 2})`)
        .join(",");

      await client.query(
        `INSERT INTO game_developer (game_id, developer_id)
         VALUES ${values}`,
        [gameId, ...developerIds]
      );
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

exports.deleteGame = async (gameId) => {
  const { rowCount } = await pool.query(
    `DELETE FROM game WHERE id = $1`,
    [gameId]
  );

  return rowCount > 0;
};

// Genres Queries

exports.getAllGenres = async() => {
  const SQL = `SELECT * FROM genre ORDER BY name ASC`;
  const {rows} = await pool.query(SQL);
  return rows;
}

exports.getGenreById = async(genreId)=> {
  const SQL = `SELECT * FROM genre WHERE id=$1`;
  const {rows} = await pool.query(SQL, [genreId]);
  return rows[0];
}

exports.createGenre = async (name) => {
  await pool.query(
    "INSERT INTO genre (name) VALUES ($1) RETURNING id",
    [name]
  );
};

exports.updateGenre = async (genreId, name) => {
  const SQL = `UPDATE genre SET name=$2 WHERE id=$1 RETURNING *`;
  const rows = await pool.query(SQL, [genreId, name]);
  return rows;
}

exports.deleteGenre = async (genreId) => {
  const { rowCount } = await pool.query(
    `DELETE FROM genre WHERE id = $1`,
    [genreId]
  );

  return rowCount > 0;
};


// Developers

exports.getDeveloperById = async (developerId) => {
  const SQL = `
    SELECT * from developer WHERE id=$1
    `;
  const { rows } = await pool.query(SQL, [developerId]);
  return rows[0];
};

exports.updateDeveloper = async (developerId, name) => {
  const SQL = `UPDATE developer SET name=$2 WHERE id=$1 RETURNING *`;
  const rows = await pool.query(SQL, [developerId, name]);
  return rows;
}

exports.createDeveloper = async (name) => {
  await pool.query(
    "INSERT INTO developer (name) VALUES ($1) RETURNING id",
    [name]
  );
};
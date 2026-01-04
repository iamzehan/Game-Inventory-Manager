const { Client } = require("pg");
require('dotenv').config();
const adminConfig = {
    connectionString: process.env.DATABASE_URL,
}
const inventoryConfig = {
  ...adminConfig,
  database: "inventory",
};

async function createDatabase() {
  const client = new Client(adminConfig);
  await client.connect();

  const res = await client.query(
    "SELECT 1 FROM pg_database WHERE datname = 'inventory'"
  );

  if (res.rowCount === 0) {
    console.log("Creating database: inventory");
    await client.query("CREATE DATABASE inventory");
  } else {
    console.log("Database already exists: inventory");
  }

  await client.end();
}

async function createTablesAndSeed() {
  const client = new Client(inventoryConfig);
  await client.connect();

  console.log("Creating tables...");

  await client.query(`
    DROP TABLE IF EXISTS game_image;
    DROP TABLE IF EXISTS game_developer;
    DROP TABLE IF EXISTS game_genre;
    DROP TABLE IF EXISTS image;
    DROP TABLE IF EXISTS game;
    DROP TABLE IF EXISTS developer;
    DROP TABLE IF EXISTS genre;
  `);

  await client.query(`
    CREATE TABLE genre (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE
    );

    CREATE TABLE game (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT
    );

    CREATE TABLE developer (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT
    );

    CREATE TABLE game_genre (
      game_id INTEGER REFERENCES game(id) ON DELETE CASCADE,
      genre_id INTEGER REFERENCES genre(id) ON DELETE CASCADE,
      PRIMARY KEY (game_id, genre_id)
    );

    CREATE TABLE game_developer (
      game_id INTEGER REFERENCES game(id) ON DELETE CASCADE,
      developer_id INTEGER REFERENCES developer(id) ON DELETE CASCADE,
      PRIMARY KEY (game_id, developer_id)
    );

    CREATE TABLE image (
      id SERIAL PRIMARY KEY,
      url TEXT NOT NULL,
      alt TEXT
    );

    CREATE TABLE game_image (
      game_id INTEGER REFERENCES game(id) ON DELETE CASCADE,
      image_id INTEGER REFERENCES image(id) ON DELETE CASCADE,
      PRIMARY KEY (game_id, image_id)
    );
  `);

  console.log("Inserting dummy data...");

  // Genres
  await client.query(`
    INSERT INTO genre (name) VALUES
    ('Action'),
    ('Adventure'),
    ('RPG'),
    ('Shooter');
  `);

  // Games
  await client.query(`
    INSERT INTO game (title, description) VALUES
    ('Cyberpunk 2077', 'Open-world futuristic RPG'),
    ('Doom Eternal', 'Fast-paced shooter'),
    ('Assassin’s Creed Valhalla', 'Viking action adventure');
  `);

  // Developers
  await client.query(`
    INSERT INTO developer (name, description) VALUES
    ('CD Projekt Red', 'Polish RPG studio'),
    ('id Software', 'FPS pioneers'),
    ('Ubisoft', 'Large AAA studio');
  `);

  // Game ↔ Developer
  await client.query(`
    INSERT INTO game_developer (game_id, developer_id) VALUES
    (1, 1),
    (2, 2),
    (3, 3);
  `);

  // Images
  await client.query(`
    INSERT INTO image (url, alt) VALUES
    ('https://example.com/cyberpunk.jpg', 'Cyberpunk cover'),
    ('https://example.com/doom.jpg', 'Doom Eternal cover'),
    ('https://example.com/valhalla.jpg', 'Valhalla cover');
  `);

  // Game ↔ Image
  await client.query(`
    INSERT INTO game_image (game_id, image_id) VALUES
    (1, 1),
    (2, 2),
    (3, 3);
  `);

  console.log("Database setup complete ✅");
  await client.end();
}

(async function run() {
  try {
    await createDatabase();
    await createTablesAndSeed();
  } catch (err) {
    console.error("Error:", err);
  }
})();
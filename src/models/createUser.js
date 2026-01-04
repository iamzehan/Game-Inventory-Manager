const { Client } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const adminConfig = {
  connectionString: process.env.DATABASE_URL,
};
const inventoryConfig = {
  ...adminConfig,
  database: "inventory",
};

async function createUser() {
  const client = new Client(adminConfig);
  client.connect();
  console.log("Connected!")
  // Drop table if exists
  await client.query(`DROP TABLE IF EXISTS users`);
  // create table
  await client.query(`
    CREATE TABLE IF NOT EXISTS 
        users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL)
        `);
    console.log("Created Table!")
  // GET USERNAME AND PASSWORD FROM ENV
  const username = process.env.DB_USER;
  const password = await bcrypt.hash(process.env.DB_PASSWORD, 10);
  
  // Insert user and password into table
  await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2);
    `, [username, password]);
   
  console.log('User has been created successfully!');
  client.end();
}

createUser();
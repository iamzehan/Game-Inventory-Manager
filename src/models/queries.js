const pool = require('./pool');

exports.getTotalGameCount = async () => {
    const SQL = `SELECT COUNT(*) FROM game;`
    const {rows} = await pool.query(SQL);
    return rows[0].count;
}
exports.getTotalDevelopersCount = async ()=> {
    const SQL = `SELECT COUNT(*) FROM developer`;
    const {rows} = await pool.query(SQL);
    return rows[0].count;
}

exports.getTotalGenreCount = async ()=> {
    const SQL = `SELECT COUNT(*) FROM genre`;
    const {rows} = await pool.query(SQL);
    return rows[0].count;
}

exports.getAllGames = async () => {
    const SQL = `
    SELECT g.id, g.title, g.description, gn.name as genre_name, g.genre_id as genre_id 
    FROM game as g JOIN genre as gn 
    ON g.genre_id=gn.id`;
    const {rows} = await pool.query(SQL);
    return rows;
}
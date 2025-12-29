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
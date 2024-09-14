const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST, //for docker not the localhost but the the servicename
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log('Connection to Database failed', err);
    } else {
        console.log('Database connection successful', res.rows);
    }
});

module.exports = pool;

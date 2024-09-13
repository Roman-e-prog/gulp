const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST, //for docker not the localhost but the the servicename
    database: 'todo_gulp',
    password: process.env.DATABASE_PASSWORD,
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

const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    user: 'postgres',
    host: process.env.DB_HOST || 'postgres', //for docker not the localhost but the the servicename
    database: 'todo_gulp',
    password: process.env.DATABASE_PASSWORD,
    port: process.env.PORT
});

console.log(pool);
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log('Connection to Database failed', err);
    } else {
        console.log('Database connection successful', res.rows);
    }
});

module.exports = pool;

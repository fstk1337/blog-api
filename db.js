require('dotenv').config();

const fs = require('fs');
const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB
});

const sql = fs.readFileSync('init.sql', 'utf8');
pool.query(sql);

module.exports = pool;

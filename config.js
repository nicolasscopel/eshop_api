const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

let pool = null;

if (isProduction) {
    pool = new Pool({
        connectionString: process.env.DATABE_URL,
        ssl: {
            rejectUnauthorized: false,
        }
    })
} else {
    pool = new Pool({
        user: 'postgres',
        password: 'postgres',
        database: 'eshoppw',
        port: 5432,
        host: 'localhost',
    })
}

module.exports = { pool };
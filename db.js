const { Pool } = require('pg');

// PostgreSQL connection pool setup
const pool = new Pool({
  user: 'chandlerd4',
  host: 'localhost',
  database: 'employee_tracker',
  password: 'Silversurfer1!',
  port: 5432,
});

// Query function with error handling
const query = (text, params) =>
  pool.query(text, params).catch((err) => {
    console.error('Query error:', err.message);
    throw err;
  });

module.exports = { query };

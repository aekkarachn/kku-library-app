const { Pool } = require('pg');
const env = require('../config/env');

const pool = new Pool({
    connectionString: env.db.connectionString,
    ssl: env.db.ssl
});

// Test connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Error acquiring client:', err.stack);
    }
    console.log('✅ Connected to Supabase PostgreSQL');
    release();
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool // Export pool if needed for direct access
};

require('dotenv').config();

const env = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    dbSchema: process.env.DB_SCHEMA || 'app',
    db: {
        connectionString: process.env.DATABASE_URL,
        // Supabase requires SSL, so we enable it but allow unauthorized for development simplicity if needed
        ssl: { rejectUnauthorized: false } 
    }
};

if (!env.db.connectionString || env.db.connectionString.startsWith('paste_')) {
    console.warn('⚠️ Warning: DATABASE_URL is missing or not set in .env file');
}

module.exports = env;

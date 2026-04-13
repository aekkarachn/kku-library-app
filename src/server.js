const app = require('./app');
const env = require('./config/env');
const { poolPromise } = require('./db/pool');

const startServer = async () => {
    try {
        // Ensure DB connection is established before starting server
        await poolPromise;
        
        app.listen(env.port, () => {
            console.log(`🚀 Server is running in ${env.nodeEnv} mode on http://localhost:${env.port}`);
            console.log(`🔗 Health check: http://localhost:${env.port}/health`);
            console.log(`📚 Books API: http://localhost:${env.port}/api/books`);
            console.log(`API listening on http://localhost:${env.port}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();

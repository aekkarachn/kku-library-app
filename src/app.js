const express = require('express');
const healthRoutes = require('./routes/health.routes');
const booksRoutes = require('./routes/books.routes');
const usersRouter = require('./routes/users.routes');
const authRouter = require('./routes/auth.routes');
const meRouter = require('./routes/me.routes');

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Global Middlewares
app.use(logger); // Log all requests
app.use(express.json());

// Routes
app.use('/health', healthRoutes);
app.use('/api/books', booksRoutes);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/me', meRouter);

// 404 Handler (This is a middleware too)
app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Global Error Handler (Must be the last middleware)
app.use(errorHandler);

module.exports = app;

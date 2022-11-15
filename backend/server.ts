import eventRouter from './routes/eventRoutes';
import userRoutes from './routes/userRoutes';

const express = require('express');

function createServer() {
	const app = express();
	app.use(express.json());
	app.use('/api/events', eventRouter);
	app.use('/api/users', userRoutes);
	return app;
}

module.exports = createServer;

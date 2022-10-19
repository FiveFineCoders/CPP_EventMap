import eventRouter from './routes/eventRoutes';

const express = require('express');

function createServer() {
	const app = express();
	app.use(express.json());
	app.use('/api/events', eventRouter);
	return app;
}

module.exports = createServer;

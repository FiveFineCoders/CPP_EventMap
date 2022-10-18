import { dbConnect, dbDisconnect, dbDropCollection } from '../dbConnect';
import Event from '../models/event.model';

const createServer = require('../server');
const supertest = require('supertest');
const app = createServer();
const req = supertest(app);

describe('Get Event Control', () => {
	beforeAll(async () => {
		await dbConnect('test');
	});

	afterEach(async () => {
		await dbDropCollection();
	});

	afterAll(async () => {
		await dbDisconnect();
	});

	it('should return status code 400 if database is empty', async () => {
		// Arrange

		// Act
		const res = await req.get('/api/events/');

		// Assert
		expect(res.status).toBe(400);
		expect(res.body).toHaveLength(0);
	});

	it('should return status code 200 if database is note empty', async () => {
		// Arrange
		const data = await Event.create({
			name: 'Christmas',
			startTime: new Date('2022-12-23T12:00:00.000+00:00'),
			endTime: new Date('2022-12-23T14:00:00.000+00:00'),
			room: '345',
			building: '8',
			description: 'Bla blah',
			username: 'Red',
		});

		data.save();

		// Act
		const res = await req.get('/api/events/');

		// Assert
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
	});
});

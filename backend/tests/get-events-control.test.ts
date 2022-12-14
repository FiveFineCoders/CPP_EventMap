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
			longitude: 0,
			latitude: 0,
		});

		// Act
		const res = await req.get('/api/events/');

		// Assert
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
		expect(res.body[0].name).toBe('Christmas');
		expect(res.body[0].startTime).toBe('2022-12-23T12:00:00.000Z');
		expect(res.body[0].endTime).toBe('2022-12-23T14:00:00.000Z');
		expect(res.body[0].room).toBe('345');
		expect(res.body[0].building).toBe('8');
		expect(res.body[0].description).toBe('Bla blah');
		expect(res.body[0].username).toBe('Red');
		expect(res.body[0].longitude).toBe(0);
		expect(res.body[0].latitude).toBe(0);
	});
});

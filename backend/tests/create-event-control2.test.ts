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

	it('should return status code 406 and "Error: Name too long!" if name is too long,', async () => {
		// Arrange
		const data = {
			name: 'John Test Event, this is a very long name message. Will this be acceptable!',
			startTime: new Date('2022-12-23T11:00:00.000+00:00'),
			endTime: new Date('2022-12-23T13:00:00.000+00:00'),
			room: '306',
			building: '9',
			description: 'Testing name field being too long',
			username: 'Brandon',
		};

		// Act
		const res = await req.post('/api/events/').send(data);

		// Assert
		expect(res.status).toBe(406);
		expect(res.body.message).toBe('Error: Name too long!');
	});
});

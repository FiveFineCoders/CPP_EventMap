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

	it('should return status code 406 if a required field is empty', async () => {
		// Arrange
		const data = await Event.create({
			name: '',
			startTime: new Date('2022-12-23T12:00:00.000+00:00'),
			endTime: new Date('2022-12-23T14:00:00.000+00:00'),
			room: '013',
			building: '6',
			description: 'Tiet time',
			username: 'Brandon Tiet',
		});

		//Act
		const res = await req.post('/api/events/').send(data);

		//Assert
		expect(res.status).toBe(406);
		expect(res.body.id).toBeTruthy;
		expect(res.body.message).toBe('Error: required data field is empty.');
	});
});

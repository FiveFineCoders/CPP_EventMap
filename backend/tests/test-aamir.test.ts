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

	it('should return status code 406 if required field is null', async() => {
		//Arrange
		const data = {
			name: 'AamirEvent',
			startTime: new Date('2022-12-22T12:00:00.000+00:00'),
			room: '213', 
			description: 'The Aamir Event.',
			username: 'Aamir',
		}

		//Act
		const res = await req.post('/api/events/').send(data);

		//Assert
		expect(res.status).toBe(406);
		expect(res.body.message).toBe('Error: Null fields!');
	});

});

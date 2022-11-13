import { dbConnect, dbDisconnect, dbDropCollection } from '../dbConnect';
import User from '../models/user.model';

const createServer = require('../server');
const supertest = require('supertest');
const app = createServer();
const req = supertest(app);

describe('Get User Control', () => {
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
		const res = await req.get('/api/users/');

		// Assert
		expect(res.status).toBe(400);
		expect(res.body).toHaveLength(0);
	});

	it('should return status code 200 if database is empty', async () => {
		// Arrange
		const data = User.create({
			username: 'vunguyen',
			password: '12345678',
		});

		// Act
		const res = await req.get('/api/users/');

		// Assert
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
		expect(res.body[0].username).toBe('vunguyen');
	});
});

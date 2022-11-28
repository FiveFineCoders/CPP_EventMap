import { dbConnect, dbDisconnect, dbDropCollection } from '../dbConnect';
import User from '../models/user.model';

const createServer = require('../server');
const supertest = require('supertest');
const app = createServer();
const req = supertest(app);

describe('Login User Control', () => {
	beforeAll(async () => {
		await dbConnect('test');
	});

	afterEach(async () => {
		await dbDropCollection();
	});

	afterAll(async () => {
		await dbDisconnect();
	});

	it('should return status code 406 if username does not exist', async () => {
		// Arrange
		const data = {
			username: 'vunguyen',
			password: '12345678',
		};

		// Act
		const res = await req.post('/api/users/login').send(data);

		// Assert
		expect(res.status).toBe(406);
		expect(res.body.message).toBe('Error: Username does not exist!');
	});

	it('should return status code 406 if password is incorrect', async () => {
		// Arrange
		const user = await User.create({
			username: 'vunguyen',
			password: '12345678',
		});

		const data = {
			username: 'vunguyen',
			password: '12345679',
		};

		// Act
		const res = await req.post('/api/users/login').send(data);

		// Assert
		expect(res.status).toBe(406);
		expect(res.body.message).toBe('Error: Wrong password!');
	});

	it('should return status code 406 if password is incorrect', async () => {
		// Arrange
		const user = {
			username: 'vunguyen',
			password: '12345678',
		};
		await req.post('/api/users/').send(user);

		const data = {
			username: 'vunguyen',
			password: '12345678',
		};

		// Act
		const res = await req.post('/api/users/login').send(data);

		// Assert
		expect(res.status).toBe(201);
		expect(res.body.username).toBe('vunguyen');
	});
});

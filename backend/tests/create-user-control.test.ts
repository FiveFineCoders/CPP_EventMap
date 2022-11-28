import { dbConnect, dbDisconnect, dbDropCollection } from '../dbConnect';
import User from '../models/user.model';

const createServer = require('../server');
const supertest = require('supertest');
const app = createServer();
const req = supertest(app);

describe('Create User Control', () => {
	beforeAll(async () => {
		await dbConnect('test');
	});

	afterEach(async () => {
		await dbDropCollection();
	});

	afterAll(async () => {
		await dbDisconnect();
	});

	it('should return status code 406 if username or password is null', async () => {
		// Arrange
		const dataNoUsername = {
			username: null,
			password: '12345678',
		};

		const dataNoPassword = {
			username: 'vunguyen',
			password: null,
		};

		// Act
		const resNoUsername = await req.post('/api/users/').send(dataNoUsername);
		const resNoPassword = await req.post('/api/users/').send(dataNoPassword);

		// Assert
		expect(resNoUsername.status).toBe(406);
		expect(resNoUsername.body.message).toBe('Error: Null fields!');
		expect(resNoPassword.status).toBe(406);
		expect(resNoPassword.body.message).toBe('Error: Null fields!');
	});

	it('should return status code 406 if username or password is empty', async () => {
		// Arrange
		const dataNoUsername = {
			username: '',
			password: '12345678',
		};

		const dataNoPassword = {
			username: 'vunguyen',
			password: '',
		};

		// Act
		const resNoUsername = await req.post('/api/users/').send(dataNoUsername);
		const resNoPassword = await req.post('/api/users/').send(dataNoPassword);

		// Assert
		expect(resNoUsername.status).toBe(406);
		expect(resNoUsername.body.message).toBe('Error: Empty fields!');
		expect(resNoPassword.status).toBe(406);
		expect(resNoPassword.body.message).toBe('Error: Empty fields!');
	});

	it('should return status code 406 if username has less than 6 characters or more than 30 characters', async () => {
		// Arrange
		const dataShortUsername = {
			username: 'v',
			password: '12345678',
		};

		const dataLongPassword = {
			username: 'vunguyennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
			password: '12345678',
		};

		// Act
		const resShortUsername = await req.post('/api/users/').send(dataShortUsername);
		const resLongPassword = await req.post('/api/users/').send(dataLongPassword);

		// Assert
		expect(resShortUsername.status).toBe(406);
		expect(resShortUsername.body.message).toBe(
			'Error: Username should have between 6 and 30 characters!',
		);
		expect(resLongPassword.status).toBe(406);
		expect(resLongPassword.body.message).toBe(
			'Error: Username should have between 6 and 30 characters!',
		);
	});

	it('should return status code 406 if password has less than 8 characters', async () => {
		// Arrange
		const data = {
			username: 'vunguyen',
			password: '123456',
		};

		// Act
		const res = await req.post('/api/users/').send(data);

		// Assert
		expect(res.status).toBe(406);
		expect(res.body.message).toBe('Error: Password should be at least 8-character long!');
	});

	it('should return status code 406 if username already exists', async () => {
		// Arrange
		const user = await User.create({
			username: 'vunguyen',
			password: '12345678',
		});

		const data = {
			username: 'vunguyen',
			password: '11111111',
		};

		// Act
		const res = await req.post('/api/users/').send(data);

		// Assert
		expect(res.status).toBe(406);
		expect(res.body.message).toBe('Error: Username already exists!');
	});

	it('should return status code 201 if user is successfully created', async () => {
		// Arrange
		const data = {
			username: 'vunguyen',
			password: '11111111',
		};

		// Act
		const res = await req.post('/api/users/').send(data);

		// Assert
		expect(res.status).toBe(201);
		expect(res.body.username).toBe('vunguyen');
	});
});

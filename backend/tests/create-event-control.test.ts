import { dbConnect, dbDisconnect, dbDropCollection } from '../dbConnect';
import Event from '../models/event.model';

const createServer = require('../server');
const supertest = require('supertest');
const app = createServer();
const req = supertest(app);

describe('Create Event Control', () => {
	beforeAll(async () => {
		await dbConnect('test');
	});

	afterEach(async () => {
		await dbDropCollection();
	});

	afterAll(async () => {
		await dbDisconnect();
	});

    it('should return status code 200 and create the event', async () => {
        //Arrange
        const data = {
            name: 'MoyaEvent',
            startTime: new Date('2022-12-23T12:00:00.000+00:00'),
            endTime: new Date('2022-12-23T14:00:00.000+00:00'),
            room: '013',
            building: '6',
            description: 'The Moya event!',
            username: 'Brandon',
        }
        
        //Act
        const res = await req
                    .post('/api/events/')
                    .send(data);

        //Assert
        expect(res.status).toBe(201);
        expect(res.body.id).toBeTruthy;
        expect(res.body.username).toBe(data.username);
    });   
});
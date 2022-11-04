import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import lodash from 'lodash';
import * as ramda from 'ramda';
import Event from './models/event.model';
import User from './models/user.model';
import CPPEvent from './schema/CPPEvent';
import { dbConnect } from './dbConnect';
import eventRouter from './routes/eventRoutes';
import userRoutes from './routes/userRoutes';
//import underscore from 'underscore';
import IUser from './schema/IUser';

dotenv.config();

dbConnect();
const app: Express = express();
const port = 8080;

/*
const mongoose: Mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGO_DB_CLUSTER}`, (err) => {
	if (err) {
		console.log(err);
	}
	console.log('Connected to database');
});
*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//

app.use('/api/events', eventRouter);
app.use('/api/users', userRoutes);

// assignments

app.get('/event', (req: Request, res: Response) => {
	const input = {
		name: req.query.name,
		startTime: req.query.start,
		endTime: req.query.end,
		room: req.query.room,
		building: req.query.building,
		description: req.query.description,
	};
	const event: CPPEvent = new Event(input);
	console.log('event', event);
	event.save();
	console.log('Successfully saved data');
	res.send('Demo adding new data to database');
});

app.get('/user', (req: Request, res: Response) => {
	const input = {
		username: req.query.username,
		password: req.query.password,
	};
	const user: IUser = new User(input);
	console.log('user', user);
	user.save();
	console.log('Successfully saved data');
	res.send('Demo adding new user to database');
});

app.get('/api/assignment3/johnsalinas', (req: Request, res: Response) => {
	res.send('HTTP API for John Salinas -> working');
});

app.get('/api/assignment3/vunguyen', (req: Request, res: Response) => {
	res.send('Hello Worlddddddddddddddddddd');
});

app.get('/api/assignment3/brandonmoya', (req: Request, res: Response) => {
	res.send('HTTP API for Brandon Moya -> Trabajando! Whats up guys.');
});

app.get('/api/assignment3/brandontiet', (req: Request, res: Response) => {
	res.send('HTTP API for Brandon Tiet -> Hello there :)');
});

app.get('/api/assignment3/aamirsajjad', (req: Request, res: Response) => {
	res.send('HTTP API for Aamir Sajjad -> Got it to work');
});

const testNums = lodash.range(1, 10);
app.get('/api/assignment4/johnsalinas', (req: Request, res: Response) => {
	res.send(`${testNums}`);
});

const triple = (x: number) => x * 3;
const ramdaTest = ramda.map(triple, [2, 4, 6]);
app.get('/api/assignment4/brandonmoya', (req: Request, res: Response) => {
	res.send(
		'Moya used the Ramda NPM Package, we have a constant triple where (x:number) => x * 3, our data set is [2, 4, 6], so using ramda.map(triple, [2, 4, 6]) we get... ' +
			`${ramdaTest}`,
	);
});

/*
const list = [
	[9, 5, 7],
	[8, 4, 9],
];
app.get('/api/assignment4/aamirsajjad', (req: Request, res: Response) => {
	res.send(underscore.invoke(list, 'sort'));
});
*/

app.get('/', (req: Request, res: Response) => {
	res.send('Server is running!');
});

app.listen(port, () => {
	console.log(`Server is running at port ${port}`);
});

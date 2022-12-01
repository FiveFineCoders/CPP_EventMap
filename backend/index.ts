import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import lodash from 'lodash';
import * as ramda from 'ramda';
import Event from './models/event.model';
import CPPEvent from './schema/CPPEvent';
import { dbConnect } from './dbConnect';
import eventRouter from './routes/eventRoutes';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
//import underscore from 'underscore';

dotenv.config();

const app: Express = express();
const port = 8080;

dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/events', eventRouter);
app.use('/api/user', userRoutes);

// assignments

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

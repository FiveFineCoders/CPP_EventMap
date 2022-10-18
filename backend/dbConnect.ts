import mongoose from 'mongoose';

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const { MongoMemoryServer } = require('mongodb-memory-server');
let mongod: typeof MongoMemoryServer = null;
let dbUrl;

export const dbConnect = async (options?: string) => {
	try {
		if (!options) {
			const mongoConnect = await mongoose.connect(`${process.env.MONGO_DB_CLUSTER}`);
			console.log('Connected to mongo database!');
		} else {
			mongod = await MongoMemoryServer.create();
			dbUrl = mongod.getUri();
			const connection = await mongoose.connect(dbUrl);
			console.log('Connected to test mongo database!');
		}
	} catch (error) {
		console.log(error);
	}
};

export const dbDisconnect = async () => {
	try {
		const mongoConnect = await mongoose.connection.close();
		if (mongod) {
			await mongod.stop();
			console.log('Disconnected from test mongo database!');
		} else {
			console.log('Disconnected from mongo database!');
		}
	} catch (error) {
		console.log(error);
	}
};

export const dbDropCollection = async () => {
	try {
		if (mongod) {
			const collections = await mongoose.connection.db.collections();
			for (let collection of collections) {
				await collection.drop();
			}
		}
	} catch (error) {
		console.log(error);
	}
};

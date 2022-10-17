import mongoose from 'mongoose';

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

export const dbConnect = async () => {
	try {
		const mongoConnect = await mongoose.connect(`${process.env.MONGO_DB_CLUSTER}`);

		console.log('Connected to mongo database!');
	} catch (error) {
		console.log(error);
	}
};

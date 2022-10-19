import { Document } from 'mongoose';

interface CPPEvent extends Document {
	name: string;
	startTime: Date;
	endTime: Date;
	room: string;
	building: string;
	description: string;
	date: Date;
	username: string;
}

export default CPPEvent;

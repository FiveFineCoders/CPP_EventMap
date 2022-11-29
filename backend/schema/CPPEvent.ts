import { Document } from 'mongoose';

interface CPPEvent extends Document {
	eventName: string;
	eventStartTime: Date;
	eventEndTime: Date;
	eventRoom: string;
	eventBuilding: string;
	eventDescript: string;
	date: Date;
	username: string;
	longitude: Number;
	latitude: Number;
}

export default CPPEvent;

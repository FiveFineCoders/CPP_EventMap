import mongoose, { Schema } from 'mongoose';
import CPPEvent from '../schema/CPPEvent';

const EventSchema: Schema = new Schema({
	eventName: { type: String, required: true },
	eventStartTime: { type: Date, required: true },
	eventEndTime: { type: Date, required: true },
	eventRoom: { type: String, required: true },
	eventBuilding: { type: String, required: true },
	eventDescript: { type: String, required: true },
	date: { type: Date, default: Date.now },
	username: { type: String, required: true },
	longitude: { type: Number, required: true },
	latitude: { type: Number, required: true },
});

export default mongoose.model<CPPEvent>('Event', EventSchema);

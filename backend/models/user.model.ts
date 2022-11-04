import mongoose, { Schema } from 'mongoose';
import IUser from '../schema/IUser';

const UserSchema: Schema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);

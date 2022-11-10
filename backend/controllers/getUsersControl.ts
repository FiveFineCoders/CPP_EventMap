import { Request, Response } from 'express';
import User from '../models/user.model';

export const getUsers = async (req: Request, res: Response) => {
	const allUsers = await User.find();

	if (!allUsers.length) {
		res.status(400).json();
	} else {
		console.log('Got users!');
		res.status(200).json(allUsers);
	}
};

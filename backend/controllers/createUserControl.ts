import { Request, Response } from 'express';
import User from '../models/user.model';

const bcrypt = require('bcrypt');

export const createUser = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	console.log(username);

	// check for any missing fields
	if (username == null || password == null) {
		res.status(406).json({ message: 'Error: Null fields!' });
	}

	// check for length of fields
	else if (username.length == 0 || password.length == 0) {
		res.status(406).json({ message: 'Error: Empty fields!' });
	}

	// check for length of name
	else if (username.length < 6 || username.length > 30) {
		res.status(406).json({ message: 'Error: Username should have between 6 and 30 characters!' });
	}

	// check for password
	else if (password.length < 8) {
		res.status(406).json({ message: 'Error: Password should be at least 8-character long!' });
	} else {
		// check if username is already in use
		const user = await User.findOne({ username: username });
		if (user) {
			res.status(406).json({ message: 'Error: Username already exists!' });
		} else {
			const salt = await bcrypt.genSalt(10);

			const hashedPassword = await bcrypt.hash(password, salt);
			// attempt to create new user
			const newUser = await User.create({
				username,
				password: hashedPassword,
			});

			// failed to create user
			if (!newUser) {
				res.status(400).json({ message: 'Failed to create user!' });
			}

			console.log('User created!');
			// user created, returning user id and username
			res.status(201).json({
				id: newUser.id,
				username: newUser.username,
			});
		}
	}
};

import express, { Request, Response } from 'express';
import Event from '../models/event.model';

export const createEvent = async (req: Request, res: Response) => {
	const { name, startTime, endTime, room, building, description, username } = req.body;

	console.log(name);

	// check for any missing fields
	if (
		name == null ||
		startTime == null ||
		endTime == null ||
		room == null ||
		building == null ||
		description == null ||
		username == null
	) {
		res.status(406).json({ message: 'Error: Null fields!' });
	}

	// check for length of fields
	if (
		name.length == 0 ||
		startTime.length == 0 ||
		endTime.length == 0 ||
		room.length == 0 ||
		building.length == 0 ||
		description.length == 0 ||
		username.length == 0
	) {
		res.status(406).json({ message: 'Error: Empty fields!' });
	}

	// check for length of name
	if (name.length > 30) {
		res.status(406).json({ message: 'Error: Name too long!' });
	}

	// plan: check if duplicate event?

	// attempt to create new event
	const newEvent = await Event.create({
		name: name,
		startTime: startTime,
		endTime: endTime,
		room: room,
		building: building,
		description: description,
		username: username,
	});

	// failed to create event
	if (!newEvent) {
		res.status(400).json({ message: 'Failed to create event!' });
	}

	console.log('Event created!');
	// event created, returning event id and username of user that created the event
	res.status(201).json({
		id: newEvent.id,
		username: newEvent.username,
	});
};

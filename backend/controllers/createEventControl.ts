import express, { Request, Response } from 'express';
import Event from '../models/event.model';

export const createEvent = async (req: Request, res: Response) => {
	const { name, startTime, endTime, room, building, description, username } = req.body;

	console.log(name);

	// check for any empty fields
	if (!name || !startTime || !endTime || !room || !building || !description || !username) {
		res.status(400).json();
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

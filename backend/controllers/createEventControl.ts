import { Request, Response } from 'express';
import Event from '../models/event.model';

export const createEvent = async (req: Request, res: Response) => {
	console.log(req.body);
	const {
		eventName,
		eventCategoryColor,
		eventStartTime,
		eventEndTime,
		eventRoom,
		eventBuilding,
		eventDescript,
		username,
		longitude,
		latitude,
	} = req.body;

	console.log('Creating event!');

	// check for any missing fields
	if (
		eventName == null ||
		eventCategoryColor == null ||
		eventStartTime == null ||
		eventEndTime == null ||
		eventRoom == null ||
		eventBuilding == null ||
		eventDescript == null ||
		username == null ||
		longitude == null ||
		latitude == null
	) {
		res.status(406).json({ message: 'Error: Null fields!' });
	}

	// check for length of fields
	if (
		eventName.length == 0 ||
		eventCategoryColor.length == 0 ||
		eventStartTime.length == 0 ||
		eventEndTime.length == 0 ||
		eventRoom.length == 0 ||
		eventBuilding.length == 0 ||
		eventDescript.length == 0 ||
		username.length == 0 ||
		longitude.length == 0 ||
		latitude.length == 0
	) {
		res.status(406).json({ message: 'Error: Empty fields!' });
	}

	// check for length of name
	if (eventName.length > 30) {
		res.status(406).json({ message: 'Error: Name too long!' });
	}

	// plan: check if duplicate event?

	// attempt to create new event
	const newEvent = await Event.create({
		name: eventName,
		category: eventCategoryColor,
		startTime: eventStartTime,
		endTime: eventEndTime,
		room: eventRoom,
		building: eventBuilding,
		description: eventDescript,
		username: username,
		longitude: longitude,
		latitude: latitude,
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

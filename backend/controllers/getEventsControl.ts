import express, { Request, Response } from 'express';
import Event from '../models/event.model';

export const getEvents = async (req: Request, res: Response) => {
	const allEvents = await Event.find();

	if (!allEvents.length) {
		res.status(400).json();
	} else {
		console.log('Got events!', allEvents);
		res.status(200).json(allEvents);
	}
};

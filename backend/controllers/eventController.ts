import express, { Request, Response } from 'express';
import Event from '../models/event.model';

export const getEvents = async (req: Request, res: Response) => {
	const allEvents = await Event.find();

	if (!allEvents) {
		res.status(400).json();
	}

	res.status(200).json(allEvents);
};

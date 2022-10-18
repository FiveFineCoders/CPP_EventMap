import express from 'express';
import { createEvent } from '../controllers/createEventControl';
import { getEvents } from '../controllers/getEventsControl';

const router = express.Router();

// get: get all events
// post: create an event
router.get('/', getEvents).post('/', createEvent);

export default router;

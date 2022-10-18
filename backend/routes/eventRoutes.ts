import express from 'express';
import { getEvents, createEvent } from '../controllers/eventController';

const router = express.Router();

// get: get all events
// post: create an event
router.get('/', getEvents).post('/', createEvent);

export default router;

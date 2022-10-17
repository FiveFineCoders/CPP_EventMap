import express from 'express';
import { getEvents } from '../controllers/eventController';

const router = express.Router();

router.get('/', getEvents);

export default router;

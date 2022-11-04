import express from 'express';
import { createUser } from '../controllers/createUserControl';
import { getUsers } from '../controllers/getUsersControl';

const router = express.Router();

// get: get all users
// post: create a user
router.get('/', getUsers).post('/', createUser);

export default router;

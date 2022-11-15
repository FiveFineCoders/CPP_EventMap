import express from 'express';
import { createUser } from '../controllers/createUserControl';
import { getUsers } from '../controllers/getUsersControl';
import { loginUser } from '../controllers/loginUserControl';

const router = express.Router();

// get: get all users
// post: create a user
router.get('/', getUsers).post('/', createUser);
router.post('/login', loginUser);

export default router;

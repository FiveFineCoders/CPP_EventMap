import React, { useRef, useEffect, useState } from 'react';
import { Form, FormControl, FormGroup, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

type UserResponseGood = {
	username: string;
	password: string;
	id: number;
};

export const Login = (): JSX.Element => {
	// user credentials
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [Confirm, setConfirm] = useState('');

	// alert message
	const [alert, setAlert] = useState('');

	// utils
	const navigate = useNavigate();
	const [loginMode, setLoginMode] = useState(true);

	// login user
	const loginUser = async () => {
		try {
			const { data } = await axios.post<UserResponseGood>('api/user/login', {
				username: username,
				password: password,
			});

			navigate('/home', {
				replace: false,
				state: {
					id: data.id,
					username: username,
				},
			});
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.log('Axios Error: ', error.message);
				return error.message;
			} else {
				console.log('General Error: ', error);
				return 'Unexpected general error!';
			}
		}
	};

	// sign up user
	const signUpUser = async () => {
		try {
			const { data } = await axios.post('api/user', {
				username: username,
				password: password,
			});

			navigate('/home', {
				replace: false,
				state: {
					id: data.id,
					username: username,
				},
			});
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.log('Axios Error: ', error.message);
				return error.message;
			} else {
				console.log('General Error: ', error);
				return 'Unexpected general error!';
			}
		}
	};

	const toggleMode = (): void => {
		setLoginMode(loginMode ? false : true);
	};

	return (
		<div className='login-background d-flex justify-content-center align-items-center'>
			<Form className='rounded py-3 px-4'>
				<div className='mb-4 mt-2 login-title'>
					<p>{loginMode ? 'Login' : 'Sign up'}</p>
				</div>

				<Form.Group className='mb-4' controlId='usernameInput'>
					<Form.Control placeholder='Username' />
				</Form.Group>
				<FormGroup className='mb-4' controlId='passwordInput'>
					<FormControl type='password' placeholder='Password' />
				</FormGroup>
				{!loginMode && (
					<Form.Group className='mb-3' controlId='confirmInput'>
						<FormControl type='password' placeholder='Confirm Password' />
					</Form.Group>
				)}

				<div className='mb-4 d-grid gap-2'>
					<Button variant='secondary' size='sm'>
						{loginMode ? 'Login' : 'Sign Up'}
					</Button>
				</div>

				<div className=' d-flex justify-content-center' onClick={toggleMode}>
					<p className='login-mode-switch'>
						{loginMode ? 'Create an account?' : 'Already have an account?'}
					</p>
				</div>
			</Form>
		</div>
	);
};

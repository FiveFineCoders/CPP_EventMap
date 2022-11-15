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
	const [confirm, setConfirm] = useState('');

	// alert message
	const [alert, setAlert] = useState('');

	// utils
	const navigate = useNavigate();
	const [loginMode, setLoginMode] = useState(true);

	// toggle between login/signup
	const toggleMode = (): void => {
		setLoginMode(loginMode ? false : true);
	};

	// handle change in user input
	const handleUserInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const eventID = event.target.id;

		switch (eventID) {
			case 'usernameInput':
				setUserName(event.target.value);
				break;
			case 'passwordInput':
				setPassword(event.target.value);
				break;
			case 'confirmInput':
				setConfirm(event.target.value);
				break;
			default:
				console.log('Unexpected error in input updating!');
		}
	};

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

	// handle login or signup
	const handleLogin = () => {
		// check for empty fields
		if (username.length == 0 || password.length == 0 || (confirm.length == 0 && !loginMode)) {
			setAlert('All fields required.');
			return;
		} else if (password != confirm && !loginMode) {
			setAlert("Passwords don't match");
			return;
		}

		if (loginMode) {
			loginUser();
		} else {
			signUpUser();
		}
	};

	return (
		<div className='login-background d-flex justify-content-center align-items-center'>
			<Form className='rounded py-3 px-4'>
				<div className='mb-4 mt-2 login-title'>
					<p>{loginMode ? 'Login' : 'Sign up'}</p>
				</div>

				<div className='login-alert'>
					<p>{alert}</p>
				</div>

				<Form.Group className='mb-4' controlId='usernameInput'>
					<Form.Control placeholder='Username' onChange={handleUserInputChange} />
				</Form.Group>
				<FormGroup className='mb-4' controlId='passwordInput'>
					<FormControl type='password' placeholder='Password' onChange={handleUserInputChange} />
				</FormGroup>
				{!loginMode && (
					<Form.Group className='mb-3' controlId='confirmInput'>
						<FormControl
							type='password'
							placeholder='Confirm Password'
							onChange={handleUserInputChange}
						/>
					</Form.Group>
				)}

				<div className='mb-4 d-grid gap-2'>
					<Button variant='secondary' size='sm'>
						{loginMode ? 'Login' : 'Sign Up'}
					</Button>
				</div>

				<div className=' d-flex justify-content-center' onClick={toggleMode}>
					<p className='login-mode-switch' onClick={handleLogin}>
						{loginMode ? 'Create an account?' : 'Already have an account?'}
					</p>
				</div>
			</Form>
		</div>
	);
};

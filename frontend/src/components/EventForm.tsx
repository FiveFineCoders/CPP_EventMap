import React, { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/sidebar.css';
import { createEvent } from '../../../backend/controllers/createEventControl';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

type eventAcceptedResponse = {
	eventName: string;
	eventStartTime: Date;
	eventEndTime: Date;
	eventRoom: String;
	eventBuilding: String;
	eventDescript: String;
	username: String;
	longitude: number;
	latitude: number;
	id: number;
};

const username = 'John';

const EventForm = ({ longitude, latitude, setEventMarkerList, setEventCreate, setActivateEventForm }) => {
	const [eventName, setEventName] = useState('');
	const [eventStartTime, setEventStartTime] = useState(new Date());
	const [eventEndTime, setEventEndTime] = useState(new Date());
	const [eventRoom, setEventRoom] = useState('');
	const [eventBuilding, setEventBuilding] = useState('');
	const [eventDescription, setEventDescription] = useState('');

	const saveInput = (event) => {
		// save input in field
		const eventField = event.target.id;

		switch (eventField) {
			case 'eventName': // uses control ID
				setEventName(event.target.value);
				break;
			case 'eventStartTime':
				setEventStartTime(event.target.value);
				break;
			case 'eventEndTime':
				setEventEndTime(event.target.value);
				break;
			case 'eventRoom':
				setEventRoom(event.target.value);
				break;
			case 'eventBuilding':
				setEventBuilding(event.target.value);
				break;
			case 'eventDescription':
				setEventDescription(event.target.value);
				break;
			default:
				console.log('Error: no specified field found');
		} // end switch
	}; // end saveInput const

	// handle event form submit
	const submitEventCreate = (event) => {
		event.preventDefault();

		console.log('Event name: ' + eventName);
		console.log('Event start time: ' + eventStartTime);
		console.log('Event end time: ' + eventEndTime);
		console.log('Event room: ' + eventRoom);
		console.log('Event building: ' + eventBuilding);
		console.log('Event description: ' + eventDescription);

		postRequest(); // send post request containing event data

		setEventMarkerList(prevMarker => [...prevMarker, { 
			eventName: eventName,
			eventStartTime: eventStartTime,
			eventEndTime: eventEndTime,
			eventRoom: eventRoom,
			eventBuilding: eventBuilding,
			eventDescript: eventDescription,
			username: username,
			longitude: longitude,
			latitude: latitude }
		]);	// add marker to map such that user doesn't need to refresh to see it

		console.log('Submitted');

		// set to false to close popup form on submit
		setEventCreate(false);
		setActivateEventForm(false);
	}; // end createEventSubmit

	const postRequest = async () => {
		try {
			const { data } = await axios.post<eventAcceptedResponse>('api/events', {
				eventName: eventName,
				eventStartTime: eventStartTime,
				eventEndTime: eventEndTime,
				eventRoom: eventRoom,
				eventBuilding: eventBuilding,
				eventDescript: eventDescription,
				username: username,
				longitude: longitude,
				latitude: latitude,
			}); // end axios post
		} catch (error) {
			// end try
			if (axios.isAxiosError(error)) {
				console.log('Axios error: ', error.message);
				return error.message;
			} else {
				console.log(error);
				return 'Unexpected general error';
			}
		} // end catch
	}; // end post request const

	return (
		<Form>
			<Form.Group className='mb-3' controlId='eventName' onChange={saveInput}>
				<Form.Label> Event Name </Form.Label>
				<Form.Control placeholder='Ex: Halloween Party' />
			</Form.Group>

			<Form.Group className='mb-3' controlId='eventStartTime' onChange={saveInput}>
				<Form.Label> Start Time </Form.Label>
				<Form.Control type='datetime-local' />
			</Form.Group>

			<Form.Group className='mb-3' controlId='eventEndTime' onChange={saveInput}>
				<Form.Label> End Time </Form.Label>
				<Form.Control type='datetime-local' />
			</Form.Group>

			<Form.Group className='mb-3' controlId='eventRoom' onChange={saveInput}>
				<Form.Label> Room </Form.Label>
				<Form.Control placeholder='Ex: 345' />
			</Form.Group>

			<Form.Group className='mb-3' controlId='eventBuilding' onChange={saveInput}>
				<Form.Label> Building </Form.Label>
				<Form.Control placeholder='Ex: 8' />
			</Form.Group>

			<Form.Group className='mb-3' controlId='eventDescription' onChange={saveInput}>
				<Form.Label> Description </Form.Label>
				<Form.Control as='textarea' rows={3} placeholder='Ex: Dress up and have fun' />
			</Form.Group>
			<div className='d-grid'>
				<Button className='popup-button' type='submit' size='lg' onClick={submitEventCreate}>
					Create Event
				</Button>
			</div>
		</Form>
	);
};

export default EventForm;

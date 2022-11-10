import React, { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/sidebar.css';
import { createEvent } from '../../../backend/controllers/createEventControl';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080"

type eventAcceptedResponse = {
	eventName: string;
	eventStartTime: Date;
	eventEndTime: Date;
	eventRoom: String;
	eventBuilding: String;
	eventDescription: String;
	username: String;
	longitude: number;
	latitude: number;
	id: number;
}

const EventForm = ( { longitude, latitude }) => {
	const [eventName, setEventName] = useState("")
	const [eventStartTime, setEventStartTime] = useState(new Date())
	const [eventEndTime, setEventEndTime] = useState(new Date())
	const [eventRoom, setEventRoom] = useState("")
	const [eventBuilding, setEventBuilding] = useState("")
	const [eventDescription, setEventDescription] = useState("")

	const saveInput = (event) => {	// save input in field
		const eventField = event.target.id
		
		switch(eventField) {
			case "eventName":	// uses control ID
				setEventName(event.target.value)
				break;
			case "eventStartTime":	
				setEventStartTime(event.target.value)
				break;
			case "eventEndTime":	
				setEventEndTime(event.target.value)
				break;
			case "eventRoom":	
				setEventRoom(event.target.value)
				break;
			case "eventBuilding":	
				setEventBuilding(event.target.value)
				break;
			case "eventDescription":	
				setEventDescription(event.target.value)
				break;
			default:
				console.log("Error: no specified field found")
		}	// end switch

	};	// end saveInput const
		
	const createEventSubmit = (event) => {
		event.preventDefault();

		console.log("Event name: " + eventName);
		console.log("Event start time: " + eventStartTime);
		console.log("Event end time: " + eventEndTime);
		console.log("Event room: " + eventRoom);
		console.log("Event building: " + eventBuilding);
		console.log("Event description: " + eventDescription);

		if (!eventName || !eventStartTime || !eventEndTime || !eventRoom || !eventBuilding || !longitude || !latitude || longitude == 0 || latitude == 0) {
			console.log("required field missing")
			return
		}

		const username = "John";

		const postRequest = async () => {
			try {
				const { data } = await axios.post<eventAcceptedResponse>(
					'/api/events',
					{
						eventName,
						eventStartTime,
						eventEndTime,
						eventRoom,
						eventBuilding,
						eventDescription,
						username,
						longitude,
						latitude
					}
				);	// end axios post

				console.log(data);

			}	// end try
			catch (error) {
				if (axios.isAxiosError(error)) {
					console.log("Axios error: ", error.message);
					return error.message;
				}
				else {
					console.log(error)
				}
				
			}	// end catch
		}	// end post request const

		postRequest();	// send post request containing event data
		console.log('Submitted');

	};	// end createEventSubmit

	return (
		<Form onSubmit={createEventSubmit}>
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
				<Button className='popup-button' type='submit' size='lg'>
					Create Event
				</Button>
			</div>
		</Form>
	);
};

export default EventForm;

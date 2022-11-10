import React, { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/sidebar.css';

const EventForm = () => {
	const [eventName, setEventName] = useState("")
	const [eventStartTime, setEventStartTime] = useState(new Date())
	const [eventEndTime, setEventEndTime] = useState(new Date())
	const [eventRoom, setEventRoom] = useState("")
	const [eventBuilding, setEventBuilding] = useState("")
	const [eventDescription, setEventDescription] = useState("")

	function changeInput() {
		
	}

	function createEvent() {
		if (!eventName || !eventStartTime || !eventEndTime || !eventRoom || !eventBuilding) {

		}
	}

	return (
		<Form>
			<Form.Group className='mb-3' controlId='eventName' onChange={changeInput}>
				<Form.Label> Event Name </Form.Label>
				<Form.Control placeholder='Ex: Halloween Party' />
			</Form.Group>

			<Form.Group className='mb-3' controlId='eventStartTime' onChange={changeInput}>
				<Form.Label> Start Time </Form.Label>
				<Form.Control type='datetime-local' />
			</Form.Group>

			<Form.Group className='mb-3' controlId='eventEndTime' onChange={changeInput}>
				<Form.Label> End Time </Form.Label>
				<Form.Control type='datetime-local' />
			</Form.Group>

			<Form.Group className='mb-3' controlId='eventRoom' onChange={changeInput}>
				<Form.Label> Room </Form.Label>
				<Form.Control placeholder='Ex: 345' />
			</Form.Group>

			<Form.Group className='mb-3' controlId='eventBuilding' onChange={changeInput}>
				<Form.Label> Building </Form.Label>
				<Form.Control placeholder='Ex: 8' />
			</Form.Group>

			<Form.Group className='mb-3' controlId='eventDescription' onChange={changeInput}>
				<Form.Label> Description </Form.Label>
				<Form.Control as='textarea' rows={3} placeholder='Ex: Dress up and have fun' />
			</Form.Group>

			<Button variant='primary' type='submit'>
				Submit
			</Button>
		</Form>
	);
};

export default EventForm;

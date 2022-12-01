import React, { useState, useEffect } from 'react';
import axios from 'axios';

type event = {
	_id: number;
	eventName: String;
	eventStartTime: Date;
	eventEndTime: Date;
	eventRoom: String;
	eventBuilding: String;
	eventDescript: String;
	date: Date;
	username: String;
	longitude: number;
	latitude: number;
};

export const EventList = () => {
	const [events, setEvents] = useState<event[]>([]);

	useEffect(() => {
		// function is called after rendering map
		getData();
	}, []); // end useEffect

	const getData = async () => {
		try {
			const { data } = await axios.get('api/events');
			data.forEach((event: event) => {
				// for loop inserts each event into array
				setEvents((prevEvent) => [...prevEvent, event]); // add new event to end of array
			});
			console.log(events);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className='container'>
			<h3 className='p-3 text-center'>CPP Events List</h3>
			<table className='table table-striped table-bordered'>
				<thead>
					<tr>
						<th>Date Created</th>
						<th>Username</th>
						<th>Event Name</th>
						<th>Building</th>
						<th>Room</th>
						<th>Date</th>
						<th>Start Time</th>
						<th>End Time</th>
					</tr>
				</thead>
				<tbody>
					{events &&
						events.map((event) => (
							<tr key={event._id}>
								<td>{new Date(event.date).toLocaleDateString()}</td>
								<td>{event.username}</td>
								<td>{event.eventName}</td>
								<td>{event.eventBuilding}</td>
								<td>{event.eventRoom}</td>
								<td>{new Date(event.eventStartTime).toLocaleDateString()}</td>
								<td>{new Date(event.eventStartTime).toLocaleTimeString()}</td>
								<td>{new Date(event.eventEndTime).toLocaleTimeString()}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isShorthandPropertyAssignment } from 'typescript';
import shortid from 'shortid';


type event = {
	name: String;
	startTime: Date;
	endTime: Date;
	room: String;
	building: String;
	description: String;
    date: Date;
	username: String;
	longitude: number;
	latitude: number;
};

export const EventList = () => {
    const [events, setEvents] = useState<event[]>([])

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
            console.log(events)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container">
            <h3 className="p-3 text-center">CPP Events List</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Event Name</th>
                        <th>Building</th>
                        <th>Room</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {events && events.map(event =>
                        <tr key={Math.floor(Math.random() * 1000+1)}>
                            <td>{event.username}</td>
                            <td>{event.name}</td>
                            <td>{event.building}</td>
                            <td>{event.room}</td>
                            <td>{new Date(event.startTime).toLocaleTimeString()}</td>
                            <td>{new Date(event.endTime).toLocaleTimeString()}</td>
                            <td>{new Date(event.date).toLocaleDateString()}</td>
                        </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
}
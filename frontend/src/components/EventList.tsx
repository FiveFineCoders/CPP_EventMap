import React, { useState } from 'react';

export const EventList = () => {
    const [events, setEvents] = useState([
        { id: 1, username: 'Brandon', name: 'Birthday!', building: '8', room: '50', date: new Date('2022-12-23T11:00:00.000+00:00')},
        { id: 2, username: 'Vu', name: 'Christmas Party', building: '5', room: '20', date: new Date('2022-12-23T11:00:00.000+00:00')},
        { id: 3, username: 'John', name: 'Study Meet', building: '10', room: '30', date: new Date('2022-12-23T11:00:00.000+00:00')},
        { id: 4, username: 'Brandon T', name: 'Potluck', building: '11', room: '40', date: new Date('2022-12-23T11:00:00.000+00:00')},
        { id: 5, username: 'Aamir', name: 'Book Club', building: '4', room: '6', date: new Date('2022-12-23T11:00:00.000+00:00')}
    ]);

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
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {events && events.map(event =>
                        <tr key={event.id}>
                            <td>{event.username}</td>
                            <td>{event.name}</td>
                            <td>{event.building}</td>
                            <td>{event.room}</td>
                            <td>{event.date.toString()}</td>
                        </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
}
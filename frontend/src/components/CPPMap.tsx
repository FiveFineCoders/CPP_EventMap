import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, {
	FullscreenControl,
	GeolocateControl,
	NavigationControl,
	ScaleControl,
	Marker,
	Popup,
} from 'react-map-gl';
import MapSidebar from './MapSidebar';
import PopupForm from './PopupForm';
import { AiFillPlusCircle } from 'react-icons/ai';
import '../styles/cppmap.css';
import '../styles/general.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default; // exclude mapbox GL JS from transpilation (use ES5 not ES6)
// load worker class (increases bundle size and reduces rendering performance)

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOXTOKEN}`;

const initialViewport = {
	longitude: -117.82261244351792,
	latitude: 34.05775617645074,
	zoom: 16,
	pitch: 50,
};

type eventMarker = {
	_id: number;
	eventName: string;
	eventStartTime: Date;
	eventEndTime: Date;
	eventRoom: String;
	eventBuilding: String;
	eventDescript: String;
	username: String;
	longitude: number;
	latitude: number;
};

const testBounds = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);

export const CPPMap = (): JSX.Element => {
	const MapContainerRef = useRef(null);
	const [eventCreate, setEventCreate] = useState(false);
	const [activateEventForm, setActivateEventForm] = useState(false);
	const [longitude, setLongitude] = useState(0);
	const [latitude, setLatitude] = useState(0);
	const [eventMarkerList, setEventMarkerList] = useState<eventMarker[]>([]); // initialize empty array
	const [popupInfo, setPopupInfo] = useState<eventMarker | null>(null);

	const { state } = useLocation();
	const { username } = state || {};

	const [viewState, setViewState] = React.useState({
		longitude: -117.82261244351792,
		latitude: 34.05775617645074,
		zoom: 16,
		pitch: 50,
	});

	useEffect(() => {
		// function is called after rendering map
		getMarkers();
	}, []); // end useEffect

	const getMarkers = async () => {
		// retrieves all events from server and adds them to an array

		try {
			const { data } = await axios.get('api/events'); // send get request to server

			data.forEach((marker: eventMarker) => {
				// for loop inserts each event into array
				setEventMarkerList((prevMarker) => [...prevMarker, marker]); // add new marker to end of array
			});
		} catch (error) {
			// end try
			// end try
			if (axios.isAxiosError(error)) {
				console.log('Axios error: ', error.message);
				return error.message;
			} else {
				console.log(error);
				return 'Unexpected general error';
			}
		} // end catch
	}; // end getMarkers const

	const onClose = () => {
		setPopupInfo(null);
	};

	// Starting cords
	//34.027805, -117.845633
	//34.064494, -117.779088
	return (
		<div className='outer-cppmap'>
			<ReactMapGL
				{...viewState}
				style={{ height: 'calc(100vh - 68.5px)' }}
				onMove={(evt) => setViewState(evt.viewState)}
				mapStyle='mapbox://styles/johnsalinas123/cl86tm6hc001616o8mjxmygk7'
				z-index={-1}
				maxBounds={[
					[-117.845633, 34.027805],
					[-117.779088, 34.064494],
				]}
				onClick={(event) => {
					// create event
					if (!eventCreate) {
						// don't show event creation form if event create button is not clicked
						return;
					}

					console.log('event create is: ' + eventCreate);

					// set event's longitude and latitude to mouse's location on click
					setLongitude(event.lngLat.lng);
					setLatitude(event.lngLat.lat);

					setActivateEventForm(true); // show popup
				}}
			>
				{eventMarkerList.map(
					(
						event, // for loop iterates through array to render/display markers on the map
					) => (
						<Marker
							key={event._id}
							longitude={event.longitude}
							latitude={event.latitude}
							color={'#1fe81c'}
							onClick={(e) => {
								/*console.log(event.longitude)
								console.log(event.latitude)
								console.log(event.eventName);
								console.log(event.eventStartTime);
								console.log(event.eventEndTime);
								console.log(event.eventRoom);
								console.log(event.eventBuilding);
								console.log(event.eventDescript);
								console.log(event.username);*/
								e.originalEvent.stopPropagation();
								setPopupInfo(event);
							}}
						/>
					),
				)}

				<MapSidebar />
				<GeolocateControl position='top-right' />
				<NavigationControl position='top-right' />
				<ScaleControl />

				{popupInfo && (
					<Popup
						longitude={Number(popupInfo.longitude)}
						latitude={Number(popupInfo.latitude)}
						anchor='top'
						onClose={() => setPopupInfo(null)}
					>
						<div className='event-popup'>
							<p className='event-popup-p'>{'Event Name:  ' + popupInfo.eventName}</p>
							<p className='event-popup-p'>
								{'Start Time: ' + String(new Date(popupInfo.eventStartTime).toLocaleTimeString())}
							</p>
							<p className='event-popup-p'>
								{'End Time:  ' + String(new Date(popupInfo.eventEndTime).toLocaleTimeString())}
							</p>
							<p className='event-popup-p'>{'Building:  ' + popupInfo.eventBuilding}</p>
							<p className='event-popup-p'>{'Room:  ' + popupInfo.eventRoom}</p>
							<p className='event-popup-p'>{'Description: ' + popupInfo.eventDescript}</p>
						</div>
					</Popup>
				)}

				<div id='eventPopup'>
					<PopupForm
						isOpen={activateEventForm}
						togglePopup={setEventCreate}
						isEventFormActive={setActivateEventForm}
						longitudeVal={longitude}
						latitudeVal={latitude}
						username={username}
						setEventList={setEventMarkerList}
					/>
				</div>

				<div id='addEventIcon'>
					<AiFillPlusCircle
						size='70'
						onClick={(event) => {
							setEventCreate(true);
							console.log('create event button tapped: round 4 fixed?');
						}}
					/>
				</div>

				<div id='addEventIcon'>
					<AiFillPlusCircle
						className='create-event-button'
						size='70'
						onClick={(event) => {
							setEventCreate(true);
							console.log('create event button tapped');
							//console.log(eventMarkerList);
						}}
					/>
				</div>
			</ReactMapGL>
		</div>
	);
};

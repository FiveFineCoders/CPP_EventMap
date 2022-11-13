import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, {
	FullscreenControl,
	GeolocateControl,
	NavigationControl,
	ScaleControl,
	Marker,
} from 'react-map-gl';
import MapSidebar from './MapSidebar';
import PopupForm from './PopupForm';
import { AiFillPlusCircle } from 'react-icons/ai';
import '../styles/cppmap.css';
import axios from 'axios';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;	// exclude mapbox GL JS from transpilation (use ES5 not ES6)
// load worker class (increases bundle size and reduces rendering performance)

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOXTOKEN}`;

const mapBounds = [
	[34.046946290299026, -117.82929433297194], // southwest cords
	[34.062726505089216, -117.81097666171729], // northeast cords
];

const initialViewport = {
	longitude: -117.82261244351792,
	latitude: 34.05775617645074,
	zoom: 16,
	pitch: 50,
};

type CPPMapProps = {
	longitude: Number;
	latitude: Number;
	zoom: Number;
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

// CPP Longitude and Latitude
//34.05775617645074, -117.82261244351792

/*const MapMarkers = (): JSX.Element => {


	
}	// end MapMarkers const*/

export const CPPMap = (): JSX.Element => {
	const MapContainerRef = useRef(null);
	const [eventCreate, setEventCreate] = useState(false);
	const [activateEventForm, setActivateEventForm] = useState(false);
	const [longitude, setLongitude] = useState(0);
	const [latitude, setLatitude] = useState(0);
	const [eventMarkerList, setEventMarkerList] = useState<eventMarker[]>([])	// initialize empty array

	const [viewState, setViewState] = React.useState({
		longitude: -117.82261244351792,
		latitude: 34.05775617645074,
		zoom: 16,
		pitch: 50,
	});

	useEffect(() => {
		getMarkers();
		//console.log(eventMarkerList);
	}, [])

	const getMarkers = async () => {

		try {
			const { data } = await axios.get('api/events');

			data.forEach((marker: eventMarker) => {
				setEventMarkerList(oldMarker => [...oldMarker, marker]);
			});

			//console.log(data)

		}	// end try
		catch(error) {
			// end try
			if (axios.isAxiosError(error)) {
				console.log('Axios error: ', error.message);
				return error.message;
			} else {
				console.log(error);
				return 'Unexpected general error';
			}
		}	// end catch

	}	// end getMarkers const


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
				//onClick={handleClick}
				onClick={event => {

					// create event
					if (!eventCreate) {
					return;
					}

					console.log("event create is: " + eventCreate)

					setLongitude(event.lngLat.lng)
					setLatitude(event.lngLat.lat)

					setActivateEventForm(true)	// show popup
				}}
			>

				{
					eventMarkerList.map((event) => (
						<Marker key={event._id} longitude={event.longitude} latitude={event.latitude}>
					
						</Marker>
					))
				}
				
				<MapSidebar />
				<GeolocateControl position='top-right' />
				<FullscreenControl position='top-right' />
				<NavigationControl position='top-right' />
				<ScaleControl />
				
				<div id = "eventPopup">
					<PopupForm isOpen = {activateEventForm} togglePopup = {setEventCreate} isEventFormActive = {setActivateEventForm} longitudeVal = {longitude} latitudeVal = {latitude}/>
				</div>
				
				<div id="addEventIcon">
          			<AiFillPlusCircle 
              			size="70"
              			onClick={event => {
							setEventCreate(true)
                			console.log("create event button tapped: round 4 fixed?")
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
							console.log(eventMarkerList);
						}}
					/>
				</div>
			</ReactMapGL>
		</div>
	);
};

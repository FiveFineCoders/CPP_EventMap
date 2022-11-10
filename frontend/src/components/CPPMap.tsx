import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, {
	FullscreenControl,
	GeolocateControl,
	NavigationControl,
	ScaleControl,
} from 'react-map-gl';
import MapSidebar from './MapSidebar';
import PopupForm from './PopupForm';
import { AiFillPlusCircle } from 'react-icons/ai';
import '../styles/cppmap.css';

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

const testBounds = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);

// CPP Longitude and Latitude
//34.05775617645074, -117.82261244351792

export const CPPMap = (): JSX.Element => {
	const MapContainerRef = useRef(null);
	const [eventCreate, setEventCreate] = useState(false);
	const [mapClicked, setMapClicked] = useState(false);
	const [longitude, setLongitude] = useState(0);
	const [latitude, setLatitude] = useState(0);

	const [viewState, setViewState] = React.useState({
		longitude: -117.82261244351792,
		latitude: 34.05775617645074,
		zoom: 16,
		pitch: 50,
	});

	const handleClick = () => {
		// create event
		if (!eventCreate) {
			return;
		}

		setMapClicked(true)
		console.log("event create is: " + eventCreate)
		//console.log(this.position)
		

	};

	/*function createEvent() {

		console.log("hello there")
		
	}*/

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
				onClick={handleClick}
				/*onClick={event => {
					handle
					console.log("Latitude: " + event.lngLat.lat)
					console.log("Longitude: " + event.lngLat.lng)
				}}*/
			>
				<MapSidebar />
				<GeolocateControl position='top-right' />
				<FullscreenControl position='top-right' />
				<NavigationControl position='top-right' />
				<ScaleControl />
				
				<div id = "eventPopup">
					<PopupForm isOpen = {mapClicked} togglePopup = {setEventCreate} isMapClicked = {setMapClicked} longitudeVal = {longitude} latitudeVal = {latitude}/>
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
						}}
					/>
				</div>
			</ReactMapGL>
		</div>
	);
};

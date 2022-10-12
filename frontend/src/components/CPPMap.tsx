import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; 
import ReactMapGL from 'react-map-gl';
import '../styles/map.css'

mapboxgl.accessToken =  `${process.env.REACT_APP_MAPBOXTOKEN}`

const mapBounds = [
  [34.046946290299026, -117.82929433297194], // southwest cords
  [34.062726505089216, -117.81097666171729] // northeast cords

]

const initialViewport = {
    longitude: -117.82261244351792,
    latitude: 34.05775617645074,
    zoom: 16,
    pitch: 50,

}

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
  const [latitudeVal, setLatitude] = useState(34.05775617645074);
  const [longitudeVal, setLongitude] = useState(-117.82261244351792);
  const [zoomVal, setZoom] = useState(16);
  const [mapWidth, setMapWidth] = useState(1000);
  const [mapHeight, setMapHeight] = useState(800);

  const [viewState, setViewState] = React.useState( {
    longitude: -117.82261244351792,
    latitude: 34.05775617645074,
    zoom: 16,
    pitch: 50,
  });

  const handleClick = () => {
    var curMapWidth: number = mapWidth;
    console.log(curMapWidth);

    setMapWidth(curMapWidth + 100);
    console.log(mapWidth);
  };

  return (
    <div className='outer-cppmap'>
      <ReactMapGL
        {...viewState}
        style={{height: "calc(100vh - 56px)"}}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        
      />
    </div>

    )
}


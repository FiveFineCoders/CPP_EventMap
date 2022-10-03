import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl'; 
import Map from 'react-map-gl';
import '../styles/map.css'

mapboxgl.accessToken =  `${process.env.REACT_APP_MAPBOXTOKEN}`

type CPPMapProps = {
  longitude: Number;
  latitude: Number;
  zoom: Number;
};

// CPP Longitude and Latitude
//34.05775617645074, -117.82261244351792

export const CPPMap = (): JSX.Element => {
  const MapContainerRef = useRef(null);
  const [latitudeVal, setLatitude] = useState(34.05775617645074);
  const [longitudeVal, setLongitude] = useState(-117.82261244351792);
  const [zoomVal, setZoom] = useState(16);
  const [mapWidth, setMapWidth] = useState(1000);
  const [mapHeight, setMapHeight] = useState(800);

  const handleClick = () => {
    var curMapWidth: number = mapWidth;
    console.log(curMapWidth);

    setMapWidth(curMapWidth + 100);
    console.log(mapWidth);
  };

return (
    <div>
      <Map
        initialViewState={{
          longitude: longitudeVal,
          latitude: latitudeVal,
          zoom: zoomVal,
          pitch: 50,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        //onRender={(event) => event.target.resize()}
        onResize={(event) => event.target.resize()}
      />
    </div>

    )
}

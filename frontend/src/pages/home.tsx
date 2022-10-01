import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
//import dotenv from 'dotenv'
import mapboxgl, { FullscreenControl } from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Map from 'react-map-gl';
import { JsxEmit } from 'typescript';
import '../styles/map.css'

//dotenv.config();
 
mapboxgl.accessToken = '';

type CPPMapProps = {
    longitude: Number,
    latitude: Number,
    zoom: Number
}

// CPP Longitude and latitude
//34.05775617645074, -117.82261244351792

export const CPPMap = (): JSX.Element =>  {

    const MapContainerRef = useRef(null);
    const [latitudeVal, setLatitude] = useState(34.05775617645074);
    const [longitudeVal, setLongitude] = useState(-117.82261244351792);
    const [zoomVal, setZoom] = useState(16);
    const [mapWidth, setMapWidth] = useState(1000);
    const [mapHeight, setMapHeight] = useState(800);

    const handleClick = () => {

        var curMapWidth:number = mapWidth;
        console.log(curMapWidth)

        setMapWidth(curMapWidth + 100)
        console.log(mapWidth)

    }

    return (

        <div>
            <Map
                initialViewState={{
                    longitude: longitudeVal,
                    latitude: latitudeVal,
                    zoom: zoomVal,
                    pitch: 50
                }}
                style={{width: mapWidth, height: mapHeight}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                //onRender={(event) => event.target.resize()}
                onResize={(event) => event.target.resize()}
                

            />
            
            <button onClick={handleClick}>Press</button>
        </div>
    )

}
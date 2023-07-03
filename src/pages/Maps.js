import React, { useState } from 'react';
import "../Maps.css";

import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
  Marker
} from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};



export default function Maps() {
  const center = {
    lat: 37.7749, // Default center latitude
    lng: -122.4194, // Default center longitude
  };

  const markerPositions = [
    { lat: 37.7749, lng: -122.4194 }, // Marker 1
    { lat: 37.772, lng: -122.41 }, // Marker 2
    { lat: 37.775, lng: -122.415 }, // Marker 3
  ];

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [response, setResponse] = useState(null);

  

  const travelModes = ['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT'];

  const calculateDistance = () => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setResponse(result);
        } else {
          console.error('Error calculating distance:', status);
        }
      }
    );
  };

  return (
    <div>
        <div>
      <Autocomplete
        onLoad={(autocomplete) => {
          autocomplete.setFields(['formatted_address']);
          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            setOrigin(place.formatted_address);
          });
        }}
      >
        <input
          type="text"
          placeholder="From"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </Autocomplete>
      <Autocomplete
        onLoad={(autocomplete) => {
          autocomplete.setFields(['formatted_address']);
          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            setDestination(place.formatted_address);
          });
        }}
      >
        <input
          type="text"
          placeholder="To"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </Autocomplete>
      </div>
      <select value={travelMode} onChange={(e) => setTravelMode(e.target.value)}>
        {travelModes.map((mode) => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>
      <button onClick={calculateDistance}>Calculate Distance</button>
      {response && (
        <div className="row">
          <p className="info">Distance: {response.routes[0].legs[0].distance.text}</p>
          <p className="info">Duration: {response.routes[0].legs[0].duration.text}</p>
        </div>
      )}

        <GoogleMap mapContainerClassName="map-container" center={center} zoom={10}>
         {markerPositions.map((position, index) => (
          <Marker key={index} position={position} />
        ))}

          {response && <DirectionsRenderer directions={response} />}
        </GoogleMap>
    </div>
  );
}

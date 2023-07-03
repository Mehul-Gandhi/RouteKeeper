import React, { useState } from 'react';
import "../Maps.css";

import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

// const containerStyle = {
//   width: '400px',
//   height: '400px',
// };

const center = {
  lat: 37.7749, // Default center latitude
  lng: -122.4194, // Default center longitude
};

const DistanceCalculator = () => {
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
      <input
        type="text"
        placeholder="From"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <input
        type="text"
        placeholder="To"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <select value={travelMode} onChange={(e) => setTravelMode(e.target.value)}>
        {travelModes.map((mode) => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>
      <button onClick={calculateDistance}>Calculate Distance</button>
      {response && (
        <div>
          <p>Distance: {response.routes[0].legs[0].distance.text}</p>
          <p>Duration: {response.routes[0].legs[0].duration.text}</p>
        </div>
      )}
      <LoadScript googleMapsApiKey="AIzaSyDTvHngaL3RXhdy2VAlHxq5dA0Nnh-MFcs">
        <GoogleMap mapContainerStyle="map-container" center={center} zoom={10}>
          {response && <DirectionsRenderer directions={response} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default DistanceCalculator;

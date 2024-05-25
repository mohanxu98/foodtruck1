import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [trucks, setTrucks] = useState([]);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [radius, setRadius] = useState(5);
  const [error, setError] = useState('');
  const [useGeolocation, setUseGeolocation] = useState(true);
  const [geoError, setGeoError] = useState(false); // Track if geolocation failed

  const fetchTrucks = useCallback(() => {
    if (lat && lon) {  // Check if lat and lon are not empty
      console.log(`Fetching trucks for lat: ${lat}, lon: ${lon}, radius: ${radius}`);
      axios.get('http://127.0.0.1:5000/api/foodtrucks', {
        params: { lat, lon, radius }
      })
      .then(response => {
        console.log('Response data (raw):', response.data); // Log the raw response
        console.log('Response data (stringified):', JSON.stringify(response.data)); // Log the stringified response
        console.log('Type of response.data:', typeof response.data);

        let data;
        if (typeof response.data === 'string') {
          try {
            data = JSON.parse(response.data);
            console.log('Parsed response data:', data);
          } catch (e) {
            console.error('Error parsing response data:', e);
            setError('Error parsing response data.');
            return;
          }
        } else {
          data = response.data;
        }

        // Check if the response data is an array
        if (Array.isArray(data)) {
          console.log('Response data is an array');
          setTrucks(data);
          setError(''); // Clear any previous errors
        } else {
          console.error('Expected an array but got', data);
          setError('Unexpected response format');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data.');
      });
    } else {
      setError('Latitude and Longitude must be set before making the API request');
    }
  }, [lat, lon, radius]);

  useEffect(() => {
    if (useGeolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Geolocation position:', position);
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setGeoError(false);
      }, (error) => {
        console.error('Error getting geolocation:', error);
        setError('Error getting geolocation. To use current location, please enable location sharing in Google Settings');
        setGeoError(true);
        setUseGeolocation(false);
      });
    }
  }, [useGeolocation]);

  const handleToggleGeolocation = () => {
    setUseGeolocation(!useGeolocation);
    if (!useGeolocation) {
      setLat('');
      setLon('');
    }
  };

  return (
    <div className="App">
      <h1>Nearby Food Trucks</h1>
      {error && <p className="error">{error}</p>}
      <div className="input-group">
        <label>
          <input
            type="checkbox"
            checked={useGeolocation}
            onChange={handleToggleGeolocation}
          />
          Use Current Location
        </label>
        {!useGeolocation && (
          <>
            <label>
              Latitude:
              <input
                type="text"
                value={lat}
                onChange={e => setLat(e.target.value)}
              />
            </label>
            <label>
              Longitude:
              <input
                type="text"
                value={lon}
                onChange={e => setLon(e.target.value)}
              />
            </label>
          </>
        )}
        <label>
          Radius (km):
          <input
            type="text"
            value={radius}
            onChange={e => setRadius(e.target.value)}
          />
        </label>
        <button className="button" onClick={fetchTrucks}>Find Food Trucks</button>
      </div>
      {trucks.length === 0 ? (
        <p>There are no trucks available near you.</p>
      ) : (
        <ul className="food-truck-list">
          {trucks.map(truck => (
            <a href={truck.Schedule} target="_blank" rel="noopener noreferrer" key={truck.locationid} className="food-truck-link">
              <li className="food-truck">
                <img src="/foodtruckpic.jpeg" alt="Mini Food Truck" className="truck-image" />
                <div className="text-blurb">
                  <h2>{truck.Applicant}</h2>
                  <p>{truck.LocationDescription}</p>
                  <p>Address: {truck.Address}</p>
                  <p>Food Items: {truck.FoodItems}</p>
                </div>
              </li>
            </a>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

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
    if ((lat !== '' && lon !== '') || (useGeolocation && !geoError)) {
      console.log(`Fetching trucks for lat: ${lat}, lon: ${lon}, radius: ${radius}`);
      axios.get('http://127.0.0.1:5000/api/foodtrucks', {
        params: { lat, lon, radius }
      })
      .then(response => {
        if (Array.isArray(response.data)) {
          setTrucks(response.data);
        } else {
          console.error('Expected an array but got', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data.');
      });
    } else if (!useGeolocation) {
      if (lat === '' || lon === ''){      
        setError('Latitude and Longitude must be set before making the API request');
    }
    }
  }, [lat, lon, radius, useGeolocation, geoError]);

  useEffect(() => {
    if (useGeolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Geolocation position:', position);
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setGeoError(false);
      }, (error) => {
        console.error('Error getting geolocation:', error);
        setError('Error getting geolocation. Please enter coordinates manually.');
        setGeoError(true);
        setUseGeolocation(false);
      });
    }
  }, [useGeolocation]);

  useEffect(() => {
    if ((lat !== '' && lon !== '') || (useGeolocation && !geoError)) {
      fetchTrucks();
    }
  }, [lat, lon, fetchTrucks, useGeolocation, geoError]);

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
        <button onClick={fetchTrucks}>Find Food Trucks</button>
      </div>
      {trucks.length === 0 ? (
        <p>There are no trucks available near you.</p>
      ) : (
        <ul className="food-truck-list">
          {trucks.map(truck => (
            <li key={truck.locationid} className="food-truck">
              <h2>{truck.Applicant}</h2>
              <p>{truck.LocationDescription}</p>
              <p>Address: {truck.Address}</p>
              <p>Food Items: {truck.FoodItems}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

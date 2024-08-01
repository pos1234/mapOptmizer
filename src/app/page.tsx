'use client';
import { useState, useEffect } from 'react';
import Map from '../components/Map';
import findShortestPath from '../utils/shortestPath';

type Location = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

const Home = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [optimizedPath, setOptimizedPath] = useState<Location[]>([]);
  const [savedLocations, setSavedLocation] = useState<Location[]>([]);

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/locations');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSavedLocation(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const saveLocation = async (location: Location) => {
    try {
      const response = await fetch('/api/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(location)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newLocation = await response.json();
      setSavedLocation((current) => [...current, newLocation]);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  const optimizePath = () => {
    try {
      console.log('Locations before optimization:', locations);
      const path = findShortestPath(locations);
      console.log('Optimized path:', path);
      if (path.length > 0) {
        setOptimizedPath(path);
      } else {
        console.warn('No valid path found');
      }
    } catch (error) {
      console.error('Error optimizing path:', error);
    }
  };
  

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleMarkerClick = (location: Location[]) => {
    setLocations(location);
  };

  return (
    <div>
      <h1>Map Application</h1>
      <Map 
        locations={locations} 
        onMarkerClick={handleMarkerClick} 
        optimizedPath={optimizedPath} 
        saveLocation={saveLocation} 
      />
      <button onClick={fetchLocations}>Load Locations</button>
      <button onClick={optimizePath}>Optimize Path</button>
      <h1>Saved Maps</h1>
      <div className='grid grid-cols-3'>
        <p>Name</p>
        <p>Latitude</p>
        <p>Longitude</p>
      </div>
      {savedLocations.map((location) => (
        <div className='grid grid-cols-3' key={location.id}>
          <p>{location.name}</p>
          <p>{location.latitude}</p>
          <p>{location.longitude}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;

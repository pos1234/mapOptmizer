'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("../components/Map"), {
  ssr: false
});
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

  const optimizePath = async () => {
    console.log(">>> json locations", JSON.stringify(locations));

    try {
      const response = await fetch('/api/shortest-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(locations)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newLocation = await response.json();
      setOptimizedPath(newLocation);
    } catch (error) {
      console.error('Error optimizing location:', error);
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
      <h1 className='text-center p-5 font-bold text-[20px]'>Map Application</h1>
      <Map
        locations={locations}
        onMarkerClick={handleMarkerClick}
        optimizedPath={optimizedPath}
        saveLocation={saveLocation}
      />
      <div className='flex flex-col mt-5 [&>button]:bg-blue-500 [&>button]:p-2 [&>button]:rounded-md [&>button]:text-white [&>button]:cursor-pointer [&>button]:w-40 items-end'>
        <button onClick={fetchLocations}>Load Locations</button> <br />
        <button onClick={optimizePath}>Optimize Path</button>
      </div>
      <div className='pl-5'>
        <h1 className='text-center p-5 font-bold text-[20px]'>Saved Maps</h1>
        <div className='grid grid-cols-2'>
          <p>Latitude</p>
          <p>Longitude</p>
        </div>
        {savedLocations.map((location, index: number) => (
          <div onClick={() => setLocations(currentLocations => [...currentLocations, location])}
            className={`grid cursor-pointer grid-cols-2 my-3 ${index % 2 == 0 ? "bg-gray-200 hover:bg-gray-100" : "hover:bg-gray-200"}`} key={location.id}>
            <p>{location.latitude}</p>
            <p>{location.longitude}</p>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Home;

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Map = ({ locations, optimizedPath, saveLocation, onMarkerClick }: any) => {
  const [markers, setMarkers] = useState<{ lat: number, lng: number }[]>([]);

  const MapClickHandler = () => {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        if (lat !== undefined && lng !== undefined) {
          const newMarker = { id: new Date().toISOString(), lat, lng }; // Use ISO string for unique id
          const updatedMarkers = [...markers, newMarker];
          setMarkers(updatedMarkers);
          onMarkerClick(updatedMarkers);
        } else {
          console.error('Invalid latitude or longitude values:', lat, lng);
        }
      }
    });
    return null;
  };

  return (
    <div className='flex flex-col'>
      <MapContainer style={containerStyle} center={center} zoom={10}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />

        {/* Display existing locations */}
        {locations.map((location: Location) => (
          location.latitude !== undefined && location.longitude !== undefined ? (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude] as [number, number]}
              icon={defaultIcon}
            >
              <Popup>
                {location.name}<br />
                Latitude: {location.latitude}<br />
                Longitude: {location.longitude}
              </Popup>
            </Marker>
          ) : null
        ))}

        {/* Display markers added by clicking on the map */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lng] as [number, number]}
            icon={defaultIcon}
          >
            <Popup>
              Latitude: {marker.lat} <br /> Longitude: {marker.lng}
            </Popup>
          </Marker>
        ))}

        {/* Display optimized path */}
        {/* {optimizedPath.length > 0 && (
        )} */}
        <Polyline
          positions={optimizedPath.map((loc: any) => [loc.lat, loc.lng] as [number, number])}
          color="blue"
          weight={4}
        />
      </MapContainer>
      <button className='bg-blue-500 p-2 rounded-md text-white cursor-pointer w-40 self-end mt-5'
        onClick={() => {
          if (markers.length > 0) {
            const lastMarker = markers[markers.length - 1];
            if (lastMarker.lat !== undefined && lastMarker.lng !== undefined) {
              saveLocation({
                name: 'New Location',
                latitude: lastMarker.lat,
                longitude: lastMarker.lng,
              });
            } else {
              console.error('Invalid marker coordinates:', lastMarker);
            }
          } else {
            console.error('No markers to save');
          }
        }}
      >
        Save
      </button>
    </div>
  );
};

export default Map;

type Location = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

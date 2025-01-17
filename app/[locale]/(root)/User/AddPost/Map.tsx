"use client";
import React, { useEffect, useState } from 'react';
import L from "leaflet";
import "leaflet/dist/leaflet.css";



const Map = ({ initialLatitude, initialLongitude, onLocationSelect }) => {
  const [map, setMap] = useState(null);
//   const [marker, setMarker] = useState(null);

  useEffect(() => {
    // Set default icon options
    L.Icon.Default.mergeOptions({
      iconUrl: "/marker-icon-blue.png",
      iconRetinaUrl: "/marker-icon-2x-blue.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });

    const mapInstance = L.map("map").setView([initialLatitude, initialLongitude], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance);

    let marker = null;

    // Function to set marker at a given location
    const setMarkerAtLocation = (lat, lng) => {
      if (marker) {
        console.log("marker", marker);
        marker.setLatLng([lat, lng]);
      } else {
        console.log("marker", marker);
         marker = L.marker([lat, lng], { draggable: true }).addTo(mapInstance);
      }
      onLocationSelect({ latitude: lat, longitude: lng });
    };

    // Try to get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapInstance.setView([latitude, longitude], 13);
          setMarkerAtLocation(latitude, longitude);
        },
        () => {
          // If the user denies permission, fall back to the initial location
          setMarkerAtLocation(initialLatitude, initialLongitude);
        }
      );
    } else {
      // If Geolocation API is not available, fall back to the initial location
      setMarkerAtLocation(initialLatitude, initialLongitude);
    }

    mapInstance.on('click', (e) => {
      const { lat, lng } = e.latlng;
      setMarkerAtLocation(lat, lng);
    });

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [initialLatitude, initialLongitude]);

  return <div id="map" style={{ height: "600px", width: "100%" }}></div>;
};

export default Map;
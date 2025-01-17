"use client";
import React, { useEffect } from 'react';
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import marker images


const ShowMap = ({ latitude, longitude }) => {
  useEffect(() => {
    // Set default icon options
    L.Icon.Default.mergeOptions({
      iconUrl: "/marker-icon-blue.png",
      iconRetinaUrl: "/marker-icon-2x-blue.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });

    const mapInstance = L.map("show-map").setView([latitude, longitude], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance);

    L.marker([latitude, longitude]).addTo(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [latitude, longitude]);

  return <div id="show-map" style={{ height: "700px", width: "100%" }}></div>;
};

export default ShowMap;
"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import marker images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';


const ShowMap = ({ properties }) => {
  const router = useRouter();

  useEffect(() => {
    // Set default icon options
    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIcon2x,
      shadowUrl: markerShadow,
  
    });

    const mapInstance = L.map("show-map").setView([properties[0].location.latitude, properties[0].location.longitude], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance);

    properties.forEach(property => {
      const marker = L.marker([property.location.latitude, property.location.longitude])
        .addTo(mapInstance)
        .bindPopup(`<b>${property.title}</b><br>${property.address}`);

      marker.on('mouseover', () => {
        marker.openPopup();
      });

      marker.on('mouseout', () => {
        marker.closePopup();
      });

      marker.on('click', () => {
        router.push(`/Property/${property._id}`);
      });
    });

    return () => {
      mapInstance.remove();
    };
  }, [properties, router]);

  return <div id="show-map" style={{ height: "700px", width: "100%" }}></div>;
};

export default ShowMap;
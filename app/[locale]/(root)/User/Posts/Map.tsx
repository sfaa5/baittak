"use client";
import React, { useEffect, useRef, useState } from "react";

const Map = ({ initialLatitude, initialLongitude, onLocationSelect }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    if (window.google) {
      setGoogleLoaded(true);
      return;
    }

    // Load Google Maps script dynamically
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.onload = () => setGoogleLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!googleLoaded || !window.google) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: initialLatitude, lng: initialLongitude },
      zoom: 13,
    });

    // Function to place/update the marker
    const setMarkerAtLocation = (lat, lng) => {
      if (markerRef.current) {
        markerRef.current.setPosition({ lat, lng });
      } else {
        markerRef.current = new google.maps.Marker({
          position: { lat, lng },
          map: map,
          draggable: true, // Allow user to move the marker
        });

        // Listen for drag end event to update location
        markerRef.current.addListener("dragend", (event) => {
          onLocationSelect({
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng(),
          });
        });
      }

      onLocationSelect({ latitude: lat, longitude: lng });
    };

    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setCenter({ lat: latitude, lng: longitude });
          setMarkerAtLocation(latitude, longitude);
        },
        () => {
          setMarkerAtLocation(initialLatitude, initialLongitude);
        }
      );
    } else {
      setMarkerAtLocation(initialLatitude, initialLongitude);
    }

    // Add click event listener to set marker
    map.addListener("click", (event) => {
      const { lat, lng } = event.latLng;
      setMarkerAtLocation(lat(), lng());
    });

    return () => {
      if (markerRef.current) markerRef.current.setMap(null);
    };
  }, [googleLoaded, initialLatitude, initialLongitude]);

  return <div ref={mapRef} style={{ height: "600px", width: "100%" }}></div>;
};

export default Map;

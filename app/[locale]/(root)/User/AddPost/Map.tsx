"use client";
import React, { useEffect, useRef, useState } from "react";

const Map = ({ initialLatitude, initialLongitude, onLocationSelect }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setGoogleLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.key_google}&libraries=places&v=weekly`;
    script.async = true;
    script.onload = () => setGoogleLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!googleLoaded || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: initialLatitude, lng: initialLongitude },
      zoom: 13,
    });

    const setMarkerAtLocation = (lat, lng) => {
      if (markerRef.current) {
        markerRef.current.setPosition({ lat, lng });
      } else {
        markerRef.current = new window.google.maps.Marker({
          position: { lat, lng },
          map: map,
          draggable: true,
        });

        markerRef.current.addListener("dragend", (event) => {
          onLocationSelect({
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng(),
          });
        });
      }
      onLocationSelect({ latitude: lat, longitude: lng });
    };

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

    map.addListener("click", (event) => {
      setMarkerAtLocation(event.latLng.lat(), event.latLng.lng());
    });

    return () => {
      if (markerRef.current) markerRef.current.setMap(null);
    };
  }, [googleLoaded, initialLatitude, initialLongitude]);

  return <div ref={mapRef} style={{ height: "600px", width: "100%" }}></div>;
};

export default Map;

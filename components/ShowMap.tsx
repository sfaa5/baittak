"use client";
import React, { useEffect, useRef } from "react";

const ShowMap = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          zoom: 14,
        });

        // Add Marker
        new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
          title: "Location",
        });
      }
    };

    if (window.google) {
      loadGoogleMaps();
    } else {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyA393tkbBtNS-0Oo2uShJseBUqJ1NdWN7o&libraries=places&v=weekly";
      script.async = true;
      script.defer = true;
      script.onload = loadGoogleMaps;
      document.head.appendChild(script);
    }
  }, [latitude, longitude]);

  return (
    <div style={{ height: "700px", width: "100%" }}>
      <div ref={mapRef} style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
};

export default ShowMap;

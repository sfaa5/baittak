"use client";
import React from "react";

const ShowMap = ({ latitude, longitude }) => {
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;

  return (
    <div style={{ height: "700px", width: "100%" }}>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapUrl}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default ShowMap;

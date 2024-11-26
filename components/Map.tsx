"use client"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet styles
import { useState } from "react";

const Map = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-medium mb-5">PROPERTY LOCATION</h3>

      {/* Small Map */}
      <div className="w-full h-64">
        <MapContainer center={[51.505, -0.09]} zoom={13} className="h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>Property Location</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Button to Open Modal */}
      <button
        onClick={toggleModal}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Larger Map
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-5 w-11/12 lg:w-3/4">
            <button
              onClick={toggleModal}
              className="text-red-500 float-right font-bold"
            >
              &times;
            </button>
            <h3 className="text-lg font-medium mb-4">Property Location</h3>
            <div className="w-full h-96">
              <MapContainer center={[51.505, -0.09]} zoom={13} className="h-full">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[51.505, -0.09]}>
                  <Popup>Property Location</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;

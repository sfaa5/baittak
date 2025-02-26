"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { usePathname } from "next/navigation";



const ShowMap = ({ properties }) => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    // Set default icon options
    L.Icon.Default.mergeOptions({
      iconUrl: "/marker-icon-blue.png",
      iconRetinaUrl: "/marker-icon-2x-blue.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });


    const validProperties = properties.filter(
      (property)=>property.location?.latitude && property.location?.longitude
    )

    if(validProperties.length === 0) return;



    const mapInstance = L.map("show-map").setView(
      [
        validProperties[0].location.latitude,
        validProperties[0].location.longitude,
      ],
      13
    );


    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    validProperties.forEach((property) => {
      const marker = L.marker([
        property.location.latitude,
        property.location.longitude,
      ])
        .addTo(mapInstance)
        .bindPopup(`<b>${property.title}</b><br>${property.address}`);

      marker.on("mouseover", () => {
        marker.openPopup();
      });

      marker.on("mouseout", () => {
        marker.closePopup();
      });

      marker.on("click", () => {
        if (pathname.includes("Projects")) {
          router.push(`/Projects/${property._id}`);
        }
      
        if (pathname.includes("Property")) {
          router.push(`/Property/${property._id}`);
        }
      });
      
    });

    return () => {
      mapInstance.remove();
    };
  }, [properties, router]);

  return <div id="show-map" style={{ height: "700px", width: "100%" }}></div>;
};

export default ShowMap;

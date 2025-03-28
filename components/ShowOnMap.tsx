"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const ShowMap = ({ properties }) => {
  const router = useRouter();
  const pathname = usePathname();
  const mapRef = useRef(null);
  const t = useTranslations();
  const infoWindowRef = useRef(null); // Track the currently open InfoWindow

  useEffect(() => {
    if (!properties || properties.length === 0) return;

    const validProperties = properties.filter(
      (property) => property.location?.latitude && property.location?.longitude
    );

    if (validProperties.length === 0) return;

    const loadGoogleMaps = () => {
      if (window.google && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: {
            lat: validProperties[0].location.latitude,
            lng: validProperties[0].location.longitude,
          },
          zoom: 13,
        });

        validProperties.forEach((property) => {
          const marker = new window.google.maps.Marker({
            position: {
              lat: property.location.latitude,
              lng: property.location.longitude,
            },
            map: map,
            title: property.title,
          });

          console.log("property", property);

          const imageUrl = property.images[0]?.url || "/placeholder-image.jpg"; // Fallback image

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 0; max-width: 250px; font-family: Arial, sans-serif;">
                <img src="${imageUrl}" alt="${property.title}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 5px;">
                <h3 style="margin: 22px 0 5px 0;">${property.title}</h3>
                <p><strong>${t("project.address")}:</strong> ${property.address}</p>
                <p><strong>${t("property.Price")}:</strong> ${property.price ? `$${property.price}` : "N/A"}</p>
                <div style="display: flex; justify-content: flex-end; margin-top: 5px;">
                  <button id="viewDetails-${property._id}" 
                    style="padding: 6px 10px; background: #79B84E; color: white; border: none; cursor: pointer; border-radius: 4px;">
                    ${t("properties.view")}
                  </button>
                </div>
              </div>
            `,
          });

          // Add click event to open the info window and close the previous one
          marker.addListener("click", () => {
            if (infoWindowRef.current) {
              infoWindowRef.current.close(); // Close previously open infoWindow
            }
            infoWindow.open(map, marker);
            infoWindowRef.current = infoWindow; // Set the current open infoWindow
          });

          // Handle button click inside info window
          google.maps.event.addListener(infoWindow, "domready", () => {
            document
              .getElementById(`viewDetails-${property._id}`)
              ?.addEventListener("click", () => {
                if (pathname.includes("Projects")) {
                  router.push(`/Projects/${property._id}`);
                } else if (pathname.includes("Property")) {
                  router.push(`/Property/${property._id}`);
                }
              });
          });
        });
      }
    };

    if (window.google) {
      loadGoogleMaps();
    } else {
      const script = document.createElement("script");
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`;
      script.async = true;
      script.defer = true;
      script.onload = loadGoogleMaps;
      document.head.appendChild(script);
    }
  }, [properties, router]);

  return <div ref={mapRef} style={{ height: "700px", width: "100%" }}></div>;
};

export default ShowMap;

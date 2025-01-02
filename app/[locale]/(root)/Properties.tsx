import React, { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { useTranslations } from "next-intl";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

function Properties() {
  // Fetch translations
  const t = useTranslations();

  // Initialize state for properties data
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties data
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${URL_SERVER}/api/properties/get`); // Assuming the API endpoint is for properties
        const jsonData = await response.json();
        setProperties(jsonData.properties);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []); // Empty dependency array to run only once when component mounts

  // Function to shuffle and get 4 random properties
  const getRandomProperties = (properties) => {
    const shuffled = [...properties].sort(() => Math.random() - 0.5); // Shuffle the array
    return shuffled.slice(0, 4); // Get the first 4 random properties
  };

  const randomProperties = getRandomProperties(properties);

  return (
    <section>
      <div className="container mx-auto flex w-full justify-center py-32">
        <div className="flex flex-col items-center gap-16">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold text-secondary">
              {t("properties.latest_properties_for_rent")}
            </h1>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {loading ? (
              <div>Loading...</div>
            ) : (
              randomProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Properties;

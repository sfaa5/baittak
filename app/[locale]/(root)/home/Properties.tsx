import React, { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { useTranslations } from "next-intl";
import SkeletonCard from "@/components/skeletons/SkeletonCard";
import Link from "next/link";
import { IoArrowForwardCircleOutline } from "react-icons/io5";


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
      <div className="container mx-auto flex w-full justify-center pb-40">
        <div className="flex flex-col items-center gap-3">

          <div className="flex justify-between w-full items-end gap-2">
       
            
              <h1 className="text-xl md:text-3xl w-auto font-semibold text-secondary">
                {t("properties.latest_properties")}
              </h1>
            

            <Link href="/Property">
              <div className="text-sm md:text-base flex items-center  gap-2 cursor-pointer text-primary">
                <h1 className="  ">
                  {t("properties.view_all")}
                </h1>
                <IoArrowForwardCircleOutline className="w-4 h-4"/>
              </div>
            </Link>
          </div>

          {loading && (
            <div className="flex w-[1000px] justify-between">
             
              <SkeletonCard />
            </div>
          )}

          <div className="grid  gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {!loading &&
              randomProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Properties;

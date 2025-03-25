import React, { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import SkeletonCard from "@/components/skeletons/SkeletonCard";
import ProjectCardHome from "@/components/ProjectCardHome";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Link from "next/link";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

function Projects() {
  // Fetch translations
  const t = useTranslations();

  // Initialize state for properties data
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties data
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${URL_SERVER}/api/projects/get`); // Assuming the API endpoint is for properties
        const jsonData = await response.json();
        setProperties(jsonData.projects);
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
      <div className="container mx-auto flex w-full justify-center pb-20">
        <div className="flex flex-col items-center gap-3">
          <div className="flex justify-between w-full items-end">
            <div className="flex flex-col  ">
              <h1 className="text-xl md:text-3xl font-semibold text-secondary">
                {t("properties.New_Projects _to_Explore")}
              </h1>
            </div>

            <Link href="/Projects">
              <div className="text-sm md:text-base flex items-center gap-2 cursor-pointer text-primary">
                <h1 className="  ">
                  {t("properties.view_all")}
                </h1>
                <IoArrowForwardCircleOutline className="w-5 h-5" />
              </div>
            </Link>
          </div>

          {loading && (
            <div className="flex w-[1000px] gap-20 justify-between">
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
            </div>
          )}

          <div className="grid  gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {!loading &&
              randomProperties.map((property,i) => (
                <ProjectCardHome key={i} property={property} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;

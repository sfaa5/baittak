"use client";
import PropertiesCard from "@/components/PropertiesCard";
import { useTranslations } from "next-intl";
import Fllter from "./Fllter";

import { useEffect, useState } from "react";

function ShowCards({ data }) {
  console.log("dataaaaaaaaaaaa", data);

  const initialProperties = Array.isArray(data?.properties)
    ? data.properties
    : [];
  const [properties, setFilteredProperties] = useState(initialProperties);

  const t = useTranslations();

  // Update state when `data.properties` changes
  useEffect(() => {
    if (Array.isArray(data?.properties)) {
      setFilteredProperties(data.properties);
    }
  }, [data?.properties]);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col  items-start gap-5 mb-5 mt-8">
        <div className="">
          <Fllter
            originalProperties={initialProperties}
            setFilteredProperties={setFilteredProperties}
          />
        </div>
        <span className="text-base text-gray-600">
          <span className="text-black">{data.properties.length} </span>
          {t("agency.results")}
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col w-full xl:w-[75%] gap-8 mb-28">
        {data?.properties?.length > 0 ? (
          properties.map((post, key: number) => {
            const combinedProps = {
              ...post, // Spread all properties from `post`
              CompanyImage: data.image?.url || "",
              userDetails: data.userDetails
            };


            return <PropertiesCard key={key} post={combinedProps} />;
          })
        ) : (
          <p className="no-results">No startups found</p>
        )}
      </div>
    </>
  );
}

export default ShowCards;

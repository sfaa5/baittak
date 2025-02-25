"use client";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

function Cities() {
  const t = useTranslations();
  const locale = useLocale();
  const [data, setData] = useState([]);
  

  useEffect(() => {
    async function fetchCities() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_SERVER}/api/cities`
      );
      const data = await response.json();
      setData(data);
    }
    fetchCities();
  }, []);



  const getRandomProperties = (data) => {
    const shuffled = [...data].sort(() => Math.random() - 0.5); // Shuffle the array
    return shuffled.slice(0, 5); // Get the first 4 random properties
  };

  const randomProperties = getRandomProperties(data);

  return (
    <section className="py-32 container" >
<div className="flex w-full justify-center">

      <div className="flex flex-col items-center gap-16">
        {/* Header Section */}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold text-secondary">
            {t("cities.we are available in many cities & areas").split("<br />")[0]} <br />
          </h1>
          <h1 className="text-3xl font-semibold text-secondary">
            {t("cities.we are available in many cities & areas").split("<br />")[1]}
          </h1>
        </div>

        {/* Grid Section */}
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {randomProperties.map((city, index) => {
            return (
              <div
                key={index}
                className="relative group shadow-lg rounded-[18px] overflow-hidden transition-transform transform"
               
              >
                {/* City Image */}
                <div className="relative h-[350px]">
                  <img
                    className="h-full w-full object-cover"
                    src={city.img.url}
                    alt={city.name}
                  />
                </div>

                <div className="absolute bottom-0 left-0 w-full py-2 bg-white bg-opacity-80 text-center">
                  <p className="text-gray-700 text-sm">
                    {locale === "en" ? city.name.en : city.name.ar}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </section>
  );
}

export default Cities;

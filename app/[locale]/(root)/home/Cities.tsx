"use client";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Cities() {
  const t = useTranslations();
  const locale = useLocale();
  const [data, setData] = useState([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_SERVER}/api/cities`
        );
        const data = await response.json();
        setCount(data.length);
        setData(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }
    fetchCities();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="pt-32 pb-32 sm:pb-40 container"   dir="ltr" >
      <div className="relative flex w-full justify-center"    >
        <div  className="flex flex-col items-center gap-10 md:gap-16 w-full"    >
          {/* Header Section */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-xl md:text-3xl font-semibold text-secondary">
              {
                t("cities.we are available in many cities & areas").split(
                  "<br />"
                )[0]
              }
            </h1>
          </div>

          {/* Navigation Buttons */}
          <div  className="relative w-full flex flex-col justify-between gap-10">
            {/* Grid Section */}
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
              }}
              className="w-full"
               // Set direction based on locale
            >
              <CarouselContent>
                {data.map((city, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/5 cursor-pointer"
                    dir={ `${locale==="ar"?"rtl":"ltr"}`}
                  >
                    <div key={index}>
                      <div className="relative group shadow-lg rounded-[14px] overflow-hidden transition-transform transform">
                        <div className="relative h-[300px] w-full">
                          {/* Image */}
                          <img
                            className="h-full w-full object-cover"
                            src={city.img.url}
                            alt={city.name}
                            loading="lazy"
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(43,43,43,0)] via-[rgba(43,43,43,0.24)] to-[rgba(48,48,48,0.97)]"></div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full py-2 bg-opacity-80 px-5  text-white">
                          <p className="text-[18px] font-semibold">
                            {locale === "en" ? city.name.en : city.name.ar}
                          </p>
                          {city.properties?.length > 0 && (
                            <span className="text-[14px]">
                              {city.properties?.length} {t("header.properties")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="justify-center gap-2 lg:hidden flex">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    current === index + 1 ? "bg-primary" : "bg-gray-400"
                  }`}
                  onClick={() => api && api.scrollTo(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cities;
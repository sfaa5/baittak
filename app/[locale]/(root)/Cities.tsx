import React from "react";
import { useTranslations } from "next-intl";


const cities = [
  {
    name: "DHABI",
    path: "/home/Rectangle 9.png",
  },
  {
    name: "DUBAI",
    path: "/home/Rectangle 10.png",
  },
  {
    name: "SHARJAH",
    path: "/home/Rectangle 11.png",
  },
  {
    name: "AJMAN",
    path: "/home/Rectangle 12.png",
  },
  {
    name: "SHARJAH",
    path: "/home/Rectangle 11.png",
  },
];

function Cities() {
  const  t  = useTranslations(); 
  return (
    <section>
      <div className="container mx-auto flex w-full justify-center py-32">
        <div className="flex flex-col items-center gap-16">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold text-secondary">
              {t("cities.we are available in many cities & areas").split("<br />")[0]} <br />
            </h1>
            <h1 className="text-3xl font-semibold text-secondary">
              {t("cities.we are available in many cities & areas").split("<br />")[1]}
            </h1>
          </div>

          <div className="grid gap-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {cities.map((city, index) => {
              return (
                <div key={index} className="relative">
                  <h3
                    className={`absolute text-2xl font-medium left-1/2 -translate-x-1/2 top-5 ${
                      index % 2 === 0 ? "text-[#DDDDDD]" : "text-secondary"
                    }`}
                  >
                    {t(`cities.${city.name.toLowerCase()}`, city.name)}
                  </h3>
                  <img className="w-full object-cover" src={city.path} alt={city.name} />
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

import React from "react";

import PropertyCard from "@/components/PropertyCard";

function Properties() {
  return (
    <section>
      <div className="container mx-auto flex w-full justify-center  py-32 ">
        <div className="flex flex-col  items-center gap-16">
          <div className="flex flex-col  items-center">
            <h1 className=" text-3xl font-semibold  text-secondary ">
              Letest Properties of Rent
            </h1>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Properties;

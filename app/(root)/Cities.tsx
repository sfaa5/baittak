import React from "react";

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
];

function Cities() {
  return (
    <section>
      <div className="container mx-auto flex w-full justify-center  py-32 ">
        <div className="flex flex-col  items-center gap-16">
          <div className="flex flex-col  items-center">
            <h1 className=" text-3xl font-semibold  text-secondary ">
              We are available in many <br />
            </h1>
            <h1 className=" text-3xl font-semibold text-secondary ">
              Cities & Areas
            </h1>
          </div>

          <div className="grid gap-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cities.map((city, index) => {
              return (
                <div key={index}  className="relative ">
                  <h3
                    className={`absolute text-3xl font-medium left-1/2 -translate-x-1/2 top-5 ${
                      index % 2 === 0 ? "text-[#DDDDDD]" : "text-secondry"
                    }`}
                  >
                    {city.name}
                  </h3>
                  <img className=" w-full object-cover " src={city.path} alt={city.name} />
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

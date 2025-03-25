import { getLocale } from "next-intl/server";
import React from "react";
import axios from "axios";

async function Page() {

  const locale = await getLocale();
  const response = await axios.get(
    `${
      process.env.NEXT_PUBLIC_URL_SERVER
    }/api/terms/getTerm/${"67e195d141ec37c818912593"}`
  );

  const data = response.data;

  console.log(data);

  return (
    <section className="py-16 bg-primary/10 min-h-screen">
      <div className="container mx-auto px-4 2xl:px-[120px]">
        <div className=" mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-">
            {locale === "en" ? data.title.en : data.title.ar}
          </h2>
          <p className="mt-4 text-gray-600">
            {locale === "en" ? data.subtitle.en : data.subtitle.ar}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {locale === "en" ? data.values.title.en : data.values.title.ar}
            </h3>
            <p className="text-gray-600">
              {locale === "en"
                ? data.values.description.en
                : data.values.description.ar}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {locale === "en" ? data.vision.title.en : data.vision.title.ar}
            </h3>
            <p className="text-gray-600">
              {locale === "en"
                ? data.vision.description.en
                : data.vision.description.ar}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {locale === "en" ? data.team.title.en : data.team.title.ar}
            </h3>
            <p className="text-gray-600">
              {locale === "en"
                ? data.team.description.en
                : data.team.description.ar}
            </p>
          </div>
        </div>

        <div className="mt-12 ">
          {data.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold  mb-4">
                {locale === "en" ? section.title.en : section.title.ar}
              </h3>
              <p className="text-gray-600">
                {locale === "en" ? section.content.en : section.content.ar}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Page;

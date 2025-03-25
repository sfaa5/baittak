import { getLocale, getTranslations } from "next-intl/server";
import React from "react";
import axios from "axios";

async function Terms() {

  const locale =await getLocale();

 const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_SERVER}/api/terms/getTerm/${"67e0d56402ed34fa766a1868"}`);

 console.log(response.data)


 const term = response.data;

  return (
    <section className="py-16 bg-primary/5 min-h-screen">
      <div className="container mx-auto px-4 2xl:px-[120px]">
        <div className="mb-12">
          <h2 className="text-3xl md:text-3xl font-semibold text-secondary">
            {locale==="en"? term.title.en: term.title.ar}
          </h2>
          <p className="mt-4 text-gray-600">{locale==="en"? term.subtitle.en:term.subtitle.ar}</p>
        </div>

        <div className="space-y-8">
        {
          term.sections.map((section, index) => (
                    <div key={index}>
            <h3 className="text-lg font-semibold text-primary mb-4">
              {locale==="en"? section.title.en: section.title.ar}
            </h3>
            <p className="text-gray-600">{locale==="en"? section.content.en:section.content.ar}</p>
          </div>
          ))}

    
        </div>
      </div>
    </section>
  );
}

export default Terms;

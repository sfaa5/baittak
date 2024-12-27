
import { Button } from "@/components/ui/button";
import React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/lib/nextAuth";
import Link from "next/link";

 async function Page() {
  const  t  = await getTranslations();
  const session  = await getServerSession(authOptions);
  const locale = await getLocale();
const id = session?.user.id
console.log(id)

const response = await fetch(`http://localhost:5001/api/agency/${id}`)
if (!response.ok) {
  console.error("Failed to fetch data:", response.statusText);
  return (
    <div>
      <h1>{t("company.agentInfo.title")}</h1>
      <p>Failed to load agent data.</p>
    </div>
  );
}
const data = await response.json()

console.log(data)

  return (
    <div>
      <h1 className="h1 py-7">{t("company.agentInfo.title")}</h1>

      <div className="w-full p-8 rounded-lg bg-gray-50">
        <div className="flex justify-between">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {data.image.url?   <img src={data.image.url} alt="agent" className="w-48 h-48" />:     <img src="/company/unknown.png" alt="agent" className="w-48 h-48" />}
        

            <div className="flex flex-col gap-5">
              <h1 className="text-2xl text-secondary font-medium">
           {data.companyName}       {t("company.agentInfo.companyName")}
              </h1>
              <div className="flex items-center gap-3">
                <span className=" text-2xl">{data.Properties?.length | 0 } </span>
                <p className="text-lg text-gray-500">
                  {t("company.agentInfo.activeListing")}
                </p>
              </div>
            </div>
          </div>

        <Link href={`about/${id}`}> <Button variant={"outline"} className="text-green-500 hover:bg-green-500 hover:text-white">
            {t("company.agentInfo.edit")}
          </Button></Link> 
        </div>
        <div className="flex flex-col gap-5 mt-5">

        <div className="md:flex">
            <span className="flex text-lg mr-3 text-gray-500"> {t("company.agentInfo.city")}: </span>
            <p className="text-lg">
             {locale=="ar"? data.city.name.ar : data.city.name.en}
            </p>
          </div>

          <div className="md:flex">
            <span className="flex text-lg mr-3 text-gray-500"> {t("company.agentInfo.address")}: </span>
            <p className="text-lg">
             {data.address}
            </p>
          </div>

          <div className="md:flex">
            <span className="flex text-lg mr-3 text-gray-500">
              {t("company.agentInfo.phoneNumber")}:
            </span>
            <p className="text-lg">{data.phoneNumber}</p>
          </div>

          <div className="md:flex">
            <span className="flex text-lg mr-3 text-gray-500">
              {t("company.agentInfo.email")}:
            </span>
            <p className="text-lg">{data.email}</p>
          </div>

          
          <div className="md:flex">
            <span className="flex text-lg mr-3 text-gray-500">
              {t("company.agentInfo.owner")}:
            </span>
            <p className="text-lg">{data.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

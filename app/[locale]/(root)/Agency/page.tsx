
import AgentCard from "@/components/AgentCard";
import Link from "next/link";
import React from "react";
import { GoSearch } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";

import { getTranslations } from "next-intl/server";
import Search from "./Search";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}




async function Page( { searchParams }: PageProps) {
  const t  = await getTranslations();


  const resolvedSearchParams = await searchParams;
  const queryParams = new URLSearchParams();
  for (const key in resolvedSearchParams) {
    const value = resolvedSearchParams[key];
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v));
    } else if (value !== undefined) {
      queryParams.append(key, value);
    }
  }


  const page = queryParams.get('page') ?? '1';
  const per_page = queryParams.get('per_page') ?? '5';
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const city = queryParams.get('city') ?? '';
  const service = queryParams.get('service') ?? '';


  console.log("iii",city,service)


  const response =await fetch(`http://localhost:5001/api/agency?city=${city}&service=${service}`)

  const data = await response.json();

    console.log("agency",data)

    console.log("in",data)
    console.log("properites",data.data)

  return (
    <>
      {/* Banner Search */}
      <section className="bg-hero-Agency bg-cover w-full h-auto mb-10 py-14">
        <div className="container px-2 2xl:px-[120px] pt-3">
          <div className="flex flex-col gap-8 items-center">
            <h1 className="text-4xl font-medium text-white">
              {t("agency.banner.title")}
            </h1>
<Search/>
  
          </div>
        </div>
      </section>

      {/* Path Section */}
      <section className="container 2xl:px-[120px]">
        <div className="flex flex-col">
          <ul className="flex items-center gap-2 mb-5">
            <li className="flex gap-3">
              <Link href={"/"}>
                <IoHomeSharp className="text-secondary" />
              </Link>
              <MdArrowForwardIos className="text-[#707070]" />
            </li>
            <li className="text-[#707070] flex gap-3 items-center">
              {t("agency.path.current_page")}
              <MdArrowForwardIos className="text-[#707070]" />
            </li>
          </ul>

          {/* Result and Filter Button */}
          <div className="flex justify-between items-center w-full">
            <h3 className="text-xl font-medium">
              {t("agency.results_section.matching_companies_title")}
            </h3>

          </div>

          <span className="text-[#707070]">
       <span>{t("agency.results_section.total_results")}</span>  :   
       {data && data.data ? data.data.length : 0}
          </span>
        </div>
      </section>

      {/* Cards Section */}
      <section className="container 2xl:px-[120px] mt-10 mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-between gap-10 md:gap-14">
{data.data?.length>0?(
  data.data.map((post,key:number)=>(
              <AgentCard post={post} key={key} />
  ))

):(<p className="no-results">No posts found</p>)}




        </div>
      </section>
    </>
  );
}

export default Page;


import ProjectCard from "@/components/ProjectCard";
import Search from "@/components/Search";
import React from "react";


import { FaRegMap } from "react-icons/fa";
import { IoIosArrowDown, IoIosList } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { getTranslations } from "next-intl/server";
import SearchProject from "./SearachProject";
import Sort from "@/components/Sort";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function Page({ searchParams }: PageProps) {
  const  t  = await getTranslations("");

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
  const projectType = queryParams.get('projectType') ?? '';
  const rooms = queryParams.get('rooms') ?? '';
  const purpose = queryParams.get('purpose') ?? '';
  const priceRange = queryParams.get('price') ?? '';

  const sort = queryParams.get('sort') ?? '';

  console.log("iiii",city, projectType, rooms, purpose, priceRange, start, end);


const response = await fetch(`http://localhost:5001/api/projects/get?sort=${sort}&city=${city}&purpose=${purpose}&projectType=${projectType}&bedrooms=${rooms}&page=${page}&per_page=${per_page}&price=${priceRange}`)


const data =await response.json();



// console.log('data',data);



  return (
    <div className="container 2xl:px-[120px]  mx-auto pt-3">  
    <SearchProject />
      <div className="flex gap-4 flex-col mt-5 xl:w-[75%]">
        {/* path */}
        <ul className="flex items-center gap-2 mb-5">
          <li className="flex gap-3">
            <IoHomeSharp className="text-secondary" />
            <MdArrowForwardIos className="text-[#707070]" />
          </li>
          <li className="text-[#707070]"> {t("project.project_title")} </li>
        </ul>

        <h3 className="text-xl font-medium">
          {" "}
          {/* {t("project.projects", { count: 6200 })}{" "} */}
        </h3>

        {/* button of cards */}
        <div className="flex justify-between">
        <Sort/>


          <button className="flex w-[160px]  gap-2 h-[40px] items-center font-normal text-[#707070] rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4">
              <FaRegMap className="h-4 w-4 text-[#707070]" />
              {t("property.map")}
            </button>
   
        </div>

        <div className="flex flex-col gap-8 mb-28">
{data?.projects.length>0?(

  data.projects.map((post,key:number)=>(
    <ProjectCard key={key} post={post} />
))

):(<p className="no-results">No startups found</p>)}
        
       </div>
      </div>
    </div>
  );
}

export default Page;

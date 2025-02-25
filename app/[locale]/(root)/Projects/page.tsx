import ProjectCard from "@/components/ProjectCard";

import React from "react";


import { IoHomeSharp } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { getTranslations } from "next-intl/server";
import SearchProject from "./SearachProject";
import Sort from "@/components/Sort";
import OnMap from "../Property/OnMap";
import PaginationControll from "@/components/PaginationControll";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function Page({ searchParams }: PageProps) {
  const t = await getTranslations("");

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

  const page = queryParams.get("page") ?? "1";
  const per_page = queryParams.get("per_page") ?? "5";
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const city = queryParams.get("city") ?? "";
  const projectType = queryParams.get("projectType") ?? "";
  const rooms = queryParams.get("rooms") ?? "";
  const purpose = queryParams.get("purpose") ?? "";
  const priceRange = queryParams.get("price") ?? "";

  const sort = queryParams.get("sort") ?? "";

  console.log(
    "iiii",
    city,
    projectType,
    rooms,
    purpose,
    priceRange,
    start,
    end
  );

  const response = await fetch(
    `${URL_SERVER}/api/projects/get?sort=${sort}&city=${city}&purpose=${purpose}&projectType=${projectType}&bedrooms=${rooms}&page=${page}&per_page=${per_page}&price=${priceRange}`
  );

  const data = await response.json();

  console.log("data", data);

  return (
    <div className="container 2xl:px-[120px]  mx-auto pt-3 mb-28">
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

        <p className="text-[#707070]" > {data.filterLength} {t("project.project_title")}</p>

        {/* button of cards */}
        <div className="flex justify-between">
          <Sort />

          <OnMap properties={data.projects || []} />
        </div>

        <div className="flex flex-col gap-8 ">
          {data?.projects.length > 0 ? (
            data.projects.map((post, key: number) => (
              <ProjectCard key={key} post={post} />
            ))
          ) : (
            <p className="no-results">No Projects found</p>
          )}
        </div>
        <div className="flex items-center justify-center mb-10 mt-5 px-4 py-3 sm:px-6">
          <PaginationControll
            length={data.totalProjects}
            hasNextPage={data.isNext}
            hasPrevPage={start > 0}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;

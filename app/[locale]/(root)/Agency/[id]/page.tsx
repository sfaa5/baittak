import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoHomeSharp, IoMailOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { getLocale, getTranslations } from "next-intl/server";
import PropertiesCard from "@/components/PropertiesCard";
import Sort from "@/components/Sort";
import Fllter from "../Fllter";
import ShowCards from "../ShowCards";
import { UserFavoritesProvider } from "@/app/context/UserFavoritesContext";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import Mail from "@/components/Mail";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const t = await getTranslations();
  const locale = await getLocale();

  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  const response = await fetch(
    `${URL_SERVER}/api/agency/${id}?userId=${userId}`
  );

  const data = await response.json();

  const userFavorites = data.userFavorites || [];

  console.log("afencyyyy", data);
  return (
    <UserFavoritesProvider initialFavorites={userFavorites}>
      <div className="container px-2 2xl:px-[120px]">
        {/* Path */}
        <ul className="flex items-center gap-2 mt-5 mb-5">
          <li className="flex gap-3">
            <Link href={"/"}>
              <IoHomeSharp className="text-secondary" />
            </Link>
            <MdArrowForwardIos className="text-[#707070]" />
          </li>
          <li className="text-[#707070] flex gap-3 items-center">
            <Link href={"/Agency"}>{t("agency.path.current_page")}</Link>
            <MdArrowForwardIos className="text-[#707070]" />
          </li>
          <li className="text-[#707070] flex gap-3 items-center">
            {data.companyName}
          </li>
        </ul>

        {/* Header */}
        <div
          className={`flex w-full md:h-full h-[450px] flex-col md:flex-row justify-between items-end p-2 md:p-5 border-2 rounded-[0.6rem] bg-gradient-to-r ${
            locale === "ar"
              ? "from-[5%] to-100% to-[#F7F7F7] from-secondary/70"
              : "from-[65%] to-100% from-[#F7F7F7] to-secondary"
          }`}
        >
          <div className="flex flex-col gap-6 items-center md:items-start">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={data.image?.url ? data.image?.url : "/company/unknown.png"}
                alt="agent"
                className="w-32 h-32"
              />
              <div className="flex flex-col gap-5">
                <h1 className="text-2xl text-secondary font-medium">
                  {data.companyName}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{data.properties.length}</span>
                  <p className="text-lg text-gray-500">
                    {t("agency.active_listings")}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:flex">
              <span className="flex text-lg mr-3 text-gray-500">
                {t("agency.address_label")}
              </span>
              <p className="text-lg">{data.address}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex w-auto h-[48px] gap-2 bg-white items-center font-medium text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4">
              <FiPhoneCall className="w-4 h-4" />
              {data.phoneNumber}
            </button>

            <Mail ownerEmail={data.email} title={data.companyName} />
          </div>
        </div>

        {data ? <ShowCards data={data} /> : ""}
      </div>
    </UserFavoritesProvider>
  );
}

export default Page;

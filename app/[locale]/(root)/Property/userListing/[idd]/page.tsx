import React from "react";
import Link from "next/link";

import { FiPhoneCall } from "react-icons/fi";

import { IoHomeSharp } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { getLocale, getTranslations } from "next-intl/server";

import { UserFavoritesProvider } from "@/app/context/UserFavoritesContext";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";

import Mail from "@/components/Mail";
import { Button } from "@/components/ui/button";
import { LuMessagesSquare } from "react-icons/lu";
import ChatButton from "@/components/ChatButton";
import ShowCards from "../../../Agency/ShowCards";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

async function Page({ params }: { params: Promise<{ idd: string }> }) {
  const id = (await params).idd;
  const t = await getTranslations();
  const locale = await getLocale();
  const session = await getServerSession(authOptions as object);
  const userId = session?.user?.id;

  const response = await fetch(
    `${URL_SERVER}/api/users/${id}?userId=${userId}`
  );

  const dataJson = await response.json();

  const data = dataJson.user;

  const userFavorites = dataJson.userFavorites || [];

  console.log("user", dataJson);

  console.log("userAgefter", data);    

  const userDetails = [{
    _id: data._id,
    username: data.username,
    phoneNumber: data.phoneNumber,
    email: data.email,
    image: data.image,
    role: data.role
  }]


  console.log("userDetailsAgeter", userDetails);

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
            <Link href={"/Property"}>{t("header.properties")}</Link>
            <MdArrowForwardIos className="text-[#707070]" />
          </li>

          <li className="text-[#707070] flex gap-3 items-center">
            {data?.username}
          </li>
        </ul>

        {/* Header */}
        <div
          className={
            "flex w-full md:h-full h-full gap-5 flex-col md:flex-row justify-between  md:items-end p-3 md:p-5 border-2 rounded-[0.6rem] bg-gradient-to-r bg-[#F7F7F7] "
          }
        >
          <div className="flex flex-col gap-5 items- md:items-start ">
            <div className="flex flex-row md:items-center gap-4">
              <img
                src={data.image?.url ? data.image?.url : "/company/unknown.png"}
                alt="agent"
                className="rounded-full w-20 h-20 sm:w-32 sm:h-32 "
              />
              <div className="flex flex-col gap-4">
                <h1 className="text-lg sm:text-2xl text-black font-medium">
                  {data.username}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="text-lg sm:text-lg">
                    {data.properties.length}
                  </span>
                  <p className="text-base sm:text-base text-gray-500">
                    {t("agency.active_listings")}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:flex text-base sm:text-lg">
              <span className="flex  mr-3 text-gray-500">
                {t("agency.address_label")}
              </span>
              <p className=" sm:text-lg">{data.address}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 grid-cols-[1fr_1fr] gap-3">
            {/* First Button */}
            <ChatButton
              _id={data._id}
              username={data.username}
              phoneNumber={data.phoneNumber}
              email={data.email}
              image={data.image}
            />

            {/* Second Button */}
            <Mail ownerEmail={data.email} title={data.companyName} />

            {/* Third Button - Expands to full width on small screens */}
            <Button className="hover:bg-gray-100 flex h-[48px] gap-2 bg-white items-center font-medium text-secondary rounded-[.8rem] border-[1px] justify-between px-4 col-span-2 sm:col-span-1">
              <FiPhoneCall className="w-4 h-4" />
              {data.phoneNumber}
            </Button>
          </div>
        </div>
        {data ? <ShowCards data={{ ...data, userDetails }} /> : ""}
      </div>
    </UserFavoritesProvider>
  );
}

export default Page;

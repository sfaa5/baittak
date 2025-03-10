"use client";

import { LuHouse } from "react-icons/lu";
import Cities from "./Cities";
import Properties from "./Properties";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import Sign from "@/components/Sign";
import { useSearchParams, useRouter } from "next/navigation";
import SearchHome from "../../../components/SearchHome";
import { useSession } from "next-auth/react";
import Link from "next/link";


export default function Home() {
  const { status } = useSession();

  const t = useTranslations();
  const searchParams = new URLSearchParams(window.location.search);
  const router = useRouter();
  const parms = useSearchParams();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [landImage, setLandPage] = useState("");

  if (status === "authenticated" && parms.get("login") === "true") {
    searchParams.delete("login");
  }

  useEffect(() => {
    if (parms.get("login") === "true") {
      setShowLoginModal(true);
    }
  }, [parms.toString()]);

  useEffect(() => {
    const getPaner = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_SERVER}/api/panner`
        );
        const data = await res.json();
        console.log(data);

        setLandPage(data[0]?.landPage.url || "");
      } catch (error) {
        console.log(error);
      }
    };

    getPaner();
  }, []);

  const closeModal = () => {
    setShowLoginModal(false);

    // Remove the query parameter from the URL

    searchParams.delete("login");
    router.push("/");
  };

  return (
    <>
      {/* landing */}
      <section
        className="h-[70vh] text- pb-36  bg-cover w-full"
        style={{
          backgroundImage: `url(${landImage})`,
        }}
      >
        <div className="container relative mx-auto h-full flex flex-col gap-36">
          {/* content */}
          <div className="absolute h-96 rounded-full blur"></div>
          <div className="flex relative flex-col  pt-24 gap-3 pl-6 md:pl-0">
            <h1 className="h text-white sm:text-secondary">
              <div
                dangerouslySetInnerHTML={{
                  __html: t("landing.all properties on one place"),
                }}
              />
            </h1>
          </div>

          <div className="w-full flex justify-center  px-0 lg:px-1 xl:px-36 2xl:px-56">
            <div className="relative w-full h-36 bg-[#F5F5F5] bg-opacity-80 flex items-center  rounded-[7px] justify-center flex-wrap">
              {/* top search */}
              <div className="absolute -top-7 left-1/2 transform -translate-x-1/2  bg-secondary text-white flex justify-between items-center w-4/5 md:w-2/3  lg:w-1/3  xl:w-2/4  2xl:w-1/3 px-3 sm:px-6 py-4 rounded-[8px]">
                <Link
                  href="/Property?purpose=rent"
                  className="inline-flex gap-2 text-base font-medium hover:text-primary duration-200"
                >
                  <LuHouse className="size-5 xs:size-6" />
                  <span>{t("landing.rent")}</span>
                </Link>
                <Link
                  href="/Property?purpose=sell"
                  className="inline-flex text-base gap-2 duration-200 font-medium hover:text-primary"
                >
                  <LuHouse className="size-5 xs:size-6" />
                  <span>{t("landing.buy")}</span>
                </Link>
                <Link
                  href="/Projects"
                  className="inline-flex text-base gap-2 duration-200 font-medium hover:text-primary"
                >
                  <LuHouse className="size-5 xs:size-6 items-center" />
                  <span>{t("landing.projects")}</span>
                </Link>
              </div>

              {/* search */}
              <SearchHome />
            </div>
          </div>
        </div>
      </section>

      {/* // Cities and areas */}
      <Cities />

      <Properties />

      {showLoginModal && <Sign onClose={closeModal} />}
    </>
  );
}

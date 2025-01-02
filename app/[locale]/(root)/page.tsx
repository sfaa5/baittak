"use client";

import { LuHome } from "react-icons/lu";
import Cities from "./Cities";
import Properties from "./Properties";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sign from "@/components/Sign";
import { useSearchParams, useRouter } from "next/navigation";
import SearchHome from "../../../components/SearchHome";
import { useSession } from "next-auth/react";


export default function Home() {
  const { data: session,status  } = useSession();

  const path = usePathname()
  const  t  = useTranslations();
  const searchParams = new URLSearchParams(window.location.search);
  const router = useRouter();
  const parms = useSearchParams();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if(status==="authenticated"&&parms.get('login')==='true'){
    searchParams.delete('login')
  }


  useEffect(() => {
    if (parms.get('login') === 'true') {
      setShowLoginModal(true);
    }
  }, [parms.toString()]);

  const closeModal = () => {
    setShowLoginModal(false);

    // Remove the query parameter from the URL

    searchParams.delete('login')
    router.push('/');
  };

  return (
    <>
      {/* // landing */}
      <section className="h-[70vh] text- pb-36 bg-hero-pattern bg-cover w-full">
        <div className="container relative mx-auto h-full flex flex-col gap-36">
          {/* content */}
          <div className="absolute h-96 rounded-full blur"></div>
          <div className="flex relative flex-col pt-24 gap-3 pl-6 md:pl-0">
            <h1 className="h text-white sm:text-secondary">
              <div
                dangerouslySetInnerHTML={{
                  __html: t("landing.all properties on one place"),
                }}
              />
            </h1>
          </div>

          <div className="w-full flex justify-center px-0 xl:px-36">
            <div className="relative w-full h-36 bg-[#F5F5F5] bg-opacity-80 flex items-center px-2 sm:px-8 rounded-[8px] justify-center flex-wrap">
              {/* top search */}
              <div className="absolute -top-7 left-1/5 lg:left-1/3 bg-secondary text-white flex justify-between items-center w-4/5 md:w-4/5 lg:w-1/3 px-3 sm:px-6 py-4 rounded-[8px]">
                <div className="inline-flex gap-2 text-base font-medium hover:text-primary">
                  <LuHome className="size-5 xs:size-6" />
                  <span>{t("landing.rent")}</span>
                </div>
                <div className="inline-flex text-base gap-2 font-medium hover:text-primary">
                  <LuHome className="size-5 xs:size-6" />
                  <span>{t("landing.buy")}</span>
                </div>
                <div className="inline-flex text-base gap-2 font-medium hover:text-primary">
                  <LuHome className="size-5 xs:size-6 items-center" />
                  <span>{t("landing.projects")}</span>
                </div>
              </div>
              
              {/* search */}
        <SearchHome/>

            </div>
          </div>
        </div>
      </section>

      {/* // Cities and areas */}
      <Cities />

      <Properties />


      {showLoginModal && (
        <Sign onClose={closeModal} />
      )}

    </>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { CiFacebook, CiYoutube } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import FoterArabicLogo from "./foter-arabic-logo";
import Link from "next/link";

import { usePathname } from "next/navigation";
import MessageButton from "./MessageButton";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

function Footer() {
  const locale = useLocale();
  const t = useTranslations();
  const path = usePathname();
  const [cities, setCities] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch cities only once when the component mounts
  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}/api/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      } finally {
        setIsFetching(false); // Ensure loading ends
      }
    }

    fetchCities();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <footer className={`bg-secondary mx-auto flex w-full pt-10 bottom-0`}>
      <div
        className={`container mx-auto flex flex-col text-white ${
          path !== "/en" && path !== "/ar" ? "lg:px-[120px]" : ""
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between border-b-2 pb-10">
          {/* Logo */}
          <Link href="/">
            {locale === "ar" ? (
              <FoterArabicLogo />
            ) : (
              <img
                src="home/Baittak LOGO whait.png"
                alt="logo"
                className="w-2/3 sm:w-full h-auto max-w-52 object-contain"
              />
            )}
          </Link>

          <MessageButton />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:gap-0 lg:grid-cols-[0.5fr_0.5fr_2fr] border-b-2 pb-8 mt-8">
          <div className="flex flex-col ">
            <h2 className="text-2xl font-semibold mb-3 text-white">
              {t("footer.contact")}
            </h2>
            <p>{t("footer.email1")}</p>
            <p>{t("footer.email2")}</p>
            <p>{t("footer.email3")}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold lg:-ml-5 mb-3">
              {t("footer.links")}
            </h2>
            <ul className="list-disc ml-4 lg:ml-0">
              <li>{t("footer.contactUs")}</li>
              <li>{t("footer.aboutUs")}</li>
              <li>{t("footer.career")}</li>
              <li>{t("footer.terms")}</li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold lg:-ml-5 mb-3">
              {t("footer.cities")}
            </h2>
            <div className="grid grid-cols-3 gap-5 lg:gap-0 lg:grid-cols-[20%_20%_20%_20%]">
              {isFetching ? (
                <p>Loading cities...</p>
              ) : cities.length === 0 ? (
                <p>Cities not available</p>
              ) : (
                cities.map((city, index) => (
                  <ul key={index} className="list-disc ml-4 lg:ml-0">
                    <li>{locale === "ar" ? city.name.ar : city.name.en}</li>
                  </ul>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between py-5">
          <div className="flex text-xl sm:text-3xl gap-1 sm:gap-3">
            <IoLogoInstagram /> <CiFacebook /> <CiYoutube />
          </div>
          <span className="text-sm sm:text-base">{t("footer.copyright")}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { CiFacebook, CiYoutube } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import FoterArabicLogo from "./foter-arabic-logo";
import { usePathname } from 'next/navigation';

import Link from "next/link";

interface HeaderProps {
  padding?: string; // Define the type of the padding prop
}
function Footer({ padding }: HeaderProps) {
  const { i18n, t } = useTranslation("common");
    const router = usePathname();
  // Type cast the return value of t("footer.citiesList") to an array of strings
  const citiesList = t("footer.citiesList", {
    returnObjects: true,
  }) as string[];

  return (
    <footer className={`bg-secondary mx-auto flex w-full   pt-10  bottom-0 `}>
      <div
        className={`container mx-auto flex flex-col text-white ${router!=="/" && "lg:px-[120]"} `}
      >
        <div className="flex flex-col md:flex-row  items-center justify-between border-b-2  pb-10">
          {/*logo */}
          <Link href="/">
            {i18n.language == "ar" ? (
              <FoterArabicLogo />
            ) : (
              <img
                src="home/Baittak LOGO whait.png"
                alt="logo"
                className="w-2/3  sm:w-full h-auto max-w-52 object-contain"
              />
            )}
          </Link>

          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder={t("footer.contact")}
              className="w-full px-1 sm:px-5 py-6  border rounded-[6px] border-gray-300  focus:outline-none focus:ring-2 focus:ring-black-100"
            />
            <button className="absolute right-2 sm:right-4 bg-primary text-white px-8 sm:px-10 py-2 top-1/2 transform -translate-y-1/2  rounded-[6px] font-medium text-sm ">
              {t("footer.submit")}
            </button>
          </div>
        </div>

        <div className="grid  grid-cols-1 gap-5 lg:gap-0 lg:grid-cols-[0.5fr_0.5fr_2fr]  border-b-2 pb-8 mt-8">
          <div className="flex flex-col ">
            <h2 className="text-2xl font-semibold mb-3 text-white">
              {t("footer.contact")}
            </h2>
            <p>{t("footer.email1")}</p>
            <p>{t("footer.email2")}</p>
            <p>{t("footer.email3")}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold lg:-ml-5  mb-3">
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
            <h2 className="text-2xl font-semibold lg:-ml-5  mb-3">
              {t("footer.cities")}
            </h2>
            <div className="grid grid-cols-3 gap-5 lg:gap-0 lg:grid-cols-[20%_20%_20%_20%] ">
              {citiesList.map((city, index) => (
                <ul key={index} className="list-disc ml-4 lg:ml-0">
                  <li>{city}</li>
                </ul>
              ))}
            </div>
          </div>

          <div className=""></div>
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

"use client";
import React, { useEffect, useState } from "react";
import { CiFacebook, CiYoutube } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import FoterArabicLogo from "./foter-arabic-logo";

import { usePathname } from "next/navigation";
import MessageButton from "./MessageButton";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  const locale = useLocale();
  const t = useTranslations();
  const path = usePathname();
  const [cities, setCities] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

    const [data, setData] = useState({

      emails: { info: "", sales: "", agent: "" },
      socialMedia: { instagram: "", facebook: "", youtube: "" },
      contact: { address: "", phone: "" },   
    
    });

  // Fetch cities only once when the component mounts
  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_SERVER}/api/cities`
        );
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


    useEffect(() => {
      async function getData() {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL_SERVER}/api/contact`
          );
  
          const data = await response.json();
  
          setData(data);
        } catch (error) {
          console.log(error);
        }
      }
  
      getData();
    }, []);

  return (
    <footer className={`bg-secondary mx-auto flex w-full ${["contact-us","terms","aboutUs"].some(subPath => path.includes(subPath)) ? "mt-0" : " mt-24"} bottom-0 pt-10`}>
      <div
        className={`container mx-auto  flex flex-col text-white ${
          path !== "/en" && path !== "/ar" ? "2xl:px-[120px]" : ""
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between border-b-2 pb-10">
          {/* Logo */}
          <Link href="/">
            {locale === "ar" ? (
              <FoterArabicLogo />
            ) : (
              <Image
                src="/home/Baittak LOGO whait.png"
                alt="logo"
                className="-ml-4"
                width={170}
                height={150}
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
            <ul className=" text-sm flex flex-col gap-2">
            <li>{data.emails?.info}</li>
            <li>{data.emails?.sales}</li>
            <li>{data.emails?.agent}</li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold   mb-3">
              {t("footer.links")}
            </h2>
            <ul className=" text-sm flex flex-col gap-2">
              <li>
                <Link href={"/contact-us"}>{t("footer.contactUs")}</Link>
              </li>
              <li>
                <Link href={"/aboutUs"}>{t("footer.aboutUs")}</Link>
              </li>

              <li>
                <Link href={"/terms"}>{t("footer.terms")}</Link>
              </li>

              <li>
                <Link href={"/blogs"}>{t("blogs.blogs")}</Link>
              </li>

            </ul>
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold  mb-3">
              {t("footer.cities")}
            </h2>
            <div className="grid grid-cols-3 gap-2  lg:grid-cols-[20%_20%_20%_20%]">
              {isFetching ? (
                <p>Loading cities...</p>
              ) : cities.length === 0 ? (
                <p>Cities not available</p>
              ) : (
                cities.map((city, index) => (
                  <ul key={index} className=" ml-4 lg:ml-0">
                    <Link href={`/Property?city=${city.name.en}`}>
                      <li>{locale === "ar" ? city.name.ar : city.name.en}</li>
                    </Link>
                  </ul>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between py-5">
          <div className="flex text-xl sm:text-3xl gap-1 sm:gap-3">
           <Link href={`${data.socialMedia?.instagram} `}><IoLogoInstagram /></Link>  <Link href={`${data.socialMedia?.facebook}`}><CiFacebook /></Link>  <Link href={`${data.socialMedia?.youtube}`}> <CiYoutube /></Link>
          </div>
          <span className="text-sm sm:text-base">{t("footer.copyright")}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

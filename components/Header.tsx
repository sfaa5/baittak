"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from 'next/navigation';
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

import BaittaklogoArabic from "./ArabicLogo";
import EnglishLogo from "./EnglishLogo";
import {useLocale} from "next-intl";


function Header() {
  const  t  = useTranslations();
  const router = usePathname();
  const locale = useLocale();
console.log(router)


  return (
    <header className=" py-3  font-work-sans border-b-[1px]">
      <div
        className={`container px-2 mx-auto flex justify-between items-center ${router!=="/"&& "lg:px-[120px]"}  `}
      >
        {/* mobile button */}
        <div className=" xl:hidden  ">
          <Link href={"/User/AddPost"}>
            <button className="bg-primary px-2 py-2 rounded-[0.3rem] font-semibold text-xs">
              {t("header.post property")}
            </button>
          </Link>
        </div>

        {/*logo */}
        <Link href="/">
          {locale == "ar" ? <BaittaklogoArabic /> : <EnglishLogo />}
        </Link>

        {/* desktop nav */}
        <div className="hidden xl:flex items-center ">
          <Navbar />
          <Link href="/contact"></Link>
        </div>

        {/* {mobile nav} */}
        <div className="xl:hidden">
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
}

export default Header;

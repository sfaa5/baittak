"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from 'next/navigation';
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

import BaittaklogoArabic from "./ArabicLogo";
import EnglishLogo from "./EnglishLogo";
import {useLocale} from "next-intl";


import useListenMessages from "@/hooks/useListenMessage";


function Header() {
  
  const  t  = useTranslations();
  const router = usePathname();
  const locale = useLocale();
  console.log("header",router);
  useListenMessages();
  // useNotification();
  



  return (
    <header className=" pt-3 pb-  font-work-sans border-b-[1px]">
      <div
        className={`container  px-4 mx-auto flex justify-between items-center ${router!=="/en"&& router!=="/ar"? "2xl:px-[120px]":""}`}
      >
        {/* mobile button */}
        <div className=" xl:hidden ">
          <Link href={"/User/AddPost"}>
            <button className="bg-primary px-2 py-2 rounded-[0.3rem] font-semibold text-xs">
              {t("header.post property")}
            </button>
          </Link>

          
        </div>

        {/*logo */}
        <Link href="/"  >
          {locale == "ar" ? <div className="-mr-8"> <BaittaklogoArabic where="user" /></div> : <EnglishLogo />}
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

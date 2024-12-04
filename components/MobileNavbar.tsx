"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import BaittaklogoArabic from "./ArabicLogo";
import EnglishLogo from "./EnglishLogo";
import { CiHeart } from "react-icons/ci";
import { FaSignInAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

function MobileNavbar() {
  const { t, i18n } = useTranslation("common");
  const pathname = usePathname();

  // Links are created dynamically with the `t` function.
  const links = [
    {
      name: t("header.properties"),
      path: "/Property",
    },
    {
      name: t("header.projects"),
      path: "/Projects",
    },
    {
      name: t("header.agency"),
      path: "/Agency",
    },
    {
      name: t("header.profile"),
      path: "/User/Posts",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-secondry" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div className="mt-5 mb-10 text-center text-2xl">
          <Link href="/">
            {i18n.language == "ar" ? <BaittaklogoArabic /> : <EnglishLogo />}
          </Link>
        </div>
        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => {
            return (
              <Link
                href={link.path}
                key={index}
                className={`${
                  link.path === pathname
                    ? "text-secondry border-b-2 border-secondry"
                    : ""
                } text-xl capitalize hover:text-primary transition-all`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="flex flex-col gap-8 items-center border-t-[2px] pt-6">
            <Link href="">
     
              <div className="flex items-center  gap-2 ">
                <TfiWorld /> <LanguageSwitcher />
              </div>
            </Link>
            <Link href="/">
      
              <div className="flex items-center gap-2 ">
                <CiHeart /> <span>{t("header.favorites")}</span>
              </div>
            </Link>

            <Link href="/Company/about">
  
              <div className="flex items-center  gap-2">
                <FaCircleUser /> <span>{t("header.agent login")}</span>
              </div>
            </Link>
            <Link href="/">
           
              <div className="flex items-center  gap-2 ">
                <FaSignInAlt /> <span>{t("header.sign up")}</span>
              </div>
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavbar;

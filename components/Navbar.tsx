"use client";
import { Link } from "@/i18n/routing";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";

import SignInWithGoogle from "./SignInWithGoogle";
import { useSession } from "next-auth/react";

import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocalSwitcher";
import { SignAgency } from "@/app/[locale]/auth/SignAgency";
import SignOut from "./SignOut";
import { usePathname } from "next/navigation";

import { Skeleton } from "./ui/skeleton";

const Navbar = () => {
  const t = useTranslations("header");
  const { data: session,status } = useSession();

  const pathname = usePathname(); // Get the current path
  const [activeLink, setActiveLink] = useState("");

  // Normalize and set the active link based on the current pathname
  useEffect(() => {
    setActiveLink(decodeURIComponent(pathname));
  }, [pathname]);

  return (
    <nav className="flex justify-between items-center ">
      <div className="flex flex-col gap-4 ">
        <div className="flex gap-8 justify-end">
          <LocaleSwitcher />

          <Link
            href={"/User/Favorit"}
            className="flex items-center gap-2 cursor-pointer"
          >
            <CiHeart /> <span>{t("favorites")}</span>
          </Link>

     
          { 
       status === 'loading'?     <div className="flex items-center gap-2 px-4 py-2  border border-gray-300 rounded-lg text-gray-800 ">
      <Skeleton className="h-6 w-6 rounded-full" />
    
      
        <Skeleton className="h-2 w-[80px]" />
      </div>:session ? <SignOut user={session?.user} /> : <SignInWithGoogle />
   }


  {/*  > */}
          {session?.user?.role == "agency" ? (
            <Link className="mt-2" href="/Company/about">
              {t("company")}
            </Link>
          ) : (
            <SignAgency />
          )}
        </div>

        <div className="flex gap-20">
          <div className="text-center grid grid-cols-4 w-[510px]">
            {/* Property Link */}
            <Link
              className={`text-black-100 text-lg pb-3 border-b-2 ${
                activeLink.includes("/Property") || activeLink.includes("/العقارات")
                  ? "border-secondary font-medium text-secondary"
                  : "border-transparent hover:border-secondary hover:font-medium hover:text-secondary"
              } duration-200`}
              href="/Property"
            >
              {t("properties")}
            </Link>

            {/* Projects Link */}
            <Link
              className={`text-black-100 text-lg pb-3 border-b-2 ${
                activeLink.includes("/Projects") || activeLink.includes("/المشاريع")
                  ? "border-secondary font-medium text-secondary"
                  : "border-transparent hover:border-secondary hover:font-medium hover:text-secondary"
              } duration-200`}
              href="/Projects"
            >
              {t("projects")}
            </Link>

            {/* Agency Link */}
            <Link
              className={`text-black-100 text-lg pb-3 border-b-2 ${
                activeLink.includes("/Agency") || activeLink.includes("/الوكيل")
                  ? "border-secondary font-medium text-secondary"
                  : "border-transparent hover:border-secondary hover:font-medium hover:text-secondary"
              } duration-200`}
              href="/Agency"
            >
              {t("agency")}
            </Link>

            {/* Profile Link */}
            {session?.user.role !== "agency" && (
              <Link
                className={`text-black-100 text-lg pb-3 border-b-2 ${
                  activeLink.includes("/User/Posts") 
                    ? "border-secondary font-medium text-secondary"
                    : "border-transparent hover:border-secondary hover:font-medium hover:text-secondary"
                } duration-200`}
                href="/User/Posts"
              >
                {t("profile")}
              </Link>
            )}
          </div>

          {/* Post Property Button */}
          <Link href={"/User/AddPost"}>
            <button className="bg-primary px-5 py-1 hover:bg-primary/80 duration-300 rounded-[6px] font-medium text-[16px]">
              {t("post property")}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

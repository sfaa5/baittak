"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import BaittaklogoArabic from "./ArabicLogo";
import EnglishLogo from "./EnglishLogo";
import { CiHeart } from "react-icons/ci";

import { useLocale } from "next-intl";
import SignInWithGoogle from "./SignInWithGoogle";
import { Skeleton } from "./ui/skeleton";
import SignOut from "./SignOut";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SignAgency } from "@/app/[locale]/auth/SignAgency";
import LocaleSwitcher from "./LocalSwitcher";

function MobileNavbar() {
  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

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
    <Sheet open={isOpen} onOpenChange={setIsOpen} >
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-secondry" />
      </SheetTrigger>

      <SheetContent className="flex flex-col">

        {/*logo*/}
        <div className="mt- mb-4 mx-auto text-center text-2xl">
          <Link href="/">
            {locale == "ar" ? <BaittaklogoArabic /> : <EnglishLogo />}
          </Link>
        </div>

        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8">

          {links.map((link, index) => {
            return (
              <Link
              onClick={() => setIsOpen(false)}
                href={link.path}
                key={index}
                className={`${
                  link.path === pathname
                    ? "text-secondry border-b-2 border-secondry"
                    : ""
                } text-lg capitalize hover:text-primary transition-all`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="flex flex-col gap-8 items-center border-t-[2px] pt-6">
            {status === "loading" ? (
              <div className="flex items-center gap-2 px-4 py-2  border border-gray-300 rounded-lg text-gray-800 ">
                <Skeleton className="h-6 w-6 rounded-full" />

                <Skeleton className="h-2 w-[80px]" />
              </div>
            ) : session ? (
              <SignOut user={session?.user} />
            ) : (
              <div onClick={() => setIsOpen(false)}>
               
                <SignInWithGoogle />
              </div>
            )}

          
          <LocaleSwitcher />
            

            <Link href="/User/Favorit">
              <div onClick={() => setIsOpen(false)} className="flex items-center gap-2 ">
                <CiHeart /> <span>{t("header.favorites")}</span>
              </div>
            </Link>

            {session?.user?.role == "agency" ? (
              <Link onClick={() => setIsOpen(false)} className="mt-2" href="/Company/about">
                {t("header.company")}
              </Link>
            ) : (
              <SignAgency />
            )}
          </div>
          
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavbar;

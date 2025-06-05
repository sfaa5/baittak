"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import BaittaklogoArabic from "./ArabicLogo";
import EnglishLogo from "./EnglishLogo";
import { useLocale } from "next-intl";
import useListenMessages from "@/hooks/useListenMessage";

import Sign from "@/components/Sign";
import useShowSign from "@/hooks/useShowSign";
import { useEffect, useState } from "react";

function Header() {
  const t = useTranslations();
  const router = usePathname();
  const locale = useLocale();
  console.log("header", router);
  useListenMessages();

  const { closeModal, showLoginModal } = useShowSign();

  const [dir, setDir] = useState("");

  useEffect(() => {
    const updateDir = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1280) {
        setDir("ltr");
      }
    };

    updateDir(); // Set initial value
    window.addEventListener("resize", updateDir);
    return () => window.removeEventListener("resize", updateDir);
  }, []);

  return (
    <header className=" pt-3 pb-  font-work-sans border-b-[1px]">
      <div
        className={`container  px-4 mx-auto flex justify-between items-center ${
          router !== "/en" && router !== "/ar" ? "2xl:px-[120px]" : ""
        }`}
      >
        {/*logo */}
        <Link href="/" className="hidden xl:flex">
          {locale == "ar" ? (
            <div className="-mr-8">
              {" "}
              <BaittaklogoArabic where="user" />
            </div>
          ) : (
            <EnglishLogo />
          )}
        </Link>

        <div dir="rtl" className="container xl:hidden flex justify-between items-center px-1 mx-auto">
          {/* {mobile nav} */}
          <div className="xl:hidden">
            <MobileNavbar />
          </div>

          {/*logo */}
          <Link href="/">
            {locale == "ar" ? (
              <div className="-mr-0">
                {" "}
                <BaittaklogoArabic where="user" />
              </div>
            ) : (
              <EnglishLogo />
            )}
          </Link>

          {/* mobile button */}
          <div className=" xl:hidden ">
            <Link href={"/User/AddPost"}>
              <button className="bg-primary px-2 py-2 rounded-[0.3rem] font-semibold text-xs">
                {t("header.post property")}
              </button>
            </Link>
          </div>
        </div>

        {/* desktop nav */}
        <div className="hidden xl:flex items-center ">
          <Navbar />
          <Link href="/contact"></Link>
        </div>
      </div>

      {showLoginModal && <Sign onClose={closeModal} />}
    </header>
  );
}

export default Header;

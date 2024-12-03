
import Link from "next/link";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaSignInAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Navbar = () => {

  const { t, i18n } = useTranslation("common");


  return (

      <nav className="flex justify-between items-center ">
   

        <div className="flex flex-col  gap-4 ">
          <div className="flex gap-8 justify-end">

            <Link href="" > <div className="flex items-center  gap-2" ><TfiWorld /> <LanguageSwitcher /> </div></Link>
            <Link href="/" > <div className="flex items-center gap-2 " ><CiHeart />  <span>{t("header.favorites")}</span></div> </Link>

            <Link href="/Company/about" > <div className="flex items-center  gap-2" ><FaCircleUser />  <span>{t("header.agent login")}</span></div> </Link>
            <Link href="/" > <div className="flex items-center  gap-2 " ><FaSignInAlt /> <span>{t("header.sign up")}</span></div>  </Link>

          </div>

          <div className="flex items-center justify-between gap-20">

            <div dir={`${i18n.language==="ar"?"rtl":""}`} className="flex gap-16">
              <Link className="text-secondary font-medium text-lg" href="/Property">{t("header.properties")}</Link>
              <Link className="text-secondary font-medium text-lg" href="/Projects">{t("header.projects")}</Link>
              <Link className="text-secondary font-medium  text-lg" href="/Agency">{t("header.agency")}</Link>
              <Link className="text-secondary font-medium  text-lg" href="/User/Posts">{t("header.profile")}</Link>


            </div>
            <Link href={"/User/AddPost"}>
            <button className="bg-primary px-5 py-1 rounded-[6px] font-medium text-lg"> {t("header.post property")}</button></Link>
          </div>



        </div>
      </nav>
 
  );
};

export default Navbar;

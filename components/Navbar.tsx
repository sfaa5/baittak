
import {Link} from "@/i18n/routing";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";

import SignInWithGoogle from "./SignInWithGoogle";
import { useSession } from "next-auth/react";

import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocalSwitcher";
import { SignAgency } from "@/app/[locale]/auth/SignAgency";
import SignOut from "./SignOut";



const Navbar = () => {

  

  const  t = useTranslations("header");
  const { data: session } = useSession();

console.log('session',session)

  return (

      <nav className="flex justify-between items-center "  >
   




        <div className="flex flex-col  gap-4 ">

          <div className="flex gap-8 justify-end">
             <LocaleSwitcher/>
          
             <div className="flex items-center gap-2 cursor-pointer" ><CiHeart />  <span>{t("favorites")}</span></div>
             {session ? <SignOut user={session?.user}/>  :<SignInWithGoogle/>}


           
            
      
             {session?.user?.role=="agency"? <Link href='/Company/about'>الشركة</Link>  : <SignAgency/> } 

          </div>

          <div className="flex items-center justify-between gap-20">
{/* dir={`${i18n.language==="ar"?"rtl":""}`} */}
            <div  className="flex gap-16">
              <Link className="text-secondary font-medium text-lg" href='/Property'>{t("properties")}</Link>
              <Link className="text-secondary font-medium text-lg" href="/Projects">{t("projects")}</Link>
              <Link className="text-secondary font-medium  text-lg" href="/Agency">{t("agency")}</Link>
              {session?.user.role!=="agency"&& 
              <Link href="/User/Posts" className="text-secondary font-medium  text-lg">{t("profile")}</Link>
              
              }




            </div>
            <Link href={"/User/AddPost"}>
            <button className="bg-primary px-5 py-1 rounded-[6px] font-medium text-lg"> {t("post property")}</button></Link>
          </div>



        </div>
      </nav>
 
  );
};

export default Navbar;

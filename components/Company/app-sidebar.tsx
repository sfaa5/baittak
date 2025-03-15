"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { House, Mail, Package2, LayoutDashboard, Building } from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {useLocale} from "next-intl";
import EnglishLogo from "../EnglishLogo";
import BaittaklogoArabic from "../ArabicLogo";
import { Button } from "../ui/button";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "next-auth/react";

import { usePathname } from "next/navigation";
import useGetUnReadCount from "@/hooks/useGetUnReadCount";


export function AppSidebar() {
  const [activeItem, setActiveItem] = useState<string>("");
  const  t = useTranslations();
  const locale = useLocale();
  const {totalUnreadMessages}=useGetUnReadCount()
  const pathname = usePathname(); 


  // Determine sidebar alignment based on language direction.
  const sidebarPosition = locale === "ar" ? "right" : "left";


    // Normalize and set the active link based on the current pathname
    useEffect(() => {
      setActiveItem(decodeURIComponent(pathname));
    }, [pathname]);

  // Menu items with translated titles.
  const items: { title: string; url: string; icon: JSX.Element }[] = [
    {
      title: t("company.Information"),
      url: "/Company/about",
      icon: <LayoutDashboard />,
    },
    {
      title: t("company.Properties"),
      url: "/Company/Properties",
      icon: <Building />,
    },

    {
      title: t("company.Project"),
      url: "/Company/project",
      icon: <House />,
    },
    {
      title: t("company.Messages"),
      url: "/Company/messages",
      icon: <Mail />,
    },
    {
      title: t("company.requests"),
      url: "/Company/requests",
      icon: <Mail />,
    },
    {
      title: t("company.Package"),
      url: "/Company/Plan",
      icon: <Package2 />,
    },

  ];

 

  const handleItemClick = (title: string) => {
    setActiveItem(title);
  };

  return (
    <Sidebar side={sidebarPosition}>
      <SidebarHeader />
      <SidebarContent>
        <div className="flex justify-center mb-10">
          <Link href="/">
            {locale === "ar" ? <BaittaklogoArabic  where="agency" /> : <EnglishLogo />}
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {items.map((item, key) => (
            <Link href={item.url } key={key} className="block">
              <Button
                variant={"default"}
              
                size={"lg"}
                className={`w-full flex items-center bg-[#FAFAFA] shadow-none text-secondary hover:text-white  hover:bg-primary/100  justify-start gap-4 ${
                  activeItem.includes(item.url)  ? "bg-primary text-white" : ""
                }`}
                onClick={() => handleItemClick(item.url)}
              >
                {item.icon} <span>{item.title}</span>
                {item.url.includes("/Company/messages")&& totalUnreadMessages>0 && <span className={`${activeItem===t("company.Messages")?" bg-white text-primary":"bg-primary text-white"}  text-sm text-center rounded-full w-5 h-5  `}>
                {totalUnreadMessages}
              </span>}
              </Button>
            </Link>
          ))}
        </div>
      </SidebarContent>
      
      <SidebarFooter >  <div className="flex  justify-start items-start   p-4 border-t border-gray-300">
      <Button
      onClick={ ()=>signOut()}
       
        className="flex items-center justify-start gap-2 w-full text-secondary  hover:text-white bg-transparent hover:bg-secondary/80 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out shadow-md"
      >
        <IoIosLogOut size={20} />
        <span className="text-md font-medium">{t("table.Log_Out")}</span>
      </Button>
    </div> </SidebarFooter>
    </Sidebar>
  );
}

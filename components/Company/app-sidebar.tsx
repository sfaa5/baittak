"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { FaCircleUser } from "react-icons/fa6";
import { House, Mail, Package2, LayoutDashboard, Building } from "lucide-react";
import { FaSignInAlt } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import EnglishLogo from "../EnglishLogo";
import BaittaklogoArabic from "../ArabicLogo";
import { Button } from "../ui/button";

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const { i18n, t } = useTranslation("common");

  // Determine sidebar alignment based on language direction.
  const sidebarPosition = i18n.language === "ar" ? "right" : "left";

  // Menu items with translated titles.
  const items = [
    {
      title: t("company.Information"),
      url: "about",
      icon: <LayoutDashboard />,
    },
    {
      title: t("company.Properties"),
      url: "Properties",
      icon: <Building />,
    },
    {
      title: t("company.Agents"),
      url: "#",
      icon: <FaCircleUser />,
    },
    {
      title: t("company.Project"),
      url: "project",
      icon: <House />,
    },
    {
      title: t("company.Messages"),
      url: "messages",
      icon: <Mail />,
    },
    {
      title: t("company.Package"),
      url: "Plan",
      icon: <Package2 />,
    },
    {
      title: t("company.Logout"),
      url: "#",
      icon: <FaSignInAlt />,
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
          <Link href={"/"}>
            {i18n.language === "ar" ? <BaittaklogoArabic /> : <EnglishLogo />}
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          {items.map((item, key) => (
            <Link href={item.url} key={key} className="block">
              <Button
                variant={"company"}
                size={"lg"}
                className={`w-full flex items-center gap-5 ${
                  activeItem === item.title ? "bg-primary text-white" : ""
                }`}
                onClick={() => handleItemClick(item.title)}
              >
                {item.icon} <span>{item.title}</span>
              </Button>
            </Link>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

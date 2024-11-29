"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { FaCircleUser } from "react-icons/fa6";
import { House } from "lucide-react";
import { Mail } from "lucide-react";
import { Package2 } from "lucide-react";
import { FaSignInAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { LayoutDashboard } from "lucide-react";

import { Building } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Menu items.
const items = [
  {
    title: "Information",
    url: "about",
    icon: <LayoutDashboard />,
  },
  {
    title: "Properties",
    url: "Properties",
    icon: <Building />,
  },
  {
    title: "Agents",
    url: "#",
    icon: <FaCircleUser />,
  },
  {
    title: "Project",
    url: "project",
    icon: <House />,
  },
  {
    title: "Messages",
    url: "messages",
    icon: <Mail />,
  },
  {
    title: "Package",
    url: "Plan",
    icon: <Package2 />,
  },
  {
    title: "Logout",
    url: "#",
    icon: <FaSignInAlt />,
  },
];

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (title: string) => {
    setActiveItem(title);
  };
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <div className="flex  justify-center w-full">

          <img
            src="/BaittakLOGO1 2.png"
            alt="logo"
            className="object-contain w-44 mt-6 mb-20"
          />
        </div>
<div className="flex flex-col gap-6"> {items.map((i, key) => (
          <Link href={i.url} key={key} className="block">
            <Button
              variant={"company"}
              size={"lg"}
              key={key}
              className={`w-full flex items-center gap-5 ${
                activeItem === i.title ? "bg-primary text-white" : ""
              }`}
              onClick={() => handleItemClick(i.title)}
            >
              {i.icon} <span>{i.title}</span>
            </Button>
          </Link>
        ))}</div>
       
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

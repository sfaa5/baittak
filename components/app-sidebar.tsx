import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { FaCircleUser } from "react-icons/fa6";
import { House } from "lucide-react";
import { Mail } from "lucide-react";
import { Package2 } from "lucide-react";
import { FaSignInAlt } from "react-icons/fa";
import { Button } from "./ui/button";
import { LayoutDashboard } from 'lucide-react';

import { Building } from 'lucide-react';
import Link from "next/link";

// Menu items.
const items = [
    {
        title: "Information",
        url: "about",
        icon: <LayoutDashboard/>,
      },
  {
    title: "Properties",
    url: "Properties",
    icon: <Building/>,
  },
  {
    title: "Agents",
    url: "#",
    icon: <FaCircleUser/>,
  },
  {
    title: "Project",
    url: "#",
    icon: <House/>,
  },
  {
    title: "Messages",
    url: "#",
    icon: <Mail/>,
  },
  {
    title: "Package",
    url: "#",
    icon:< Package2/>,
  },
  {
    title: "Logout",
    url: "#",
    icon: <FaSignInAlt/>,
  },
];

export function AppSidebar() {
    return (
   
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
<div className="flex  justify-center w-full">  <img
            src="/BaittakLOGO1 2.png"
            alt="logo"
            className="object-contain w-44 mt-6 mb-20"
          /></div>
      


          {items.map((i, key) => (
            <Link          href={i.url}
            key={key}
            className="block" >
            <Button variant={"company"} size={"lg"} key={key} className="w-full flex items-center gap-3"> 
          { i.icon}      <span>{i.title}</span> 
            </Button></Link>
          ))}
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>




    );
  }

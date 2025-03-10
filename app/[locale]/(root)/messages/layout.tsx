"use client"
import Sidebar from "@/components/sidebarMessage/Sidebar";
import Buttons from "../User/Buttons";
import { useEffect } from "react";
import { useSharedState } from "@/app/context/stateProvider";


export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { setShowSidebar } = useSharedState();
  useEffect(()=>{
    return setShowSidebar(true)
  },[])
  
  return (
    <div className="container 2xl:px-[120px] flex flex-col pt-5 gap-5  ">
      <Buttons />

      <div className="relative flex flex-row h-[74vh] shadow-lg border-primary border-[1px] rounded-lg bg-gray-400  backdrop-filter backdrop-blur-lg bg-opacity-0 overflow-hidden">
        <Sidebar />
        {children}
      </div>

    </div>
  );
}

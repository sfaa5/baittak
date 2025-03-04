"use client"
import Sidebar from "@/components/sidebarMessage/Sidebar";
import Buttons from "../User/Buttons";


export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <div className="container 2xl:px-[120px] flex flex-col pt-5 gap-5">
      <Buttons />

      <div className="flex flex-row sm:h-[450px] md:h-[550px] rounded-lg   bg-gray-400  backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        {children}
      </div>

    </div>
  );
}

"use client"
import Sidebar from "@/components/sidebarMessage/Sidebar";
import useListenMessages from "@/hooks/useListenMessage";



export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
   

      <div className="flex flex-row h-[85vh] my-4 rounded-lg border-primary border-[1px]  shadow-lg bg-gray-400  backdrop-filter backdrop-blur-lg bg-opacity-0 overflow-hidden">
        <Sidebar />
        {children}
      </div>

 
  );
}

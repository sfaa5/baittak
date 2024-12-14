import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UserCard from "@/components/UserCard";
import React from "react";
import Buttons from "./Buttons";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">

      <div className="container flex  flex-col xl:flex-row 2xl:px-[120px] mt-8 gap-8">
        <UserCard />

        <div className="flex flex-col w-full xl:w-2/3 items-start gap-10">
      
          <Buttons /> {children}
        </div>
      </div>


    </main>
  );
}

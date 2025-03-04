import UserCard from "@/components/UserCard";
import React from "react";
import Buttons from "./Buttons";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = getSession();
  if (!session) {
    redirect("/");
  }
  return (
    <main className="font-work-sans">
      <div className="container flex  flex-col xl:flex-row 2xl:px-[120px] mt-8 gap-8">
        <UserCard />

        <div className="flex flex-col w-full xl:w-2/3 items-start gap-7">
          <Buttons />
           {children}
        </div>
      </div>
    </main>
  );
}

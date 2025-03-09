"use client";

import React from "react";


import { useTranslations } from "next-intl";


type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const t = useTranslations(); // Load translations



  return (
    
      <div className="flex gap-10 flex-col md:flex-row mt-4">

        <div className="w-full ">{children}</div>
      </div>
  
  );
}

export default Layout;

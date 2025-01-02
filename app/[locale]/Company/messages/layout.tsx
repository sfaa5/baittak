"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Star } from 'lucide-react';
import { useTranslations } from "next-intl";
import { useSharedState } from '@/app/context/stateProvider';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const  t  = useTranslations(); // Load translations
  const {dataRequest, setDataRequest} = useSharedState();
  const {starRequest,setStarRequest}=useSharedState();
  const {allRequest,setAllRequest}=useSharedState();

  const AllData = dataRequest;

  // Track which button is "clicked"
  const {activeButton, setActiveButton} = useSharedState();

  // Function to filter requests that are starred
  const handleStarClick = () => {
    setDataRequest(starRequest);
    setActiveButton("starred"); // Set active button
  };

  // Function to show all requests (clear the filter)
  const handleInboxClick = () => {
    setDataRequest(allRequest); 
    setActiveButton("inbox"); // Set active button
  };

  return (
    <main className="w-full mt-8">
      <h1 className="h1 py-0">{ t("company.inbox")}</h1>

      <div className="flex flex-col md:flex-row mt-10">
        <div className='w-full md:w-1/4 h-[50%] p-10 bg-white flex flex-col items-center gap-5 rounded-[0.6rem] shadow-lg'>
          <div className='flex flex-col w-full gap-3'>
            <p className='font-medium'>{ t("company.my_email")}</p>
            <div>
              <Button
                size={"lg"}
                className={`bg-white text-black-100 w-full ${activeButton === "inbox" ? "bg-primary bg-opacity-70 text-white" : "hover:bg-primary hover:bg-opacity-70"} active:bg-opacity-90 transition-all duration-150`}
                // onClick={handleInboxClick}
              >
                <Mail /> {t("company.inbox")} <span className="ml-20 font-normal">{allRequest.length}</span>
              </Button>
            </div>
            {/* <div>
              <Button
                size={"lg"}
                className={`bg-white text-black-100 w-full ${activeButton === "starred" ? "bg-primary bg-opacity-70 text-white" : "hover:bg-primary hover:bg-opacity-70"} active:bg-opacity-90 transition-all duration-150`}
                onClick={handleStarClick}
              >
                <Star /> {t("company.starred")} <span className="ml-20 font-normal">{starRequest.length}</span>
              </Button>
            </div> */}
          </div>
        </div>

        <div className="w-full md:w-3/4">
          {children}
        </div>
      </div>
    </main>
  );
}

export default Layout;

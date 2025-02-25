"use client"
import { Button } from '@/components/ui/button';
import React from 'react';
import { Mail } from 'lucide-react';

import { useTranslations } from "next-intl";
import { useSharedState } from '@/app/context/stateProvider';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const  t  = useTranslations(); // Load translations

  const {allRequest}=useSharedState();


  // Track which button is "clicked"
  const {activeButton } = useSharedState();





  return (
    <main className="w-full mt-8">


      <div className="flex gap-10 flex-col md:flex-row mt-10">

        <div className='hidden w-full md:w-1/4 h-[50%] p-10 bg-white xl:flex flex-col items-center gap-5 rounded-[0.6rem] shadow-lg'>
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

          </div>
        </div>

        <div className="w-full  xl:w-3/4">
          {children}
        </div>

      </div>


    </main>
  );
}

export default Layout;

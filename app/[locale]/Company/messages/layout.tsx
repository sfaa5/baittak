"use client"
import { Button } from '@/components/ui/button';
import React from 'react';
import { Mail } from 'lucide-react';
import { Star } from 'lucide-react';
import { Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation("common"); // Load translations

  return (
    <main className="w-full mt-8">
      <h1 className="h1 py-0">{ t("company.inbox")}</h1>

      <div className="flex flex-col md:flex-row mt-10">
        <div className='w-full md:w-1/4 p-10 bg-white flex flex-col items-center gap-5 rounded-[0.6rem] shadow-lg'>
          <div className='w-full px-14'>
            <Button className='bg-primary text-white w-full' size={"lg"}>{ t("company.compose")}</Button>
          </div>

          <div className='flex flex-col w-full gap-3'>
            <p className='font-medium'>{ t("company.my_email")}</p>
            <div>
              <Button size={"lg"} className='bg-white text-black-100 w-full hover:bg-primary hover:bg-opacity-70'>
                <Mail /> { t("company.inbox")} <span className='ml-20 font-normal'>1500</span>
              </Button>
            </div>
            <div>
              <Button size={"lg"} className='bg-white text-black-100 w-full hover:bg-primary hover:bg-opacity-70'>
                <Star /> { t("company.starred")} <span className='ml-20 font-normal'>15</span>
              </Button>
            </div>
            <div>
              <Button size={"lg"} className='bg-white text-black-100 w-full hover:bg-primary hover:bg-opacity-70'>
                <Send /> { t("company.sent")} <span className='ml-20 font-normal'>2000</span>
              </Button>
            </div>
          </div>
        </div>

        <div className=" w-full md:w-3/4">
          {children}
        </div>
      </div>
    </main>
  );
}

export default Layout;

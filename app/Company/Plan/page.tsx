import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

function page() {
  return (
    <div>
      <h1 className="h1 py-0 mt-5">Select your Ad Packages</h1>

      <div className="flex border-2 mt-5 p-4 rounded-[0.5rem] justify-between">
        <div className="text-2xl ">
          <h1 className="mb-28">
            You are currently subscribed to <br /> the{" "}
            <span className="text-primary font-medium">PREMIUM</span> package
          </h1>
          <div className="text-gray-500">
            <span className="text-primary font-medium">20 :</span> Days Untill
            Epiration
          </div>
        </div>

        <div className="flex flex-col shadow-md text-xl items-center gap-7 p-5 rounded-[0.5rem]">
          <div>
            <h2 className="text-primary">Premium</h2>
            <p className="text-lg">60 days</p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-primary text-2xl font-medium">$55</span>
            <p className="text-red-500">21% off regular price</p>
            <span className="text-base">2 Months</span>
          </div>
        </div>
      </div>

      <div className="flex mt-10">
        <div className="flex flex-col w-2/3 gap-7">
          <div className="flex shadow-lg p-6  rounded-[0.4rem] justify-between">
            <div className="flex items-center gap-5">   
                 <Checkbox id="terms2" />
              <div className="flex flex-col  ">
            

                <label
                  htmlFor="terms2"
                  className="text-2xl text-primary  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Premium
                </label>  
                  
                   <span className="text-red-400 text-base mt-1">Save 39%</span>
              </div>
         
            </div>
          
           <div className="flex flex-col items-end text-lg"> <div className="flex items-center"><p className="text-primary text-2xl font-medium">$180</p> <span className="text-lg text-gray-600" > - 6 Months</span></div>   <p >$30/ <span className="text-gray-600">Month</span></p></div> 
          
          </div>

          <div className="flex shadow-lg p-6  rounded-[0.4rem] justify-between">
            <div className="flex items-center gap-5">   
                 <Checkbox id="terms2" />
              <div className="flex flex-col  ">
            

                <label
                  htmlFor="terms2"
                  className="text-2xl text-secondary  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Standard
                </label>  
                  
                   <span className="text-red-400 text-base mt-1">Save 39%</span>
              </div>
         
            </div>
          
           <div className="flex flex-col items-end text-lg"> <div className="flex items-center"><p className="text-secondary text-2xl font-medium">$180</p> <span className="text-lg text-gray-600" > - 6 Months</span></div>   <p >$30/ <span className="text-gray-600">Month</span></p></div> 
          
          </div>




          <div className="flex shadow-lg p-6  rounded-[0.4rem] justify-between">
            <div className="flex items-center gap-5">   
                 <Checkbox id="terms2" />
              <div className="flex flex-col  ">
            

                <label
                  htmlFor="terms2"
                  className="text-2xl text-black-100  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Base
                </label>  
                  
                   <span className="text-red-400 text-base mt-1">Save 39%</span>
              </div>
         
            </div>
          
           <div className="flex flex-col items-end text-lg"> <div className="flex items-center"><p className="text-black-100 text-2xl font-medium">$180</p> <span className="text-lg text-gray-600" > - 6 Months</span></div>   <p >$30/ <span className="text-gray-600">Month</span></p></div> 
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

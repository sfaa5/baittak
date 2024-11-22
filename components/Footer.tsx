import React from "react";
import { CiFacebook, CiYoutube } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";

function Footer() {
  return (
    <footer className=" bg-secondary mx-auto flex w-full   pt-10 ">
      <div className="container mx-auto flex flex-col text-white">

        <div className="flex flex-col md:flex-row  items-center justify-between border-b-2  pb-10">
          <img
            src="home/Baittak LOGO whait.png"
            alt="logo"
            className="w-2/3  sm:w-full h-auto max-w-52 object-contain"
          />

          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Enter your email address"
              className="w-full px-5 py-6  border rounded-[6px] border-gray-300  focus:outline-none focus:ring-2 focus:ring-black-100"
            />
            <button className="absolute right-4 bg-primary text-white px-10 py-2 top-1/2 transform -translate-y-1/2  rounded-[6px] font-medium text-sm ">
              Submit
            </button>
          </div>
        </div>

        <div className="grid  grid-cols-1 gap-5 lg:gap-0 lg:grid-cols-[0.5fr_0.5fr_2fr]  border-b-2 pb-8 mt-8">
            <div className="flex flex-col ">
                <h2 className="text-2xl font-semibold mb-3 text-white" >Contact</h2>
                <p className="">Info@Baittak.com</p>
                <p className="">sales@Baittak.com</p>
                <p className="">agent@Baittak.com</p>
            </div>

            <div className="flex flex-col">
                <h2 className="text-2xl font-semibold lg:-ml-5  mb-3" >Links</h2>
                <ul className="list-disc ml-4 lg:ml-0">
                    <li>CONTACT US</li>
                    <li>APOUT US</li>
                    <li>CAREER</li>
                    <li>TERMS</li>
                </ul>
            </div>

            <div className="flex flex-col">
                <h2 className="text-2xl font-semibold lg:-ml-5  mb-3" >Cities</h2>
                <div className="grid grid-cols-3 gap-5 lg:gap-0 lg:grid-cols-[20%_20%_20%_20%] ">


                <ul className="list-disc ml-4 lg:ml-0">
                    <li>Abo Dhabi</li>
                    <li>Dubai</li>
                    <li>Abo Dhabi</li>
                    <li>Dubai</li>
                    <li>Abo Dhabi</li>
                    <li>Dubai</li>


                </ul>
                <ul className="list-disc">
                    <li>Abo Dhabi</li>
                    <li>Dubai</li>
                    <li>Abo Dhabi</li>
                    <li>Dubai</li>
                    <li>Abo Dhabi</li>
                    <li>Dubai</li>
                   

                </ul>
                <ul className="list-disc">
                    <li>Abo Dhabi</li>
                    <li>Dubai</li>
                    <li>Abo Dhabi</li>
                    <li>Dubai</li>
                    <li>Abo Dhabi</li>
                    <li>Dubai</li>
                   

                </ul>


                </div>

            </div>



            <div className=""></div>
        </div>

        <div className="flex justify-between py-5">
            <div className="flex text-2xl gap-3"><IoLogoInstagram /> <CiFacebook /> <CiYoutube /></div>
            <span>©2024 Baittal.com. All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

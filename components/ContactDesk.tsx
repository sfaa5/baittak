"use client"
import React, { useState } from 'react'
import { FiPhoneCall } from 'react-icons/fi'
import { IoMailOutline } from 'react-icons/io5'
import { FaWhatsapp } from 'react-icons/fa'
import { useTranslations } from 'next-intl';

function ContactDesk({user}:{user:{phoneNumber:string,email:string}}) {
  const  t  = useTranslations();
  const [showNumber, setShowNumber] = useState(false);

  return (
          <div className="contact-buttons hidden md:flex gap-2 w-1/3 justify-center items-center">
            <button  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from bubbling up to the Link
                    e.preventDefault();
                    setShowNumber(!showNumber);}} className="flex w-auto h-[45px] gap-2 items-center font-semibold bg-red-500 text-white rounded-[.8rem] justify-between px-3">
              <FiPhoneCall className="w-5 h-5" />
              {showNumber ? user.phoneNumber : t("contact.Call")}
          
            </button>
            <button className="flex gap-2 w-auto h-[45px] items-center font-semibold bg-[#1F4454] bg-opacity-25 text-secondary rounded-[.8rem] justify-between px-3">
              <IoMailOutline className="w-5 h-5" />
              {t("contact.Mail")}
            </button>
            <button   onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from bubbling up to the Link
                    e.preventDefault();
                    window.open(`https://wa.me/${user.phoneNumber}`, "_blank");
                  }} className="flex gap-2 w-auto h-[45px] items-center font-semibold bg-primary bg-opacity-60 text-black rounded-[.8rem] justify-between px-3">
              <FaWhatsapp className="w-5 h-5" />
              {t("contact.Whatsup")}
            </button>
          </div>
  )
}

export default ContactDesk
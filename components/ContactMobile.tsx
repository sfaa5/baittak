"use client"
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import React from 'react'
import { FaWhatsapp } from 'react-icons/fa';
import { IoMailOutline } from 'react-icons/io5';
import { LuMessagesSquare } from 'react-icons/lu';
import { Button } from './ui/button';
import Mail from './Mail';


function ContactMobile({user,title}:{
    user: {
        _id: string;
        username: string;
        phoneNumber: string;
        email: string;
        image: { url: string };
      };
      title: string;
}) {

    const t = useTranslations();

    const { data: session } = useSession();
    const router = useRouter();
  
     const chatWith = () => {
      if (session.user.id === user._id) return;
      const data = {
        image: { url: user?.image?.url },
        username: user.username,
        _id: user._id,
      };
      localStorage.setItem("chat-user", JSON.stringify(data));
      router.push("/messages");
    };

  return (
              <div className="mobile-buttons text-sm lg:hidden fixed bottom-0 left-0 w-full bg-white flex gap-2 p-2 z-50">
              <Button
              onClick={() => {
                chatWith();
              }}
              className="flex gap-2  w-full h-[45px] items-center font-semibold bg-primary bg-opacity-60 text-black rounded-[.8rem] justify-center px-3"
            >
              <LuMessagesSquare className="w-5 h-5" />
              {t("contact.chat")}
            </Button>
            <Mail title={title} />
                <Button
                   onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from bubbling up to the Link
                    e.preventDefault();
                    window.open(`https://wa.me/${user.phoneNumber}`, "_blank");
                  }}
                className="flex gap-2 w-full h-[45px] items-center font-semibold bg-primary bg-opacity-60 text-black rounded-[.8rem] justify-center px-3">
                  <FaWhatsapp className="w-5 h-5" />
                  {t("contact.Whatsup")}
                </Button>
              </div>
  )
}

export default ContactMobile
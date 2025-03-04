"use client";
import React from "react";


import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Mail from "./Mail";
import { Button } from "./ui/button";
import Image from "next/image";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LuMessagesSquare } from "react-icons/lu";

function ContactDesk({
  user,
  title,
}: {
  user: {
    _id:string;
    username: string;
    phoneNumber: string;
    email: string;
    image: { url: string };
  };
  title: string;
}) {
  const t = useTranslations();

 
  const { data: session } = useSession();
  const router =useRouter()

  const chatWith=()=>{
    if (session.user.id === user._id) return;
    const data ={
      image:{url:user?.image?.url},
      username:user.username,
      _id:user._id,
    }
    localStorage.setItem("chat-user", JSON.stringify(data));
    router.push("/messages")


  }

  return (
    <div className="flex  flex-col w-1/3 lg:flex border p-3 gap-8  right-0 top-6 mt-6 rounded-md shadow-sm sticky ">
      <div className="flex gap-4">
        <Image
          width={56}
          height={56}
          className="rounded-full"
          alt="user avatar"
          src={
            user.image?.url ||
            "/messageImage.png"
          }
        />
        <div className="flex flex-col">
        <span className="text-black">{user.username}</span>
        <span>{user.phoneNumber}</span>
        </div>

      </div>

      <div className="contact-buttons hidden lg:flex gap-2  justify-stretch">
      <Button
          onClick={() => {
            chatWith()
   
          }}
          className="flex gap-2  w-full h-[45px] items-center font-semibold bg-primary bg-opacity-60 text-black rounded-[.8rem] justify-startpx-3"
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
          className="flex gap-2  w-full h-[45px] items-center font-semibold bg-primary bg-opacity-60 text-black rounded-[.8rem] justify-center px-3"
        >
          <FaWhatsapp className="w-5 h-5" />
          {t("contact.Whatsup")}
        </Button>
      </div>
    </div>
  );
}

export default ContactDesk;

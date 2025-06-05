"use client";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { Button } from "./ui/button";
import Mail from "./Mail";
import Link from "next/link";
import Image from "next/image";

function ContactMobile({
  user,
  title,
  post,
}: {
  user: {
    _id: string;
    username: string;
    phoneNumber: string;
    email: string;
    image: { url: string };
  };
  title: string;
  post: {
    title: string;
    _id: string;
    price: string;
    images: [url: string];
    currency: string;
    rentaltype: string;
  };
}) {
  const t = useTranslations();

  const { data: session,status } = useSession();
  const router = useRouter();

  const chatWith = () => {
    if (status==="unauthenticated"){
      router.push(`?login=true`);
      return;
    }
    if (session.user.id === user._id) return;

    const data = {
      image: { url: user?.image?.url },
      username: user.username,
      post: post,
      _id: user._id
    };
    localStorage.setItem("chat-user", JSON.stringify(data));
    router.push("/messages");
  };

  return (
     <Link href={`userListing/${user._id}`} className="flex-col bg-[#e9f7e1]  mobile-buttons text-sm lg:hidden fixed bottom-0 left-0 w-full  flex gap-2 p-2 z-50">


      <div className="flex gap-4 items-center">
        <Image
          width={46}
          height={46}
          className="rounded-full"
          alt="user avatar"
          src={user.image?.url || "/messageImage.png"}
        />
        <div className="flex flex-col text-sm">
          <span className="text-black ">{user.username}</span>
          <span>{user.phoneNumber}</span>
        </div>
      </div>

      <div className="contact-buttons  flex gap-2  justify-stretch">
      <Button
        onClick={(e) => {
          e.stopPropagation(); // Prevent the click from bubbling up to the Link
          e.preventDefault();
          chatWith();
        }}
        className="flex gap-2  w-full h-[45px] items-center font-semibold bg-primary bg-opacity-60 text-black rounded-[.8rem] justify-center px-3"
      >
        <LuMessagesSquare className="w-5 h-5" />
        {t("contact.chat")}
      </Button>

      <div
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
      <Mail title={title} /></div>


      <Button
        onClick={(e) => {
          e.stopPropagation(); // Prevent the click from bubbling up to the Link
          e.preventDefault();
          window.open(`https://wa.me/${user.phoneNumber}`, "_blank");
        }}
        className="flex gap-2 w-full h-[45px] items-center font-semibold bg-primary bg-opacity-60 text-black rounded-[.8rem] justify-center px-3"
      >
        <FaWhatsapp className="w-5 h-5" />
        {t("contact.Whatsup")}
      </Button>
      </div>
    </Link>
  );
}

export default ContactMobile;

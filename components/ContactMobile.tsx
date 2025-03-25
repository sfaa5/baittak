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

  const { data: session } = useSession();
  const router = useRouter();

  const chatWith = () => {
    if (status==="unauthenticated"){
      router.push(`/?login=true`);
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
     <Link href={`userListing/${user._id}`} className="hover:bg-gray-50 mobile-buttons text-sm lg:hidden fixed bottom-0 left-0 w-full bg-white flex gap-2 p-2 z-50">
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
        className="flex gap-2 w-full h-[45px] items-center font-semibold bg-primary bg-opacity-60 text-black rounded-[.8rem] justify-center px-3"
      >
        <FaWhatsapp className="w-5 h-5" />
        {t("contact.Whatsup")}
      </Button>
    </Link>
  );
}

export default ContactMobile;

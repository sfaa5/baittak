"use client";
import React from "react";

import { useTranslations } from "next-intl";

import { Button } from "./ui/button";


import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LuMessagesSquare } from "react-icons/lu";


function ChatButton(user: {
  _id: string;
  username: string;
  phoneNumber: string;
  email: string;
  image: { url: string };
}) {
  const t = useTranslations();

  const { data: session } = useSession();
  const router = useRouter();

  const chatWith = () => {

    if (session?.user?.id === user._id) return;
    
    const data = {
      image: { url: user?.image?.url },
      username: user.username,
      _id: user._id,
    };
    localStorage.setItem("chat-user", JSON.stringify(data));
    router.push("/messages");
  };

  return (
    <Button
      onClick={() => {
        chatWith();
      }}
      className="flex gap-2  w-full h-[45px] items-center font-semibold bg-primary bg-opacity-80  text-white rounded-[.8rem] justify-startpx-3"
    >
      <LuMessagesSquare className="w-5 h-5" />
      {t("contact.chat")}
    </Button>
  );
}

export default ChatButton;

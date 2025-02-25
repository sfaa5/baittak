"use client";
import React, { useState } from "react";
import { FiPhoneCall } from "react-icons/fi";

import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Mail from "./Mail";
import { Button } from "./ui/button";

function ContactDesk({
  user,
  title,
}: {
  user: { phoneNumber: string; email: string };
  title: string;
}) {
  const t = useTranslations();
  const [showNumber, setShowNumber] = useState(false);

  return (
    <div className="contact-buttons hidden lg:flex gap-2 w-1/3 justify-center items-center">
      <Button
        onClick={(e) => {
          e.stopPropagation(); // Prevent the click from bubbling up to the Link
          e.preventDefault();
          setShowNumber(!showNumber);
        }}
        className="flex w-auto h-[45px] gap-2 items-center font-semibold bg-red-500 text-white rounded-[.8rem] justify-between px-3"
      >
        <FiPhoneCall className="w-5 h-5" />
        {showNumber ? user.phoneNumber : t("contact.Call")}
      </Button>
      <Mail title={title} />
      <Button
        onClick={(e) => {
          e.stopPropagation(); // Prevent the click from bubbling up to the Link
          e.preventDefault();
          window.open(`https://wa.me/${user.phoneNumber}`, "_blank");
        }}
        className="flex gap-2 w-auto h-[45px] items-center font-semibold bg-primary bg-opacity-60 text-black rounded-[.8rem] justify-between px-3"
      >
        <FaWhatsapp className="w-5 h-5" />
        {t("contact.Whatsup")}
      </Button>
    </div>
  );
}

export default ContactDesk;

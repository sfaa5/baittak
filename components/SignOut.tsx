"use client"
import { useConversationContext } from "@/app/context/ConversationProvider";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useGetUnReadCount from "@/hooks/useGetUnReadCount";

import { signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { FaRegMessage } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { RiUserFill } from "react-icons/ri";


 function SignOut({ user }) {
  const t = useTranslations();
  const {totalUnreadMessages}=useGetUnReadCount()
  const { data: session } = useSession();
  const locale =useLocale();
  const isRTL = locale === "ar";


  return (
    <div className="relative inline-block">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100">
            {/* User Image or Icon */}
            {user?.image ? (
              <img
                src={user.image}
                alt="user"
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <RiUserFill />
            )}

            {/* User Name */}
            <span className="text-sm font-medium">{user?.name || "User"}</span>

            {/* Notification Dot (conditionally visible) */}
            {totalUnreadMessages > 0 && (
              <span className="absolute top-0 -left-3 transform translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-primary border-2 border-white rounded-full  shadow-md"></span>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-lg rounded-md py-1 ">
          <Link href={session.user.role === "user" ? "/messages" : "/Company/messages"}>
            <DropdownMenuItem dir={isRTL ? "rtl" : "ltr"}  className="flex w-full items-center gap-2 px-2 py-2 hover:bg-gray-100 cursor-pointer">
              <FaRegMessage size={20} />
              <span className="text-sm font-medium">
                {t("header.messages")}
              </span>
              <span className="text-sm text-center rounded-full w-5 h-5 text-white bg-primary">
                {totalUnreadMessages}
              </span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            onClick={() => signOut()}
            className="flex w-full items-center gap-2 px-2 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <IoIosLogOut size={20} />
            <span className="text-sm font-medium">{t("table.Log_Out")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SignOut;

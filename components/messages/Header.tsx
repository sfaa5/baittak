import { useConversationContext } from "@/app/context/ConversationProvider";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";

function Header() {
  const { selectedConversation } = useConversationContext();
  return (
    <Link href={`/Property/${selectedConversation.post._id}`}>
    <div className="flex px-[11px] hover:bg-[#d8cfbf] transition-all duration-500 cursor-pointer justify-between items-center border-b-[1px]  py-2 border-gray-400">
      <div className="flex gap-3">
        <div className="w-18 h-12 overflow-hidden rounded-sm">
          <Image
            src={selectedConversation.post.images[0].url || "/messageImage.png"}
            width={36}
            height={36}
            className=" w-full h-full object-cover "
            alt="user avatar"
          />
        </div>

        <div className="flex flex-col justify-between">
          <span> {selectedConversation.post.title}</span>
          <span className="text-sm">
            {selectedConversation.post.price}{" "}
            {selectedConversation.post.currency}{" "}
            <span className="text-gray-700">
              {selectedConversation.post.rentaltype}
            </span>
          </span>
        </div>
      </div>

      <MdOutlineArrowForwardIos />
    </div></Link>
  );
}

export default Header;

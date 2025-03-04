import { useConversationContext } from "@/app/context/ConversationProvider";
import { extractTime } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Message = ({ message }) => {
  const { data: session } = useSession();
  const { selectedConversation } = useConversationContext();

  const fromMe = message.senderId === session.user.id;
  const chatClassName = fromMe ? "self-end flex-row-reverse" : "self-start";
  const profilePic = fromMe
    ? session.user.image
    : selectedConversation?.image?.url ;
  const bubleBgColor = fromMe ? "bg-[#D1F4CC]" : "bg-white";
  const chatTail = !fromMe
    ? "-rotate-[88deg] -bottom-[1px]  -left-1 text-white"
    : "-rotate-[200deg] -bottom-[3px] -right-[3px] text-[#D1F4CC]";

  const shakeClass= message.shouldShake ? 'shake' : "";

  return (
    <div className={`flex gap-3  ${chatClassName}`}>
      <div className=" avatar">
        <div className="">
          <Image
            src={profilePic || '/messageImage.png' }
            width={36}
            height={36}
            className="rounded-full"
            alt="user avatar"
          />
        </div>
      </div>

      <div
        className={`relative flex gap-2 px-3 py-2 rounded-md  ${shakeClass} ${bubleBgColor}`}
      >
        <span className={`text-black text-sm place-self-center`}>
          {message.message}
        </span>
        <span className="chat-footer opacity-50 text-xs flex gap-1 items-end">
       
         { extractTime(message.createdAt)}
        </span>

        {/* SVG Tail */}
        <svg
          className={`absolute  ${chatTail} w-4 h-4`}
          viewBox="0 0 10 10"
        >
          <polygon points="1,10 10,4 0,0" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};
export default Message;

import { useConversationContext } from "@/app/context/ConversationProvider";
import { useSocketContext } from "@/app/context/SocketContext";
import useReadMessage from "@/hooks/useReadMessage";
import Image from "next/image";
import { useMemo } from "react";

// STARTER CODE SNIPPET
const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation } = useConversationContext();
  const { readMessage } = useReadMessage();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = useMemo(
    () => onlineUsers.includes(conversation._id),
    [onlineUsers, conversation._id]
  );

  const seen = async (conversation) => {
    await readMessage(conversation);
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-gray-200 rounded p-2 py-2 cursor-pointer
				${isSelected ? "bg-gray-200" : "bg-white"}
				`}
        onClick={() => seen(conversation)}
      >
        <div className="relative">
          {isOnline && (
            <div
              className={`w-[8px] h-[7px] bg-primary rounded-full absolute z-10 
        ${
          conversation.image?.url
            ? "-right-[1px] top-[2px]"
            : "right-[4px] top-[5px]"
        }`}
            ></div>
          )}
          <div>
            <Image
              width={35}
              height={35}
              className="rounded-full object-cover aspect-square"
              src={conversation.image?.url || "/messageImage.png"}
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-medium text-gray-700">{conversation.username}</p>
            {conversation.unreadMessagesCount > 0 && (
              <span className="text-sm text-center rounded-full w-5 h-5 text-white bg-primary">
                {conversation.unreadMessagesCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {!lastIdx && !isSelected && <div className="border-t mx-3 border-gray-300 "></div>}
    </>
  );
};
export default Conversation;

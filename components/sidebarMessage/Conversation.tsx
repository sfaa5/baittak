import { useConversationContext } from "@/app/context/ConversationProvider";
import { useSocketContext } from "@/app/context/SocketContext";
import useDeleteMessage from "@/hooks/useDeleteMessage";
import useReadMessage from "@/hooks/useReadMessage";
import Image from "next/image";
import { useMemo } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { IoPersonRemoveOutline } from "react-icons/io5";

// STARTER CODE SNIPPET
const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation } = useConversationContext();
  const { readMessage } = useReadMessage();
  const { deleteMessage } = useDeleteMessage();
  const isSelected = selectedConversation?.convId === conversation.convId;
  const { onlineUsers } = useSocketContext();

  const isOnline = useMemo(
    () => onlineUsers.includes(conversation?._id),
    [onlineUsers, conversation?._id]
  );

  const seen = async (conversation) => {
    await readMessage(conversation);
  };

  const remove = async (conversation) => {
    await deleteMessage(conversation);
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

            <div className="flex gap-4 items-center">
              {conversation.unreadMessagesCount > 0 && (
                <span className="text-sm text-center rounded-full w-5 h-5 text-white bg-primary">
                  {conversation.unreadMessagesCount}
                </span>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger className=" focus:outline-none">
                  <SlOptionsVertical color="gray" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(conversation);
                    }}
                    className="text-sm py-1 px-1 cursor-pointer hover:bg-gray-200 focus:outline-none flex gap-1 items-center"
                  >
                    <IoPersonRemoveOutline /> delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {!lastIdx && !isSelected && (
        <div className="border-t mx-3 border-gray-300 "></div>
      )}
    </>
  );
};
export default Conversation;

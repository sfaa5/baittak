"use client";
import React, {  useEffect } from "react";
import MessageInput from "../../../../components/messages/MessageInput";
import Messages from "../../../../components/messages/Messages";
import { TiMessages } from "react-icons/ti";
import { useConversationContext } from "@/app/context/ConversationProvider";

import { useSession } from "next-auth/react";


function Page() {


  const { selectedConversation, setSelectedConversation } =
    useConversationContext();
    // useListenMessages();
 
  useEffect(() => {
    // Cleanup function
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] w-full flex  flex-col bg-[#EFEAE2]  backdrop-blur-lg ">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-[#F0F2F5] px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-medium">
              {selectedConversation.username}
            </span>
          </div>


            <Messages />
   
			
            <MessageInput />
    
        </>
      )}
    </div>
  );
}

export default Page;

const NoChatSelected: React.FC = () => {


  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-600 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

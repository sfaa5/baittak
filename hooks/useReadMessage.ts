"use client";

import { useSession } from "next-auth/react";

import { useConversationContext } from "@/app/context/ConversationProvider";
import { useIsMobile } from "./use-mobile";
import { useSharedState } from "@/app/context/stateProvider";
import { useSocketContext } from "@/app/context/SocketContext";

const useReadMessage = () => {
  const { socket } = useSocketContext();
  const { setSelectedConversation, setTotalUnreadMessages } = useConversationContext();
  const {setShowSidebar,ShowSidebar}=useSharedState()
  const isMobile = useIsMobile();
  const {data:session}=useSession();

  const readMessage = async (conversation) => {

    const senderId = conversation._id;
    const receiverId = session.user.id;

    setSelectedConversation(conversation);

    if(isMobile) {
      setShowSidebar(false)
    }
      
    console.log("ismobile",isMobile);
    console.log("showSid",ShowSidebar);

    socket?.emit("markAsSeen", receiverId, senderId);

    await setTotalUnreadMessages(
      (prev) => 
        conversation.unreadMessagesCount > 0 ? 0 : prev - conversation.unreadMessagesCount
    );
    conversation.unreadMessagesCount = 0;



  };

  return { readMessage };
};

export default useReadMessage;

"use client";

import { useSession } from "next-auth/react";
import useAxiosAuth from "./useAxiosAuth";
import { toast } from "./use-toast";
import { useConversationContext } from "@/app/context/ConversationProvider";
import { useIsMobile } from "./use-mobile";
import { useSharedState } from "@/app/context/stateProvider";

const useReadMessage = () => {
  const axiosAuth = useAxiosAuth();
  const { setSelectedConversation,selectedConversation, setTotalUnreadMessages } = useConversationContext();
  const {setShowSidebar,ShowSidebar}=useSharedState()
  const isMobile = useIsMobile()

  const readMessage = async (conversation) => {
    const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;
    const senderId = conversation._id;

    setSelectedConversation(conversation);

    if(isMobile) {
      setShowSidebar(false)
    }
      
    console.log("ismobile",isMobile);
    console.log("showSid",ShowSidebar)

    await setTotalUnreadMessages(
      (prev) => 
        conversation.unreadMessagesCount > 0 ? 0 : prev - conversation.unreadMessagesCount
    );
    conversation.unreadMessagesCount = 0;


    try {
      const res = await axiosAuth.put(`${URL_SERVER}/api/messages/read`, {
        senderId,
      });
      if (res.status !== 201 && res.status !== 200) {
        throw new Error(res.data);
      }
    } catch (error) {
      toast({
        description: "something went wrong",
        className: "bg-red-500 text-white p-4 rounded shadow-lg",
      });
      console.log(error);
    }
  };

  return { readMessage };
};

export default useReadMessage;

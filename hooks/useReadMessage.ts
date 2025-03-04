"use client"

import { useSession } from "next-auth/react"
import useAxiosAuth from "./useAxiosAuth";
import { toast } from "./use-toast";
import { useConversationContext } from "@/app/context/ConversationProvider";

const useReadMessage=()=>{
  

    const axiosAuth = useAxiosAuth();
      const { setSelectedConversation ,setTotalUnreadMessages} = useConversationContext();

    const readMessage=async (conversation)=>{
        const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;
        const senderId = conversation._id;
        setSelectedConversation(conversation)
     await setTotalUnreadMessages((prev)=>prev-conversation.unreadMessagesCount)
        conversation.unreadMessagesCount = 0;

        try {
            
            const res = await axiosAuth.put(`${URL_SERVER}/api/messages/read`,{senderId});
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

    }

    return{ readMessage}
}

export default useReadMessage
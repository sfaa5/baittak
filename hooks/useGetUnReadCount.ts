import { useConversationContext } from "@/app/context/ConversationProvider";

import { useEffect } from "react";
import { toast } from "./use-toast";
import useAxiosAuth from "./useAxiosAuth";


function useGetUnReadCount() {
  const { setTotalUnreadMessages, totalUnreadMessages } =
    useConversationContext();
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axiosAuth.get(`/api/messages/unReadCount`);

        console.log("response",response)

     if(response.status===401){
      return
     }

        if (response.status !== 200) {
          toast({
            description: "something went wrong up",
            className: "bg-red-500 text-white p-4 rounded shadow-lg",
          });

          return;
        }

        setTotalUnreadMessages(response.data.totalUnreadCount);
      } catch (error) {
        console.log(error);
        if(error.response.status===401||error.response.status===403) return
        toast({
          description: "something went wrong",

          className: "bg-red-500 text-white p-4 rounded shadow-lg",
        });
      }
    };

    fetchUnreadCount();
  }, []);

  return { totalUnreadMessages };
}

export default useGetUnReadCount;

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

        if (response.status !== 200) {
          throw new Error("Failed to fetch user data");
        }

        setTotalUnreadMessages(response.data.totalUnreadCount);
      } catch (error) {
        toast({
          description: error,
          className: "bg-red-500 text-white p-4 rounded shadow-lg",
        });
      }
    };

    fetchUnreadCount();
  }, [setTotalUnreadMessages]);

  return { totalUnreadMessages };
}

export default useGetUnReadCount;

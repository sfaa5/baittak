import { useEffect, useState } from "react";

import { useConversationContext } from "@/app/context/ConversationProvider";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "./use-toast";
const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } =
    useConversationContext();
  const axiosAuth = useAxiosAuth();
  const post = selectedConversation?.post?._id;

  console.log("slectedConversation", selectedConversation);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axiosAuth.get(
          `/api/messages/${selectedConversation?._id}${
            post ? `?postId=${post}` : ""
          }`
        );

        if (res.data.error) throw new Error(res.data.error);
        setMessages(res.data);
      } catch (error) {
        if(error.response.status===401||error.response.status===403) return
        toast({
          description: error,
          className: "bg-red-500 text-white p-4 rounded shadow-lg",
        });
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [
    selectedConversation?.convId,
    setMessages,
    selectedConversation?.post?._id,
  ]);

  return { messages, loading };
};
export default useGetMessages;

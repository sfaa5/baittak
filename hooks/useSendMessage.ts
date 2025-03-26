import { useConversationContext } from "@/app/context/ConversationProvider";
import { useState } from "react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "./use-toast";
import { useSession } from "next-auth/react";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const {
    messages,
    setMessages,
    selectedConversation,
    conversations,
    setConversations,
  } = useConversationContext();
  const axiosAuth = useAxiosAuth();
  const { data: session } = useSession();

  const sendMessage = async (message) => {
    const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

    const postId = selectedConversation?.post?._id;

    const tempMessage = {
      message: message,
      createdAt: new Date().toISOString(),
      senderId: session.user.id,
      seen: false,
    };

    setMessages([tempMessage, ...messages]);

    setLoading(true);

    try {
      
      const res = await axiosAuth.post(
        `${URL_SERVER}/api/messages/send/${selectedConversation._id}`,
        { message, ...(postId && {postId }) }
      );

      console.log("resss",res)

      if (res.status !== 201 && res.status !== 200) {
        console.log("test")
        throw new Error(res.data);
      }

      if (conversations[0]?._id !== selectedConversation._id) {
        setConversations((prevUsers) => {
          // Create a new array before sorting
          const sortedUsers = [...prevUsers].sort((a, b) => {
            if (a._id === selectedConversation._id) return -1;
            if (b._id === selectedConversation._id) return 1;
            return 0;
          });

          return sortedUsers;
        });
      }
    } catch (error) {
      if(error.response.status===401||error.response.status===403) return
      toast({
        description: "something went wrong",
        className: "bg-red-500 text-white p-4 rounded shadow-lg",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;

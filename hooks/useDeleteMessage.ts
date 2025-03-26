import React from "react";
import { toast } from "./use-toast";
import useAxiosAuth from "./useAxiosAuth";
import { useConversationContext } from "@/app/context/ConversationProvider";

function useDeleteMessage() {
  const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;
  const axiosAuth = useAxiosAuth();
  const { setConversations, setSelectedConversation,SelectedConversation } =useConversationContext();
  const post = SelectedConversation?.post?._id
  const deleteMessage = async (conversation) => {
    try {
      const res = await axiosAuth.delete(
        `${URL_SERVER}/api/messages/${conversation._id}${post ? `?postId=${post}` : ""}`
      );

      setConversations((prev) =>
        prev.filter((con) => con.convId !== conversation.convId)
      );

      setSelectedConversation((prev) =>
        prev?.convId === conversation.convId ? null : prev
      );

      if (res.status !== 200) {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      if(error.response.status===401||error.response.status===403) return
      toast({
        description: error.response,
        className: "bg-red-500 text-white p-4 rounded shadow-lg",
      });
    }
  };

  return { deleteMessage };
}

export default useDeleteMessage;

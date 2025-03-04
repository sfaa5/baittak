"use client";
import { use, useEffect, useState } from "react";
import { toast } from "./use-toast";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { stat } from "fs";
import { useConversationContext } from "@/app/context/ConversationProvider";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const {
    conversations,
    setConversations,
    setTotalUnreadMessages,
    setSelectedConversation,
  } = useConversationContext();
  const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;
  const axiosAuth = useAxiosAuth();
  const { data: session, status } = useSession();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await axiosAuth.get(`${URL_SERVER}/api/users/get/sidebar`);

        if (res.status !== 200) {
          throw new Error("Something went wrong!");
        }

        const chatUser = JSON.parse(localStorage.getItem("chat-user"));


// Update state efficiently
      setConversations((prev) => {
        const updatedConversations = [...res.data.usersWithLastMessage];

        if (chatUser) {
          const isFind = updatedConversations.some((con) => con._id === chatUser._id);
          if (!isFind) updatedConversations.push(chatUser);
        }

        return updatedConversations;
      });

      if (chatUser) {
        setSelectedConversation(chatUser);
        localStorage.removeItem("chat-user");
      }

        setTotalUnreadMessages(res.data.totalUnreadMessages);
      } catch (error) {
        toast({
          description: error.message,
          className: "bg-red-500 text-white p-4 rounded shadow-lg",
        });
      } finally {
        setLoading(false);
      }
    };
    status === "authenticated" && getConversations();
  }, [session]);

  return { loading, conversations, setConversations };
};

export default useGetConversations;

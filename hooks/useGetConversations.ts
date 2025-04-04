"use client";
import { useEffect, useState } from "react";
import { toast } from "./use-toast";

import useAxiosAuth from "@/hooks/useAxiosAuth";

import { useSession } from "next-auth/react";
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

        setConversations(res.data.usersWithLastMessage);

        const chatUser = JSON.parse(localStorage.getItem("chat-user"));

        // Update state efficiently
        setConversations((prev) => {
          const updatedConversations = [...res.data.usersWithLastMessage];

          console.log("updatedConversations", updatedConversations);

          console.log("cahtUser", chatUser);

          if (chatUser) {
            let isFind = null;
            if (chatUser?.post) {
              isFind = updatedConversations.some(
                (con) => con?.post?._id === chatUser?.post?._id
              );
            } else {
              isFind = updatedConversations.some(
                (con) => !con.post && ( con._id === chatUser._id)
              );
            }

            console.log("isFind", isFind);
            if (!isFind) updatedConversations.push(chatUser);
          }

          if (JSON.stringify(prev) !== JSON.stringify(updatedConversations)) {
            return updatedConversations;
          }

          return prev;
        });

        if (chatUser) {
          console.log("chatUser", chatUser);
          setSelectedConversation(chatUser);
        }

        setTotalUnreadMessages(res.data.totalUnreadMessages);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403)
          return;
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

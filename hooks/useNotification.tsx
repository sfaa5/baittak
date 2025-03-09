import { useConversationContext } from "@/app/context/ConversationProvider";
import { useSocketContext } from "@/app/context/SocketContext";
import React, { useEffect } from "react";

function useNotification() {
  const { socket } = useSocketContext();
  const { setTotalUnreadMessages, totalUnreadMessages } =
    useConversationContext();

  useEffect(() => {
    socket?.on("newMessage", async (newMessage) => {
      const sound = new Audio("/notification.mp3");
      try {
        await sound.play();
      } catch (error) {
        console.warn("Audio play blocked by the browser:", error);
      }

      console.log("notification");
      console.log(totalUnreadMessages);
      setTotalUnreadMessages((prev) => prev + 1);
    });

    return () => socket?.off("newMessage");
  }, [socket, totalUnreadMessages, setTotalUnreadMessages]);
}

export default useNotification;

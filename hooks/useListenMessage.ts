import { useConversationContext } from "@/app/context/ConversationProvider";
import { useSocketContext } from "@/app/context/SocketContext";
import { useEffect } from "react";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const {
    selectedConversation,
    messages,
    setMessages,
    conversations,
    setConversations,
    totalUnreadMessages,
    setTotalUnreadMessages,
  } = useConversationContext();

  useEffect(() => {
    socket?.on("newMessage", async (newMessage) => {
      newMessage.shouldShake = true;

      const sound = new Audio("/notification.mp3");
      // Attempt to play the sound
      try {
        await sound.play();
      } catch (error) {
        console.warn("Audio play blocked by the browser:", error);
      }

      console.log("selectedConversation", selectedConversation);
      console.log("recever", newMessage.receiverId);
      console.log("sender", newMessage.senderId);

      console.log("0", totalUnreadMessages);
      if (selectedConversation?._id === newMessage.senderId) {
        setMessages([newMessage, ...messages]);
      } else {
        setConversations((prevUsers) => {
          const updatedUsers = prevUsers.map((user) => {
            if (
              user._id === newMessage.senderId ||
              user._id === newMessage.receiverId
            ) {
              return {
                ...user,
                lastMessage: newMessage,
                unreadMessagesCount: user.unreadMessagesCount + 1,
              };
            }
            return user;
          });
          return updatedUsers;
        });

        setTotalUnreadMessages((prev) => prev + 1);
      }

      setConversations((prevUsers) => {
        // Create a new array before sorting
        const sortedUsers = [...prevUsers].sort((a, b) => {
          if (a._id === newMessage.senderId || a._id === newMessage.receiverId)
            return -1;
          if (b._id === newMessage.senderId || b._id === newMessage.receiverId)
            return 1;
          return 0;
        });

        return sortedUsers;
      });
      console.log("sortttttttt", conversations);
    });

    return () => socket?.off("newMessage");
  }, [socket]);
};

export default useListenMessages;

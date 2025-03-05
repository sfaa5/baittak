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
    socket?.on("newMessage", async(newMessage) => {
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
      console.log("slectedd",selectedConversation)
      console.log("conversation",conversations)
      if (selectedConversation?._id === newMessage.senderId) {
        console.log("1")
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
        console.log("2")
        setConversations((prevUsers) => {
          const index = prevUsers.findIndex(user=>user._id===newMessage.senderId|| user._id === newMessage.receiverId)
          if (index === -1) return prevUsers  // return it as it
          const sortedUser = prevUsers[index];
          return [sortedUser, ...prevUsers.slice(0, index), ...prevUsers.slice(index + 1)];
        })


      } else {

        setConversations((prevUsers) => {
         const index = prevUsers.findIndex(user=>user._id===newMessage.senderId|| user._id === newMessage.receiverId)
         if (index === -1) return prevUsers  // return it as it
         const updatedUser = { ...prevUsers[index], unreadMessagesCount: prevUsers[index].unreadMessagesCount + 1 };
         return [updatedUser, ...prevUsers.slice(0, index), ...prevUsers.slice(index + 1)];

        });

        setTotalUnreadMessages((prev) => prev + 1);
      }

      console.log("sortttttttt", conversations);
    });

    return () => socket?.off("newMessage");
  }, [socket, selectedConversation, conversations, totalUnreadMessages]);
};

export default useListenMessages;

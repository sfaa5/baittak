import { useConversationContext } from "@/app/context/ConversationProvider";
import { useSocketContext } from "@/app/context/SocketContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const router = usePathname();

  const {
    selectedConversation,
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
      console.log("slectedd", selectedConversation);
      console.log("conversation", conversations);
      console.log("router", router);

      if (selectedConversation?.convId === newMessage.convId) {
        console.log("here1");
        let receiverId = newMessage.receiverId;
        let senderId = newMessage.senderId;
        let postId = selectedConversation?.post?._id;

        socket.emit("markAsSeen", receiverId, senderId, postId);
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
        setConversations((prevUsers) => {
          const index = prevUsers.findIndex(
            (user) =>
              user._id === newMessage.senderId ||
              user._id === newMessage.receiverId
          );
          if (index === -1) return prevUsers; // return it as it
          const sortedUser = prevUsers[index];
          return [
            sortedUser,
            ...prevUsers.slice(0, index),
            ...prevUsers.slice(index + 1),
          ];
        });
      } else if (router.includes("/messages")) {
        setConversations((prevUsers) => {
          console.log("here2");

          const index = prevUsers.findIndex(
            (user) => user.convId === newMessage.convId
          );

          if (index === -1 && newMessage.senderInfo && newMessage?.post) {
            // if user is not found and senderInfo exists,add them to the list
            return [
              {
                convId: newMessage.convId,
                _id: newMessage.senderId,
                username: newMessage.senderInfo.username,
                image: { url: newMessage.senderInfo.image?.url },
                unreadMessagesCount: 1,
                post: newMessage.post,
              },
              ...prevUsers,
            ];
          } else if (index === -1 && newMessage.senderInfo) {
            // if user is not found and senderInfo exists,add them to the list
            return [
              {
                convId: newMessage.convId,
                _id: newMessage.senderId,
                username: newMessage.senderInfo.username,
                image: { url: newMessage.senderInfo.image?.url },
                unreadMessagesCount: 1,
              },
              ...prevUsers,
            ];
          }

          console.log("here3");

          const updatedUser = {
            ...prevUsers[index],
            unreadMessagesCount: prevUsers[index]?.unreadMessagesCount + 1,
          };
          return [
            updatedUser,
            ...prevUsers.slice(0, index),
            ...prevUsers.slice(index + 1),
          ];
        });

        console.log("increase count noti");
      } else {
        setTotalUnreadMessages((prev) => prev + 1);
      }

      console.log("sortttttttt", conversations);
    });

    return () => socket?.off("newMessage");
  }, [socket, selectedConversation, setConversations, totalUnreadMessages]);
};

export default useListenMessages;

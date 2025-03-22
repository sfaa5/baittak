import { useConversationContext } from "@/app/context/ConversationProvider";
import { useSocketContext } from "@/app/context/SocketContext";
import React, { useEffect } from "react";

function useDeleteRealtime() {
  const { socket } = useSocketContext();
  const { setConversations, setSelectedConversation } =
    useConversationContext();

  useEffect(() => {
    const handelDeleteConversation = (conversationId) => {
      
      setConversations((prev) =>
        prev.filter((prev) => prev.convId !== conversationId)
      );

      setSelectedConversation((prev) =>
        prev?.convId === conversationId ? null : prev
      );
    };

    socket?.on("deleteConversation", handelDeleteConversation);

    return () => {
      socket?.off("deleteConversation", handelDeleteConversation);
    };
  }, [socket, setConversations, setSelectedConversation]);
}

export default useDeleteRealtime;

import { useConversationContext } from '@/app/context/ConversationProvider';
import { useSocketContext } from '@/app/context/SocketContext';
import React, { useEffect } from 'react';

function useSeenMessage() {
    const { socket } = useSocketContext();
    const { setMessages, selectedConversation } = useConversationContext();

    useEffect(() => {
        console.log("messagesSeen");

        const handleMessagesSeen = (receiverId) => {
            if (selectedConversation?._id === receiverId) {
                console.log("in If")
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.seen ? msg : { ...msg, seen: true }
                    )
                );
            }
        };

        socket?.on("messagesSeen", handleMessagesSeen);

        return () => {
            socket?.off("messagesSeen", handleMessagesSeen);
        };
    }, [socket, selectedConversation, setMessages]);

}

export default useSeenMessage;
"use client";

import  { createContext, useContext, useState } from "react";

export const stateContext = createContext(null);

type StateProviderProps={
    children: React.ReactNode;
}

export const ConversationProvider = ({ children }:StateProviderProps) => {

const [selectedConversation, setSelectedConversation] = useState(null);
const [conversations, setConversations] = useState([])
const [messages,setMessages] = useState([]);
const [totalUnreadMessages,setTotalUnreadMessages]=useState<number>(0)

return (
    <stateContext.Provider
    value={{
        selectedConversation,
        setSelectedConversation,
        messages,
        setMessages,
        conversations,
        setConversations,
        totalUnreadMessages,setTotalUnreadMessages
    }}
    >
        {children}
    </stateContext.Provider>
);


}


export const useConversationContext = () => {
    return useContext(stateContext);
};

"use client";

import  { createContext, useContext, useMemo, useState } from "react";

export const stateContext = createContext(null);

type StateProviderProps={
    children: React.ReactNode;
}

export const ConversationProvider = ({ children }:StateProviderProps) => {

const [selectedConversation, setSelectedConversation] = useState(null);
const [conversations, setConversations] = useState([])
const [messages,setMessages] = useState([]);
const [totalUnreadMessages,setTotalUnreadMessages]=useState<number>(0)
const [filteredResults, setFilteredResults ]=useState([]);
const [search, setSearch] = useState("");



  // 🟢 Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    conversations,
    setConversations,
    selectedConversation,
    setSelectedConversation,
    totalUnreadMessages,
    setTotalUnreadMessages,
    messages,
    setMessages,
    filteredResults, setFilteredResults ,search, setSearch
  }), [conversations, selectedConversation, totalUnreadMessages,messages,filteredResults]);

return (
    <stateContext.Provider
    value={value}
    >
        {children}
    </stateContext.Provider>
);


}


export const useConversationContext = () => {
    return useContext(stateContext);
};

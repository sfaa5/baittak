"use client"

// STARTER CODE SNIPPET
import useGetConversations from "@/hooks/useGetConversations";
import Conversation from "./Conversation";

import SidebarSkeleton from "../skeletons/sidebarSkeleton";
import { useEffect, useState } from "react";
import { useConversationContext } from "@/app/context/ConversationProvider";



const Conversations = () => {
	const [count,setCount]=useState(0)
	const{filteredResults,search}=useConversationContext();
	const {loading,conversations} = useGetConversations();


  // Increment count when component re-renders
  useEffect(() => {
    setCount((prev) => prev + 1);
    console.log("Render Count:", count);
  }, [conversations]); // Runs only when `conversations` change

  // Detect the last render
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("✅ Last Render Detected:", count);
    }, 500); // 500ms delay ensures it's the last render

	if(count===3){
		const chatUser = JSON.parse(localStorage.getItem("chat-user"));
		if(chatUser){
			localStorage.removeItem("chat-user")
		}
	}

    return () => clearTimeout(timer); // Cleanup to prevent unnecessary calls
  }, [count]);



  console.log("filtered",filteredResults.length)


	return (
		<div className='py-2 flex flex-col overflow-auto'>

		{/* Show filtered results if available */}
		{filteredResults.length > 0 ? (
		  filteredResults.map((filteredResult, idx) => (
			<Conversation
			  key={filteredResult._id}
			  conversation={filteredResult}
			  lastIdx={idx === filteredResults.length - 1}
			/>
		  ))
		) : search ? ( // If searching and no results
		  <p className="text-center text-gray-500 py-4">No users found.</p>
		) : (
		  // Show all conversations when not searching
		  conversations.map((conversation, idx) => (
			<Conversation
			  key={conversation._id}
			  conversation={conversation}
			  lastIdx={idx === conversations.length - 1}
			/>
		  ))
		)}
  
		{/* Show skeleton loaders when loading */}
		{loading && [...Array(4)].map((_, idx) => <SidebarSkeleton key={idx} />)}
  
	  </div>
	);
};
export default Conversations;

"use client"

// STARTER CODE SNIPPET
import useGetConversations from "@/hooks/useGetConversations";
import Conversation from "./Conversation";

import SidebarSkeleton from "../skeletons/sidebarSkeleton";
import { useEffect, useState } from "react";



const Conversations = () => {
	const [count,setCount]=useState(0)

	const {loading,conversations} =  useGetConversations()
	console.log("conversations",conversations);

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



  console.log("conversations", conversations);

	return (
		<div className='py-2 flex flex-col overflow-auto'>
		{loading && [...Array(4)].map((_, idx) => <SidebarSkeleton key={idx} />)}

			{!loading&&conversations.map((conversation,idx) => (
				<Conversation key={conversation._id} conversation={conversation} lastIdx={idx === conversations.length - 1} />
			))}
	
		</div>
	);
};
export default Conversations;

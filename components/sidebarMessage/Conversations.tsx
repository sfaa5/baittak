"use client"

// STARTER CODE SNIPPET
import useGetConversations from "@/hooks/useGetConversations";
import Conversation from "./Conversation";
import { useEffect, useRef } from "react";
import useListenMessages from "@/hooks/useListenMessage";
import SidebarSkeleton from "../skeletons/sidebarSkeleton";

const Conversations = () => {
	const {loading,conversations} = useGetConversations();
	console.log("conversations",conversations);
	




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


// STARTER CODE SNIPPET
import useGetMessages from "@/hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";


const Messages = () => {
	const {messages,loading}=useGetMessages();



	return (
		<div className={`${!loading && messages.length !== 0 && 'flex-col-reverse'} flex-col px-4 flex  gap-6 h-[82%] pb-6 pt-4 overflow-auto overscroll-contain`}>
			{!loading&& messages.length>0 && messages.map((message)=>(

				<div className="" key={message._id} >
					<Message message={message}/>
				</div>

			))}
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{!loading && messages.length === 0 && (
				<p className='text-center text-gray-700'>Send a message to start the conversation</p>
			)}

	

		</div>
	);
};
export default Messages;

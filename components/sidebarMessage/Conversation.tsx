import { useConversationContext } from "@/app/context/ConversationProvider";
import { useSocketContext } from "@/app/context/SocketContext";
import useReadMessage from "@/hooks/useReadMessage";




// STARTER CODE SNIPPET
const Conversation = ({conversation,lastIdx}) => {

	const {selectedConversation} = useConversationContext();
	const{readMessage}=useReadMessage()
	const isSelected = selectedConversation?._id === conversation._id;
    const {onlineUsers}=useSocketContext();
	const isOnlie = onlineUsers.includes(conversation._id);
	

const seen = async(conversation)=>{
	await readMessage(conversation);
}

	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-gray-200 rounded p-2 py-1 cursor-pointer
				${isSelected ? 'bg-gray-200' : 'bg-white'}
				`}
				onClick={() => seen(conversation)}
				>
				<div className='relative'>
					{isOnlie && <div className="text-[60px] absolute text-blue-700 -top-12 right-1">.</div>}
					<div className='w-10 h-10 '>
						<img
						className="rounded-full object-cover w-full h-full aspect-square" 
							src={conversation.image?.url || 'https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-medium text-gray-700'>{conversation.username}</p>
						{  conversation.unreadMessagesCount > 0 && <span className='text-sm text-center rounded-full w-5 h-5 text-white bg-primary'>{conversation.unreadMessagesCount}</span>} 
					</div>
				</div>
			</div>

			{!lastIdx && <div className="border-t border-gray-300 "></div>} 
		</>
	);
};
export default Conversation;

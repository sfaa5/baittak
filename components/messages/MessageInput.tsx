"use client"
import { BsSend } from "react-icons/bs";
import  useSendMessage  from "@/hooks/useSendMessage";
import { useState } from "react";

const MessageInput = () => {
const {sendMessage}=useSendMessage();
const [message,setMessage]=useState('');

const handelSubmit=async(e)=> {
	e.preventDefault();
	if(!message) return;
	setMessage('');
	await sendMessage(message);

}

	return (
		<form className='px-4 my-3 fixed bottom-0 w-full ' onSubmit={handelSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg  w-full p-2.5   bg-white focus:outline-none border-gray-300 '
					placeholder='Send a message'
					value={message}
					onChange={(e)=>setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3 text-primary '>
					{<BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;

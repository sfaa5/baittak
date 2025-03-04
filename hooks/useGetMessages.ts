import { useEffect, useState } from "react";


import { useConversationContext } from "@/app/context/ConversationProvider";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "./use-toast";
const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversationContext();
    const axiosAuth = useAxiosAuth();


	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await axiosAuth.get(`/api/messages/${selectedConversation._id}`);

				if (res.data.error) throw new Error(res.data.error);
				setMessages(res.data);
			} catch (error) {
				toast({
                    description: error,
                    className: "bg-red-500 text-white p-4 rounded shadow-lg",
                })
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;

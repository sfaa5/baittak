"use client"
import { useSession } from "next-auth/react";
import { createContext, useState, useEffect, useContext } from "react";

import io from "socket.io-client";

const SocketContext = createContext({ socket: null, onlineUsers: [] });

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
    const { data:session } = useSession();

	useEffect(() => {
		if (session) {
			const socket = io(process.env.NEXT_PUBLIC_URL_SERVER, {
				transports: ["websocket"],
				query: {
					userId: session.user.id,
				},
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
				console.log("onlineUsers",onlineUsers)
			});

			return () => {
				socket.close();
			};
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [session]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};

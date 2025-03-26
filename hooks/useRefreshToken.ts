"use client";

import { signOut, useSession } from "next-auth/react";
import axios from "@/lib/axios";
import {  useRouter } from "next/navigation";

export const useRefreshToken = () => {
    const { data: session, update } = useSession(); // Get `update` function from useSession
    const router = useRouter();

    const refreshToken = async () => {
       

        try {
            const res = await axios.post('/api/auth/refresh', {
                refreshToken: session.user.refreshToken,
            });

            console.log("New Access Token:", res.data.accessToken);


            // ✅ Update session properly
            await update({
                ...session,
                user: {
                    ...session.user,
                    accessToken: res.data.accessToken,
                }
            });

        } catch (error) {
         
            if (error.response.status === 403) {
                signOut();
            }
    
        }
    };

    return refreshToken;
};

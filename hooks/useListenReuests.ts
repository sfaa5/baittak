import { useSocketContext } from '@/app/context/SocketContext';
import { useSharedState } from '@/app/context/stateProvider';
import React, { useEffect } from 'react'

function useListenReuests() {
    const {socket}=useSocketContext()
    const {dataRequest, setDataRequest} = useSharedState();

    useEffect(()=>{
      socket?.on("newRequest",async(newRequest)=>{
        const sound = new Audio("/notification.mp3");
        // Attempt to play the sound
        try {
          await sound.play();
        } catch (error) {
          console.warn("Audio play blocked by the browser:", error);
        }
        console.log("fff")
        setDataRequest((prev)=>{
            return [newRequest,...prev]
        })
      })
      return ()=> socket?.off("newSend");
    },[socket]);
};

export default useListenReuests
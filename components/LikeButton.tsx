"use client"
import { useSharedState } from '@/app/context/stateProvider';
import { useUserFavorites } from "@/app/context/UserFavoritesContext";
import { like } from '@/lib/actions/user.action';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';


function LikeButton({propertyId}) {
    const { userFavorites, setUserFavorites } = useUserFavorites();
   const router = useRouter()
  

    const [isLoading, setIsLoading] = useState(false)

    const { data: session,status  } = useSession();

    const id = session?.user.id
    console.log(id)

    console.log("idPro",propertyId)

    const isLiked = userFavorites.some(fav => fav  === propertyId);
  
    console.log("isLiked:", isLiked);

  

      const handleLikeToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {

        if(!id){
          router.push('/')
        }else{
        e.stopPropagation();
        e.preventDefault();
      
        // Optimistic update
        const optimisticFavorites = isLiked
          ? userFavorites.filter((fav) => fav !== propertyId) // Remove from favorites
          : [...userFavorites,  propertyId]; // Add to favorites (assuming only ID is needed here)

          console.log(optimisticFavorites)
      
        setUserFavorites(optimisticFavorites); // Update UI immediately
      
        try {
          await like(propertyId, session?.user?.id); // Make the API call
        } catch (error) {
          console.error("Error updating favorites:", error);
      
          // Revert the optimistic update on error
          setUserFavorites(userFavorites);
        }}

      };
    


  return (
    <button
      onClick={handleLikeToggle}
      disabled={isLoading} // Disable the button while loading
      className={`absolute text-secondary bg-white text-2xl rounded-full p-1 top-60 right-4 hover:scale-110 transition-transform duration-200 ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
     {isLiked ? <FaHeart className="text-red-500" /> : <CiHeart />} 
    </button>
  )
}

export default LikeButton
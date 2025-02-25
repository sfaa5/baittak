"use client"
import { like } from '@/lib/actions/user.action';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';

interface LikeProps {
  propertyId: string;
  likes: string[];
}

function Like({ propertyId, likes }: LikeProps) {
  const t = useTranslations();
  const router = useRouter();
  const { data: session, status } = useSession<boolean>();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const id = session?.user?.id;

  // Initialize `isLiked` state based on `favorites`
  useEffect(() => {
    if (id && likes) {
      setIsLiked(likes.includes(id));
    }
  }, [id, likes]);

  const handleLikeToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!id) {
      router.push('/?login=true');
      return;
    }

    setIsLoading(true);

    // Optimistic update
    const updatedLikeState = !isLiked;
    setIsLiked(updatedLikeState);

    try {
      await like(propertyId, id); // Make the API call
    } catch (error) {
      console.error('Error updating favorites:', error);

      // Revert the optimistic update on error
      setIsLiked(!updatedLikeState);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return <>...</>;
  }

  return (
    <button
      onClick={handleLikeToggle}
      disabled={isLoading}
      className={`flex items-center gap-2  text-secondary bg-white text-xl    hover:scale-110 transition-transform duration-200 ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
     {isLiked ? <FaHeart className="text-red-500" /> : <CiHeart />} 
      <span className="text-sm">{t('propertyDetails.save')}</span>
    </button>
  );
}

export default Like;

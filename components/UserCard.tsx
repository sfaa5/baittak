"use client";
import UpdateUser from "./UpdateUser";
import { formatDistanceToNow } from 'date-fns';
import { useSharedState } from "@/app/context/stateProvider";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

 function UserCard() {
const {user,setUser}=useSharedState()

const { data: session } = useSession();
const [loading, setLoading] = useState(true);

    const  t =  useTranslations();



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}/api/users/${session?.user?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
  
      }
    };

    if (session?.user?.id) {
      fetchUserData();
    }
  }, [session, setUser]);


  if (loading) {
    return <div>Loading...</div>;
  }


  const { activePlan, propertiesPosted } = user;
  const limit = activePlan.limit;
  const freeLimit = user.freePlanLimit;
  const postsLeft = limit - propertiesPosted;
  const progressPercentage = (propertiesPosted / limit) * 100;
  const expiresAt = new Date(activePlan.expiresAt);
  const timeUntilExpiration = formatDistanceToNow(expiresAt, { addSuffix: true });

console.log(user.phoneNumber)
console.log(user)

  return (
    <div className="relative mx-auto w-full xl:w-1/3">
      <div className=" flex flex-col bg-gray-100 p-8  gap-8 rounded-[0.7rem]">

      
<UpdateUser phoneNumber={user.phoneNumber} username={user.username}/>


        <div className="flex items-center gap-5">
          <img src={session?.user?.image || "/fallback-image.png"} alt="user" className="rounded-full"/>
          <div className="flex flex-col gap-2 text-lg">
            <p>{user.username}</p>
            <p>{session?.user.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
        <div className="flex  text-lg gap-3"><p className="text-primary font-medium">{t("userCard.Phone")}</p>   <span>{user.phoneNumber || "N/A"}</span> </div>




        <div className="flex  text-lg gap-3"><p className="text-primary font-medium">{activePlan.name}</p> <span> ({timeUntilExpiration}) </span> </div>

        </div>

        <div className="text-lg">
            <div className="flex gap-2"><p className="text-secondary font-medium">{t("userCard.Rent")}:</p><span>5</span></div>
            <div className="flex gap-2 mt-2"><p className="text-secondary font-medium ">{t("userCard.Buy")}:</p><span>2</span></div>
            
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{activePlan.name}</h2>
          <p className="text-sm text-gray-500">Plan Limit: {limit} posts</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-gray-800">{postsLeft}</p>
          <p className="text-sm text-gray-500">Posts Left</p>
        </div>
      </div>
      <div className="relative w-full bg-gray-200 rounded-full h-4">
        <div
          className="absolute top-0 left-0 bg-blue-500 h-4 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-2 text-center">
        {propertiesPosted} of {limit} posts used
      </p>
    </div>
      </div>
    </div>
  );
}

export default UserCard;

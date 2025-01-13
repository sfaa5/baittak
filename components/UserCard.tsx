"use client";
import UpdateUser from "./UpdateUser";
import { formatDistanceToNow } from 'date-fns';
import { useSharedState } from "@/app/context/stateProvider";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Skeleton } from "./ui/skeleton";

 function UserCard() {
const {user,setUser}=useSharedState()

const { data: session } = useSession();
const [loading, setLoading] = useState(true);

    const  t =  useTranslations();


console.log("sessionnnn",session)

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
    return <div className="relative mx-auto w-full xl:w-1/3">
    <div className="flex flex-col justify-center items-center bg-gray-100 p-8 gap-8 rounded-[0.7rem] h-[400px]">
      {/* Centered Skeleton Loader */}
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        <div className="mt-4 h-4 bg-gray-300 rounded w-24"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-32"></div>
      </div>
    </div>
  </div>
  }


  const { activePlan, propertiesPosted } = user;
  const limit = activePlan.limit;
  const freeLimit = user.freePlanLimit;
  const postsLeft = limit - propertiesPosted;
  const totalLimit = limit + freeLimit 
  const progressPercentage = (propertiesPosted / totalLimit) * 100;
  const expiresAt = activePlan?.expiresAt ? new Date(activePlan.expiresAt):null;
  const timeUntilExpiration = expiresAt? formatDistanceToNow(expiresAt, { addSuffix: true }):null;


  


console.log(user.phoneNumber)
console.log(user)

  return (
    <div className="relative mx-auto w-full xl:w-1/3">
      <div className=" flex flex-col bg-gray-100 p-8  gap-8 rounded-[0.7rem]">




        <div className="flex items-center gap-5">
          <img src={user?.image?.url? user.image?.url : user.image || "/company/unknown.png"} alt="user" className="rounded-full h-20"/>
          <div className="flex flex-col gap-2 text-lg">
            <p>{user.username}</p>
            <p>{session?.user.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
        <div className="flex  text-lg gap-3"><p className="text-primary font-medium">{t("userCard.Phone")}</p>   <span>{user.phoneNumber || "N/A"}</span> </div>




        <div className="flex  text-lg gap-3"><p className="text-primary font-medium">{activePlan.name || t("company.free")}</p> <span> {timeUntilExpiration? timeUntilExpiration:''} </span> </div>

        </div>

        <div className="text-lg">
            <div className="flex gap-2"><p className="text-secondary font-medium">Posted:</p><span>{user.properties.length}</span></div>

            
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{activePlan.name || t("company.free")} </h2>
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

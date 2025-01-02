
import { getTranslations } from "next-intl/server"; 
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/lib/nextAuth";
import { Button } from "./ui/button";
import UpdateUser from "./UpdateUser";

async function UserCard() {


    const session  = await getServerSession(authOptions);
    console.log(session)
    const  t = await getTranslations();


  return (
    <div className="relative mx-auto w-full xl:w-1/3">
      <div className=" flex flex-col bg-gray-100 p-8  gap-8 rounded-[0.7rem]">

      
<UpdateUser/>


        <div className="flex items-center gap-5">
          <img src={session?.user?.image || "/fallback-image.png"} alt="user" className="rounded-full"/>
          <div className="flex flex-col gap-2 text-lg">
            <p>{session?.user.name}</p>
            <p>{session?.user.email}</p>
            
          </div>

        </div>

        <div className="flex flex-col gap-2">
        <div className="flex  text-lg gap-3"><p className="text-primary font-medium">{t("userCard.Phone")}</p>   <span>{session?.user.phoneNumber || "N/A"}</span> </div>
        <div className="flex  text-lg gap-3"><p className="text-primary font-medium">{t("userCard.PREMIUM")}</p> <span>{t("userCard.Days Left")}</span> </div>

        </div>

        <div className="text-lg">
            <div className="flex gap-2"><p className="text-secondary font-medium">{t("userCard.Rent")}:</p><span>5</span></div>
            <div className="flex gap-2 mt-2"><p className="text-secondary font-medium ">{t("userCard.Buy")}:</p><span>2</span></div>
            
        </div>
      </div>
    </div>
  );
}

export default UserCard;

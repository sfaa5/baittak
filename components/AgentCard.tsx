import { useTranslations } from 'next-intl';
import Link from 'next/link'
import React from 'react'

function AgentCard({post}) {

const {
  image,
  _id,

  companyName,

  rentCount
  ,sellCount
}=post;

const t =useTranslations()

  return (
    <div className=" max-w-md mx-auto bg-white rounded-[.7rem] shadow-md overflow-hidden md:max-w-[100%] border-[1px]">
<Link href={`/Agency/${_id}`}>
<div className=" md:flex ">
<div className=" md:shrink-0 ">  <img className=' w-[230px] object-cover md:h-[200px] ' src={image?.url?image?.url:"/company/unknown.png"} alt="agent" /></div>
<div className="p-5 md:p-7 flex flex-col justify-between lg:gap-0 gap-14" >
  <p className="text-xl font-medium text-secondary">{companyName}</p>
  <div className="flex justify-between w-full gap-20 m:gap-10"><div className="flex gap-1"><span>{t("agency.for_sale")}</span> <p className="text-primary">{sellCount}</p></div> 
  <div className="flex gap-1"><span >{t("agency.for_rent")}</span> <p className="text-primary">{rentCount}</p></div></div>
</div>
</div>
</Link>

</div>
  )
}

export default AgentCard
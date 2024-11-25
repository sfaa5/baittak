import React from 'react'

function AgentCard() {
  return (
    <div className=" max-w-md mx-auto bg-white rounded-[.7rem] shadow-md overflow-hidden md:max-w-[100%] border-[1px]">

<div className=" md:flex ">
<div className=" md:shrink-0 "><img className=' w-full object-cover md:h-full ' src="/Agency/agent.png" alt="agent" /></div>
<div className="p-5 md:p-7 flex flex-col justify-between lg:gap-0 gap-14" >
  <p className="text-xl font-medium text-secondary">شركة اسكان سلمان العقرية</p>
  <div className="flex justify-between w-full gap-20 m:gap-10"><div className="flex gap-1"><span>For Sale:</span> <p className="text-primary">4631</p></div> 
  <div className="flex gap-1"><span >For Rent:</span> <p className="text-primary">200</p></div></div>
</div>
</div>


</div>
  )
}

export default AgentCard
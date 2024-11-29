import { Button } from '@/components/ui/button'
import React from 'react'

import { Mail } from 'lucide-react'
import { Star } from 'lucide-react';
import { Send } from 'lucide-react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='w-full'>
      <h1 className="h1 py-0">Inbox</h1>

<div className="flex mt-10">
    
    
    <div className='w-1/4 p-10 bg-white flex flex-col  items-center  gap-5 rounded-[0.6rem]'>

<div className='w-full px-14'>

<Button variant={"companyS"} className='bg-primary text-white w-full' size={"lg"}> + Compose</Button>

</div>

<div className='flex flex-col w-full gap-3'>
<p className='font-medium'>My Email</p>
<div>
<Button variant={"company"} size={"lg"} className='bg-white text-black-100 w-full hover:bg-primary hover:bg-opacity-70'><Mail />  Inbox <span className='ml-20 font-normal'>1500</span></Button>

</div>
<div>
<Button variant={"company"} size={"lg"} className='bg-white text-black-100 w-full hover:bg-primary hover:bg-opacity-70'><Star />  Starred <span className='ml-20 font-normal'>15</span></Button>

</div>
<div>
<Button variant={"company"} size={"lg"} className='bg-white text-black-100 w-full hover:bg-primary hover:bg-opacity-70'><Send />  Sent <span className='ml-20 font-normal'>2000</span></Button>

</div>


</div>


</div>

<div className="w-3/4">
{children}
</div>

</div>


        
    </main>
  )
}

export default layout
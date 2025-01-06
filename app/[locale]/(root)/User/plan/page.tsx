import PlanCard from '@/components/PlanCard'
import React from 'react'
const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

 async function page() {

const response = await fetch(`${URL_SERVER}/api/plans`)

const data = await response.json();

console.log(data)
  
  return (
    <div>
        

        <PlanCard plan={data} />
    </div>
  )
}

export default page
import PropertyCard from '@/components/PropertyCard'
import React from 'react'

function page() {
  return (
    <>
   
   <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
          </div>
    
    </>
  )
}

export default page
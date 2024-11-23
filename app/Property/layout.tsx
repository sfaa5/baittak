import Header from '@/components/Header'
import React from 'react'

export default function Layout({children}:Readonly<{children:React.ReactNode}>){
    return(
        <main className="font-work-sans">
           <Header padding={'120px'}/>
          {children}  
        </main>
    )
}


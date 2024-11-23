import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

export default function Layout({children}:Readonly<{children:React.ReactNode}>){
    return(
        <main className="font-work-sans">
           <Header padding={'120px'}/>
          {children}  
          <Footer padding={'120px'}/>
        </main>
    )
}


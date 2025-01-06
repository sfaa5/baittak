"use client";
import { toast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import React, { use } from 'react'


interface PayButtonProps {

    id:string;
  
  }
  
  


  
function PayButton({ id }: PayButtonProps) {

    const { data: session,status  } = useSession();

 


    const handleSubscribe = async (planId) => {
        if (status !== 'authenticated') {
            alert('You must be logged in to subscribe.');
            return;
          }

          const userId = session?.user?.id;

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}/api/plans/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({  planId, userId }),
          });
      
          if (!response.ok) {  
            const data = await response.json();
             console.log(data.message)
             toast({
              description: data.message,
              className: 'bg-red-500 text-white p-4 rounded shadow-lg',
            }); 
            return;
          }
      
          const data = await response.json();
          window.location.href = data.approvalUrl; // Redirect the user to PayPal
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };

    console.log(id)

    function classNames(...classes: string[]): string {
        return classes.filter(Boolean).join(' ');
    }

  return (
    <button
    onClick={() => handleSubscribe(id)}
  
        className={classNames(
          'bg-primary text-white shadow-sm hover:bg-secondary focus-visible:outline-indigo-500',
          'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10'
        )}
      >
        اشترك الآن
      </button>
  )
}

export default PayButton
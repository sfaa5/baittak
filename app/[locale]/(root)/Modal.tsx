import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from "next/navigation";
import Sign from '@/components/Sign';
import { useSession } from 'next-auth/react';


function Modal() {
      const { status  } = useSession();
    const searchParams = new URLSearchParams(window.location.search);
    const router = useRouter();
    const parms = useSearchParams();
    const [showLoginModal, setShowLoginModal] = useState(false);
    

  
    if(status==="authenticated"&&parms.get('login')==='true'){
      searchParams.delete('login')
    }
  
  
    useEffect(() => {
      if (parms.get('login') === 'true') {
        setShowLoginModal(true);
      }
    }, [parms.toString()]);
  
    const closeModal = () => {
      setShowLoginModal(false);
  
      // Remove the query parameter from the URL
  
      searchParams.delete('login')
      router.push('/');
    };
  return (
    <div>      {showLoginModal && (
        <Sign onClose={closeModal} />
      )}</div>
  )
}

export default Modal
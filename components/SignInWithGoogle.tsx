"use client"
import React from 'react'

import { FaSignInAlt } from 'react-icons/fa'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'


function SignInWithGoogle() {
  const router =useRouter()
    const  t = useTranslations();
    function sign (){
      router.push("/?login=true")
    }
  return (
    <button type='button' onClick={sign}>
        <div className="flex items-center  gap-2 " ><FaSignInAlt /> <span>{t("header.sign in")}</span></div>
    </button>
  )
}

export default SignInWithGoogle
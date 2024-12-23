"use client"
import React from 'react'
import {signIn} from 'next-auth/react'
import { FaSignInAlt } from 'react-icons/fa'
import { useTranslations } from 'next-intl'


function SignInWithGoogle() {
    const  t = useTranslations();
  return (
    <button type='button' onClick={()=>signIn('google')}>
        <div className="flex items-center  gap-2 " ><FaSignInAlt /> <span>{t("header.sign in")}</span></div>
    </button>
  )
}

export default SignInWithGoogle
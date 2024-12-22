"use client"
import React from 'react'
import {signIn} from 'next-auth/react'
import { FaSignInAlt } from 'react-icons/fa'
import { useTranslation } from "react-i18next";


function SignInWithGoogle() {
    const { t, i18n } = useTranslation("common");
  return (
    <button type='button' onClick={()=>signIn('google')}>
        <div className="flex items-center  gap-2 " ><FaSignInAlt /> <span>{t("header.sign up")}</span></div>
    </button>
  )
}

export default SignInWithGoogle
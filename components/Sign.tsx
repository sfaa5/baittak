
"use client";
  import {useLocale, useTranslations} from "next-intl";
  import BaittaklogoArabic from "./ArabicLogo";
  import EnglishLogo from "./EnglishLogo";
import {signIn} from 'next-auth/react'

function Sign({ onClose }) {
    const locale = useLocale();
      const  t = useTranslations();
    
  return (

<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        {/* Close Icon */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
        {locale == "ar" ? <BaittaklogoArabic /> : <EnglishLogo />}
        </div>

        {/* Text Description */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("header.signTitle")}</h2>
          <p className="text-gray-600">
            {t("header.signDesc")}
          </p>
        </div>

        {/* Google Sign-In Button */}
        <div className="space-y-4">
          <button
            onClick={() => {
       signIn('google',{ callbackUrl: "/dashboard?source=agency" })
            }}
            className="flex items-center justify-center w-full px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-600"
          >
            <svg
              className="h-5 w-5 mx-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.48 0 6.53 1.35 8.88 3.54l6.63-6.63C34.48 2.97 29.5 1 24 1 14.94 1 7.17 6.22 3.55 13.25l7.53 5.87C13.03 13.16 18.09 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.2 24.5c0-1.57-.14-3.08-.39-4.54H24v9.59h12.45c-.53 2.65-2.09 4.91-4.4 6.44l7.1 5.54c4.17-3.84 6.55-9.49 6.55-16.03z"
              />
              <path
                fill="#FBBC05"
                d="M11.08 28.88c-.57-1.65-.9-3.41-.9-5.25s.33-3.6.9-5.25L3.55 13.25C1.87 16.51 1 20.13 1 24s.87 7.49 2.55 10.75l7.53-5.87z"
              />
              <path
                fill="#34A853"
                d="M24 47c5.5 0 10.48-1.97 14.36-5.5l-7.1-5.54c-2 1.36-4.53 2.16-7.26 2.16-5.91 0-10.97-3.66-12.92-8.85l-7.53 5.87C7.17 41.78 14.94 47 24 47z"
              />
              <path fill="none" d="M1 1h46v46H1z" />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sign
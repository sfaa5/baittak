"use client"
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'

function Description({des}) {
const text =des
const [isExpanded, setIsExpanded] = useState(false);
const t = useTranslations("inputs")
const toggleReadMore = () => {
  setIsExpanded(!isExpanded);
};

  
  return (
    <div>
    <p
      className={`text-gray-600 overflow-hidden transition-all duration-500 ease-in-out ${
        isExpanded ? "max-h-[1300px] opacity-100" : "max-h-20 opacity-75"
      }`}
      style={{ whiteSpace: "pre-line" }}
    >
      {text}
    </p>
    <button
      onClick={toggleReadMore}
      className="mt-2 text-blue-500 underline"
    >
      {isExpanded ? t("Read Less") : t("Read More")}
    </button>
  </div>
  )
}

export default Description
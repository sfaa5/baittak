"use client"
import React from 'react'
import { PiShareFatThin } from 'react-icons/pi'
import { useTranslations } from 'use-intl';

function Share({ propertyUrl, propertyTitle }) {
  const t = useTranslations();
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: propertyTitle || "Check out this property!",
          text: `Take a look at this amazing property: ${propertyTitle}`,
          url: propertyUrl || window.location.href, // Use the passed URL or the current page URL
        });
        console.log("Content shared successfully!");
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      alert("Sharing is not supported on your device.");
    }
  };

  return (

    <div className="flex items-center gap-2 cursor-pointer hover:scale-110 transition-transform duration-200"   onClick={handleShare}>
    <PiShareFatThin /> <span className="text-sm">{t("propertyDetails.share")}</span>
  </div>
  )
}

export default Share
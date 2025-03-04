import React from "react";

const SkeletonCard = () => {
  return (
    <div className="w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow-lg bg-white">
      {/* صورة الهيكل العظمي */}
      <div className="w-full h-40 bg-gray-300 animate-pulse rounded-lg"></div>

      {/* محتوى الهيكل العظمي */}
      <div className="mt-4 space-y-3">
        {/* العنوان */}
        <div className="w-3/4 h-5 bg-gray-300 animate-pulse rounded-md"></div>

        {/* الوصف */}
        <div className="w-full h-4 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="w-5/6 h-4 bg-gray-300 animate-pulse rounded-md"></div>

        {/* زر محاكي */}
        <div className="w-1/3 h-8 bg-gray-300 animate-pulse rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;





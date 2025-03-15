
import { PiShareFatThin } from "react-icons/pi";

const ShareButton = ({ propertyUrl, propertyTitle }) => {
  const handleShare = async (e) => {
    e.preventDefault();
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
    <button
    className="flex w-full items-center text-sm hover:bg-gray-100 gap-2 h-[45px]   bg-[#1F4454] bg-opacity-25 text-secondary rounded-[.8rem] justi px-3"

      onClick={handleShare}
    >
      <PiShareFatThin />
      
    </button>
  );
};

export default ShareButton;

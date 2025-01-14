import { IoMdShareAlt } from "react-icons/io";

const ShareButton = ({ propertyUrl, propertyTitle }) => {
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
    <button
      className="flex w-full h-[45px] hover:bg-gray-100 items-center font-semibold bg-[#1F4454] bg-opacity-25 text-black rounded-[.8rem] justify-between px-3"
      onClick={handleShare}
    >
      <IoMdShareAlt />

    </button>
  );
};

export default ShareButton;

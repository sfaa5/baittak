import { getTranslations } from "next-intl/server";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

import { IoHomeSharp, IoMailOutline } from "react-icons/io5";
import { LiaBedSolid } from "react-icons/lia";
import { MdArrowForwardIos } from "react-icons/md";
import { PiBathtubLight } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { useLocale } from "next-intl";

async function Page({ params }: { params: Promise<{ id: string }> }) {
    const locale = useLocale();
  
  const id = (await params).id;
  console.log(
    "iam hereeeeeeeeeee",id);

    const response = await fetch(`http://localhost:5001/api/properties/${id}`);
    const data = await response.json();

  const {
    propertyType,
    title,
    price,
    address,
    img,
    bathrooms,
    bedrooms,
    amenities,
    area,
    des,
    landNumber,
    user,
  } = data;

  return (
    <div>
      <h1>{title}</h1>
      <p>{price}</p>
      <p>{address}</p>
      <img src={img} alt={title} />
      <p>{bathrooms} Bathrooms</p>
      <p>{bedrooms} Bedrooms</p>
      <p>{area} sq ft</p>
      <p>{des}</p>
      <p>Contact: {landNumber}</p>
      <p>Posted by: {user}</p>
    </div>
  );
}

export default Page;
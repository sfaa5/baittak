import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FiMapPin } from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { getLocale } from "next-intl/server";
import ImgeCard from "./ImgeCard";

const CurrencyTranslation = {
  USD: "دولار",
  IQD: "دينار عراقي",
  EUR: "يورو",
  SAR: "ريال سعودي",
  AED: "درهم",
  KWD: "دينار كويتي",
  QAR: "ريال قطري",
  OMR: "ريال عماني",
  BHD: "دينار بحريني",
  JOD: "دينار أردني",
};

async function ProjectCard({ post }) {
  const t = await getTranslations();
  const locale = await getLocale();

  const {
    _id,
    title,
    city,
    user,
    address,
    price,
    firstPayment,
    annualInterest,
    installmentPeriod,
    priceM,
    bedrooms,
    status,
    amenities,
    images,
    units,
    currency,
  } = post;

  console.log("possst", post);

  console.log("city", city);

  // Safely access the first user object in the array
  const userObject = Array.isArray(user) && user.length > 0 ? user[0] : {};
  const userImageUrl = userObject?.image?.url || null;
  const companyName = userObject?.companyName || "Unknown Company";

  console.log("User Object:", userObject);
  console.log("User Image URL:", userImageUrl);
  console.log("Company Name:", companyName);

  return (
    <div className=" relative hover:bg-gray-50 transform duration-200 bg-white rounded-[.5rem] shadow-md overflow-hidden md:max-w-[100%] md:max-h-[300px] border-[1px]">
      <Link href={`/Projects/${_id}`}>
        <div className=" md:flex flex-col md:flex-row">
          <ImgeCard img={images} />

          {/* details */}
          <div className="pt-5 pl-2 sm:pl-5 pr-2 sm:pr-5 flex flex-col gap-3 lg:w-[650px]">
            <h3 className="hidden sm:block text-xl text-secondary font-medium">
              {t("project.address")}:{" "}
              {address.split("").length > 8
                ? address.split(" ").slice(0, 4).join(" ") +
                  " ... " +
                  address.split(" ").slice(-3).join(" ")
                : address}{" "}
            </h3>
            <div className="flex w-full justify-between">
              <p className="text-gray-400 font-medium  sm:text-lg">
                By {companyName}
              </p>
              <div className="flex gap-2 items-center">
                <p className="  text-gray-400 sm:text-lg font-medium">
                  {t("project.StartingFrom")}{" "}
                </p>
                <p className="text-secondary sm:text-lg font-medium">
                  {" "}
                  {Number(price).toLocaleString()}{" "}
                </p>
               <span className="text-[14px] sm:text-base"> {locale === "ar" ? CurrencyTranslation[currency] : currency}</span>
              </div>
            </div>

            <ul className="flex gap-2 sm:gap-3 text-[13px]  sm:text-base  text-secondary">
              <li
                dir={`${locale === "ar" ? "rtl" : "ltr"}`}
                className={`${locale=="en"&&'border-r-[1px] pr-2 sm:pr-3'}  border-secondary  `}
              >
                {locale === "ar"
                  ? `${t("project.FIRSTPAYMENT")} ${Number(
                      firstPayment
                    ).toLocaleString()}`
                  : `${Number(firstPayment).toLocaleString()} ${t(
                      "project.FIRSTPAYMENT"
                    )}`}
              </li>
              <li className="border-r-[0.1px]  border-secondary pr-2 sm:pr-3">
                {annualInterest}% {t("project.MONTHLY")}
              </li>
              <li  className={`${locale==='ar'&&'border-r-[0.1px] pr-2 sm:pr-3'} border-secondary `}>
                {installmentPeriod} {t("project.YEARS")}
              </li>
            </ul>

            <div className="flex text-sm sm:text-base items-center gap-2 text-[#707070]">
              <FiMapPin className="text-primary" />{" "}
              {locale === "ar" ? city[0].name.ar : city[0].name.en}
            </div>

            <p className="text-secondary font-semibold text-base sm:text-lg">
              {title.split(" ").length > 4
                ? title.split(" ").slice(0, 1).join(" ") +
                  " ... " +
                  title.split(" ").slice(-2).join(" ")
                : title}
            </p>

            {amenities ? (
              <ul className="flex gap-3 pb-5 text-sm sm:text-base  text-primary">
                {amenities.slice(0, 3).map((amenity, index) => (
                  <li
                    key={index}
                    className={`${
                     locale==="ar" && index === 0 || locale==="en" && index===amenities.length - 1 ? "" : "border-r-[1px] border-primary pr-3"
                    }`}
                  >
                    {locale === "ar" ? amenity?.name?.ar : amenity?.name?.en}
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}

            <div className="hidden md:block absolute bottom-5 right-5 w-auto justify-end">
              {userImageUrl ? (
                <img
                  src={userImageUrl}
                  alt="company"
                  className="w-20  sm:flex"
                />
              ) : (
                <div className="text-gray-400">No image available</div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;

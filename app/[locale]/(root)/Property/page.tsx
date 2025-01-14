import PropertiesCard from "@/components/PropertiesCard";
import Serch from "@/components/Search";
import { FaRegMap } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { getTranslations } from "next-intl/server";
import PaginationControll from "@/components/PaginationControll";
import Sort from "@/components/Sort";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import { UserFavoritesProvider } from "@/app/context/UserFavoritesContext";
import OnMap from "./OnMap";

export type property = {
  currency: string;
  rentaltype: string;
  CompanyImage: string;
  propertyType: string;
  title: string;
  price: string;
  address: string;
  images: { url: string }[];
  bathrooms: string;
  bedrooms: string;
  amenities: [
    {
      name: {
        en: string; // English name as string
        ar: string; // Arabic name as string
      };
    }
  ];
  area: string;
  phoneNumber: string;
  email: string;
  userDetails: { phoneNumber: string; email: string };
  _id: string;
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

async function Page({ searchParams }: PageProps) {
  const t = await getTranslations();
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  console.log("ididdddd", userId);

  const resolvedSearchParams = await searchParams;
  const queryParams = new URLSearchParams();
  for (const key in resolvedSearchParams) {
    const value = resolvedSearchParams[key];
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v));
    } else if (value !== undefined) {
      queryParams.append(key, value);
    }
  }

  const page = queryParams.get("page") ?? "1";
  const per_page = queryParams.get("per_page") ?? "5";
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const city = queryParams.get("city") ?? "";
  const propertyType = queryParams.get("propertyType") ?? "";
  const rooms = queryParams.get("rooms") ?? "";
  const bathrooms = queryParams.get("bathrooms") ?? "";
  const purpose = queryParams.get("purpose") ?? "";
  const priceRange = queryParams.get("price") ?? "";

  const sort = queryParams.get("sort") ?? "";

  // console.log('Search Parameters:', searchParams);

  console.log(
    "iiii",
    city,
    propertyType,
    rooms,
    bathrooms,
    purpose,
    priceRange,
    start,
    end
  );

  // Log all query parameters for debugging
  // console.log('Query Parameters:', Object.fromEntries(queryParams.entries()));

  const response = await fetch(
    `${URL_SERVER}/api/properties/get?userId=${userId}&sort=${sort}&city=${city}&purpose=${purpose}&propertyType=${propertyType}&bedrooms=${rooms}&bathrooms=${bathrooms}&page=${page}&per_page=${per_page}&price=${priceRange}`
  );

  const data = await response.json();

  // console.log("data heree",data)
  console.log("data heree", data.properties);
  console.log("data heree", data.userFavorites);

  const properties = data.properties || [];
  const userFavorites = data.userFavorites || [];

  return (
    <UserFavoritesProvider initialFavorites={userFavorites}>
      <div className="container 2xl:px-[120px] mx-auto pt-3">
        <Serch />

        <div className="flex gap-4 flex-col mt-5 xl:w-[75%]">
          {/* path */}
          <ul className="flex items-center gap-2 mb-5">
            <li className="flex gap-3">
              <IoHomeSharp className="text-secondary" />
              <MdArrowForwardIos className="text-[#707070]" />
            </li>
            <li className="text-[#707070]"> {t("property.properties")}</li>
          </ul>

          {city && purpose ? (
            <h3 className="text-xl font-medium">
              {t("property.properties_for")}{" "}
              {purpose == "rent" ? t("property.rent") : t("property.sell")}{" "}
              {t("property.in")} {city}
            </h3>
          ) : city ? (
            <h3 className="text-xl font-medium">
              {t("property.properties")} {t("property.in")} {city}{" "}
            </h3>
          ) : purpose ? (
            <h3 className="text-xl font-medium">
              {t("property.properties_for")}{" "}
              {purpose == "rent" ? t("property.rent") : t("property.sell")}
            </h3>
          ) : null}

          {/* button of cards */}
          <div className="flex justify-between">
            <Sort />

            <OnMap properties={properties} />
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-8">
            {properties?.length > 0 ? (
              properties.map((post: property, key: number) => (
                <PropertiesCard key={key} post={post} />
              ))
            ) : (
              <p className="no-results">No Properties found</p>
            )}
          </div>

          <div className="flex items-center justify-center mb-10 mt-5 px-4 py-3 sm:px-6">
            <PaginationControll
              length={data.properties.length}
              hasNextPage={data.isNext}
              hasPrevPage={start > 0}
            />
          </div>
        </div>
      </div>
    </UserFavoritesProvider>
  );
}

export default Page;

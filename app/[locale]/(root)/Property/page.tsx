
import PropertiesCard from "@/components/PropertiesCard";
import Serch from "@/components/Search";
import { FaRegMap } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import {
  MdArrowForwardIos,

} from "react-icons/md";
import { getTranslations } from "next-intl/server";
import PaginationControll from "@/components/PaginationControll";
import Sort from "@/components/Sort";



export type property = {
  CompanyImage:string
  propertyType:string,
  title:string,
  price:string, 
  address:string,
  images:[string],
  bathrooms:string,
  bedrooms:string,
  amenities: [
    {
      name: {
        en: string, // English name as string
        ar: string  // Arabic name as string
      }
    }
  ]
  area:string,
  phoneNumber:string,
  email:string,
  user:{phoneNumber:string,email:string}
  _id:string,
  
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;


async function Page( { searchParams }: PageProps) {
  const t = await getTranslations();


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

  const page = queryParams.get('page') ?? '1';
  const per_page = queryParams.get('per_page') ?? '5';
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const city = queryParams.get('city') ?? '';
  const propertyType = queryParams.get('propertyType') ?? '';
  const rooms = queryParams.get('rooms') ?? '';
  const bathrooms = queryParams.get('bathrooms') ?? '';
  const purpose = queryParams.get('purpose') ?? '';
  const priceRange = queryParams.get('price') ?? '';

  const sort = queryParams.get('sort') ?? '';

  // console.log('Search Parameters:', searchParams);

  console.log("iiii",city, propertyType, rooms, bathrooms, purpose, priceRange, start, end);

  // Log all query parameters for debugging
  // console.log('Query Parameters:', Object.fromEntries(queryParams.entries()));


const response = await fetch(`${URL_SERVER}/api/properties/get?sort=${sort}&city=${city}&purpose=${purpose}&propertyType=${propertyType}&bedrooms=${rooms}&bathrooms=${bathrooms}&page=${page}&per_page=${per_page}&price=${priceRange}`);

const data =await response.json();

// console.log("data heree",data)
console.log("data heree",data.properties)
console.log("data heree",data.properties.length)

  return (
    <div className="container 2xl:px-[120px] mx-auto pt-3">
      <Serch />

      <div className="flex gap-4 flex-col mt-5 xl:w-[75%]">
        {/* path */}
        <ul className="flex items-center gap-2 mb-5">
          <li className="flex gap-3">
            <IoHomeSharp className="text-secondary" />
            <MdArrowForwardIos className="text-[#707070]" />
          </li>
          <li className="text-[#707070]">{t("property.properties_title")}</li>
        </ul>

        <h3 className="text-xl font-medium">{t("property.properties_title")}</h3>


        {/* button of cards */}
        <div className="flex justify-between">

      <Sort/>

        
            <button className="flex w-[160px]  gap-2 h-[40px] items-center font-normal text-[#707070] rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4">
              <FaRegMap className="h-4 w-4 text-[#707070]" />
              {t("property.map")}
            </button>












         
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-8">

          {data.properties?.length>0?(
data.properties.map((post:property,key:number)=>(
    <PropertiesCard key={key} post={post} />
))


          ):(<p className="no-results">No startups found</p>)}
        
  
        </div>

        <div className="flex items-center justify-center mb-10 mt-5 px-4 py-3 sm:px-6">


<PaginationControll length={data.properties.length} hasNextPage={data.isNext}
        hasPrevPage={start > 0} />
        </div>


      </div>
    </div>
  );
}

export default Page;

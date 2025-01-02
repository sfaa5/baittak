"use client";
import { useSharedState } from "@/app/context/stateProvider";
import PropertyCard from "@/components/PropertyCard";
import { SkeletonCard } from "@/components/SleltonCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

function Page() {
  const { data: session, status } = useSession();
  const { favorite, seFavorite } = useSharedState();
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL_SERVER}/api/users/${session?.user?.id}`);
        const jsonData = await response.json();
        seFavorite(jsonData.favorites);
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading even if an error occurs
      }
    };

    if (status === "authenticated" && session?.user?.id) {
      fetchData();
    }
  }, [status, session, seFavorite]);

  return (
    <>
      {loading ? (
<SkeletonCard/>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mb-36">
          {favorite?.map((property, index) => (
            <PropertyCard key={property._id || index} property={property} />
          ))}
        </div>
      )}
    </>
  );
}

export default Page;

"use client"; // This tells Next.js to render this component on the client side

import { DataTable } from "@/components/Company/data-table";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { UseColumns } from "./Columns";
import { useSharedState } from "@/app/context/stateProvider";
import TableSkelton from "@/components/TableSkelton";
import useAxiosAuth from "@/hooks/useAxiosAuth";

function Page() {
  const { data: session, status } = useSession();
  const { property, setProperty } = useSharedState();
  const [loading, setLoading] = useState(true);
  const axiosAuth = useAxiosAuth();
  const columns = UseColumns();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosAuth.get(`api/users/${session?.user?.id}`);
        console.log("response", response);
        const jsonData = response.data;
        console.log("jsondata", jsonData);
        setProperty(jsonData.user.properties);
        setLoading(false);
      } catch (error) {
        if(error.response.status===401||error.response.status===403) return
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status]); // Ensure useEffect runs when the status or session changes

  console.log("User data:", property);

  return (
    <div className="w-full  ">
      {loading ? (
        <TableSkelton />
      ) : (
        <DataTable columns={columns} columFilter="title" data={property} />
      )}
    </div>
  );
}

export default Page;

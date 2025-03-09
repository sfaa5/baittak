"use client";
import { DataTable } from './data-table';
import React, { useEffect, useState } from 'react';
import { UseColumns } from './columns';
import { useSession } from "next-auth/react";
import TableSkelton from '@/components/TableSkelton';
import { useSharedState } from '@/app/context/stateProvider';


const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;


export default function Page() {
  const {dataRequest, setDataRequest} = useSharedState();
  
  const columns = UseColumns();
  const [loading, setLoading] = useState(true); 
  const { data: session, status } = useSession();

 

  // Only proceed when session is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      const id = session?.user.id;
      // console.log("User ID:", id);

      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${URL_SERVER}/api/requests/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          setDataRequest(result); 
          // setStarRequest(result.filter(request => request.isStarred === true))
          // setAllRequest(result)
          console.log("Data fetched:", result);

        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); // Ensure loading is set to false in both success and error cases
        }
      };

      fetchData();
    }
  }, [status]);
  

  console.log("Updated dataRequest:", dataRequest);
  return (
    <div className="w-full ">
      {loading ? (
       <TableSkelton/>
      ) : (
        <DataTable columFilter="messages" columns={columns} data={dataRequest} />
      )}
    </div>
  );
}
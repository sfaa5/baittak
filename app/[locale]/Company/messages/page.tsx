"use client";

import { DataTable } from '@/components/Company/data-table'; 
import React, { useEffect, useState } from 'react';
import { columns } from './columns';
import { useSession } from "next-auth/react";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;


export default function Page() {
  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const { data: session, status } = useSession(); // Get session and status

  console.log("Session:", session);
  console.log("Status:", status); // Status will show "loading", "authenticated", or "unauthenticated"

  // Only proceed when session is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      const id = session?.user.id;
      console.log("User ID:", id);

      const fetchData = async () => {
        try {
          const response = await fetch(`${URL_SERVER}/api/requests/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          setData(result); // Set the fetched data in the state
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); // Ensure loading is set to false in both success and error cases
        }
      };

      fetchData();
    }
  }, [status, session]); // Re-run the effect when session or status changes
console.log("ddddddddddd",data)
  return (
    <div className="w-full px-10">
      {loading ? (
        <p>Loading...</p> // Show loading state
      ) : (
        <DataTable columFilter="messages" columns={columns} data={data} />
      )}
    </div>
  );
}

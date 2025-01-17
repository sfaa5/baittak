"use client"; // This tells Next.js to render this component on the client side

import { DataTable } from '@/components/Company/data-table';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useColumns } from './Columns';
import { useSharedState } from '@/app/context/stateProvider';
import TableSkelton from '@/components/TableSkelton';
const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

function Page() {
  const { data: session, status } = useSession();
  const{property,setProperty}=useSharedState();
  const [loading, setLoading] = useState(true); 
     const columns = useColumns();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL_SERVER}/api/users/${session.user.id}`);
        const jsonData = await response.json();
        setProperty(jsonData.properties);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); 
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status]); // Ensure useEffect runs when the status or session changes

  console.log("User data:", property);

  return (

    <div className="w-full  ">{

    loading?(<TableSkelton/>):
    (  <DataTable columns={columns} columFilter="title" data={property} />)
     
    }
     
    </div>
  );
}

export default Page;

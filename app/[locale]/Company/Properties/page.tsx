"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/Company/data-table";
import { Property, columns } from "./Columns";

import Title from "@/components/Company/titile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSharedState } from "@/app/context/stateProvider";
import TableSkelton from "@/components/TableSkelton";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

export default function DemoPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {property,setProperty}=useSharedState();
  const { data: session,status  } = useSession();
 const id = session?.user?.id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL_SERVER}/api/agency/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setProperty(result.properties);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if(status==="authenticated")
       {fetchData();}


  }, [status, session]);


console.log(data)



  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

    <div className="mx-auto py-10">
      <div className="flex w-full justify-between">
        <Title name="Properties" />
        <Link href={"Properties/addProperty"}>
          <Button>Add Property</Button>
        </Link>
      </div>

{
  loading?(
    <TableSkelton/>
  ):(
    <DataTable columns={columns} columFilter="title" data={property} />
  )
}

     


    </div>
  );
}

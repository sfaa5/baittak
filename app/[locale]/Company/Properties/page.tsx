"use client";

import { useEffect } from "react";
import { DataTable } from "@/components/Company/data-table";
import { UseColumns } from "./Columns";
import Title from "@/components/Company/titile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSharedState } from "@/app/context/stateProvider";
import TableSkelton from "@/components/TableSkelton";
import { useTranslations } from "next-intl";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

export default function DemoPage() {
   const { data: session, status } = useSession();
   const { property, setProperty } = useSharedState();
   const t = useTranslations(); // Ensure context is available
   const columns = UseColumns();

   const id = session?.user?.id;

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(`${URL_SERVER}/api/agency/${id}`);
            if (!response.ok) {
               throw new Error("Failed to fetch data");
            }
            const result = await response.json();
            console.log("result", result);
            setProperty(result.agency.properties);
         } catch (err) {
            console.error("Error fetching properties:", err.message);
         }
      };

      if (status === "authenticated") {
         fetchData();
      }
   }, [status, id, setProperty]);

   if (status === "loading") return <TableSkelton />;

   console.log("property", property);

   return (
      <div className="mx-auto py-5">
         <div className="flex w-full justify-between">
            <Title name="Properties" />
            <Link href={"/Company/Properties/addProperty"}>
               <Button>{t("property.add_Property")}</Button>
            </Link>
         </div>

         {property && (
         
            <DataTable columns={columns} columFilter="title" data={property} />
         
         ) }
         
      </div>
   );
}

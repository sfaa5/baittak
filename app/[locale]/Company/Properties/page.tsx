
import { DataTable } from "@/components/Company/data-table";
import { Property, columns } from "./Columns"

import Title from "@/components/Company/titile";
import { Button } from "@/components/ui/button";
import Link from "next/link";






export default async function DemoPage() {

const response = await fetch('http://localhost:5001/api/properties/get')
const data = await response.json()
console.log(data)

  return (
    <div className=" mx-auto py-10">
        <div className="flex w-full  justify-between">    <Title name="Properties" />  <Link href={"Properties/addProperty"}><Button>Add Property</Button></Link> </div>
      <DataTable columns={columns} columFilter="title" data={data.properties} />
    </div>
  )
}

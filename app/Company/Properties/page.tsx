
import { Property, columns } from "./Columns"
import { DataTable } from "../../../components/Company/data-table"
import Title from "@/components/Company/titile";


async function getRandomData(count: number): Promise<Property[]> {
  const areas = ["Gada", "City Center", "Downtown", "Uptown", "Seaside"];
  const types = ["Rent", "Buy"] as const;
  const statuses = ["pending", "processing", "success", "failed"] as const;
  const titles = ["New Duplex", "Modern Apartment", "Luxury Villa", "Cozy Cottage", "Stylish Condo"];
  
  const generateRandomProperty = (): Property => ({
    id: Math.random().toString(36).substr(2, 8), // Random string for ID
    title: titles[Math.floor(Math.random() * titles.length)],
    type: types[Math.floor(Math.random() * types.length)],
    price: Math.floor(Math.random() * 500) + 50, // Random price between 50 and 550
    area: areas[Math.floor(Math.random() * areas.length)],
    like: Math.floor(Math.random() * 100), // Random likes between 0 and 99
    status: statuses[Math.floor(Math.random() * statuses.length)],
  });

  return Array.from({ length: count }, generateRandomProperty);
}



export default async function DemoPage() {
  // Fetch data within the component
  const data = await getRandomData(10);


  return (
    <div className=" mx-auto py-10">
        <Title name="Properties" />
      <DataTable columns={columns} columFilter="title" data={data} />
    </div>
  )
}

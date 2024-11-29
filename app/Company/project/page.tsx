import { Project, columns } from "./Columns"
import { DataTable } from "../../../components/Company/data-table"

async function getRandomData(count: number): Promise<Project[]> {
  const location = ["Gada", "City Center", "Downtown", "Uptown", "Seaside"];

  const statuses = ["Completed", "Not Completed"] as const;
  const titles = ["New Duplex", "Modern Apartment", "Luxury Villa", "Cozy Cottage", "Stylish Condo"];
  
  const generateRandomProperty = (): Project => ({
    id: Math.random().toString(36).substr(2, 8), // Random string for ID
    title: titles[Math.floor(Math.random() * titles.length)],
   
    Bedrooms: Math.floor(Math.random() * 500) + 50, // Random price between 50 and 550
    
    priceFrom: Math.floor(Math.random() * 500) + 50, // Random price between 50 and 550
    totalUnits: Math.floor(Math.random() * 500) + 50, // Random price between 50 and 550
    location: location[Math.floor(Math.random() * location.length)],
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
              <h1 className="h1 py-0">Projects</h1>
      <DataTable columns={columns} data={data} columFilter="title" />
    </div>
  )
}

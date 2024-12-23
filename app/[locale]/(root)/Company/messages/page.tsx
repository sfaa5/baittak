import { Message } from './columns'
import { DataTable } from '@/components/Company/data-table'; 
import React from 'react'
import { columns } from './columns'



async function getRandomMessage(count: number): Promise<Message[]> {

    const names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Emma Davis"];
    const messages = [
      "Can we schedule a meeting?",
      "Looking forward to your reply.",
      "Please review the document.",
      "Thank you for your assistance!",
      "Let me know your thoughts."
    ];
    
    const generateRandomTime = (): string => {
    
      const hours = Math.floor(Math.random() * 24); // Random hour of the day.
      const minutes = Math.floor(Math.random() * 60); // Random minutes.
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    };
  
    const generateRandomProject = (): Message => ({
      id: Math.random().toString(36).substr(2, 8), // Random unique ID.
      name: names[Math.floor(Math.random() * names.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      time: generateRandomTime(),
    });
  
    return Array.from({ length: count }, generateRandomProject);


}


export default async function page() {


const data = await getRandomMessage(10)
    
  return (

<div className='w-full px-10'>



<DataTable columFilter='messages'  columns={columns} data={data}  />


</div>
  )
}

 
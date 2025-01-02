import React from 'react'
import { Skeleton } from './ui/skeleton'

function TableSkelton() {
  return (
    <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b">
                  <Skeleton className="h-5 w-24" />
                </th>
                <th className="p-4 border-b">
                  <Skeleton className="h-5 w-24" />
                </th>
                <th className="p-4 border-b">
                  <Skeleton className="h-5 w-24" />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="even:bg-gray-50">
                  <td className="p-4 border-b">
                    <Skeleton className="h-5 w-full" />
                  </td>
                  <td className="p-4 border-b">
                    <Skeleton className="h-5 w-full" />
                  </td>
                  <td className="p-4 border-b">
                    <Skeleton className="h-5 w-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  )
}

export default TableSkelton
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className=" max-w-md  bg-white rounded-[10px] shadow-md overflow-hidden  md:max-w-[350px] group">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

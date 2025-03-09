import { Skeleton } from "../ui/skeleton";

const sidebarSkeleton = () => {
	return (
		<>
			<div className='flex gap-3 items-center mb-5 px-2'>
				<Skeleton className='skeleton w-10 h-10 rounded-full shrink-0'></Skeleton>
			
					<Skeleton className='skeleton h-4 w-40'></Skeleton>
		
			</div>

		</>
	);
};
export default sidebarSkeleton;

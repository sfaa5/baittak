import { Skeleton } from "../ui/skeleton";

const MessageSkeleton = () => {
	return (
		<>
			<div className='flex gap-3 items-center'>
				<Skeleton className='skeleton w-10 h-10 rounded-full shrink-0'></Skeleton>
				<div className='flex flex-col gap-1'>
					<Skeleton className='skeleton h-4 w-40'></Skeleton>
					<Skeleton className='skeleton h-4 w-40'></Skeleton>
				</div>
			</div>
			<div className='flex gap-3 items-center justify-end'>
				<div className='flex flex-col gap-1'>
					<Skeleton className='skeleton h-4 w-40'></Skeleton>
				</div>
				<Skeleton className='skeleton w-10 h-10 rounded-full shrink-0'></Skeleton>
			</div>
		</>
	);
};
export default MessageSkeleton;

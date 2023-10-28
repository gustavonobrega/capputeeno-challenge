export function ProductCardSkeleton() {
  return (
    <div className="w-[256px] animate-pulse overflow-hidden rounded-md">
      <div className="h-[300px] w-full bg-gray-300"></div>
      <div className="space-y-3 rounded-md bg-white px-3 py-5">
        <div className=" w-1/2 rounded-full bg-gray-300 pb-3"></div>
        <div className="w-1/4 rounded-full bg-gray-300 pb-3"></div>
      </div>
    </div>
  )
}

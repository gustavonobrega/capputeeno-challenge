export function ProductPageSkeleton() {
  return (
    <div className="m-auto mt-9 max-w-desktop animate-pulse px-5 pb-16">
      <div className="h-4 w-16 rounded-md bg-gray-300" />

      <div className="mt-6 flex flex-col items-center gap-8 lg:flex-row lg:items-stretch">
        <div className="h-[580px] w-[640px] rounded-md bg-gray-300 " />

        <div className="flex w-full max-w-[640px] flex-col lg:max-w-none lg:flex-1">
          <div className="h-4 w-16 rounded-md bg-gray-300" />

          <div className="mt-3 h-5 w-20 rounded-md bg-gray-300" />

          <div className="mb-6 mt-2 h-4 w-16 rounded-md bg-gray-300" />

          <div className="h-3 w-full rounded-md bg-gray-300" />

          <div className="mt-14 h-4 w-16 rounded-md bg-gray-300" />

          <div className="mb-10 mt-2 space-y-2 lg:mb-auto">
            <div className="h-3 w-full rounded-md bg-gray-300" />
            <div className="h-3 w-full rounded-md bg-gray-300" />
            <div className="h-3 w-full rounded-md bg-gray-300" />
            <div className="h-3 w-1/2 rounded-md bg-gray-300" />
          </div>

          <div className="h-10 w-full rounded-md bg-gray-300" />
        </div>
      </div>
    </div>
  )
}

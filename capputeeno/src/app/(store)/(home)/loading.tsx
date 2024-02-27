import { ProductCardSkeleton } from '@/components/Skeletons/ProductCardSkeleton'

export default function HomeLoading() {
  return (
    <div className="m-auto mt-9 max-w-desktop px-5 pb-16">
      <main className="mb-16 mt-9 grid grid-cols-app justify-center gap-x-8 gap-y-6">
        {Array.from({ length: 8 }).map((_, i) => {
          return <ProductCardSkeleton key={i} />
        })}
      </main>
    </div>
  )
}

import { ProductCardSkeleton } from '@/components/Skeletons/ProductCardSkeleton'
import React from 'react'

export default function SearchLoading() {
  return (
    <div className="m-auto mt-9 max-w-desktop px-5 pb-16">
      <div className="mb-16 mt-9 grid grid-cols-app justify-center gap-x-8 gap-y-6 lg:justify-start">
        {Array.from({ length: 8 }).map((_, i) => {
          return <ProductCardSkeleton key={i} />
        })}
      </div>
    </div>
  )
}

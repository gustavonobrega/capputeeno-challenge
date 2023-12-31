'use client'

import { NavFilter } from '@/components/NavFilter'
import { ProductCard } from '@/components/ProductCard'
import { Select } from '@/components/Select'
import { SelectItem } from '@/components/Select/SelectItem'
import { GET_PRODUCTS } from '@/graphql/queries'
import { useFilterContext } from '@/hooks/useFilterContext'
import { formatQueryVariables } from '@/utils/format-query-variables'
import { api } from '@/lib/axios'
import { type Product } from '@/types/product'
import { useQuery } from '@tanstack/react-query'
import { ProductCardSkeleton } from '@/components/Skeletons/ProductCardSkeleton'
import { Pagination } from '@/components/Pagination'

type QueryData = {
  products: Product[]
  count: number
}

export default function Home() {
  const { type, order, page, perPage } = useFilterContext()

  const { data, isLoading, isError } = useQuery<QueryData>({
    queryKey: ['products', type, order, page],
    queryFn: async () => {
      const response = await api.post('/', {
        query: GET_PRODUCTS,
        variables: formatQueryVariables(order, type, page, perPage),
      })

      return {
        products: response.data.data.allProducts,
        count: response.data.data._allProductsMeta.count,
      }
    },
  })

  const products = data?.products

  return (
    <div className="m-auto mt-9 max-w-desktop px-5 pb-16">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:justify-between sm:gap-0">
        <NavFilter />

        <Select placeholder="Organizar por">
          <SelectItem value="news" text="Novidades" />
          <SelectItem value="biggest_price" text="Preço: Maior - menor" />
          <SelectItem value="minor_price" text="Preço: Menor - maior" />
          <SelectItem value="topseller" text="Mais vendidos" />
        </Select>
      </div>

      {products && <Pagination count={data?.count} />}

      <main className="mb-16 mt-9 grid grid-cols-app justify-center gap-x-8 gap-y-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => {
            return <ProductCardSkeleton key={i} />
          })
        ) : isError ? (
          <h1 className="whitespace-nowrap text-3xl font-bold text-app-text-300">
            Falha ao obter dados...
          </h1>
        ) : (
          products?.map((product) => {
            return (
              <ProductCard
                key={product.id}
                name={product.name}
                id={product.id}
                imgUrl={product.image_url}
                price={product.price_in_cents}
              />
            )
          })
        )}
      </main>

      {products && <Pagination count={data?.count} />}
    </div>
  )
}

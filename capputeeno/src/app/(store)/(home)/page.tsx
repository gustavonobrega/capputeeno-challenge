import { NavFilter } from '@/components/NavFilter'
import { ProductCard } from '@/components/ProductCard'
import { Select } from '@/components/Select'
import { SelectItem } from '@/components/Select/SelectItem'
import { GET_PRODUCTS } from '@/graphql/queries'
import { formatQueryVariables } from '@/utils/format-query-variables'
import { type Product } from '@/types/product'
import { Pagination } from '@/components/Pagination'
import { z } from 'zod'
import { env } from '@/env'
import { FilterType, OrderOption } from '@/types/filter-types'

type HomeProps = {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

type QueryData = {
  products: Product[]
  count: number
}

const PERPAGE = 10

async function getProducts(
  type: FilterType,
  order: OrderOption,
  page: number,
): Promise<QueryData> {
  try {
    const response = await fetch(env.APP_URL, {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_PRODUCTS,
        variables: formatQueryVariables(order, type, page, PERPAGE),
      }),
    })
    const queryData = await response.json()

    return {
      products: queryData.data.allProducts,
      count: queryData.data._allProductsMeta.count,
    }
  } catch (error) {
    throw new Error('Não foi possível obter os dados dos produtos.')
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const searchParamsSchema = z
    .object({
      type: z
        .enum(['all', 't-shirts', 'mugs'])
        .optional()
        .transform((value) => (value === undefined ? 'all' : value)),
      order: z
        .enum(['news', 'topseller', 'biggest_price', 'minor_price'])
        .optional()
        .transform((value) => (value === undefined ? '' : value)),
      page: z.coerce
        .number()
        .optional()
        .transform((value) => (value === undefined ? 1 : value)),
    })
    .safeParse(searchParams)

  if (!searchParamsSchema.success) {
    throw new Error('Filtros inválidos!')
  }

  const { type, order, page } = searchParamsSchema.data

  const { products, count } = await getProducts(type, order, page)

  return (
    <div className="m-auto mt-9 max-w-desktop px-5 pb-16">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:justify-between sm:gap-0">
        <NavFilter type={type} />

        <Select
          order={order}
          type={type}
          page={page}
          placeholder="Organizar por"
        >
          <SelectItem value="news" text="Novidades" />
          <SelectItem value="biggest_price" text="Preço: Maior - menor" />
          <SelectItem value="minor_price" text="Preço: Menor - maior" />
          <SelectItem value="topseller" text="Mais vendidos" />
        </Select>
      </div>

      {products && (
        <Pagination
          count={count}
          page={page}
          type={type}
          order={order}
          perPage={PERPAGE}
        />
      )}

      <main className="mb-16 mt-9 grid grid-cols-app justify-center gap-x-8 gap-y-6">
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              name={product.name}
              id={product.id}
              imgUrl={product.image_url}
              price={product.price_in_cents}
            />
          )
        })}
      </main>

      {products && (
        <Pagination
          count={count}
          page={page}
          order={order}
          type={type}
          perPage={PERPAGE}
        />
      )}
    </div>
  )
}

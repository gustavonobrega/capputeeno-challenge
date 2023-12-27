import { ProductCard } from '@/components/ProductCard'
import { env } from '@/env'
import { GET_PRODUCTS_BY_NAME } from '@/graphql/queries'
import { Product } from '@/types/product'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

interface SearchProps {
  searchParams: {
    q: string
  }
}

export const metadata: Metadata = {
  title: 'Busca',
}

async function searchProducts(query: string): Promise<Product[]> {
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
        query: GET_PRODUCTS_BY_NAME,
        variables: { filter: { name: `${query}` } },
      }),
    })

    const products = await response.json()
    return products.data.allProducts
  } catch (error) {
    throw new Error('Não foi possível obter os dados do produto.')
  }
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  const products = await searchProducts(query)

  return (
    <div className="m-auto mt-9 max-w-desktop px-5 pb-16">
      <h2 className="text-2xl text-app-text-400">
        Resultados para: <span className="font-semibold">{query}</span>
      </h2>

      {products.length > 0 ? (
        <div className="mb-16 mt-9 grid grid-cols-app justify-center gap-x-8 gap-y-6 lg:justify-start">
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
        </div>
      ) : (
        <p className="mt-2 text-app-text-400">
          Não encontramos nenhum produto com esse nome,{' '}
          <span className="font-semibold">tente algo diferente</span>.
        </p>
      )}
    </div>
  )
}

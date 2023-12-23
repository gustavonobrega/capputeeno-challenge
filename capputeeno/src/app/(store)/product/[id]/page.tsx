import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { Metadata } from 'next'

import { type Product } from '@/types/product'
import { formatPrice } from '@/utils/format-price'
import { BackButton } from '@/components/BackButton'
import { AddButton } from './components/AddButton'
import { env } from '@/env'
import { GET_PRODUCT, GET_TOP5 } from '@/graphql/queries'

type ProductProps = {
  params: {
    id: string
  }
}

async function getProduct(id: string): Promise<Product> {
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
        query: GET_PRODUCT,
        variables: { id },
      }),
    })
    const product = await response.json()
    return product.data.Product
  } catch (error) {
    throw new Error('Não foi possível obter os dados do produto.')
  }
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.id)

  return {
    title: product.name,
  }
}

export async function generateStaticParams() {
  const response = await fetch(env.APP_URL, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_TOP5,
      variables: {},
    }),
  })

  const products = await response.json()

  return products.data.allProducts.map((product: Product) => {
    return {
      id: product.id,
    }
  })
}

export default async function Product({ params }: ProductProps) {
  const product = await getProduct(params.id)

  const formattedPrice = formatPrice(product.price_in_cents)

  return (
    <div className="m-auto mt-9 max-w-desktop px-5 pb-16">
      <BackButton href="/" />

      <main className="mt-6 flex flex-col items-center gap-8 lg:flex-row lg:items-stretch">
        <Image
          src={product.image_url}
          alt={product.name}
          width={640}
          height={580}
          className="rounded-md"
        />

        <div className="flex max-w-[640px] flex-col lg:max-w-none lg:flex-1">
          <span className="text-app-text-400">
            {product.category === 'mugs' ? 'Caneca' : 'Camiseta'}
          </span>

          <h1 className="mt-3 text-3xl font-light text-app-text-400">
            {product.name}
          </h1>
          <h2 className="mb-6 mt-2 text-xl font-semibold text-black">
            {formattedPrice}
          </h2>

          <span className="text-xs text-app-text-400">
            *Frete de R$40,00 para todo o Brasil. Grátis para compras acima de
            R$900,00.
          </span>

          <h3 className="mt-14 font-medium uppercase text-app-text-300">
            Descrição
          </h3>
          <p className="mb-10 mt-2 text-sm text-app-text-400 lg:mb-auto">
            {product.description}
          </p>

          <AddButton
            icon={<ShoppingBag size={22} />}
            text="Adicionar ao carrinho"
            product={product}
          />
        </div>
      </main>
    </div>
  )
}

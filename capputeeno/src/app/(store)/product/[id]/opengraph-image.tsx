import { ImageResponse } from 'next/server'
import colors from 'tailwindcss/colors'

import { Product } from '@/types/product'
import { env } from '@/env'
import { GET_PRODUCT } from '@/graphql/queries'

export const runtime = 'edge'

export const alt = ''

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getProduct(id: string): Promise<Product> {
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
}

export default async function Image({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  const productImageURL = new URL(product.image_url, env.APP_URL).toString()

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageURL} alt="" style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  )
}

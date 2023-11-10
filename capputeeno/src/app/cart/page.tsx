'use client'

import { BackButton } from '@/components/BackButton'
import { useCart } from '@/hooks/useCart'
import { CartCard } from './components/CartCard'
import { formatPrice } from '@/utils/format-price'
import { CartCheckout } from './components/CartCheckout'

export default function Cart() {
  const { cart, cartSize, totalCartPrice } = useCart()

  const formattedTotalPrice = formatPrice(totalCartPrice)

  return (
    <div className="m-auto mt-9 max-w-desktop px-5 pb-16">
      <main className="relative grid grid-cols-1 gap-8 lg:grid-cols-cart">
        <div className="">
          <BackButton href="/" />
          <h1 className="mb-1.5 mt-6 text-2xl font-medium uppercase text-app-text-400">
            Seu Carrinho
          </h1>
          <span className="font-light text-app-text-400">
            Total({cartSize} produtos){' '}
            <strong className="font-semibold">{formattedTotalPrice}</strong>
          </span>

          <div className="mt-6 w-full space-y-4">
            {cart.map((product) => {
              return <CartCard key={product.id} product={product} />
            })}
          </div>
        </div>

        <CartCheckout />
      </main>
    </div>
  )
}

import Link from 'next/link'
import React from 'react'

import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/format-price'
import { CartDialog } from './CartDialog'

const SHIPPING_PRICE_IN_CENTS = 4000

export function CartCheckout() {
  const { totalCartPrice } = useCart()
  const prices = {
    subtotal: formatPrice(totalCartPrice),
    shipping: formatPrice(SHIPPING_PRICE_IN_CENTS),
    total: formatPrice(totalCartPrice + SHIPPING_PRICE_IN_CENTS),
  }

  return (
    <aside className="lg:l-0 flex h-[700px] flex-col bg-white p-6 lg:sticky lg:top-4">
      <h2 className="text-xl font-semibold uppercase text-app-text-400">
        Resumo do Pedido
      </h2>

      <div className="mt-7 text-app-text-400">
        <div className="flex justify-between">
          <span>Subtotal de produtos</span>
          <span>{prices.subtotal}</span>
        </div>
        <div className="mt-3 flex justify-between border-b border-app-background-200 pb-6">
          <span>Entrega </span>
          <span>{prices.shipping}</span>
        </div>
        <div className="mt-2 flex justify-between">
          <strong>Total</strong>
          <strong>{prices.total}</strong>
        </div>

        <CartDialog>
          <button className="mt-10 w-full rounded-md bg-app-green p-2.5 font-medium uppercase text-white outline-app-light-orange hover:opacity-90">
            Finalizar a compra
          </button>
        </CartDialog>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <Link
          className="text-sm font-medium uppercase text-app-text-300 underline outline-app-light-orange"
          href="/"
        >
          Ajuda
        </Link>
        <Link
          className="text-sm font-medium uppercase text-app-text-300 underline outline-app-light-orange"
          href="/"
        >
          Reembolsos
        </Link>
        <Link
          className="text-sm font-medium uppercase text-app-text-300 underline outline-app-light-orange"
          href="/"
        >
          Entregas e frete
        </Link>
        <Link
          className="text-sm font-medium uppercase text-app-text-300 underline outline-app-light-orange"
          href="/"
        >
          Trocas e devoluções
        </Link>
      </div>
    </aside>
  )
}

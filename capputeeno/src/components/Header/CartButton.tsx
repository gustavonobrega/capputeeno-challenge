'use client'

import { useCart } from '@/hooks/useCart'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export function CartButton() {
  const { cartSize } = useCart()

  return (
    <Link href="/cart" className="relative outline-app-light-orange">
      <ShoppingBag size={24} className="text-app-text-300" />
      {cartSize > 0 && (
        <span className="absolute -bottom-2 -right-2 rounded-full bg-app-red px-1.5 py-0.5 text-xs font-medium text-white">
          {cartSize}
        </span>
      )}
    </Link>
  )
}

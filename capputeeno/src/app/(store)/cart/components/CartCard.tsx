'use client'

import { CartProduct } from '@/types/product'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { CartSelect } from './CartSelect'
import { useState } from 'react'
import { formatPrice } from '@/utils/format-price'
import { useCart } from '@/hooks/useCart'
import toast from 'react-hot-toast'

type CartCardProps = {
  product: CartProduct
}

export function CartCard({ product }: CartCardProps) {
  const [quantity, setQuantity] = useState(String(product.quantity))
  const { handleAddToCart, handleRemoveFromCart } = useCart()

  function handleChangeProductQuantity(productQuantity: string) {
    setQuantity(productQuantity)

    handleAddToCart(product, Number(productQuantity))
    toast.success('Produto atualizado!', {
      iconTheme: {
        primary: '#115D8C',
        secondary: '#FFFFFF',
      },
    })
  }

  function handleRemoveProduct() {
    handleRemoveFromCart(product.id)
    toast.success('Produto removido!', {
      iconTheme: {
        primary: '#DE3838',
        secondary: '#FFFFFF',
      },
    })
  }

  const totalProductPrice = formatPrice(
    product.quantity * product.price_in_cents,
  )

  return (
    <div className="flex gap-3 overflow-hidden rounded-lg bg-white shadow md:gap-8">
      <Image
        src={product.image_url}
        alt={product.name}
        width={256}
        height={211}
        className="w-44 sm:w-52 md:w-[256px]"
      />

      <div className="flex flex-col pb-6 pr-4 pt-4 text-app-text-400">
        <div className="flex justify-between">
          <h3 className="font-light md:text-lg lg:text-xl">{product.name}</h3>
          <button className="text-app-red" onClick={handleRemoveProduct}>
            <Trash2
              className="h-4 w-4 lg:h-5 lg:w-5"
              data-testid="remove-btn"
            />
          </button>
        </div>
        <p className="mt-2 line-clamp-1 text-xs sm:line-clamp-2 md:mt-4 lg:line-clamp-5">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <CartSelect
            quantity={quantity}
            handleChangeProductQuantity={handleChangeProductQuantity}
          />
          <strong className="text-sm text-black lg:text-base">
            {totalProductPrice}
          </strong>
        </div>
      </div>
    </div>
  )
}

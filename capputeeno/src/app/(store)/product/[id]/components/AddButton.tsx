'use client'

import { useCart } from '@/hooks/useCart'
import { Product } from '@/types/product'
import React, { ComponentProps, ReactNode } from 'react'
import toast from 'react-hot-toast'

type ButtonProps = ComponentProps<'button'> & {
  icon?: ReactNode
  text: string
  product: Product
}

export function AddButton({ icon, text, product, ...props }: ButtonProps) {
  const { handleAddToCart } = useCart()

  function handleAddClick() {
    try {
      handleAddToCart(product)
      toast.success(`${product.name} adicionado com sucesso!`)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <button
      {...props}
      className="flex items-center justify-center gap-3 rounded-md bg-app-blue p-2.5 font-medium uppercase text-white outline-app-light-orange hover:opacity-90"
      onClick={handleAddClick}
    >
      {icon}
      {text}
    </button>
  )
}

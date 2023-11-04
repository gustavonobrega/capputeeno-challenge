'use client'

import { Product } from '@/types/product'
import { ReactNode, createContext, useState } from 'react'

type CartContextProviderProps = {
  children: ReactNode
}

type CartProduct = Product & {
  quantity: number
}

type CartContextProps = {
  cart: CartProduct[]
  handleAddToCart: (product: Product, quantity?: number) => void
  cartSize: number
}

export const CartContext = createContext({} as CartContextProps)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<CartProduct[]>([])
  const cartSize = cart.reduce((acc, product) => {
    acc += product.quantity

    return acc
  }, 0)

  function handleAddToCart(product: Product, quantity?: number) {
    const alreadyInCart = cart.find(
      (cartProduct) => cartProduct.id === product.id,
    )

    if (!alreadyInCart) {
      const cartProduct = {
        ...product,
        quantity: 1,
      }

      setCart((currentCart) => [...currentCart, cartProduct])
    } else {
      if (alreadyInCart.quantity >= 5) {
        throw new Error('Você já possui o limite desse produto por carrinho!')
      }

      const newCart = cart.map((cartProduct) => {
        if (alreadyInCart.id === cartProduct.id) {
          return {
            ...cartProduct,
            quantity: quantity ?? cartProduct.quantity + 1,
          }
        }
        return cartProduct
      })

      setCart(newCart)
    }
  }

  return (
    <CartContext.Provider value={{ cart, handleAddToCart, cartSize }}>
      {children}
    </CartContext.Provider>
  )
}

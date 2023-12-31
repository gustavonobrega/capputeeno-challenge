'use client'

import type { CartProduct, Product } from '@/types/product'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useEffect, useState } from 'react'

type CartContextProviderProps = {
  children: ReactNode
}

type CartContextProps = {
  cart: CartProduct[]
  cartSize: number
  totalCartPrice: number
  handleAddToCart: (product: Product, quantity?: number) => void
  handleRemoveFromCart: (productId: string) => void
  handleClearCart: () => void
}

export const CartContext = createContext({} as CartContextProps)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<CartProduct[]>([])
  const router = useRouter()
  const cartSize = cart.reduce((acc, product) => {
    acc += product.quantity

    return acc
  }, 0)
  const totalCartPrice = cart.reduce((acc, product) => {
    acc += product.quantity * product.price_in_cents

    return acc
  }, 0)

  useEffect(() => {
    const storedCart = localStorage.getItem('@capputeeno:cart')
    setCart(storedCart ? JSON.parse(storedCart) : [])
  }, [])

  function handleAddToCart(product: Product, quantity?: number) {
    const alreadyInCart = cart.find(
      (cartProduct) => cartProduct.id === product.id,
    )

    if (!alreadyInCart) {
      const cartProduct = {
        ...product,
        quantity: 1,
      }

      setCart((currentCart) => {
        localStorage.setItem(
          '@capputeeno:cart',
          JSON.stringify([...currentCart, cartProduct]),
        )

        return [...currentCart, cartProduct]
      })
    } else {
      if (alreadyInCart.quantity >= 5 && quantity === undefined) {
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
      localStorage.setItem('@capputeeno:cart', JSON.stringify(newCart))
    }
  }

  function handleRemoveFromCart(productId: string) {
    const existsInCart = cart.find(
      (cartProduct) => cartProduct.id === productId,
    )

    if (existsInCart) {
      const filteredCart = cart.filter((product) => product.id !== productId)

      setCart(filteredCart)
      localStorage.setItem('@capputeeno:cart', JSON.stringify(filteredCart))
    }
  }

  function handleClearCart() {
    setCart([])
    localStorage.setItem('@capputeeno:cart', JSON.stringify([]))
    router.push('/')
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartSize,
        totalCartPrice,
        handleAddToCart,
        handleRemoveFromCart,
        handleClearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

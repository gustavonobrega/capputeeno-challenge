'use client'

import { ReactNode, createContext, useState } from 'react'

type FilterContextProviderProps = {
  children: ReactNode
}

export type FilterType = 'all' | 't-shirts' | 'mugs'

export type OrderOption =
  | 'news'
  | 'topseller'
  | 'biggest_price'
  | 'minor_price'
  | ''

type FilterContextProps = {
  type: FilterType
  handleChangeType: (filterType: FilterType) => void
  order: OrderOption
  handleChangeOrder: (filterOrder: OrderOption) => void
}

export const FilterContext = createContext({} as FilterContextProps)

export function FilterContextProvider({
  children,
}: FilterContextProviderProps) {
  const [type, setType] = useState<FilterType>('all')
  const [order, setOrder] = useState<OrderOption>('')

  function handleChangeType(filterType: FilterType) {
    setType(filterType)
  }

  function handleChangeOrder(orderOption: OrderOption) {
    setOrder(orderOption)
  }

  return (
    <FilterContext.Provider
      value={{ type, order, handleChangeType, handleChangeOrder }}
    >
      {children}
    </FilterContext.Provider>
  )
}

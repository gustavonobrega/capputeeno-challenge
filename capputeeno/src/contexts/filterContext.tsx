'use client'

import type { FilterType, OrderOption } from '@/types/filter-types'
import { ReactNode, createContext, useState } from 'react'

type FilterContextProviderProps = {
  children: ReactNode
}

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

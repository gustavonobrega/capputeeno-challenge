'use client'

import type { FilterType, OrderOption } from '@/types/filter-types'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

type FilterContextProviderProps = {
  children: ReactNode
}

type FilterContextProps = {
  type: FilterType
  handleChangeType: (filterType: FilterType) => void
  order: OrderOption
  handleChangeOrder: (filterOrder: OrderOption) => void
  page: number
  perPage: number
  setPage: Dispatch<SetStateAction<number>>
}

export const FilterContext = createContext({} as FilterContextProps)

export function FilterContextProvider({
  children,
}: FilterContextProviderProps) {
  const [type, setType] = useState<FilterType>('all')
  const [order, setOrder] = useState<OrderOption>('')

  const [page, setPage] = useState(1)
  const perPage = 10

  function handleChangeType(filterType: FilterType) {
    setType(filterType)
    setOrder('')
    setPage(1)
  }

  function handleChangeOrder(orderOption: OrderOption) {
    setOrder(orderOption)
  }

  return (
    <FilterContext.Provider
      value={{
        type,
        order,
        page,
        perPage,
        setPage,
        handleChangeType,
        handleChangeOrder,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

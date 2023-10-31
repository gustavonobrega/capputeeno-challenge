'use client'

import type { FilterType, OrderOption } from '@/types/filter-types'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useDeferredValue,
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
  search: string
  handleChangeSearch: (searchInput: string) => void
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

  const [searchInput, setSearchInput] = useState('')
  const search = useDeferredValue(searchInput)

  function handleChangeType(filterType: FilterType) {
    setType(filterType)
    setOrder('')
    setPage(1)
  }

  function handleChangeOrder(orderOption: OrderOption) {
    setOrder(orderOption)
  }

  function handleChangeSearch(searchInput: string) {
    setSearchInput(searchInput)
  }

  return (
    <FilterContext.Provider
      value={{
        type,
        order,
        search,
        page,
        perPage,
        setPage,
        handleChangeType,
        handleChangeOrder,
        handleChangeSearch,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

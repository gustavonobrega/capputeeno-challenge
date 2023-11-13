'use client'

import type { FilterType, OrderOption } from '@/types/filter-types'
import { useRouter, usePathname } from 'next/navigation'
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

  const [search, setSearch] = useState('')
  const pathName = usePathname()
  const router = useRouter()

  function handleChangeType(filterType: FilterType) {
    setType(filterType)
    setOrder('')
    setPage(1)
    setSearch('')
  }

  function handleChangeOrder(orderOption: OrderOption) {
    setOrder(orderOption)
  }

  function handleChangeSearch(searchInput: string) {
    if (pathName !== '/') {
      setSearch(searchInput)
      router.push('/')
    } else {
      setSearch(searchInput)
    }
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

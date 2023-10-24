'use client'

import { tv } from 'tailwind-variants'

import { useFilterContext } from '@/hooks/useFilterContext'
import { type FilterType } from '@/types/filter-types'

const navItem = tv({
  base: [
    'focus-visible:outline-app-light-orange uppercase border-b-4 border-transparent enabled:hover:border-app-text-300 transition-all',
  ],
  variants: {
    selected: {
      true: 'border-app-light-orange font-semibold text-app-text-400',
    },
  },
})

type ITypeList = {
  title: string
  type: FilterType
}[]

const typeList: ITypeList = [
  { title: 'Todos os produtos', type: 'all' },
  { title: 'Camisetas', type: 't-shirts' },
  { title: 'Canecas', type: 'mugs' },
]

export function NavFilter() {
  const { type, handleChangeType } = useFilterContext()

  return (
    <ul className="flex gap-5 whitespace-nowrap text-sm text-app-text-300 sm:gap-10 sm:text-base">
      {typeList.map((item) => {
        return (
          <li key={item.type}>
            <button
              className={navItem({ selected: item.type === type })}
              disabled={item.type === type}
              onClick={() => handleChangeType(item.type)}
            >
              {item.title}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

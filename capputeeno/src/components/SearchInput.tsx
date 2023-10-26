'use client'

import { Search } from 'lucide-react'
import { ComponentProps } from 'react'

type SearchInputProps = ComponentProps<'input'>

export function SearchInput({ ...props }: SearchInputProps) {
  return (
    <div className="hidden w-96 rounded-lg bg-zinc-100 px-4 py-3 text-sm text-app-text-400 focus-within:ring-2 focus-within:ring-app-light-orange md:flex">
      <input
        {...props}
        type="text"
        className="flex-1 bg-zinc-100 outline-none placeholder:text-sm placeholder:text-app-text-300"
      />
      <Search
        className="text-app-text-300 group-hover:text-app-light-orange"
        size={26}
      />
    </div>
  )
}

'use client'

import { useFilterContext } from '@/hooks/useFilterContext'
import { Search } from 'lucide-react'
import { ComponentProps, useRef } from 'react'

type SearchInputProps = ComponentProps<'input'>

export function SearchInput({ ...props }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { handleChangeSearch } = useFilterContext()

  function handleSearch() {
    if (inputRef.current) {
      handleChangeSearch(inputRef.current.value)
      inputRef.current.value = ''
    }
  }

  return (
    <div className="hidden w-96 rounded-lg bg-zinc-100 px-4 py-3 text-sm text-app-text-400 focus-within:ring-2 focus-within:ring-app-light-orange md:flex">
      <input
        {...props}
        type="text"
        className="flex-1 bg-zinc-100 outline-none placeholder:text-sm placeholder:text-app-text-300"
        ref={inputRef}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>
        <Search
          className="text-app-text-300 transition hover:text-app-light-orange"
          size={26}
        />
      </button>
    </div>
  )
}

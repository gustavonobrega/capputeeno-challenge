'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ComponentProps, FormEvent } from 'react'

type SearchFormProps = ComponentProps<'input'>

export function SearchForm({ ...props }: SearchFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('q')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.value

    if (!query) {
      return null
    }

    router.push(`/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="hidden w-96 rounded-lg bg-zinc-100 px-4 py-3 text-sm text-app-text-400 focus-within:ring-2 focus-within:ring-app-light-orange md:flex"
    >
      <input
        {...props}
        name="value"
        type="text"
        defaultValue={searchQuery ?? ''}
        className="flex-1 bg-zinc-100 outline-none placeholder:text-sm placeholder:text-app-text-300"
        required
      />
      <button type="submit">
        <Search
          className="text-app-text-300 transition hover:text-app-light-orange"
          size={26}
        />
      </button>
    </form>
  )
}

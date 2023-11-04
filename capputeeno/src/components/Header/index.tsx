import { Saira_Stencil_One as Stencil } from 'next/font/google'
import Link from 'next/link'
import React from 'react'
import { SearchInput } from '../SearchInput'
import { CartButton } from './CartButton'

const stencil = Stencil({
  weight: ['400'],
  subsets: ['latin'],
})

export function Header() {
  return (
    <header className="h-20 bg-white">
      <div className=" m-auto flex h-full max-w-desktop items-center justify-between px-5">
        <Link
          href="/"
          className={`text-[2.5rem] text-app-title outline-app-light-orange ${stencil.className}`}
        >
          capputeeno
        </Link>

        <div className="flex items-center gap-6 ">
          <SearchInput placeholder="Procurando por algo específico?" />

          <CartButton />
        </div>
      </div>
    </header>
  )
}

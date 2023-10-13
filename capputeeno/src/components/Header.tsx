import { Search, ShoppingBag } from 'lucide-react'
import { Saira_Stencil_One as Stencil } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

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
          <div className="hidden w-96 rounded-lg bg-zinc-100 px-4 py-3 text-sm text-app-text-400 focus-within:ring-2 focus-within:ring-app-light-orange md:flex">
            <input
              type="text"
              placeholder="Procurando por algo específico?"
              className="flex-1 bg-zinc-100 outline-none placeholder:text-sm placeholder:text-app-text-300"
            />
            <Search className="text-app-text-300" size={26} />
          </div>

          <Link href="/cart" className="relative">
            <ShoppingBag size={24} className="text-app-text-300" />
            <span className="absolute -bottom-2 -right-2 rounded-full bg-app-red px-1.5 py-0.5 text-xs text-white">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

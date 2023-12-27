'use client'

import Link from 'next/link'
import { tv } from 'tailwind-variants'

const button = tv({
  base: 'p-2 border rounded-md hover:opacity-80 outline-app-light-orange font-medium border-app-text-300/20 text-app-text-300 text-sm bg-app-text-300/10',
})

type ErrorProps = {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="m-auto mt-16 max-w-desktop px-5 pb-16 text-center">
      <h1 className="text-2xl font-bold text-app-text-300 lg:text-4xl">
        {error.message}
      </h1>
      <p className=" mt-4 text-sm font-medium text-app-title">
        Ocorreu um erro. Por favor, tente novamente!
      </p>
      <div className="mt-8 flex items-center justify-center gap-5">
        <button className={button()} onClick={reset}>
          Tentar novamente
        </button>
        <Link href="/" className={button()}>
          Voltar
        </Link>
      </div>
    </div>
  )
}

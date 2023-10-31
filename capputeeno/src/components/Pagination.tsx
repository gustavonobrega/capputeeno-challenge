'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import { tv } from 'tailwind-variants'

import { useFilterContext } from '@/hooks/useFilterContext'

type PaginationProps = {
  count?: number
}

const button = tv({
  base: [
    'h-7 w-7 flex items-center rounded-lg justify-center bg-app-background-200 text-sm text-app-text-300 outline-app-light-orange transition',
    'enabled:hover:border enabled:hover:border-app-text-300 sm:h-8 sm:w-8 sm:text-base',
  ],
  variants: {
    selected: {
      true: 'border bg-white border-app-light-orange text-app-light-orange font-semibold',
    },
    arrowDisabled: {
      true: 'opacity-60 cursor-not-allowed',
    },
  },
})

export function Pagination({ count = 0 }: PaginationProps) {
  const { page, setPage, perPage, type } = useFilterContext()

  const totalPages = Math.ceil(count / perPage)

  function generatePagesArray() {
    const maxVisiblePages = type === 'all' ? 5 : 3
    const pagesArray: number[] = []

    let maxLeft = page - Math.floor(maxVisiblePages / 2)
    let maxRight = page + Math.floor(maxVisiblePages / 2)

    if (maxLeft < 1) {
      maxLeft = 1
      maxRight = maxVisiblePages
    }

    if (maxRight > totalPages) {
      maxRight = totalPages
      maxLeft = totalPages - (maxVisiblePages - 1)
    }

    for (let i = maxLeft; i <= maxRight; i++) {
      pagesArray.push(i)
    }

    return pagesArray
  }

  function handlePageChange(page: number) {
    setPage((currentPage) => (page !== currentPage ? page : currentPage))
  }

  function handlePreviousPage() {
    setPage((currentPage) => (currentPage > 1 ? currentPage - 1 : currentPage))
  }

  function handleNextPage() {
    setPage((currentPage) =>
      currentPage < totalPages ? currentPage + 1 : currentPage,
    )
  }

  return (
    <div className="flex gap-2 sm:justify-end">
      <div className="flex gap-0.5">
        {generatePagesArray().map((pg) => {
          return (
            <button
              key={pg}
              disabled={pg === page}
              className={button({ selected: pg === page })}
              onClick={() => handlePageChange(pg)}
            >
              {pg}
            </button>
          )
        })}
      </div>
      <div className="flex gap-0.5">
        <button
          disabled={page === 1}
          className={button({ arrowDisabled: page === 1 })}
          onClick={handlePreviousPage}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          disabled={page === totalPages}
          className={button({ arrowDisabled: page === totalPages })}
          onClick={handleNextPage}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

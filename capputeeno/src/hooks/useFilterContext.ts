'use client'

import { FilterContext } from '@/contexts/filterContext'
import { useContext } from 'react'

export function useFilterContext() {
  return useContext(FilterContext)
}

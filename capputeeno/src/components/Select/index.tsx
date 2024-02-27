'use client'

import { ChevronDown } from 'lucide-react'
import { ReactNode } from 'react'

import * as SelectPrimitive from '@radix-ui/react-select'
import { FilterType, type OrderOption } from '@/types/filter-types'
import { useRouter } from 'next/navigation'

type SelectProps = {
  children: ReactNode
  placeholder: string
  order: OrderOption
  type: FilterType
  page: number
}

export function Select({
  children,
  placeholder,
  order,
  type,
  page,
}: SelectProps) {
  const router = useRouter()
  function handleOrderFilter(selectedOrder: string) {
    if (type === 'all') {
      router.push(`/?order=${selectedOrder}&page=${page}`)
    } else {
      router.push(`/?type=${type}&order=${selectedOrder}&page=${page}`)
    }
  }

  return (
    <SelectPrimitive.Root
      value={order}
      onValueChange={(value: OrderOption) => handleOrderFilter(value)}
    >
      <SelectPrimitive.Trigger className="flex w-fit items-center gap-2 text-sm text-app-text-300 outline-app-light-orange">
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown size={20} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          side="bottom"
          sideOffset={4}
          align="end"
          className="rounded-md bg-white px-2 py-2 shadow-sm"
        >
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

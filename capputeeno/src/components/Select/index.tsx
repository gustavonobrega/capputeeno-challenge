'use client'

import { ChevronDown } from 'lucide-react'
import { ReactNode } from 'react'

import { useFilterContext } from '@/hooks/useFilterContext'
import * as SelectPrimitive from '@radix-ui/react-select'
import { type OrderOption } from '@/types/filter-types'

type SelectProps = {
  children: ReactNode
  placeholder: string
}

export function Select({ children, placeholder }: SelectProps) {
  const { order, handleChangeOrder } = useFilterContext()

  return (
    <SelectPrimitive.Root
      value={order}
      onValueChange={(value: OrderOption) => handleChangeOrder(value)}
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

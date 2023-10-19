'use client'

import * as Select from '@radix-ui/react-select'
import { Check } from 'lucide-react'

type SelectItemProps = Select.SelectItemProps & {
  text: string
}

export function SelectItem({ text, ...props }: SelectItemProps) {
  return (
    <Select.Item
      className="flex cursor-default items-center gap-2 rounded-sm px-2 py-1 text-sm text-app-text-300 outline-none transition data-[highlighted]:bg-app-light-orange data-[highlighted]:text-white"
      {...props}
    >
      <Select.SelectItemText>{text}</Select.SelectItemText>
      <Select.ItemIndicator>
        <Check size={12} />
      </Select.ItemIndicator>
    </Select.Item>
  )
}

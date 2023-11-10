import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'

type CartSelectProps = {
  quantity: string
  handleChangeProductQuantity: (productQuantity: string) => void
}

const OPTIONS = ['1', '2', '3', '4', '5']

export function CartSelect({
  quantity,
  handleChangeProductQuantity,
}: CartSelectProps) {
  return (
    <SelectPrimitive.Root
      value={quantity}
      onValueChange={(value) => handleChangeProductQuantity(value)}
    >
      <SelectPrimitive.Trigger className="flex w-fit items-center gap-2 rounded-lg border  border-gray-300 bg-gray-100 py-1 pl-2 pr-1 text-sm text-app-text-300 outline-app-light-orange lg:gap-4 lg:py-2 lg:pl-3 lg:pr-2 lg:text-base">
        <SelectPrimitive.Value aria-label={quantity}>
          {quantity}
        </SelectPrimitive.Value>
        <SelectPrimitive.Icon>
          <ChevronDown size={18} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          side="bottom"
          sideOffset={-5}
          className="w-[--radix-select-trigger-width] rounded-md rounded-t-none border border-t-0 border-gray-300 bg-gray-100 px-1 py-1 shadow-sm lg:py-2"
        >
          <SelectPrimitive.Viewport>
            {OPTIONS.map((opt) => {
              return (
                <SelectPrimitive.Item
                  key={opt}
                  value={opt}
                  className="flex cursor-default items-center justify-between gap-2 rounded-sm px-1 py-1 text-sm text-app-text-300 outline-none transition data-[highlighted]:bg-app-light-orange data-[highlighted]:text-white lg:px-2 lg:text-base"
                >
                  <SelectPrimitive.SelectItemText>
                    {opt}
                  </SelectPrimitive.SelectItemText>
                  <SelectPrimitive.ItemIndicator>
                    <Check size={14} />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              )
            })}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

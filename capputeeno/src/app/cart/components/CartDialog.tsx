import { useCart } from '@/hooks/useCart'
import * as Dialog from '@radix-ui/react-dialog'
import { ComponentProps, ReactNode, useState } from 'react'

type CartDialogProps = ComponentProps<typeof Dialog.Root> & {
  children: ReactNode
}

export function CartDialog({ children, ...props }: CartDialogProps) {
  const [open, setOpen] = useState(false)
  const { handleClearCart } = useCart()

  function handleCloseDialog() {
    setOpen(false)
    handleClearCart()
  }

  return (
    <Dialog.Root open={open} {...props}>
      <Dialog.Trigger onClick={() => setOpen(true)} asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={handleCloseDialog}
          className="fixed inset-0 bg-black/10"
        />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-72 max-w-md translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-3 shadow md:p-6">
          <Dialog.Title className="text-center font-semibold text-app-text-400 md:text-xl">
            Obrigado por comprar na Capputeno!
          </Dialog.Title>
          <Dialog.Description className="mt-3 line-clamp-3 text-center text-xs text-app-text-400 md:line-clamp-none md:text-sm">
            Doloribus tempora fugit et blanditiis sed. Qui dignissimos aut harum
            ut voluptatem voluptatum aut reiciendis ut. Et aliquam voluptatum
            minus. Dolore voluptatibus ipsa et rerum illo nemo vitae praesentium
            asperiores.
          </Dialog.Description>
          <Dialog.Close
            onClick={handleCloseDialog}
            className="mt-6 w-full rounded-md bg-app-orange p-2.5 font-medium uppercase text-white outline-app-light-orange transition hover:opacity-90 md:mt-8"
          >
            Entendido
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

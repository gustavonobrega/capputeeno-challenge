import { Toaster } from 'react-hot-toast'

import { TanstackProvider } from '@/lib/react-query'
import { CartContextProvider } from '@/contexts/cartContext'
import { Header } from '@/components/Header'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TanstackProvider>
      <CartContextProvider>
        <div className="min-h-screen bg-app-background-100">
          <Header />
          {children}

          <Toaster position="top-right" />
        </div>
      </CartContextProvider>
    </TanstackProvider>
  )
}

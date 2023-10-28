import './globals.css'
import type { Metadata } from 'next'
import { Saira } from 'next/font/google'

import { FilterContextProvider } from '@/contexts/filterContext'
import { Header } from '@/components/Header'
import { TanstackProvider } from '@/lib/react-query'

const saira = Saira({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Capputeeno',
  description: 'Frontend challenge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={saira.className}>
        <div className="min-h-screen bg-app-background-100">
          <TanstackProvider>
            <FilterContextProvider>
              <Header />
              {children}
            </FilterContextProvider>
          </TanstackProvider>
        </div>
      </body>
    </html>
  )
}

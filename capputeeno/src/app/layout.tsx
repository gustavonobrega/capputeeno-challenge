import './globals.css'
import type { Metadata } from 'next'
import { Saira } from 'next/font/google'

import { Header } from '@/components/Header'
import { FilterContextProvider } from '@/contexts/filterContext'

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
          <FilterContextProvider>
            <Header />
            {children}
          </FilterContextProvider>
        </div>
      </body>
    </html>
  )
}

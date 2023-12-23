import './globals.css'
import type { Metadata } from 'next'
import { Saira } from 'next/font/google'

const saira = Saira({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Capputeeno',
    default: 'Capputeeno',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={saira.className} lang="pt">
      <body className="bg-app-background-100">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter, Arvo } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })
const arvo = Arvo({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-arvo',
})

export const metadata: Metadata = {
  title: 'Newtonnator',
  description: 'AI-powered learning and development platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${arvo.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

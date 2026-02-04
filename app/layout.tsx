import React from "react"
import type { Metadata } from 'next'
import { Poppins, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: '--font-poppins'
});
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Kinetic Art Super Computer - Event Registration',
  description: 'Experience innovation in motion. Register for the Kinetic Art Super Computer event - a convergence of technology and art.',
  generator: 'v0.app',
  icons: {
    icon: '/logo2.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} font-sans antialiased`}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}

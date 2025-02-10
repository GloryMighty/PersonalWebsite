// app/layout.tsx

import type { Metadata } from "next"
import { Space_Grotesk, Inter, Roboto_Flex } from "next/font/google"
import "./globals.css"
import Toolbar from "@/components/Toolbar"

// Modern, clean font combination
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'], // Added more weight options
})

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  weight: ['400', '500', '600'], // Clean, professional weights
})

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: '--font-roboto-flex',
  weight: ['400', '500', '600'], // Flexible, modern font
})

// Add metadata and favicon.ico from the public folder
export const metadata: Metadata = {
  title: "WebDev",
  description: "Personal portfolio and professional showcase",
  icons: {
    icon: '/favicon.ico',
  },
}

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${robotoFlex.variable}`}>
      <body className={`${spaceGrotesk.className} relative font-sans`}>
        {/* Global Toolbar */}
        <Toolbar />
        
        {/* Main content area */}
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  )
}

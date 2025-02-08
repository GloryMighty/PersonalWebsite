// app/layout.tsx

import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
})
// Add metadata and favicon.ico from the public folder
export const metadata: Metadata = {
  title: "WebDev",
  description: "Personal website of Viacheslav Mamatov, showcasing projects in React, Vite, Python, and Streamlit.",
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
    <html lang="en" className={spaceGrotesk.variable}>
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  )
}

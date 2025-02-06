import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: "Viacheslav Mamatov - Software Engineer",
  description: "Personal website of Viacheslav Mamatov, showcasing projects in React, Vite, Python, and Streamlit.",
}

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


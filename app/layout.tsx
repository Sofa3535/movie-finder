import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Head from "next/head"; // Import Font Awesome CSS globally
config.autoAddCss = false; // Prevent Font Awesome from adding CSS multiple times


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie Finder',
  description: 'Search for movies and get detailed information about them.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <Head>
      {/* Google Font: Michroma */}
      <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Michroma&display=swap"
      />
    </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

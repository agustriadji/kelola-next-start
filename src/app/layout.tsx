'use client'

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { usePathname } from 'next/navigation'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideSidebar = pathname.startsWith('/settings') || pathname.startsWith('/signin')
  const hideAppBar = pathname.startsWith('/signin')

  return (
    <html lang="en">
      <body className="h-screen flex flex-col bg-gray-100 text-gray-900">
        {/* header */}

        {!hideAppBar && <Navbar />}
        <div className="flex flex-1 min-h-0">
          {!hideSidebar && <Sidebar />}
          <section className="flex-1 overflow-auto bg-gray-50">{children}</section>
        </div>
      </body>
    </html>
  )
}

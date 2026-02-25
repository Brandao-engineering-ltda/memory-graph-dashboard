import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Sidebar } from '@/components/layout/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Memory Graph Dashboard | Maximo',
  description: 'Interactive visualization of intelligent memory architecture - Projects, technologies, and insights connected.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
          
          <div className="relative">
            {/* Top Navigation */}
            <Navigation />
            
            <div className="flex">
              {/* Sidebar */}
              <Sidebar />
              
              {/* Main Content */}
              <main className="flex-1 overflow-hidden">
                <div className="h-[calc(100vh-4rem)]">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
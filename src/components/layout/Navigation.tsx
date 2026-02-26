'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Brain, Search, Activity, Settings, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="h-16 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/50">
      <div className="flex h-full items-center justify-between px-6">
        {/* Logo & Brand - Clickable */}
        <Link href="/" className="flex items-center gap-4 p-2 -m-2 rounded-lg hover:bg-white/5 transition-all group cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="relative group-hover:scale-110 transition-transform">
              <Brain className="h-8 w-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              <div className="absolute -inset-1 bg-indigo-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-indigo-50 group-hover:to-indigo-200">
                Memory Graph
              </h1>
              <p className="text-xs text-slate-400 group-hover:text-slate-300">Intelligent Architecture</p>
            </div>
          </div>
        </Link>

        {/* Quick Actions - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10">
            <Search className="h-4 w-4 mr-2" />
            Quick Search
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10">
            <Activity className="h-4 w-4 mr-2" />
            System Health
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <Button 
          variant="ghost" 
          size="sm"
          className="md:hidden text-slate-300 hover:text-white hover:bg-white/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 p-4 z-50">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-white/10">
              <Search className="h-4 w-4 mr-2" />
              Quick Search
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-white/10">
              <Activity className="h-4 w-4 mr-2" />
              System Health
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-white/10">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
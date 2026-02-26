'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Network, 
  Search, 
  BarChart3, 
  Database,
  Zap,
  Circle,
  TrendingUp,
  Users,
  Layers
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard, description: 'Dashboard home' },
  { name: 'Knowledge Graph', href: '/graph', icon: Network, description: 'Interactive visualization' },
  { name: 'Semantic Search', href: '/search', icon: Search, description: 'AI-powered search' },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, description: 'Memory insights' },
  { name: 'Sessions', href: '/sessions', icon: Database, description: 'Session history' }
]

const stats = [
  { label: 'Entities', value: '24', icon: Circle, color: 'text-blue-400' },
  { label: 'Relations', value: '182', icon: Zap, color: 'text-green-400' },
  { label: 'Projects', value: '5', icon: Layers, color: 'text-purple-400' },
  { label: 'Sessions', value: '8', icon: TrendingUp, color: 'text-orange-400' }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-80 border-r border-white/10 bg-slate-900/30 backdrop-blur-xl">
      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">System Overview</h3>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="flex items-center gap-2">
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                  <span className="text-xs text-slate-400">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-white mt-1">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Navigation</h3>
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                    isActive
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-indigo-300" : "text-slate-400")} />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.description}</div>
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-300">Live Data</span>
          </div>
          <div className="text-xs text-slate-400">
            24 entities • 182 relationships • Updated 8:30 UTC
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Entity Types</h3>
          <div className="space-y-2">
            {[
              { name: 'Projects', color: 'bg-blue-500', count: 5 },
              { name: 'Technologies', color: 'bg-green-500', count: 9 },
              { name: 'Tools', color: 'bg-purple-500', count: 4 },
              { name: 'Insights', color: 'bg-red-500', count: 3 },
              { name: 'Decisions', color: 'bg-yellow-500', count: 1 },
              { name: 'People', color: 'bg-cyan-500', count: 2 }
            ].map((type) => (
              <div key={type.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={cn("h-3 w-3 rounded-full", type.color)} />
                  <span className="text-slate-300">{type.name}</span>
                </div>
                <span className="text-slate-500">{type.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

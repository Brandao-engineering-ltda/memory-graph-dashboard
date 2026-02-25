'use client'

import { TrendingUp, Brain, Zap, Database, Users, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface MetricCardProps {
  title: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
  gradient: string
}

interface MemoryStats {
  entities: number
  relationships: number
  projects: number
  technologies: number
  tools: number
  insights: number
  decisions: number
  people: number
  lastUpdate: string
  healthy: boolean
}

function MetricCard({ title, value, change, changeType = 'neutral', icon: Icon, gradient }: MetricCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border border-white/10 p-6",
      "bg-white/5 backdrop-blur-xl",
      "hover:bg-white/10 transition-all duration-300 cursor-pointer group"
    )}>
      {/* Background Gradient */}
      <div className={cn("absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity", gradient)} />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <Icon className="h-8 w-8 text-slate-400 group-hover:text-white transition-colors" />
          {change && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-medium",
              changeType === 'positive' ? 'text-green-400' : 
              changeType === 'negative' ? 'text-red-400' : 
              'text-slate-400'
            )}>
              <TrendingUp className="h-3 w-3" />
              {change}
            </div>
          )}
        </div>
        
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-slate-400">{title}</div>
      </div>
    </div>
  )
}

export function MetricCards() {
  const [stats, setStats] = useState<MemoryStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/memory')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch memory stats:', error)
        // Fallback to default values
        setStats({
          entities: 22,
          relationships: 161,
          projects: 5,
          technologies: 9,
          tools: 4,
          insights: 2,
          decisions: 1,
          people: 1,
          lastUpdate: new Date().toISOString(),
          healthy: false
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white/5 rounded-xl border border-white/10 p-6 animate-pulse">
            <div className="h-8 w-8 bg-slate-400 rounded mb-3"></div>
            <div className="h-8 bg-slate-400 rounded mb-1"></div>
            <div className="h-4 bg-slate-400 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  const metrics = [
    {
      title: 'Total Entities',
      value: stats?.entities.toString() || '0',
      change: stats?.healthy ? '+3 this week' : 'offline',
      changeType: stats?.healthy ? 'positive' as const : 'neutral' as const,
      icon: Brain,
      gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600'
    },
    {
      title: 'Relationships',
      value: stats?.relationships.toString() || '0',
      change: stats?.healthy ? '+12 new' : 'offline',
      changeType: stats?.healthy ? 'positive' as const : 'neutral' as const,
      icon: Zap,
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-600'
    },
    {
      title: 'Active Projects',
      value: stats?.projects.toString() || '0',
      change: 'Elite Pulse, X Growth',
      changeType: 'neutral' as const,
      icon: Layers,
      gradient: 'bg-gradient-to-br from-purple-500 to-violet-600'
    },
    {
      title: 'Memory Sessions',
      value: '8', // Could add to API later
      change: stats?.healthy ? '+2 today' : 'offline',
      changeType: stats?.healthy ? 'positive' as const : 'neutral' as const,
      icon: Database,
      gradient: 'bg-gradient-to-br from-orange-500 to-red-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}
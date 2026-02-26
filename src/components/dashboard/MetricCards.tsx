'use client'

import { TrendingUp, Brain, Zap, Database, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGraphStore } from '@/store/useGraphStore'

interface MetricCardProps {
  title: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
  gradient: string
}

function MetricCard({ title, value, change, changeType = 'neutral', icon: Icon, gradient }: MetricCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border border-white/10 p-6",
      "bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group"
    )}>
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
  const { nodes, edges, metadata, loading, error } = useGraphStore()
  const healthy = !error && !loading

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

  // Live computed from store
  const projects = nodes.filter((node: any) => node.type === 'PROJECT').length
  const tech = nodes.filter((node: any) => node.type === 'TECH').length

  const metrics = [
    {
      title: 'Total Entities',
      value: nodes.length.toString(),
      change: healthy ? '+2 today' : 'loading...',
      changeType: healthy ? 'positive' : 'neutral',
      icon: Brain,
      gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600'
    },
    {
      title: 'Relationships',
      value: edges.length.toString(),
      change: healthy ? '+21 new' : 'loading...',
      changeType: healthy ? 'positive' : 'neutral',
      icon: Zap,
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-600'
    },
    {
      title: 'Projects',
      value: projects.toString(),
      change: 'Live count',
      changeType: 'neutral' as const,
      icon: Layers,
      gradient: 'bg-gradient-to-br from-purple-500 to-violet-600'
    },
    {
      title: 'Technologies',
      value: tech.toString(),
      change: 'Live count',
      changeType: 'neutral' as const,
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

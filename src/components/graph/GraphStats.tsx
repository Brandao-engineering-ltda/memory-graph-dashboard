'use client'

import { Network, Zap, TrendingUp } from 'lucide-react'

export function GraphStats() {
  const stats = [
    {
      label: 'Nodes',
      value: '22',
      icon: Network,
      color: 'text-blue-400'
    },
    {
      label: 'Edges',
      value: '161',
      icon: Zap,
      color: 'text-green-400'
    },
    {
      label: 'Density',
      value: '34%',
      icon: TrendingUp,
      color: 'text-purple-400'
    }
  ]

  return (
    <div className="flex items-center gap-4">
      {stats.map((stat, index) => (
        <div key={stat.label} className="flex items-center gap-2">
          <stat.icon className={`h-4 w-4 ${stat.color}`} />
          <div className="text-right">
            <div className="text-lg font-bold text-white">{stat.value}</div>
            <div className="text-xs text-slate-400 -mt-1">{stat.label}</div>
          </div>
          {index < stats.length - 1 && (
            <div className="w-px h-8 bg-white/10 ml-4" />
          )}
        </div>
      ))}
    </div>
  )
}
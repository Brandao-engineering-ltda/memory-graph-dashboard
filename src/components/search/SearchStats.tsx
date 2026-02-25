'use client'

import { TrendingUp, Clock, Zap, FileText } from 'lucide-react'

export function SearchStats() {
  const stats = [
    {
      label: 'Total Searches',
      value: '47',
      icon: Zap,
      trend: '+12 this week'
    },
    {
      label: 'Avg Response Time',
      value: '0.3s',
      icon: Clock,
      trend: '40% faster'
    },
    {
      label: 'Indexed Documents',
      value: '8',
      icon: FileText,
      trend: '100% coverage'
    },
    {
      label: 'Search Accuracy',
      value: '94%',
      icon: TrendingUp,
      trend: 'Semantic mode'
    }
  ]

  return (
    <div className="space-y-4">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <stat.icon className="h-4 w-4 text-indigo-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </div>
          </div>
          <div className="text-xs text-green-400 font-medium">
            {stat.trend}
          </div>
        </div>
      ))}
    </div>
  )
}
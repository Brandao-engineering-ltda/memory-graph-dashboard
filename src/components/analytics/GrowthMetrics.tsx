'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function GrowthMetrics() {
  const metrics = [
    {
      label: 'Weekly Growth',
      value: '+13.6%',
      trend: 'up',
      description: '3 new entities'
    },
    {
      label: 'Relationship Density',
      value: '34.2%',
      trend: 'up',
      description: '+2.1% from last week'
    },
    {
      label: 'Session Frequency',
      value: '2.4/day',
      trend: 'up',
      description: 'Up from 1.8/day'
    },
    {
      label: 'Search Usage',
      value: '12/day',
      trend: 'up',
      description: '+60% this week'
    },
    {
      label: 'Memory Efficiency',
      value: '92%',
      trend: 'stable',
      description: 'Optimal range'
    },
    {
      label: 'Dead Links',
      value: '0',
      trend: 'stable',
      description: 'All connections valid'
    }
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-400" />
      default: return <Minus className="h-4 w-4 text-slate-400" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400'
      case 'down': return 'text-red-400'
      default: return 'text-slate-400'
    }
  }

  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">{metric.label}</span>
            {getTrendIcon(metric.trend)}
          </div>
          <div className="text-lg font-bold text-white mb-1">
            {metric.value}
          </div>
          <div className={`text-xs ${getTrendColor(metric.trend)}`}>
            {metric.description}
          </div>
        </div>
      ))}

      <div className="pt-4 border-t border-white/10">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">Excellent</div>
          <div className="text-xs text-slate-400">Overall Health Score</div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { Lightbulb, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InsightCardProps {
  type: 'discovery' | 'trend' | 'warning' | 'success'
  title: string
  description: string
  actionable?: string
}

function InsightCard({ type, title, description, actionable }: InsightCardProps) {
  const config = {
    discovery: {
      icon: Lightbulb,
      color: 'text-yellow-400',
      bg: 'from-yellow-500/10 to-amber-600/5',
      border: 'border-yellow-500/20'
    },
    trend: {
      icon: TrendingUp,
      color: 'text-blue-400',
      bg: 'from-blue-500/10 to-indigo-600/5',
      border: 'border-blue-500/20'
    },
    warning: {
      icon: AlertCircle,
      color: 'text-orange-400',
      bg: 'from-orange-500/10 to-red-600/5',
      border: 'border-orange-500/20'
    },
    success: {
      icon: CheckCircle,
      color: 'text-green-400',
      bg: 'from-green-500/10 to-emerald-600/5',
      border: 'border-green-500/20'
    }
  }

  const { icon: Icon, color, bg, border } = config[type]

  return (
    <div className={cn(
      "p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02]",
      `bg-gradient-to-br ${bg} ${border}`
    )}>
      <div className="flex items-start gap-3">
        <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", color)} />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white text-sm mb-1">{title}</h4>
          <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
          {actionable && (
            <div className="mt-2 text-xs font-medium text-slate-300">
              → {actionable}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function InsightCards() {
  const insights = [
    {
      type: 'success' as const,
      title: 'Memory Architecture Complete',
      description: 'Successfully implemented 3-phase memory system: auto-capture, semantic search, and knowledge graph.',
      actionable: 'All memory gaps resolved'
    },
    {
      type: 'discovery' as const,
      title: 'Strong Tech Stack Clustering',
      description: 'Next.js + TypeScript + Tailwind consistently used across projects, showing clear technology preferences.',
      actionable: 'Consider documenting as standard stack'
    },
    {
      type: 'trend' as const,
      title: 'Elite Pulse Project Dominance',
      description: 'Elite Pulse has the highest connectivity (6 tech relationships), indicating it\'s your most complex active project.',
      actionable: 'Monitor for architecture complexity'
    },
    {
      type: 'discovery' as const,
      title: 'OpenAI Patterns Impact',
      description: 'The "Game-changing insights" about OpenAI patterns led directly to the product-builder skill creation.',
      actionable: 'Pattern-based skill development is effective'
    },
    {
      type: 'success' as const,
      title: 'Security Hardening Success',
      description: 'VPS security improvements (Tailscale-only SSH) show proactive infrastructure management.',
      actionable: 'Security dashboard now monitors 24/7'
    },
    {
      type: 'trend' as const,
      title: 'Memory Session Growth',
      description: 'Session capture frequency increasing, indicating more systematic knowledge management.',
      actionable: 'Continue structured memory habits'
    }
  ]

  return (
    <div className="space-y-3 max-h-80 overflow-y-auto">
      {insights.map((insight, index) => (
        <InsightCard key={index} {...insight} />
      ))}
    </div>
  )
}
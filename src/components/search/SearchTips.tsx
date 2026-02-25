'use client'

import { Lightbulb, Sparkles, Target, Zap } from 'lucide-react'

export function SearchTips() {
  const tips = [
    {
      icon: Sparkles,
      title: 'Natural Language',
      description: 'Search like you think: "How does Elite Pulse handle authentication?"',
      color: 'text-yellow-400'
    },
    {
      icon: Target,
      title: 'Be Specific',
      description: 'Use project names, tech stacks, or specific features for better results',
      color: 'text-blue-400'
    },
    {
      icon: Zap,
      title: 'Semantic Mode',
      description: 'Finds conceptually related content, not just exact keyword matches',
      color: 'text-green-400'
    },
    {
      icon: Lightbulb,
      title: 'Context Aware',
      description: 'Search understands relationships between projects and technologies',
      color: 'text-purple-400'
    }
  ]

  return (
    <div className="space-y-3">
      {tips.map((tip, index) => (
        <div key={index} className="flex gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
          <tip.icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tip.color}`} />
          <div>
            <div className="text-sm font-medium text-white mb-1">
              {tip.title}
            </div>
            <div className="text-xs text-slate-400 leading-relaxed">
              {tip.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
'use client'

import { Clock, FileText, Network, Search, Zap, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActivityItem {
  id: string
  type: 'session' | 'search' | 'graph' | 'insight' | 'system'
  title: string
  description: string
  timestamp: string
  user?: string
}

function ActivityIcon({ type }: { type: ActivityItem['type'] }) {
  const icons = {
    session: FileText,
    search: Search,
    graph: Network,
    insight: Zap,
    system: User
  }

  const colors = {
    session: 'text-blue-400 bg-blue-500/20',
    search: 'text-green-400 bg-green-500/20',
    graph: 'text-purple-400 bg-purple-500/20',
    insight: 'text-yellow-400 bg-yellow-500/20',
    system: 'text-cyan-400 bg-cyan-500/20'
  }

  const Icon = icons[type]
  return (
    <div className={cn("p-2 rounded-full", colors[type])}>
      <Icon className="h-4 w-4" />
    </div>
  )
}

function ActivityItem({ item }: { item: ActivityItem }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
      <ActivityIcon type={item.type} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-medium text-white truncate">{item.title}</h4>
          <span className="text-xs text-slate-500 flex-shrink-0">{item.timestamp}</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
        {item.user && (
          <div className="mt-1 text-xs text-slate-500">
            by {item.user}
          </div>
        )}
      </div>
    </div>
  )
}

export function RecentActivity() {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'graph',
      title: 'Memory Graph Dashboard Created',
      description: 'Built interactive visualization with Next.js, D3.js, and modern UI components.',
      timestamp: '2 min ago',
      user: 'Maximo'
    },
    {
      id: '2',
      type: 'system',
      title: 'Security Dashboard Made Persistent',
      description: 'Configured PM2 auto-restart and health monitoring for 24/7 operation.',
      timestamp: '15 min ago',
      user: 'System'
    },
    {
      id: '3',
      type: 'session',
      title: 'Phase 3 Knowledge Graph Complete',
      description: 'Successfully mapped 22 entities with 161 relationships across memory files.',
      timestamp: '1 hour ago',
      user: 'Maximo'
    },
    {
      id: '4',
      type: 'search',
      title: 'Semantic Search Implemented',
      description: 'Added embeddings-based search with hybrid fallback to text matching.',
      timestamp: '2 hours ago',
      user: 'Maximo'
    },
    {
      id: '5',
      type: 'session',
      title: 'Auto-Session Capture Activated',
      description: 'Phase 1 memory architecture: automatic session logging with structured data.',
      timestamp: '3 hours ago',
      user: 'Maximo'
    },
    {
      id: '6',
      type: 'insight',
      title: 'OpenAI Patterns Discovery',
      description: 'Found game-changing skill development patterns, leading to product-builder creation.',
      timestamp: '4 hours ago',
      user: 'System'
    },
    {
      id: '7',
      type: 'system',
      title: 'VPS Security Hardening',
      description: 'Implemented Tailscale-only SSH access and firewall configuration.',
      timestamp: '8 hours ago',
      user: 'Maximo'
    }
  ]

  return (
    <div className="space-y-1 max-h-80 overflow-y-auto">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} item={activity} />
      ))}
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <button className="text-sm text-slate-400 hover:text-white transition-colors">
          View all activity →
        </button>
      </div>
    </div>
  )
}
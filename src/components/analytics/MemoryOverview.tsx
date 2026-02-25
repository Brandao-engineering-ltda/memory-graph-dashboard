'use client'

import { useEffect, useState } from 'react'
import { Activity, Database, Network, Clock } from 'lucide-react'

interface MemoryStats {
  totalNodes: number
  totalEdges: number
  sessionCount: number
  lastUpdate: string
  healthStatus: 'healthy' | 'degraded' | 'error'
  topProjects: string[]
  topTechnologies: string[]
}

export function MemoryOverview() {
  const [stats, setStats] = useState<MemoryStats>({
    totalNodes: 22,
    totalEdges: 161,
    sessionCount: 5,
    lastUpdate: '2026-02-24T17:16:59',
    healthStatus: 'healthy',
    topProjects: ['Elite Pulse', 'X Growth', 'OpenClaw', 'Component Library', 'product-builder'],
    topTechnologies: ['Next.js', 'TypeScript', 'Go', 'GCP', 'React', 'Tailwind', 'Firebase', 'Claude']
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600'
      case 'degraded': return 'text-yellow-600' 
      case 'error': return 'text-red-600'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return '✅'
      case 'degraded': return '⚠️'
      case 'error': return '❌'
      default: return '⚪'
    }
  }

  const formatLastUpdate = (timestamp: string) => {
    try {
      const date = new Date(timestamp)
      return date.toLocaleString()
    } catch {
      return 'Unknown'
    }
  }

  return (
    <div className="space-y-4">
      {/* System Health */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 border border-border rounded-md bg-muted/20">
          <Activity className="h-5 w-5 text-primary" />
          <div>
            <div className="font-medium">System Health</div>
            <div className={`text-sm flex items-center gap-1 ${getStatusColor(stats.healthStatus)}`}>
              {getStatusIcon(stats.healthStatus)} {stats.healthStatus.charAt(0).toUpperCase() + stats.healthStatus.slice(1)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 border border-border rounded-md bg-muted/20">
          <Clock className="h-5 w-5 text-primary" />
          <div>
            <div className="font-medium">Last Update</div>
            <div className="text-sm text-muted-foreground">
              {formatLastUpdate(stats.lastUpdate)}
            </div>
          </div>
        </div>
      </div>

      {/* Graph Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-3 border border-border rounded-md bg-muted/20">
          <Network className="h-5 w-5 text-blue-600" />
          <div>
            <div className="text-2xl font-bold">{stats.totalNodes}</div>
            <div className="text-xs text-muted-foreground">Entities</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 border border-border rounded-md bg-muted/20">
          <div className="h-5 w-5 bg-green-600 rounded-full flex-shrink-0"></div>
          <div>
            <div className="text-2xl font-bold">{stats.totalEdges}</div>
            <div className="text-xs text-muted-foreground">Relations</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 border border-border rounded-md bg-muted/20">
          <Database className="h-5 w-5 text-purple-600" />
          <div>
            <div className="text-2xl font-bold">{stats.sessionCount}</div>
            <div className="text-xs text-muted-foreground">Sessions</div>
          </div>
        </div>
      </div>

      {/* Top Projects & Technologies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="font-medium text-sm">Top Projects</div>
          <div className="space-y-1">
            {stats.topProjects.slice(0, 3).map((project, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>{project}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-medium text-sm">Key Technologies</div>
          <div className="flex flex-wrap gap-1">
            {stats.topTechnologies.slice(0, 6).map((tech, i) => (
              <span 
                key={i} 
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md dark:bg-green-900 dark:text-green-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="pt-2 border-t border-border">
        <div className="flex gap-2 text-xs">
          <button className="text-primary hover:underline">Rebuild Index</button>
          <span className="text-muted-foreground">•</span>
          <button className="text-primary hover:underline">Export Graph</button>
          <span className="text-muted-foreground">•</span>
          <button className="text-primary hover:underline">View Health Report</button>
        </div>
      </div>
    </div>
  )
}
'use client'

import { CheckCircle, AlertTriangle, Activity, Database, Search, Network } from 'lucide-react'

export function SystemHealth() {
  const systems = [
    {
      name: 'Memory Capture',
      status: 'healthy',
      uptime: '99.9%',
      lastCheck: '1 min ago',
      icon: Database
    },
    {
      name: 'Semantic Search',
      status: 'healthy',
      uptime: '99.5%',
      lastCheck: '2 min ago',
      icon: Search
    },
    {
      name: 'Knowledge Graph',
      status: 'healthy',
      uptime: '100%',
      lastCheck: '30 sec ago',
      icon: Network
    },
    {
      name: 'API Endpoints',
      status: 'warning',
      uptime: '97.8%',
      lastCheck: '5 min ago',
      icon: Activity
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'warning': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'error': return 'text-red-400 bg-red-500/20 border-red-500/30'
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />
      case 'warning': return <AlertTriangle className="h-4 w-4" />
      default: return <CheckCircle className="h-4 w-4" />
    }
  }

  const overallHealth = systems.filter(s => s.status === 'healthy').length / systems.length * 100

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Overall Health */}
      <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
        <div className="text-4xl font-bold text-green-400 mb-2">
          {overallHealth.toFixed(0)}%
        </div>
        <div className="text-sm text-slate-400 mb-3">System Health</div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${overallHealth}%` }}
          />
        </div>
      </div>

      {/* System Status Cards */}
      <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systems.map((system, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <system.icon className="h-5 w-5 text-slate-400" />
                <span className="font-medium text-white">{system.name}</span>
              </div>
              <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(system.status)}`}>
                {system.status}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Uptime</span>
                <span className="text-white font-medium">{system.uptime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Last Check</span>
                <span className="text-slate-300">{system.lastCheck}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
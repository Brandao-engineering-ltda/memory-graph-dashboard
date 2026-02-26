'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Brain, Zap, Layers, TrendingUp, Network, Search, BarChart3 } from 'lucide-react'
import { MemoryOverview } from '@/components/analytics/MemoryOverview'
import { GraphPreview } from '@/components/graph/GraphPreview'
import { QuickSearch } from '@/components/search/QuickSearch'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { InsightCards } from '@/components/dashboard/InsightCards'
import { MetricCards } from '@/components/dashboard/MetricCards'

export default function Dashboard() {
  const [data, setData] = useState({ nodes: [], edges: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/memory')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen p-12 space-y-16">
      <header className="text-center">
        <h1 className="text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl mb-8">
          Memory Graph
        </h1>
        <p className="text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Live dashboard for your knowledge graph • {data.nodes.length} entities • {data.edges.length} relationships
        </p>
      </header>

      {/* Hero Graph */}
      <section className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
                  Live Knowledge Graph
                </h2>
                <p className="text-xl text-slate-400">Drag nodes to explore • Hover for details</p>
              </div>
            </div>
            <GraphPreview />
          </div>
        </div>
        <div className="space-y-8">
          <QuickSearch />
          <MemoryOverview />
        </div>
      </section>

      {/* Metric Cards */}
      <section>
        <MetricCards />
      </section>

      {/* Action Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="group relative bg-gradient-to-br from-blue-500/20 to-blue-700/10 border border-blue-400/50 rounded-3xl p-10 h-72 cursor-pointer hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-500 hover:bg-blue-500/30 overflow-hidden" role="button" tabIndex={0} onClick={() => alert(`Showing ${data.nodes.length} entities!\n\nTypes:\nProjects: ${data.nodes.filter((n: any) => n.type === 'PROJECT').length}\nTech: ${data.nodes.filter((n: any) => n.type === 'TECH').length}`)}>
          <div className="absolute inset-0 bg-blue-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-blue-400/40 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-blue-400/70 shadow-2xl">
              <Brain className="w-14 h-14 text-blue-200" />
            </div>
            <div className="text-5xl font-black text-white mb-6">{data.nodes.length}</div>
            <h3 className="text-3xl font-bold text-slate-100 mb-8">Entities</h3>
            <p className="text-lg text-slate-300 mb-12">All knowledge nodes</p>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-emerald-500/20 to-emerald-700/10 border border-emerald-400/50 rounded-3xl p-10 h-72 cursor-pointer hover:shadow-2xl hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-500 hover:bg-emerald-500/30 overflow-hidden" role="button" tabIndex={0} onClick={() => alert(`${data.edges.length} relationships connecting your knowledge`)}>
          <div className="absolute inset-0 bg-emerald-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-emerald-400/40 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-emerald-400/70 shadow-2xl">
              <Zap className="w-14 h-14 text-emerald-200" />
            </div>
            <div className="text-5xl font-black text-white mb-6">{data.edges.length}</div>
            <h3 className="text-3xl font-bold text-slate-100 mb-8">Relationships</h3>
            <p className="text-lg text-slate-300 mb-12">Semantic connections</p>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-purple-500/20 to-purple-700/10 border border-purple-400/50 rounded-3xl p-10 h-72 cursor-pointer hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-[1.02] transition-all duration-500 hover:bg-purple-500/30 overflow-hidden" role="button" tabIndex={0} onClick={() => alert('Live project dashboard\n\nProjects: ' + data.nodes.filter((n: any) => n.type === 'PROJECT').map((n: any) => n.name).join(', '))}>
          <div className="absolute inset-0 bg-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-purple-400/40 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-purple-400/70 shadow-2xl">
              <Layers className="w-14 h-14 text-purple-200" />
            </div>
            <div className="text-5xl font-black text-white mb-6">
              {data.nodes.filter((n: any) => n.type === 'PROJECT').length}
            </div>
            <h3 className="text-3xl font-bold text-slate-100 mb-8">Projects</h3>
            <p className="text-lg text-slate-300 mb-12">Active initiatives</p>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-orange-500/20 to-orange-700/10 border border-orange-400/50 rounded-3xl p-10 h-72 cursor-pointer hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-[1.02] transition-all duration-500 hover:bg-orange-500/30 overflow-hidden" role="button" tabIndex={0} onClick={() => alert('Recent activity feed')}>
          <div className="absolute inset-0 bg-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-orange-400/40 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-orange-400/70 shadow-2xl">
              <TrendingUp className="w-14 h-14 text-orange-200" />
            </div>
            <div className="text-5xl font-black text-white mb-6">8</div>
            <h3 className="text-3xl font-bold text-slate-100 mb-8">Sessions</h3>
            <p className="text-lg text-slate-300 mb-12">Recent memory captures</p>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="grid md:grid-cols-2 gap-12">
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-12">
          <h3 className="text-4xl font-bold text-white mb-12 flex items-center gap-4">
            <span className="w-4 h-4 bg-indigo-400 rounded-full animate-pulse" />
            AI Insights
          </h3>
          <InsightCards />
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-12">
          <h3 className="text-4xl font-bold text-white mb-12">Recent Activity</h3>
          <RecentActivity />
        </div>
      </section>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useGraphData } from '@/hooks/useGraphData'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MemoryOverview } from '@/components/analytics/MemoryOverview'
import { GraphPreview, GraphVisualization } from '@/components/graph/GraphPreview'
import { QuickSearch } from '@/components/search/QuickSearch'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { InsightCards } from '@/components/dashboard/InsightCards'
import { MetricCards } from '@/components/dashboard/MetricCards'

export default function Dashboard() {
  useGraphData()
  const [showGraph, setShowGraph] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-2">
            Memory Architecture Dashboard
          </h1>
          <p className="text-slate-400 text-lg">
            Intelligent visualization of your knowledge graph and memory patterns
          </p>
        </div>

        <MetricCards />

        {/* Main Content */}
        {/* ... existing grid ... */}

        {/* Clickable Navigation Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Explore Graph */}
          <Dialog open={showGraph} onOpenChange={setShowGraph}>
            <DialogTrigger asChild>
              <div className="group bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-2 border-blue-500/30 rounded-xl p-8 cursor-pointer hover:from-blue-500/20 hover:to-blue-600/10 hover:border-blue-400 hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl shadow-blue-500/10">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-all">
                    <Network className="w-8 h-8 text-blue-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300">Explore Graph</h4>
                  <p className="text-slate-400 mb-6">Interactive network of 24 entities</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    Open Graph
                  </Button>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] p-0">
              <DialogHeader className="p-6 border-b">
                <DialogTitle>Knowledge Graph (24 entities, 182 relationships)</DialogTitle>
              </DialogHeader>
              <div className="h-[70vh] p-6">
                <GraphVisualization />
              </div>
            </DialogContent>
          </Dialog>

          {/* Search Memory */}
          <Dialog open={showSearch} onOpenChange={setShowSearch}>
            <DialogTrigger asChild>
              <div className="group bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-2 border-emerald-500/30 rounded-xl p-8 cursor-pointer hover:from-emerald-500/20 hover:to-emerald-600/10 hover:border-emerald-400 hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl shadow-emerald-500/10">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/30 transition-all">
                    <Search className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300">Search Memory</h4>
                  <p className="text-slate-400 mb-6">Semantic search across all knowledge</p>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                    Launch Search
                  </Button>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0">
              <DialogHeader className="p-6 border-b">
                <DialogTitle>Semantic Search</DialogTitle>
              </DialogHeader>
              <div className="p-6 max-h-[60vh] overflow-auto">
                <QuickSearch standalone />
              </div>
            </DialogContent>
          </Dialog>

          {/* View Analytics */}
          <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
            <DialogTrigger asChild>
              <div className="group bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-2 border-purple-500/30 rounded-xl p-8 cursor-pointer hover:from-purple-500/20 hover:to-purple-600/10 hover:border-purple-400 hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl shadow-purple-500/10">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-all">
                    <BarChart3 className="w-8 h-8 text-purple-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300">View Analytics</h4>
                  <p className="text-slate-400 mb-6">Growth trends & insights</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                    Open Analytics
                  </Button>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-5xl p-0">
              <DialogHeader className="p-6 border-b">
                <DialogTitle>Memory Analytics</DialogTitle>
              </DialogHeader>
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[60vh] overflow-auto">
                <MetricCards />
                <div className="space-y-4">
                  <RecentActivity />
                  <MemoryOverview />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

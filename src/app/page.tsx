import { MemoryOverview } from '@/components/analytics/MemoryOverview'
import { GraphPreview } from '@/components/graph/GraphPreview'
import { QuickSearch } from '@/components/search/QuickSearch'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { InsightCards } from '@/components/dashboard/InsightCards'
import { MetricCards } from '@/components/dashboard/MetricCards'

export default function Dashboard() {
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

        {/* Metric Cards */}
        <div className="mb-8">
          <MetricCards />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Graph Preview - Large */}
          <div className="lg:col-span-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 h-96">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Knowledge Graph</h2>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-slate-400">Live</span>
                </div>
              </div>
              <div className="h-80 rounded-lg overflow-hidden">
                <GraphPreview />
              </div>
            </div>
          </div>

          {/* Search & Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Search */}
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Semantic Search</h3>
              <QuickSearch />
            </div>

            {/* System Health */}
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
              <MemoryOverview />
            </div>
          </div>
        </div>

        {/* Insights & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Insights */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="h-2 w-2 bg-indigo-400 rounded-full animate-pulse" />
              AI Insights
            </h3>
            <InsightCards />
          </div>

          {/* Recent Activity */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <RecentActivity />
          </div>
        </div>

        {/* Navigation Hints */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-4 cursor-pointer hover:from-blue-500/20 hover:to-blue-600/10 transition-all duration-300">
            <h4 className="font-semibold text-blue-300 mb-2">Explore Graph</h4>
            <p className="text-sm text-slate-400">Interactive network visualization with 22 entities and 161 relationships</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-lg p-4 cursor-pointer hover:from-green-500/20 hover:to-green-600/10 transition-all duration-300">
            <h4 className="font-semibold text-green-300 mb-2">Search Memory</h4>
            <p className="text-sm text-slate-400">Semantic search across your entire knowledge base with AI understanding</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-lg p-4 cursor-pointer hover:from-purple-500/20 hover:to-purple-600/10 transition-all duration-300">
            <h4 className="font-semibold text-purple-300 mb-2">View Analytics</h4>
            <p className="text-sm text-slate-400">Deep insights into memory patterns, relationships, and growth trends</p>
          </div>
        </div>
      </div>
    </div>
  )
}
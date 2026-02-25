import { MemoryTrends } from '@/components/analytics/MemoryTrends'
import { EntityBreakdown } from '@/components/analytics/EntityBreakdown'
import { RelationshipMatrix } from '@/components/analytics/RelationshipMatrix'
import { SystemHealth } from '@/components/analytics/SystemHealth'
import { GrowthMetrics } from '@/components/analytics/GrowthMetrics'

export default function AnalyticsPage() {
  return (
    <div className="h-full overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-2">
            Memory Analytics
          </h1>
          <p className="text-slate-400">
            Deep insights into your knowledge graph patterns, growth, and system health
          </p>
        </div>

        {/* System Health Overview */}
        <div className="mb-8">
          <SystemHealth />
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Memory Growth Trends */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" />
              Memory Growth
            </h3>
            <MemoryTrends />
          </div>

          {/* Entity Breakdown */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Entity Distribution</h3>
            <EntityBreakdown />
          </div>
        </div>

        {/* Relationship Analysis */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Relationship Matrix */}
          <div className="xl:col-span-2 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Relationship Matrix</h3>
            <RelationshipMatrix />
          </div>

          {/* Growth Metrics */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Growth Metrics</h3>
            <GrowthMetrics />
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/5 border border-indigo-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-indigo-300 mb-4">AI Insights & Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">🎯 Most Connected Project</h4>
              <p className="text-sm text-slate-300">
                Elite Pulse shows highest connectivity (6 tech relationships), indicating architectural complexity worth monitoring.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">🔧 Tech Stack Consistency</h4>
              <p className="text-sm text-slate-300">
                Next.js + TypeScript pattern appears across 4/5 projects, suggesting strong architectural preferences.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">📈 Memory Growth Trend</h4>
              <p className="text-sm text-slate-300">
                3 new entities added this week, 40% increase in relationship density over last month.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">🧠 Knowledge Gaps</h4>
              <p className="text-sm text-slate-300">
                Consider documenting deployment patterns and error handling strategies for better coverage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
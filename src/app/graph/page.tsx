import { GraphVisualization } from '@/components/graph/GraphVisualization'
import { GraphControls } from '@/components/graph/GraphControls'
import { GraphStats } from '@/components/graph/GraphStats'

export default function GraphPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Interactive Knowledge Graph
            </h1>
            <p className="text-slate-400 mt-1">
              Explore connections between 22 entities across your memory architecture
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <GraphStats />
            </div>
            <GraphControls />
          </div>
        </div>
      </div>

      {/* Graph Container */}
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          <GraphVisualization />
        </div>
        
        {/* Floating Help Panel */}
        <div className="absolute bottom-6 left-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 max-w-xs">
          <h3 className="text-sm font-semibold text-white mb-2">Graph Controls</h3>
          <div className="space-y-1 text-xs text-slate-400">
            <div>• <span className="text-slate-300">Drag</span> nodes to reposition</div>
            <div>• <span className="text-slate-300">Scroll</span> to zoom in/out</div>
            <div>• <span className="text-slate-300">Click</span> nodes for details</div>
            <div>• <span className="text-slate-300">Hover</span> for quick info</div>
          </div>
        </div>
        
        {/* Entity Legend */}
        <div className="absolute top-6 right-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Entity Types</h3>
          <div className="space-y-2">
            {[
              { name: 'Projects', color: '#4F46E5', count: 5 },
              { name: 'Technologies', color: '#10B981', count: 9 },
              { name: 'Tools', color: '#8B5CF6', count: 4 },
              { name: 'Insights', color: '#EF4444', count: 2 },
              { name: 'Decisions', color: '#F59E0B', count: 1 },
              { name: 'People', color: '#06B6D4', count: 1 }
            ].map((type) => (
              <div key={type.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full shadow-lg"
                    style={{ 
                      backgroundColor: type.color,
                      boxShadow: `0 0 8px ${type.color}40`
                    }} 
                  />
                  <span className="text-slate-300">{type.name}</span>
                </div>
                <span className="text-slate-500 font-medium">{type.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
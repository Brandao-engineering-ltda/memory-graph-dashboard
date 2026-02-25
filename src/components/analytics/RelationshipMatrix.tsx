'use client'

export function RelationshipMatrix() {
  const matrix = [
    { from: 'Projects', to: 'Technologies', count: 18, strength: 'high' },
    { from: 'Projects', to: 'Tools', count: 8, strength: 'medium' },
    { from: 'Technologies', to: 'Technologies', count: 12, strength: 'high' },
    { from: 'Insights', to: 'Projects', count: 6, strength: 'medium' },
    { from: 'Decisions', to: 'Projects', count: 4, strength: 'medium' },
    { from: 'Tools', to: 'Projects', count: 7, strength: 'medium' },
    { from: 'People', to: 'Projects', count: 5, strength: 'high' },
  ]

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'high': return 'bg-red-500/80'
      case 'medium': return 'bg-yellow-500/80'
      case 'low': return 'bg-green-500/80'
      default: return 'bg-slate-500/80'
    }
  }

  const getStrengthSize = (count: number) => {
    const maxCount = Math.max(...matrix.map(m => m.count))
    return Math.max(20, (count / maxCount) * 60)
  }

  return (
    <div className="space-y-6">
      {/* Matrix Visualization */}
      <div className="relative overflow-hidden">
        <div className="space-y-3">
          {matrix.map((relation, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-20 text-xs text-slate-400 text-right">
                {relation.from}
              </div>
              <div className="flex-1 relative">
                <div className="h-8 bg-slate-800/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${getStrengthColor(relation.strength)}`}
                    style={{ width: `${(relation.count / 20) * 100}%` }}
                  />
                </div>
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xs text-white font-medium">
                  {relation.count}
                </div>
              </div>
              <div className="w-20 text-xs text-slate-400">
                {relation.to}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Relationships */}
      <div>
        <h4 className="text-sm font-medium text-white mb-3">Strongest Connections</h4>
        <div className="space-y-2">
          {matrix
            .sort((a, b) => b.count - a.count)
            .slice(0, 3)
            .map((relation, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-slate-300">
                  {relation.from} → {relation.to}
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStrengthColor(relation.strength)}`} />
                  <span className="text-sm font-medium text-white">{relation.count}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Strength Legend */}
      <div className="flex justify-center gap-6 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="text-xs text-slate-400">High (15+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="text-xs text-slate-400">Medium (5-14)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-xs text-slate-400">Low (1-4)</span>
        </div>
      </div>
    </div>
  )
}
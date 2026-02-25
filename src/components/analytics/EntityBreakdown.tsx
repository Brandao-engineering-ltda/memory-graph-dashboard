'use client'

export function EntityBreakdown() {
  const entities = [
    { name: 'Technologies', count: 9, percentage: 41, color: '#10B981' },
    { name: 'Projects', count: 5, percentage: 23, color: '#4F46E5' },
    { name: 'Tools', count: 4, percentage: 18, color: '#8B5CF6' },
    { name: 'Insights', count: 2, percentage: 9, color: '#EF4444' },
    { name: 'Decisions', count: 1, percentage: 4, color: '#F59E0B' },
    { name: 'People', count: 1, percentage: 4, color: '#06B6D4' },
  ]

  return (
    <div className="space-y-4">
      {/* Pie Chart Representation */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {entities.map((entity, index) => {
            let startAngle = 0
            for (let i = 0; i < index; i++) {
              startAngle += (entities[i].percentage / 100) * 360
            }
            const endAngle = startAngle + (entity.percentage / 100) * 360
            
            const startAngleRad = (startAngle * Math.PI) / 180
            const endAngleRad = (endAngle * Math.PI) / 180
            
            const x1 = 50 + 40 * Math.cos(startAngleRad)
            const y1 = 50 + 40 * Math.sin(startAngleRad)
            const x2 = 50 + 40 * Math.cos(endAngleRad)
            const y2 = 50 + 40 * Math.sin(endAngleRad)
            
            const largeArcFlag = entity.percentage > 50 ? 1 : 0
            
            return (
              <path
                key={entity.name}
                d={`M 50,50 L ${x1},${y1} A 40,40 0 ${largeArcFlag},1 ${x2},${y2} z`}
                fill={entity.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
                opacity={0.8}
              />
            )
          })}
        </svg>
        
        {/* Center Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">22</div>
            <div className="text-xs text-slate-400">Total</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {entities.map((entity) => (
          <div key={entity.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entity.color }}
              />
              <span className="text-sm text-slate-300">{entity.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-white">{entity.count}</span>
              <span className="text-xs text-slate-500 w-8">{entity.percentage}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="pt-4 border-t border-white/10">
        <div className="text-sm text-slate-400">
          Most represented: <span className="text-green-300 font-medium">Technologies (41%)</span>
        </div>
      </div>
    </div>
  )
}
'use client'

import { TrendingUp, Calendar } from 'lucide-react'

export function MemoryTrends() {
  const data = [
    { date: '2026-02-20', entities: 15, sessions: 2 },
    { date: '2026-02-21', entities: 17, sessions: 3 },
    { date: '2026-02-22', entities: 19, sessions: 4 },
    { date: '2026-02-23', entities: 20, sessions: 6 },
    { date: '2026-02-24', entities: 22, sessions: 8 },
  ]

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-400">+47%</div>
          <div className="text-xs text-slate-400">Entity Growth</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blue-400">+300%</div>
          <div className="text-xs text-slate-400">Session Growth</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-400">+12</div>
          <div className="text-xs text-slate-400">New Relations</div>
        </div>
      </div>

      {/* Trend Visualization */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Calendar className="h-4 w-4" />
          <span>Last 5 Days</span>
        </div>
        
        {data.map((day, index) => (
          <div key={day.date} className="flex items-center gap-4">
            <div className="text-xs text-slate-500 w-16">
              {day.date.slice(5)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${(day.entities / 25) * 100}%` }}
                  />
                </div>
                <div className="text-sm text-white font-medium w-8">
                  {day.entities}
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {day.sessions} sessions
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Growth Indicators */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-sm text-green-400">
          <TrendingUp className="h-4 w-4" />
          <span>Healthy Growth</span>
        </div>
        <div className="text-xs text-slate-400">
          Avg +1.8 entities/day
        </div>
      </div>
    </div>
  )
}
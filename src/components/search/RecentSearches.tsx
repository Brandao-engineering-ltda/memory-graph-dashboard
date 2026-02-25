'use client'

import { Clock, Search } from 'lucide-react'

export function RecentSearches() {
  const searches = [
    {
      query: 'Elite Pulse architecture',
      timestamp: '2 min ago',
      results: 8
    },
    {
      query: 'security dashboard setup',
      timestamp: '15 min ago',
      results: 5
    },
    {
      query: 'OpenAI patterns insight',
      timestamp: '1 hour ago',
      results: 12
    },
    {
      query: 'Next.js + TypeScript',
      timestamp: '2 hours ago',
      results: 23
    },
    {
      query: 'memory architecture',
      timestamp: '3 hours ago',
      results: 18
    }
  ]

  return (
    <div className="space-y-3">
      {searches.map((search, index) => (
        <div 
          key={index}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
        >
          <Search className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate group-hover:text-indigo-300 transition-colors">
              {search.query}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              <span>{search.timestamp}</span>
              <span>•</span>
              <span>{search.results} results</span>
            </div>
          </div>
        </div>
      ))}
      
      <button className="w-full mt-4 text-sm text-slate-400 hover:text-indigo-300 transition-colors">
        View all searches →
      </button>
    </div>
  )
}
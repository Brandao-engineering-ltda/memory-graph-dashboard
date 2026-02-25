'use client'

import { useState } from 'react'
import { Search, Loader2, Sparkles, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SearchResult {
  path: string
  content: string
  score: string
  source: string
  type?: string
}

export function SemanticSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searchMode, setSearchMode] = useState<'semantic' | 'hybrid'>('semantic')

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    try {
      // Simulate API call - in production, this would call the memory search API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock results based on query
      const mockResults: SearchResult[] = [
        {
          path: 'MEMORY.md',
          content: `Elite Pulse: Garmin workout sync app (Next.js + Go microservices + Firebase Auth + Cloud Run)`,
          score: '0.92',
          source: 'Source: MEMORY.md#3',
          type: 'PROJECT'
        },
        {
          path: 'memory/2026-02-24.md',
          content: `## Game-Changing Product Builder Skill Created - Following OpenAI patterns: Clear routing logic, negative examples, embedded templates, success criteria`,
          score: '0.85',
          source: 'Source: memory/2026-02-24.md#28',
          type: 'INSIGHT'
        },
        {
          path: 'memory/sessions/session-2026-02-24-165648.md',
          content: `Phase 2 complete: Semantic search engine built and tested with embeddings-based search superior to keywords`,
          score: '0.78',
          source: 'Source: memory/sessions/session-2026-02-24-165648.md#12',
          type: 'TECH'
        }
      ].filter(r => 
        r.content.toLowerCase().includes(query.toLowerCase()) ||
        r.path.toLowerCase().includes(query.toLowerCase())
      )
      
      setResults(mockResults)
    } catch (error) {
      // Silent error handling for production
      if (process.env.NODE_ENV === 'development') {
        console.error('Search failed:', error)
      }
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'PROJECT': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'TECH': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'INSIGHT': return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'TOOL': return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
        </div>
        <input
          type="text"
          placeholder="Search your memory graph... (e.g., 'Elite Pulse features', 'security improvements', 'Next.js patterns')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-14 pr-32 py-4 text-lg bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-400"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <select
            value={searchMode}
            onChange={(e) => setSearchMode(e.target.value as 'semantic' | 'hybrid')}
            className="px-3 py-1 text-xs bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
          >
            <option value="semantic">Semantic</option>
            <option value="hybrid">Hybrid</option>
          </select>
          <Button 
            onClick={handleSearch} 
            disabled={loading || !query.trim()}
            className="px-6"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Found {results.length} results
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Search mode:</span>
              <span className="text-indigo-300 font-medium">{searchMode}</span>
            </div>
          </div>
          
          {results.map((result, i) => (
            <div 
              key={i} 
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-sm text-slate-400">{result.source}</div>
                  {result.type && (
                    <span className={`px-2 py-1 text-xs border rounded-md ${getTypeColor(result.type)}`}>
                      {result.type}
                    </span>
                  )}
                </div>
                <div className="text-sm font-mono text-slate-500">
                  Score: {result.score}
                </div>
              </div>
              <p className="text-slate-200 leading-relaxed group-hover:text-white transition-colors">
                {result.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {results.length === 0 && query && !loading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
          <p className="text-slate-400">
            Try a different search term or check your memory files.
          </p>
        </div>
      )}
    </div>
  )
}
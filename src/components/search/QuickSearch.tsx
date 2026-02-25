'use client'

import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SearchResult {
  path: string
  content: string
  score: string
  source: string
}

export function QuickSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    try {
      // In production, this would call the memory search API
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock results
      const mockResults: SearchResult[] = [
        {
          path: 'MEMORY.md',
          content: `Elite Pulse: Garmin workout sync app (Next.js + Go microservices + Firebase Auth + Cloud Run)`,
          score: '0.85',
          source: 'Source: MEMORY.md#3'
        },
        {
          path: 'memory/2026-02-24.md',
          content: `## Game-Changing Product Builder Skill Created - Following OpenAI patterns: Clear routing logic, negative examples, embedded templates, success criteria`,
          score: '0.72',
          source: 'Source: memory/2026-02-24.md#28'
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

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search your memory graph..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
        <Button onClick={handleSearch} disabled={loading || !query.trim()}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Search'
          )}
        </Button>
      </div>

      {results.length > 0 && (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {results.map((result, i) => (
            <div key={i} className="p-3 border border-border rounded-md bg-muted/20">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>{result.source}</span>
                <span>Score: {result.score}</span>
              </div>
              <p className="text-sm line-clamp-3">
                {result.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && query && !loading && (
        <div className="text-center py-8 text-muted-foreground">
          <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No results found for "{query}"</p>
          <p className="text-xs">Try a different search term or check your memory files.</p>
        </div>
      )}
    </div>
  )
}
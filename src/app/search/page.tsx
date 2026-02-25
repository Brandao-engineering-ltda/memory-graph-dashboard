import { SemanticSearch } from '@/components/search/SemanticSearch'
import { SearchStats } from '@/components/search/SearchStats'
import { RecentSearches } from '@/components/search/RecentSearches'
import { SearchTips } from '@/components/search/SearchTips'

export default function SearchPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-2">
            Semantic Memory Search
          </h1>
          <p className="text-slate-400">
            AI-powered search across your entire knowledge base with contextual understanding
          </p>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Search Interface */}
          <div className="mb-8">
            <SemanticSearch />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search Results Area - Takes up 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search results will be dynamically populated here */}
              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Start exploring your memory
                  </h3>
                  <p className="text-slate-400">
                    Try searching for projects, technologies, or insights using natural language
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    {[
                      'Elite Pulse features',
                      'Next.js patterns', 
                      'security improvements',
                      'memory architecture',
                      'OpenAI insights'
                    ].map((term) => (
                      <button 
                        key={term}
                        className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-full text-slate-300 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Search Stats */}
              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Search Stats</h3>
                <SearchStats />
              </div>

              {/* Recent Searches */}
              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Searches</h3>
                <RecentSearches />
              </div>

              {/* Search Tips */}
              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Search Tips</h3>
                <SearchTips />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
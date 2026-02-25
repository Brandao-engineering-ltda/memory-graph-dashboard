'use client'

import { useState } from 'react'
import { Search, Filter, Download, RefreshCw, Maximize } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EntityType } from '@/lib/graph-types'

interface GraphControlsProps {
  onSearch?: (query: string) => void
  onFilter?: (filters: EntityType[]) => void
  onExport?: () => void
  onRefresh?: () => void
  onFullscreen?: () => void
}

export function GraphControls({
  onSearch,
  onFilter,
  onExport,
  onRefresh,
  onFullscreen
}: GraphControlsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<EntityType[]>([
    'PROJECT', 'TECH', 'TOOL', 'INSIGHT', 'DECISION', 'PERSON'
  ])

  const entityTypes: { type: EntityType; label: string; color: string }[] = [
    { type: 'PROJECT', label: 'Projects', color: '#4F46E5' },
    { type: 'TECH', label: 'Technologies', color: '#10B981' },
    { type: 'TOOL', label: 'Tools', color: '#8B5CF6' },
    { type: 'INSIGHT', label: 'Insights', color: '#EF4444' },
    { type: 'DECISION', label: 'Decisions', color: '#F59E0B' },
    { type: 'PERSON', label: 'People', color: '#06B6D4' },
  ]

  const handleSearch = () => {
    onSearch?.(searchQuery)
  }

  const handleTypeToggle = (type: EntityType) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type]
    
    setSelectedTypes(newTypes)
    onFilter?.(newTypes)
  }

  return (
    <div className="flex items-center gap-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search entities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="w-64 pl-10 pr-4 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
      </div>

      {/* Filters */}
      <div className="relative">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>

        {showFilters && (
          <div className="absolute top-full mt-2 right-0 bg-background border border-border rounded-lg shadow-lg p-4 w-72 z-50">
            <div className="space-y-3">
              <h3 className="font-medium text-sm">Entity Types</h3>
              <div className="grid grid-cols-2 gap-2">
                {entityTypes.map(({ type, label, color }) => (
                  <button
                    key={type}
                    onClick={() => handleTypeToggle(type)}
                    className={`flex items-center gap-2 p-2 rounded-md text-sm transition-colors ${
                      selectedTypes.includes(type)
                        ? 'bg-primary/10 border border-primary/20' 
                        : 'bg-muted/50 hover:bg-muted'
                    }`}
                  >
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: color }}
                    />
                    {label}
                  </button>
                ))}
              </div>
              
              <div className="pt-2 border-t border-border">
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setSelectedTypes([])
                      onFilter?.([])
                    }}
                  >
                    Clear All
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      const allTypes: EntityType[] = ['PROJECT', 'TECH', 'TOOL', 'INSIGHT', 'DECISION', 'PERSON']
                      setSelectedTypes(allTypes)
                      onFilter?.(allTypes)
                    }}
                  >
                    Select All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-1">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onRefresh}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onExport}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onFullscreen}
          className="gap-2"
        >
          <Maximize className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
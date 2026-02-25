// Configuration management for Memory Graph Dashboard
// Environment variables and default settings

export interface AppConfig {
  memoryDataPath: string
  memoryFilePatterns: string[]
  graphRebuildInterval: number
  maxEntitiesPerUpdate: number
  searchMaxResults: number
  enableSemanticSearch: boolean
  searchRecencyWeight: number
  searchRelevanceWeight: number
  analyticsHistoryDays: number
  enableAiInsights: boolean
  defaultTheme: 'dark' | 'light'
  enableAnimations: boolean
  graphPhysicsEnabled: boolean
  graphMaxNodes: number
  enableCaching: boolean
  cacheDuration: number
  debugLogging: boolean
  devToolsEnabled: boolean
}

// Default configuration
const defaultConfig: AppConfig = {
  memoryDataPath: process.env.MEMORY_DATA_PATH || './memory',
  memoryFilePatterns: process.env.MEMORY_FILE_PATTERNS?.split(',') || ['*.md', '*.txt'],
  graphRebuildInterval: parseInt(process.env.GRAPH_REBUILD_INTERVAL || '300000'),
  maxEntitiesPerUpdate: parseInt(process.env.MAX_ENTITIES_PER_UPDATE || '1000'),
  searchMaxResults: parseInt(process.env.SEARCH_MAX_RESULTS || '50'),
  enableSemanticSearch: process.env.ENABLE_SEMANTIC_SEARCH !== 'false',
  searchRecencyWeight: parseFloat(process.env.SEARCH_RECENCY_WEIGHT || '0.2'),
  searchRelevanceWeight: parseFloat(process.env.SEARCH_RELEVANCE_WEIGHT || '0.8'),
  analyticsHistoryDays: parseInt(process.env.ANALYTICS_HISTORY_DAYS || '30'),
  enableAiInsights: process.env.ENABLE_AI_INSIGHTS !== 'false',
  defaultTheme: (process.env.DEFAULT_THEME as 'dark' | 'light') || 'dark',
  enableAnimations: process.env.ENABLE_ANIMATIONS !== 'false',
  graphPhysicsEnabled: process.env.GRAPH_PHYSICS_ENABLED !== 'false',
  graphMaxNodes: parseInt(process.env.GRAPH_MAX_NODES || '500'),
  enableCaching: process.env.ENABLE_CACHING !== 'false',
  cacheDuration: parseInt(process.env.CACHE_DURATION || '300'),
  debugLogging: process.env.DEBUG_LOGGING === 'true',
  devToolsEnabled: process.env.DEV_TOOLS_ENABLED === 'true' && process.env.NODE_ENV === 'development'
}

// Validate and get configuration
export function getConfig(): AppConfig {
  // Validate critical paths
  if (!defaultConfig.memoryDataPath) {
    console.warn('MEMORY_DATA_PATH not set, using default: ./memory')
  }

  // Ensure numeric values are within reasonable ranges
  if (defaultConfig.searchMaxResults < 1 || defaultConfig.searchMaxResults > 200) {
    console.warn('SEARCH_MAX_RESULTS should be between 1-200, using default: 50')
    defaultConfig.searchMaxResults = 50
  }

  if (defaultConfig.graphMaxNodes < 10 || defaultConfig.graphMaxNodes > 2000) {
    console.warn('GRAPH_MAX_NODES should be between 10-2000, using default: 500')
    defaultConfig.graphMaxNodes = 500
  }

  return defaultConfig
}

// Get specific config values with type safety
export const config = getConfig()

// Helper functions for common configurations
export function getMemoryScriptPath(): string {
  // For the memory analysis scripts, look in the memory directory
  return `${config.memoryDataPath}/get-stats.js`
}

export function getKnowledgeGraphPath(): string {
  return `${config.memoryDataPath}/graph/knowledge-graph.json`
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

// Export individual config values for convenience
export const {
  memoryDataPath,
  searchMaxResults,
  enableSemanticSearch,
  defaultTheme,
  enableAnimations,
  debugLogging
} = config
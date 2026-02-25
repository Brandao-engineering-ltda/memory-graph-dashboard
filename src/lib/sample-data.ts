// Sample data for demo purposes and testing
// This data is used when no real memory data is available

import { GraphData, GraphNode, GraphEdge } from './graph-types';

export const sampleGraphData: GraphData = {
  nodes: [
    // Projects
    { 
      id: 'PROJECT:memory-dashboard', 
      name: 'Memory Dashboard', 
      type: 'PROJECT', 
      color: '#4F46E5', 
      source: 'demo', 
      context: 'Interactive knowledge graph visualization system' 
    },
    { 
      id: 'PROJECT:ai-blog', 
      name: 'AI Blog', 
      type: 'PROJECT', 
      color: '#4F46E5', 
      source: 'demo', 
      context: 'Technical blog about AI and development' 
    },
    { 
      id: 'PROJECT:personal-assistant', 
      name: 'Personal Assistant', 
      type: 'PROJECT', 
      color: '#4F46E5', 
      source: 'demo', 
      context: 'AI-powered personal productivity system' 
    },
    
    // Technologies  
    { 
      id: 'TECH:nextjs', 
      name: 'Next.js', 
      type: 'TECH', 
      color: '#10B981', 
      source: 'demo', 
      context: 'React framework for production applications' 
    },
    { 
      id: 'TECH:typescript', 
      name: 'TypeScript', 
      type: 'TECH', 
      color: '#10B981', 
      source: 'demo', 
      context: 'Type-safe JavaScript superset' 
    },
    { 
      id: 'TECH:tailwind', 
      name: 'Tailwind CSS', 
      type: 'TECH', 
      color: '#10B981', 
      source: 'demo', 
      context: 'Utility-first CSS framework' 
    },
    { 
      id: 'TECH:d3js', 
      name: 'D3.js', 
      type: 'TECH', 
      color: '#10B981', 
      source: 'demo', 
      context: 'Data visualization library' 
    },
    { 
      id: 'TECH:nodejs', 
      name: 'Node.js', 
      type: 'TECH', 
      color: '#10B981', 
      source: 'demo', 
      context: 'JavaScript runtime for backend development' 
    },
    
    // Tools
    { 
      id: 'TOOL:vscode', 
      name: 'VS Code', 
      type: 'TOOL', 
      color: '#8B5CF6', 
      source: 'demo', 
      context: 'Code editor and development environment' 
    },
    { 
      id: 'TOOL:git', 
      name: 'Git', 
      type: 'TOOL', 
      color: '#8B5CF6', 
      source: 'demo', 
      context: 'Version control system' 
    },
    
    // Insights
    { 
      id: 'INSIGHT:graph-vis', 
      name: 'Graph Visualization Patterns', 
      type: 'INSIGHT', 
      color: '#EF4444', 
      source: 'demo', 
      context: 'Key insights about effective knowledge graph visualization' 
    },
    { 
      id: 'INSIGHT:memory-architecture', 
      name: 'Memory Architecture Design', 
      type: 'INSIGHT', 
      color: '#EF4444', 
      source: 'demo', 
      context: 'Lessons learned about building memory systems' 
    },
    
    // People
    { 
      id: 'PERSON:developer', 
      name: 'Developer', 
      type: 'PERSON', 
      color: '#06B6D4', 
      source: 'demo', 
      context: 'Project creator and maintainer' 
    }
  ],
  edges: [
    // Project → Tech relationships
    { id: 'e1', source: 'PROJECT:memory-dashboard', target: 'TECH:nextjs', type: 'USES', weight: 1.0 },
    { id: 'e2', source: 'PROJECT:memory-dashboard', target: 'TECH:typescript', type: 'USES', weight: 1.0 },
    { id: 'e3', source: 'PROJECT:memory-dashboard', target: 'TECH:tailwind', type: 'USES', weight: 1.0 },
    { id: 'e4', source: 'PROJECT:memory-dashboard', target: 'TECH:d3js', type: 'USES', weight: 1.0 },
    
    { id: 'e5', source: 'PROJECT:ai-blog', target: 'TECH:nextjs', type: 'USES', weight: 0.8 },
    { id: 'e6', source: 'PROJECT:ai-blog', target: 'TECH:typescript', type: 'USES', weight: 0.8 },
    
    { id: 'e7', source: 'PROJECT:personal-assistant', target: 'TECH:nodejs', type: 'USES', weight: 0.9 },
    { id: 'e8', source: 'PROJECT:personal-assistant', target: 'TECH:typescript', type: 'USES', weight: 0.9 },
    
    // Tool → Project relationships
    { id: 'e9', source: 'TOOL:vscode', target: 'PROJECT:memory-dashboard', type: 'USED_FOR', weight: 0.7 },
    { id: 'e10', source: 'TOOL:vscode', target: 'PROJECT:ai-blog', type: 'USED_FOR', weight: 0.7 },
    { id: 'e11', source: 'TOOL:git', target: 'PROJECT:memory-dashboard', type: 'USED_FOR', weight: 0.6 },
    
    // Insight → Project relationships
    { id: 'e12', source: 'INSIGHT:graph-vis', target: 'PROJECT:memory-dashboard', type: 'INFLUENCES', weight: 0.8 },
    { id: 'e13', source: 'INSIGHT:memory-architecture', target: 'PROJECT:memory-dashboard', type: 'INFLUENCES', weight: 0.9 },
    { id: 'e14', source: 'INSIGHT:memory-architecture', target: 'PROJECT:personal-assistant', type: 'INFLUENCES', weight: 0.7 },
    
    // Person → Project relationships
    { id: 'e15', source: 'PERSON:developer', target: 'PROJECT:memory-dashboard', type: 'CREATED', weight: 1.0 },
    { id: 'e16', source: 'PERSON:developer', target: 'PROJECT:ai-blog', type: 'CREATED', weight: 1.0 },
    { id: 'e17', source: 'PERSON:developer', target: 'PROJECT:personal-assistant', type: 'CREATED', weight: 1.0 },
    
    // Tech → Tech relationships (complementary technologies)
    { id: 'e18', source: 'TECH:nextjs', target: 'TECH:typescript', type: 'COMPLEMENTS', weight: 0.9 },
    { id: 'e19', source: 'TECH:nextjs', target: 'TECH:tailwind', type: 'COMPLEMENTS', weight: 0.8 },
    { id: 'e20', source: 'TECH:typescript', target: 'TECH:nodejs', type: 'COMPLEMENTS', weight: 0.7 }
  ]
};

export const sampleMemoryStats = {
  entities: sampleGraphData.nodes.length,
  relationships: sampleGraphData.edges.length,
  projects: sampleGraphData.nodes.filter(n => n.type === 'PROJECT').length,
  technologies: sampleGraphData.nodes.filter(n => n.type === 'TECH').length,
  tools: sampleGraphData.nodes.filter(n => n.type === 'TOOL').length,
  insights: sampleGraphData.nodes.filter(n => n.type === 'INSIGHT').length,
  decisions: sampleGraphData.nodes.filter(n => n.type === 'DECISION').length,
  people: sampleGraphData.nodes.filter(n => n.type === 'PERSON').length,
  lastUpdate: new Date().toISOString(),
  healthy: true
};

export const sampleSearchResults = [
  {
    id: 'memory-dashboard-overview',
    title: 'Memory Dashboard Architecture',
    content: 'Interactive knowledge graph visualization system built with Next.js, TypeScript, and D3.js.',
    source: 'demo-memory.md',
    score: 0.95,
    entities: ['Memory Dashboard', 'Next.js', 'TypeScript', 'D3.js'],
    context: 'Project documentation and architecture decisions'
  },
  {
    id: 'graph-visualization-insights',
    title: 'Graph Visualization Best Practices',
    content: 'Key insights about effective knowledge graph visualization including force simulation, interactive nodes, and semantic clustering.',
    source: 'demo-insights.md',
    score: 0.88,
    entities: ['Graph Visualization', 'D3.js', 'Interactive Design'],
    context: 'Technical insights and lessons learned'
  },
  {
    id: 'typescript-benefits',
    title: 'TypeScript in Large Projects',
    content: 'Benefits of using TypeScript for type safety, better IDE support, and maintainability in complex applications.',
    source: 'demo-tech-notes.md',
    score: 0.82,
    entities: ['TypeScript', 'Development', 'Best Practices'],
    context: 'Technical decisions and reasoning'
  }
];

export const sampleRecentSearches = [
  'memory architecture patterns',
  'Next.js performance optimization',
  'graph visualization techniques',
  'TypeScript best practices',
  'D3.js force simulation'
];

export const sampleTrendData = [
  { date: '2026-02-20', entities: 8, relationships: 12 },
  { date: '2026-02-21', entities: 10, relationships: 16 },
  { date: '2026-02-22', entities: 12, relationships: 18 },
  { date: '2026-02-23', entities: 13, relationships: 20 },
  { date: '2026-02-24', entities: 14, relationships: 22 },
  { date: '2026-02-25', entities: 14, relationships: 22 }
];
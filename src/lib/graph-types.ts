import { SimulationNodeDatum } from 'd3-force';

export interface GraphNode extends SimulationNodeDatum {
  id: string
  name: string
  type: string
  color: string
  source: string
  context: string
}

export interface GraphEdge {
  id: string
  source: string
  target: string
  type: string
  weight: number
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export type EntityType = 'PROJECT' | 'TECH' | 'TOOL' | 'INSIGHT' | 'DECISION' | 'PERSON'

export interface GraphFilters {
  entityTypes: EntityType[]
  searchQuery: string
  minStrength: number
}
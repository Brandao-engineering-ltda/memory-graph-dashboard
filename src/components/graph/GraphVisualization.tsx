'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import * as d3 from 'd3'
import { GraphNode, GraphEdge, GraphData } from '@/lib/graph-types'
import { sampleGraphData } from '@/lib/sample-data'

interface GraphVisualizationProps {
  data?: GraphData
  onNodeSelect?: (node: GraphNode | null) => void
}

export function GraphVisualization({ data = sampleGraphData, onNodeSelect }: GraphVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  
  // Refs for mutable D3 data (no React re-renders)
  const nodesRef = useRef<GraphNode[]>([])
  const edgesRef = useRef<GraphEdge[]>([])
  const simulationRef = useRef<d3.Simulation<GraphNode, undefined> | null>(null)

  // Initialize data once
  useEffect(() => {
    const nodeMap = new Map<string, GraphNode>()
    data.nodes.forEach(node => {
      if (node?.id) nodeMap.set(node.id, { ...node })
    })

    nodesRef.current = Array.from(nodeMap.values())
    edgesRef.current = data.edges
      .filter((edge): edge is GraphEdge => edge?.source && edge?.target)
      .map(edge => ({
        ...edge,
        source: nodeMap.get(edge.source as string) || null,
        target: nodeMap.get(edge.target as string) || null
      }))
      .filter((edge): edge is GraphEdge => edge.source && edge.target) as GraphEdge[]

    // Graph data loaded successfully
  }, [data])

  // Responsive sizing
  useLayoutEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Main D3 visualization (runs only on size/data change)
  useLayoutEffect(() => {
    const svg = d3.select(svgRef.current!)
    svg.selectAll('*').remove()

    const { width, height } = dimensions
    if (width === 0 || height === 0 || nodesRef.current.length === 0) return

    svg.attr('width', width).attr('height', height)

    // Zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 3])
      .on('zoom', (event) => g.attr('transform', event.transform))
    
    svg.call(zoom)

    const g = svg.append('g')

    // Initial spiral positions
    const radius = Math.min(width, height) * 0.25
    const angleStep = (Math.PI * 2) / nodesRef.current.length
    nodesRef.current.forEach((node, i) => {
      node.x = width / 2 + Math.cos(i * angleStep) * radius
      node.y = height / 2 + Math.sin(i * angleStep) * radius
    })

    // Simulation
    const sim = d3.forceSimulation(nodesRef.current)
      .force('link', d3.forceLink(edgesRef.current)
        .id((d: any) => d.id)
        .distance(150))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide(20))
    
    sim.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x ?? 0)
        .attr('y1', (d: any) => d.source.y ?? 0)
        .attr('x2', (d: any) => d.target.x ?? 0)
        .attr('y2', (d: any) => d.target.y ?? 0)

      node.attr('cx', (d: any) => d.x ?? 0).attr('cy', (d: any) => d.y ?? 0)
      label.attr('x', (d: any) => d.x ?? 0).attr('y', (d: any) => (d.y ?? 0) + 3)
    })

    simulationRef.current = sim

    // Links
    const link = g.append('g')
      .selectAll('line')
      .data(edgesRef.current)
      .join('line')
      .attr('stroke', '#64748b')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1.5)

    // Nodes
    const node = g.append('g')
      .selectAll('circle')
      .data(nodesRef.current)
      .join('circle')
      .attr('r', 10)
      .attr('fill', (d) => d.color || '#64748b')
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .call(d3.drag<SVGCircleElement, GraphNode>()
        .on('start', (event, d) => {
          if (!event.active) sim.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
        })
        .on('drag', (event, d) => {
          d.fx = event.x
          d.fy = event.y
        })
        .on('end', (event, d) => {
          if (!event.active) sim.alphaTarget(0)
          d.fx = null
          d.fy = null
        })
      )
      .on('click', (event, d) => {
        event.stopPropagation()
        setSelectedNode(d)
        onNodeSelect?.(d)
      });

    // Labels
    const label = g.append('g')
      .selectAll('text')
      .data(nodesRef.current)
      .join('text')
        .text(d => d.name)
        .attr('font-size', 11)
        .attr('font-weight', 500)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')

    return () => {
      sim.stop()
      d3.selectAll('.graph-tooltip').remove()
    }
  }, [dimensions.width, dimensions.height])

  return (
    <div ref={containerRef} className="w-full h-full bg-slate-900/30 rounded-lg overflow-hidden">
      <svg ref={svgRef} className="w-full h-full" />
      
      {selectedNode && (
        <div className="absolute top-4 right-4 w-80 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-white truncate max-w-[200px]">{selectedNode.name}</h3>
            <button 
              onClick={() => setSelectedNode(null)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{backgroundColor: selectedNode.color}} />
              <span className="font-semibold text-white/90">{selectedNode.type}</span>
            </div>
            <div>
              <div className="text-xs text-white/60 mb-1">Context</div>
              <p className="text-white/80 leading-relaxed line-clamp-3">{selectedNode.context}</p>
            </div>
            <div className="text-xs text-white/60 font-mono bg-white/5 px-2 py-1 rounded">
              Source: {selectedNode.source}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

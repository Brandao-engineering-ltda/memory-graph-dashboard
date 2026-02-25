'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { GraphNode, GraphEdge, GraphData } from '@/lib/graph-types'

// Extended sample data for full graph view
const fullGraphData: GraphData = {
  nodes: [
    // Projects
    { id: 'PROJECT:elite-pulse', name: 'Elite Pulse', type: 'PROJECT', color: '#4F46E5', source: 'MEMORY.md', context: 'Garmin workout sync app (Next.js + Go microservices + Firebase Auth + Cloud Run)' },
    { id: 'PROJECT:x-growth', name: 'X Growth', type: 'PROJECT', color: '#4F46E5', source: 'MEMORY.md', context: 'Twitter growth automation and analytics' },
    { id: 'PROJECT:openclaw', name: 'OpenClaw', type: 'PROJECT', color: '#4F46E5', source: 'MEMORY.md', context: 'AI agent platform running on VPS' },
    { id: 'PROJECT:component-lib', name: 'Component Library', type: 'PROJECT', color: '#4F46E5', source: 'MEMORY.md', context: 'Storybook + Chromatic, semantic-release, CI/CD' },
    { id: 'PROJECT:product-builder', name: 'Product Builder', type: 'PROJECT', color: '#4F46E5', source: 'memory/2026-02-24.md', context: 'Full-stack product development skill' },
    
    // Technologies  
    { id: 'TECH:nextjs', name: 'Next.js', type: 'TECH', color: '#10B981', source: 'MEMORY.md', context: 'React framework for production apps' },
    { id: 'TECH:typescript', name: 'TypeScript', type: 'TECH', color: '#10B981', source: 'MEMORY.md', context: 'Type-safe JavaScript superset' },
    { id: 'TECH:go', name: 'Go', type: 'TECH', color: '#10B981', source: 'MEMORY.md', context: 'Backend programming language' },
    { id: 'TECH:gcp', name: 'GCP', type: 'TECH', color: '#10B981', source: 'MEMORY.md', context: 'Google Cloud Platform infrastructure' },
    { id: 'TECH:react', name: 'React', type: 'TECH', color: '#10B981', source: 'MEMORY.md', context: 'JavaScript library for UIs' },
    { id: 'TECH:tailwind', name: 'Tailwind', type: 'TECH', color: '#10B981', source: 'MEMORY.md', context: 'Utility-first CSS framework' },
    { id: 'TECH:firebase', name: 'Firebase', type: 'TECH', color: '#10B981', source: 'MEMORY.md', context: 'Authentication and backend services' },
    { id: 'TECH:claude', name: 'Claude', type: 'TECH', color: '#10B981', source: 'sessions', context: 'AI model for reasoning tasks' },
    
    // Tools
    { id: 'TOOL:cursor', name: 'Cursor', type: 'TOOL', color: '#8B5CF6', source: 'MEMORY.md', context: 'AI-powered code editor' },
    { id: 'TOOL:warp', name: 'Warp', type: 'TOOL', color: '#8B5CF6', source: 'MEMORY.md', context: 'Modern terminal application' },
    { id: 'TOOL:telegram', name: 'Telegram', type: 'TOOL', color: '#8B5CF6', source: 'MEMORY.md', context: 'Communication platform for OpenClaw' },
    
    // Insights
    { id: 'INSIGHT:memory-gaps', name: 'Memory Gaps', type: 'INSIGHT', color: '#EF4444', source: 'sessions', context: 'Knowledge discontinuity problem solved with architecture' },
    { id: 'INSIGHT:semantic-search', name: 'Semantic Search', type: 'INSIGHT', color: '#EF4444', source: 'sessions', context: 'Embeddings-based search superior to keywords' },
    { id: 'INSIGHT:openai-patterns', name: 'OpenAI Patterns', type: 'INSIGHT', color: '#EF4444', source: 'memory/2026-02-24.md', context: 'Game-changing skill development patterns' },
    
    // Decisions
    { id: 'DECISION:security-hardening', name: 'Security Hardening', type: 'DECISION', color: '#F59E0B', source: 'memory/2026-02-24.md', context: 'VPS firewall and Tailscale-only SSH access' },
    { id: 'DECISION:memory-architecture', name: 'Memory Architecture', type: 'DECISION', color: '#F59E0B', source: 'sessions', context: 'Three-phase memory system implementation' },
    
    // People  
    { id: 'PERSON:brandao', name: 'Brandao', type: 'PERSON', color: '#06B6D4', source: 'USER.md', context: 'Lead software engineer, marathon runner, Brazil-based' },
  ],
  edges: [
    // Project → Technology relationships
    { from: 'PROJECT:elite-pulse', to: 'TECH:nextjs', type: 'USES_TECH', strength: 0.9 },
    { from: 'PROJECT:elite-pulse', to: 'TECH:typescript', type: 'USES_TECH', strength: 0.8 },
    { from: 'PROJECT:elite-pulse', to: 'TECH:go', type: 'USES_TECH', strength: 0.8 },
    { from: 'PROJECT:elite-pulse', to: 'TECH:firebase', type: 'USES_TECH', strength: 0.7 },
    { from: 'PROJECT:elite-pulse', to: 'TECH:gcp', type: 'USES_TECH', strength: 0.7 },
    
    { from: 'PROJECT:x-growth', to: 'TECH:nextjs', type: 'USES_TECH', strength: 0.6 },
    { from: 'PROJECT:openclaw', to: 'TECH:go', type: 'USES_TECH', strength: 0.8 },
    { from: 'PROJECT:openclaw', to: 'TECH:gcp', type: 'USES_TECH', strength: 0.9 },
    
    { from: 'PROJECT:product-builder', to: 'TECH:nextjs', type: 'USES_TECH', strength: 0.9 },
    { from: 'PROJECT:product-builder', to: 'TECH:typescript', type: 'USES_TECH', strength: 0.9 },
    { from: 'PROJECT:product-builder', to: 'TECH:tailwind', type: 'USES_TECH', strength: 0.8 },
    
    // Technology combinations
    { from: 'TECH:nextjs', to: 'TECH:typescript', type: 'COMBINED_WITH', strength: 0.9 },
    { from: 'TECH:nextjs', to: 'TECH:tailwind', type: 'COMBINED_WITH', strength: 0.8 },
    { from: 'TECH:nextjs', to: 'TECH:react', type: 'COMBINED_WITH', strength: 1.0 },
    
    // Tool relationships
    { from: 'TOOL:cursor', to: 'PROJECT:elite-pulse', type: 'TOOL_FOR', strength: 0.8 },
    { from: 'TOOL:cursor', to: 'PROJECT:openclaw', type: 'TOOL_FOR', strength: 0.9 },
    { from: 'TOOL:telegram', to: 'PROJECT:openclaw', type: 'TOOL_FOR', strength: 0.9 },
    
    // Insights and decisions
    { from: 'INSIGHT:memory-gaps', to: 'DECISION:memory-architecture', type: 'LEADS_TO', strength: 0.9 },
    { from: 'DECISION:memory-architecture', to: 'PROJECT:openclaw', type: 'AFFECTS_PROJECT', strength: 0.8 },
    { from: 'INSIGHT:openai-patterns', to: 'PROJECT:product-builder', type: 'INFLUENCES', strength: 0.8 },
    { from: 'DECISION:security-hardening', to: 'PROJECT:openclaw', type: 'AFFECTS_PROJECT', strength: 0.9 },
    
    // Person relationships
    { from: 'PERSON:brandao', to: 'PROJECT:elite-pulse', type: 'OWNS', strength: 1.0 },
    { from: 'PERSON:brandao', to: 'PROJECT:x-growth', type: 'OWNS', strength: 1.0 },
    { from: 'PERSON:brandao', to: 'PROJECT:openclaw', type: 'OWNS', strength: 1.0 },
    { from: 'PERSON:brandao', to: 'TOOL:cursor', type: 'USES', strength: 0.9 },
    { from: 'PERSON:brandao', to: 'TOOL:warp', type: 'USES', strength: 0.7 },
  ]
}

export function GraphVisualization() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [data] = useState<GraphData>(fullGraphData)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const container = svgRef.current.parentElement
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    // Clear previous content
    svg.selectAll('*').remove()

    // Set up SVG
    svg.attr('width', width).attr('height', height)

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom)

    // Create main group for zooming
    const g = svg.append('g')

    // Create simulation
    const simulation = d3.forceSimulation(data.nodes as any)
      .force('link', d3.forceLink(data.edges).id((d: any) => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(25))

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(data.edges)
      .join('line')
      .attr('stroke', '#666')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d) => Math.sqrt(d.strength * 3))
      .attr('marker-end', 'url(#arrowhead)')

    // Create arrowhead marker
    g.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#666')
      .style('stroke', 'none')

    // Create nodes
    const node = g.append('g')
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', (d) => d.type === 'PROJECT' ? 12 : d.type === 'PERSON' ? 10 : 8)
      .attr('fill', (d) => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        setSelectedNode(d)
        event.stopPropagation()
      })
      .on('mouseover', function(event, d) {
        d3.select(this).attr('stroke-width', 3)
        
        // Show tooltip
        const tooltip = d3.select('body')
          .append('div')
          .attr('class', 'graph-tooltip')
          .style('opacity', 0)
          .style('position', 'absolute')
          .style('background', 'rgba(0,0,0,0.8)')
          .style('color', 'white')
          .style('padding', '8px')
          .style('border-radius', '4px')
          .style('font-size', '12px')
          .style('pointer-events', 'none')
          .style('z-index', '1000')

        tooltip.transition()
          .duration(200)
          .style('opacity', .9)
          
        tooltip.html(`
          <strong>${d.name}</strong><br/>
          Type: ${d.type}<br/>
          ${d.context.slice(0, 100)}...
        `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px')
      })
      .on('mouseout', function() {
        d3.select(this).attr('stroke-width', 2)
        d3.selectAll('.graph-tooltip').remove()
      })

    // Add labels
    const label = g.append('g')
      .selectAll('text')
      .data(data.nodes)
      .join('text')
      .text((d) => d.name)
      .attr('font-size', '11px')
      .attr('dx', 15)
      .attr('dy', 4)
      .attr('fill', 'currentColor')
      .style('pointer-events', 'none')

    // Add drag behavior
    const drag = d3.drag<SVGCircleElement, GraphNode>()
      .on('start', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      })
      .on('drag', (event, d: any) => {
        d.fx = event.x
        d.fy = event.y
      })
      .on('end', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      })

    node.call(drag as any)

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y)

      label
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y)
    })

    // Initial zoom to fit content
    const bbox = g.node()?.getBBox()
    if (bbox) {
      const scale = Math.min(width / bbox.width, height / bbox.height) * 0.8
      const translateX = (width - bbox.width * scale) / 2 - bbox.x * scale
      const translateY = (height - bbox.height * scale) / 2 - bbox.y * scale
      
      svg.call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(scale))
    }

    return () => {
      simulation.stop()
      d3.selectAll('.graph-tooltip').remove()
    }
  }, [data])

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ background: 'transparent' }}
      />
      
      {/* Node Details Panel */}
      {selectedNode && (
        <div className="absolute top-4 right-4 w-80 bg-background border border-border rounded-lg shadow-lg p-4 z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">{selectedNode.name}</h3>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: selectedNode.color }}
              />
              <span className="text-sm font-medium">{selectedNode.type}</span>
            </div>
            
            <div>
              <div className="text-xs text-muted-foreground mb-1">Context</div>
              <p className="text-sm">{selectedNode.context}</p>
            </div>
            
            <div>
              <div className="text-xs text-muted-foreground mb-1">Source</div>
              <p className="text-sm font-mono">{selectedNode.source}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
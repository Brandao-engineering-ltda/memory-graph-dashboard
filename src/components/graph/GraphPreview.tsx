'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const nodes = [
  { id: '1', name: 'Elite Pulse', group: 'PROJECT', color: '#4F46E5' },
  { id: '2', name: 'Next.js', group: 'TECH', color: '#10B981' },
  { id: '3', name: 'TypeScript', group: 'TECH', color: '#10B981' },
  { id: '4', name: 'Go', group: 'TECH', color: '#10B981' },
  { id: '5', name: 'Firebase', group: 'TECH', color: '#10B981' },
  { id: '6', name: 'X Growth', group: 'PROJECT', color: '#4F46E5' },
  { id: '7', name: 'OpenClaw', group: 'PROJECT', color: '#4F46E5' },
  { id: '8', name: 'Cursor', group: 'TOOL', color: '#8B5CF6' },
]

const links = [
  { source: '1', target: '2', value: 1 },
  { source: '1', target: '3', value: 1 },
  { source: '1', target: '4', value: 1 },
  { source: '1', target: '5', value: 1 },
  { source: '6', target: '2', value: 1 },
  { source: '7', target: '4', value: 1 },
  { source: '7', target: '8', value: 1 },
  { source: '2', target: '3', value: 1 },
]

export function GraphPreview() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = 400
    const height = 300

    svg.selectAll('*').remove()

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(80).strength(0.5))
      .force('charge', d3.forceManyBody().strength(-150))
      .force('center', d3.forceCenter(width / 2, height / 2))

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#666')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1.5)

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))

    const circles = node.append('circle')
      .attr('r', 8)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)

    const labels = node.append('text')
      .text(d => d.name)
      .attr('font-size', '11px')
      .attr('dx', 12)
      .attr('dy', 4)
      .attr('fill', '#fff')
      .attr('pointer-events', 'none')

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

      node
        .attr('transform', d => `translate(${d.x},${d.y})`)
    })

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }

    return () => {
      simulation.stop()
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-900/50 rounded-lg border border-slate-800">
      <svg
        ref={svgRef}
        width={400}
        height={300}
        viewBox="0 0 400 300"
        className="w-full h-64"
      />
      <div className="absolute text-xs text-slate-500 text-center">
        Drag nodes to explore • Hover for details
      </div>
    </div>
  )
}
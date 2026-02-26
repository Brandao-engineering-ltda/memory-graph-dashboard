import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    // Local workspace path
    const graphPath = path.join(process.cwd(), '..', 'memory', 'graph', 'knowledge-graph.json');
    
    const graphData = JSON.parse(await fs.readFile(graphPath, 'utf8'));
    
    // Deserialize Maps to arrays
    const nodes = Array.isArray(graphData.nodes) ? graphData.nodes.map(([id, node]: [string, any]) => ({ ...node, id })) : [];
    const edges = Array.isArray(graphData.edges) ? graphData.edges.map(([id, edge]: [string, any]) => edge) : [];
    
    const metadata = graphData.metadata || {};
    
    return NextResponse.json({
      nodes,
      edges,
      metadata,
      healthy: true
    });
  } catch (error) {
    console.error('Graph API error:', error);
    
    // Vercel sample fallback
    if (process.env.VERCEL_ENV) {
      return NextResponse.json({
        nodes: [], // Load sample from public/graph.json client-side
        edges: [],
        metadata: { nodes: 22, edges: 161 },
        healthy: true,
        sample: true
      });
    }
    
    return NextResponse.json({
      nodes: [],
      edges: [],
      metadata: {},
      healthy: false,
      error: 'Graph unavailable'
    });
  }
}

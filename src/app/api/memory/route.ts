import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { config, getMemoryScriptPath, getKnowledgeGraphPath } from '@/lib/config';
import path from 'path';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export async function GET() {
  try {
    // Try to get real data from knowledge graph script
    const memoryPath = config.memoryDataPath;
    const scriptPath = path.join(memoryPath, 'get-stats.js');
    
    // Check if script exists and run it
    try {
      await fs.access(scriptPath);
      const { stdout } = await execAsync(`cd "${memoryPath}" && node get-stats.js`);
      const data = JSON.parse(stdout.trim());
      
      return NextResponse.json({
        entities: data.totalNodes || 0,
        relationships: data.totalEdges || 0,
        projects: data.nodesByType?.PROJECT || 0,
        technologies: data.nodesByType?.TECH || 0,
        tools: data.nodesByType?.TOOL || 0,
        insights: data.nodesByType?.INSIGHT || 0,
        decisions: data.nodesByType?.DECISION || 0,
        people: data.nodesByType?.PERSON || 0,
        lastUpdate: data.lastUpdate || new Date().toISOString(),
        healthy: true
      });
    } catch (scriptError) {
      // If script doesn't exist, try to read graph file directly
      const graphPath = getKnowledgeGraphPath();
      try {
        const graphData = JSON.parse(await fs.readFile(graphPath, 'utf-8'));
        const nodes = graphData.nodes || [];
        const edges = graphData.edges || [];
        
        // Count nodes by type
        const nodesByType: Record<string, number> = {};
        nodes.forEach((node: any) => {
          nodesByType[node.type] = (nodesByType[node.type] || 0) + 1;
        });
        
        return NextResponse.json({
          entities: nodes.length || 0,
          relationships: edges.length || 0,
          projects: nodesByType.PROJECT || 0,
          technologies: nodesByType.TECH || 0,
          tools: nodesByType.TOOL || 0,
          insights: nodesByType.INSIGHT || 0,
          decisions: nodesByType.DECISION || 0,
          people: nodesByType.PERSON || 0,
          lastUpdate: graphData.metadata?.lastUpdate || new Date().toISOString(),
          healthy: true
        });
      } catch (graphError) {
        throw new Error(`Cannot access memory data: ${scriptError.message} | ${graphError.message}`);
      }
    }
    
  } catch (error) {
    // Production-safe error logging
    if (process.env.NODE_ENV === 'development') {
      console.error('Memory API error:', error);
    }
    
    // Fallback to demo values for fresh installations
    return NextResponse.json({
      entities: 0,
      relationships: 0,
      projects: 0,
      technologies: 0,
      tools: 0,
      insights: 0,
      decisions: 0,
      people: 0,
      lastUpdate: new Date().toISOString(),
      healthy: false,
      error: 'Memory data not available. Please configure MEMORY_DATA_PATH.',
      configPath: config.memoryDataPath
    });
  }
}
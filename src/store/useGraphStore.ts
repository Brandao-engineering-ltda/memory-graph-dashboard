import { create } from 'zustand';
import type { Node, Edge } from '@/lib/graph-types';

interface GraphState {
  nodes: Node[];
  edges: Edge[];
  metadata: {
    nodes: number;
    edges: number;
    updated: string;
  };
  loading: boolean;
  error: string | null;
  setGraphData: (nodes: Node[], edges: Edge[], metadata: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useGraphStore = create<GraphState>((set) => ({
  nodes: [],
  edges: [],
  metadata: { nodes: 0, edges: 0, updated: '' },
  loading: true,
  error: null,
  setGraphData: (nodes, edges, metadata) => set({ nodes, edges, metadata, loading: false }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

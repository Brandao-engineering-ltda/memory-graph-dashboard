import { useEffect } from 'react';
import { useGraphStore } from '@/store/useGraphStore';

export function useGraphData() {
  const { setGraphData, setLoading, setError } = useGraphStore();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetch('/api/memory');
        if (!res.ok) throw new Error('Failed to fetch graph data');
        const data = await res.json();
        setGraphData(data.nodes || [], data.edges || [], data.metadata || {});
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [setGraphData, setLoading, setError]);

  return useGraphStore();
}

# Memory Graph Dashboard - Architecture

## Project Overview
Interactive web dashboard for visualizing and exploring Brandao's knowledge graph memory architecture. Shows entities, relationships, and memory insights in real-time.

## Core Features
1. **Graph Visualization**
   - Interactive network graph (nodes + edges)
   - Entity type filtering (PROJECT, TECH, TOOL, INSIGHT, DECISION, PERSON)
   - Zoom, pan, search, and cluster controls

2. **Search & Query Interface**
   - Semantic search with graph context
   - Entity-specific deep-dive views
   - Relationship path exploration

3. **Memory Analytics**
   - Memory health dashboard
   - Entity count trends over time
   - Relationship strength heatmaps
   - Recent session summaries

4. **Data Integration**
   - Real-time graph data loading from memory/graph/
   - Session capture integration
   - Search result overlays

## User Flow
```
Landing → Graph View → [Search/Filter] → Entity Details → Related Concepts
       ↓
   Analytics Dashboard → Memory Health → Session History
```

## Component Architecture

### Frontend (Next.js + TypeScript + Tailwind + shadcn/ui)
```
src/
├── app/                        # Next.js 14 App Router
│   ├── page.tsx               # Landing - graph overview
│   ├── graph/page.tsx         # Main graph visualization
│   ├── search/page.tsx        # Search interface
│   ├── analytics/page.tsx     # Memory analytics
│   └── api/                   # API routes
├── components/
│   ├── graph/
│   │   ├── GraphVisualization.tsx    # Main graph component
│   │   ├── NodeDetails.tsx           # Entity popup/panel
│   │   └── GraphControls.tsx         # Filters, search, zoom
│   ├── search/
│   │   ├── SearchInterface.tsx       # Semantic search
│   │   └── ResultsPanel.tsx          # Search results + graph context
│   ├── analytics/
│   │   ├── MemoryHealth.tsx          # System health
│   │   ├── EntityTrends.tsx          # Growth charts
│   │   └── SessionSummary.tsx        # Recent activity
│   └── ui/                           # shadcn/ui components
├── lib/
│   ├── graph-api.ts                  # Graph data loading
│   ├── memory-integration.ts         # Memory system API
│   └── graph-algorithms.ts           # Graph analysis utils
└── styles/
    └── globals.css                   # Tailwind + custom graph styles
```

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Graph Viz:** D3.js or vis.js (interactive network graphs)
- **Data Source:** Local file system (memory/graph/ directory)
- **State:** Zustand (graph state, search state)
- **Deployment:** Vercel (static/SSG, no backend needed)

## Data Flow
1. Dashboard loads → Reads memory/graph/knowledge-graph.json
2. User searches → Calls memory/integrated-memory.js via API route
3. Graph updates → Live reload on file system changes
4. Analytics → Parse session files + graph metadata

## Key Libraries
```json
{
  "d3": "^7.8.0",                    // Graph visualization
  "vis-network": "^9.1.6",          // Alternative graph lib
  "@types/d3": "^7.4.0",           // D3 TypeScript support
  "zustand": "^4.4.0",             // State management
  "lucide-react": "^0.290.0",      // Icons
  "recharts": "^2.8.0"             // Analytics charts
}
```

## MVP Features (Phase 1)
- [ ] Interactive graph visualization with node/edge rendering
- [ ] Entity filtering by type (PROJECT, TECH, etc.)
- [ ] Basic search with result highlighting
- [ ] Node details panel on click
- [ ] Responsive design (mobile-friendly)

## Advanced Features (Phase 2)  
- [ ] Semantic search integration
- [ ] Real-time graph updates
- [ ] Memory analytics dashboard
- [ ] Session capture timeline
- [ ] Graph export/sharing

## Success Metrics
- Graph loads in <2 seconds
- Smooth interaction (60fps pan/zoom)
- Search results in <500ms
- Responsive on mobile devices
- Beautiful, intuitive UX that makes memory exploration delightful

## File Structure
```
memory-graph-dashboard/
├── package.json
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
├── src/                    # App code
├── public/                 # Static assets
└── README.md              # Setup instructions
```

Next: Generate the frontend with interactive graph visualization.
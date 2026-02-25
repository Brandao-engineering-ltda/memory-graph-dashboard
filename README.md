# 🧠 AI Memory Graph Dashboard

An intelligent memory visualization system that maps knowledge entities and their relationships using semantic analysis and interactive graph visualization.

![Memory Graph Dashboard](./public/dashboard-preview.png)

![Uploading Screenshot 2026-02-24 at 15.21.47.png…]()

## 🚀 Features

### 📊 Interactive Knowledge Graph
- **Entity Mapping**: Automatically extracts and categorizes entities (Projects, Technologies, Tools, Insights, People)
- **Relationship Analysis**: Maps semantic connections between memories
- **Interactive Visualization**: Drag, zoom, and explore your knowledge network
- **Real-time Updates**: Live graph updates with new memory additions

### 🔍 Semantic Search
- **AI-Powered Search**: Natural language queries across your entire knowledge base
- **Contextual Understanding**: Finds relevant information beyond keyword matching
- **Multi-source Analysis**: Searches across memory files, session logs, and structured data

### 📈 Analytics & Insights
- **Growth Tracking**: Monitor knowledge expansion over time
- **Entity Distribution**: Visualize knowledge areas and gaps
- **Relationship Matrix**: Understand connection patterns
- **AI Recommendations**: Get insights on knowledge architecture

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful, modern interface with blur effects
- **Dark Theme**: Optimized for extended use
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Fluid transitions and interactions

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Lucide Icons  
- **Visualization**: D3.js, Custom Graph Engine
- **Memory Engine**: Node.js semantic analysis
- **Analytics**: Custom metrics and insights system

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/fwbrandao/memory-graph-dashboard.git
cd memory-graph-dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev

# Or build for production
npm run build
npm start
```

## 🔧 Configuration

Create a `.env.local` file with:

```env
# Memory data directory (absolute path to your memory files)
MEMORY_DATA_PATH=/path/to/your/memory/files

# Optional: Custom memory file patterns
MEMORY_FILE_PATTERNS=*.md,*.txt

# Optional: Graph update intervals
GRAPH_REBUILD_INTERVAL=300000

# Optional: Search configuration  
SEARCH_MAX_RESULTS=50
```

## 📁 Memory File Structure

The dashboard expects memory files in this structure:

```
memory/
├── MEMORY.md                    # Main memory file
├── 2026-01-15.md               # Daily memory logs
├── 2026-01-16.md
└── graph/
    └── knowledge-graph.json    # Generated graph data
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode  
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test suites
npm run test:components
npm run test:integration
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
npx vercel

# Or connect your GitHub repo to Vercel dashboard
```

### Docker
```bash
# Build Docker image
docker build -t memory-graph-dashboard .

# Run container
docker run -p 3000:3000 -v /path/to/memory:/app/memory memory-graph-dashboard
```

### Self-Hosted
```bash
# Build production version
npm run build

# Start production server
npm start

# Or use PM2 for process management
pm2 start npm --name "memory-graph" -- start
```

## 🔌 API Endpoints

- `GET /api/memory` - Get memory statistics and health
- `GET /api/graph` - Retrieve knowledge graph data
- `POST /api/search` - Perform semantic search
- `GET /api/analytics` - Get analytics and insights data

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📚 Documentation

- [Architecture Overview](./docs/architecture.md)
- [Memory System Design](./docs/memory-system.md)
- [Graph Algorithms](./docs/graph-algorithms.md)
- [Component API](./docs/components.md)

## 🐛 Troubleshooting

### Common Issues

**Dashboard not loading memory data**
- Verify `MEMORY_DATA_PATH` is correct in `.env.local`
- Check file permissions on memory directory
- Run `npm run rebuild-graph` to regenerate graph data

**Graph visualization not displaying**
- Ensure D3.js dependencies are installed
- Check browser console for JavaScript errors
- Verify memory graph JSON is valid

**Search not returning results**  
- Check if memory files contain searchable content
- Verify semantic search index is built
- Try rebuilding search index: `npm run rebuild-search`

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with love for AI-powered personal knowledge management
- Inspired by the need for intelligent memory systems
- Thanks to the OpenClaw community for testing and feedback

## 🔗 Links

- [Live Demo](https://memory-graph.demo.com) 
- [Documentation](https://docs.memory-graph.com)
- [OpenClaw Project](https://github.com/openclaw/openclaw)
- [Author: @fwbrand_](https://twitter.com/fwbrand_)

---

**Made with ⚡ for better thinking and memory augmentation**

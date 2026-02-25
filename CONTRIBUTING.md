# Contributing to Memory Graph Dashboard

Thank you for your interest in contributing to the Memory Graph Dashboard! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- Basic knowledge of React, TypeScript, and Next.js

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/memory-graph-dashboard.git
   cd memory-graph-dashboard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your local memory path
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🎯 How to Contribute

### Types of Contributions We Welcome

- **🐛 Bug Fixes**: Report or fix issues
- **✨ Feature Enhancements**: New visualization modes, search improvements
- **📚 Documentation**: Improve README, add examples, write tutorials
- **🧪 Testing**: Add unit tests, integration tests, or e2e tests
- **🎨 UI/UX**: Design improvements, accessibility enhancements
- **⚡ Performance**: Optimization suggestions or implementations

### Before You Start

1. **Check Existing Issues**: Look for related issues or feature requests
2. **Create an Issue**: If none exists, create one describing your contribution
3. **Discuss**: For major changes, discuss the approach first

## 📝 Development Guidelines

### Code Style

- **TypeScript**: All new code should be in TypeScript
- **ESLint**: Follow existing ESLint configuration
- **Prettier**: Use consistent formatting
- **Naming**: Use descriptive, camelCase variable names
- **Components**: Functional components with hooks

```typescript
// Good component structure
interface ComponentProps {
  title: string
  data: GraphData
  onUpdate?: (data: GraphData) => void
}

export function MyComponent({ title, data, onUpdate }: ComponentProps) {
  // Component implementation
}
```

### File Organization

```
src/
├── app/                    # Next.js app router pages
├── components/             # Reusable UI components
│   ├── ui/                # Basic UI primitives
│   ├── graph/             # Graph-specific components
│   ├── search/            # Search-related components
│   └── analytics/         # Analytics components
├── lib/                   # Utility functions and types
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript type definitions
```

### Testing Requirements

- **Unit Tests**: All new components should have tests
- **Integration Tests**: Test component interactions
- **Test Location**: Tests should be adjacent to components (`component.test.tsx`)

```typescript
// Example test structure
import { render, screen, fireEvent } from '@testing-library/react'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" data={mockData} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('handles user interactions', () => {
    const onUpdate = jest.fn()
    render(<MyComponent title="Test" data={mockData} onUpdate={onUpdate} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onUpdate).toHaveBeenCalled()
  })
})
```

## 🔄 Pull Request Process

### 1. Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes  
- `docs/description` - Documentation updates
- `test/description` - Test additions

### 2. Commit Messages
Follow conventional commit format:
```
type(scope): description

body (optional)

footer (optional)
```

Examples:
- `feat(graph): add node filtering capabilities`
- `fix(search): resolve empty query handling`
- `docs(readme): update installation instructions`

### 3. Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature  
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] All tests pass

## Screenshots (if UI changes)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Added comments for complex logic
- [ ] Updated documentation
```

### 4. Review Process
- **Automated Checks**: Ensure CI passes
- **Code Review**: At least one maintainer approval
- **Testing**: Manual testing for UI changes
- **Documentation**: Update if needed

## 🧪 Testing

### Running Tests
```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Specific test
npm test -- ComponentName
```

### Test Categories
- **Unit**: Individual component functionality
- **Integration**: Component interactions
- **E2E**: Full user workflows (coming soon)

## 🐛 Bug Reports

### Good Bug Report Includes:
- **Clear Title**: Concise description
- **Steps to Reproduce**: Detailed steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, browser, Node.js version
- **Screenshots**: If visual issue

### Bug Report Template:
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. macOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
```

## 💡 Feature Requests

### Good Feature Request Includes:
- **Problem Statement**: What problem does this solve?
- **Proposed Solution**: How would you implement it?
- **Alternatives**: Other approaches considered?
- **Additional Context**: Screenshots, mockups, references

## 📚 Documentation

### Documentation Types:
- **Code Comments**: For complex logic
- **README Updates**: For new features/setup
- **Component Docs**: Props and usage examples
- **Architecture Docs**: Design decisions

## 🏷️ Release Process

1. **Version Bump**: Follow semantic versioning
2. **Changelog**: Update CHANGELOG.md
3. **Tag**: Create git tag
4. **Release**: GitHub release with notes

## ❓ Getting Help

- **Discord**: Join our Discord server
- **Issues**: Create a GitHub issue
- **Email**: contributor@memorygraph.com

## 🎉 Recognition

Contributors are recognized in:
- **README**: Contributors section
- **Releases**: Release notes
- **Discord**: Contributor role

## 📋 Code of Conduct

Please note that this project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to abide by its terms.

---

Thank you for contributing to making memory augmentation better for everyone! 🚀
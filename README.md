# 🏛️ Constitution AI Assistant - Frontend

A modern, ChatGPT-style web interface for constitutional law queries, built with Next.js 15, TypeScript, and Tailwind CSS. Features beautiful UI components from Shadcn/ui and Aceternity UI.

## 🚀 Features

### User Interface
- **ChatGPT-Style Interface**: Clean, modern chat experience
- **Animated Input**: Aceternity's placeholders-and-vanish-input component
- **Document Management**: Add/remove custom document sources
- **Source Attribution**: See which documents were used for responses
- **Responsive Design**: Works perfectly on desktop and mobile
- **Dark/Light Mode**: Automatic theme switching

### Technical Features
- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Full type safety and developer experience
- **Tailwind CSS**: Utility-first styling with custom design system
- **Shadcn/ui**: High-quality, accessible UI components
- **Real-time Chat**: Instant messaging with loading states
- **Document Validation**: URL validation and accessibility checks

## 📋 Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js App   │    │   UI Components  │    │   API Client    │
│   Router         │◄──►│   & Styling      │◄──►│   & State Mgmt  │
│                 │    │                  │    │                 │
│ • App Router    │    │ • Shadcn/ui      │    │ • Fetch API     │
│ • TypeScript    │    │ • Aceternity     │    │ • React State   │
│ • SSR/SSG       │    │ • Tailwind CSS   │    │ • Error Handling│
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Chat System   │    │   Document       │    │   Backend       │
│                 │    │   Management     │    │   Integration   │
│ • Message Store │    │                  │    │                 │
│ • Loading States│    │ • URL Validation │    │ • Constitution  │
│ • Source Display│    │ • Multi-Document │    │   RAG API       │
│ • Real-time UI  │    │ • Source Tracking│    │ • Railway Deploy│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Constitution RAG Backend (running)

### Setup

1. **Clone Repository**
```bash
git clone <repository-url>
cd constitution-ui
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Configuration**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

Required environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Constitution AI Assistant
```

4. **Run Development Server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🎨 UI Components

### Core Components
- **PlaceholdersAndVanishInput**: Animated input with rotating placeholders
- **Chat Interface**: Message bubbles with timestamps and source attribution
- **Document Manager**: Add/remove document sources with validation
- **Loading States**: Elegant typing indicators and loading animations

### Component Structure
```
src/
├── app/
│   ├── page.tsx              # Main chat interface
│   ├── layout.tsx            # Root layout with providers
│   └── globals.css           # Global styles and CSS variables
├── components/
│   └── ui/                   # Shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── scroll-area.tsx
│       └── placeholders-and-vanish-input.tsx
└── lib/
    └── utils.ts              # Utility functions and helpers
```

## 📡 API Integration

### Backend Communication
```typescript
// Query the Constitution RAG API
const response = await fetch(`${API_URL}/api/v1/query`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    questions: [userQuestion],
    documents: selectedDocumentUrl
  }),
})
```

### State Management
```typescript
interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  sources?: string[]  // Document sources used
}

const [messages, setMessages] = useState<Message[]>([])
const [customDocuments, setCustomDocuments] = useState<string[]>([])
```

## 🎯 Key Features

### Document Management
- **Add Documents**: Users can add custom PDF/document URLs
- **URL Validation**: Client-side validation for proper URL format
- **Source Tracking**: Each response shows which documents were consulted
- **Multi-Document Support**: Query across multiple document sources

### Chat Experience
- **Real-time Messaging**: Instant chat with constitutional AI
- **Loading Indicators**: Animated typing bubbles during processing
- **Message History**: Full conversation persistence during session
- **Source Attribution**: Clear indication of document sources used

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Desktop Enhanced**: Rich experience on larger screens
- **Accessibility**: WCAG compliant with keyboard navigation
- **Performance**: Optimized loading and smooth animations

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Prepare for Vercel**
```bash
# Vercel auto-detects Next.js projects
# Ensure environment variables are set
```

2. **Environment Variables**
Set in Vercel dashboard:
- `NEXT_PUBLIC_API_URL`: Your deployed backend URL
- `NEXT_PUBLIC_APP_NAME`: Application name

3. **Deploy**
```bash
# Via Vercel CLI
vercel

# Or connect GitHub repository in Vercel dashboard
```

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Constitution AI Assistant` |

### Customization

**Styling:**
- Modify `src/app/globals.css` for global styles
- Update `tailwind.config.js` for theme customization
- Edit component styles in individual component files

**Features:**
- Add new UI components in `src/components/ui/`
- Extend message types in the interface definitions
- Customize chat behavior in `src/app/page.tsx`

## 🧪 Development

### Code Structure
```
constitution-ui/
├── src/
│   ├── app/                # Next.js App Router
│   ├── components/         # React components
│   └── lib/               # Utilities and helpers
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

### Development Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Adding New Features

1. **New UI Components**
```bash
# Add Shadcn/ui components
npx shadcn@latest add [component-name]
```

2. **Custom Components**
```typescript
// Create in src/components/
export function CustomComponent() {
  return <div>Your component</div>
}
```

3. **API Integration**
```typescript
// Extend API calls in src/app/page.tsx
const newApiCall = async () => {
  // Implementation
}
```

## 🎨 Design System

### Colors
- **Primary**: Constitutional blue theme
- **Secondary**: Neutral grays for text and backgrounds
- **Accent**: Subtle highlights for interactive elements

### Typography
- **Headings**: Geist Sans font family
- **Body**: System font stack for optimal readability
- **Code**: Geist Mono for technical content

### Spacing
- **Consistent Scale**: 4px base unit with 8px, 16px, 24px, 32px increments
- **Component Padding**: Standardized across all UI elements
- **Layout Margins**: Responsive spacing for different screen sizes

## 🧪 Testing

### Manual Testing
```bash
# Test chat functionality
1. Start development server
2. Open http://localhost:3000
3. Try various constitutional questions
4. Test document management features
```

### Component Testing
```bash
# Test individual components
npm run test
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain component modularity
- Write descriptive commit messages
- Test on multiple screen sizes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section below

### Troubleshooting

**Common Issues:**

1. **"Cannot connect to backend" error**
   - Verify NEXT_PUBLIC_API_URL is correct
   - Ensure backend is running
   - Check CORS configuration

2. **Styling issues**
   - Clear browser cache
   - Verify Tailwind CSS is properly configured
   - Check for CSS conflicts

3. **Build errors**
   - Run `npm run type-check` for TypeScript errors
   - Verify all dependencies are installed
   - Check Next.js version compatibility

---

Built with ❤️ for constitutional law education and research.

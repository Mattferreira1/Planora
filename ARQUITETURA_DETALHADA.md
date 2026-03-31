# Planora - Arquitetura e Decisões Técnicas

## 🏗️ Arquitetura em Camadas

```
╔══════════════════════════════════════════════════════════════╗
║                    CLIENT LAYER                             ║
║                   (Next.js Frontend)                        ║
║                                                             ║
║  ┌────────────────────────────────────────────────────┐    ║
║  │ React Components (TSX)                             │    ║
║  │ - Dashboard Page                                   │    ║
║  │ - Login/Register Pages                             │    ║
║  │ - Preview Mocked Dashboard                         │    ║
║  └────────────────────────────────────────────────────┘    ║
║                        ↓                                    ║
║  ┌────────────────────────────────────────────────────┐    ║
║  │ UI Libraries                                       │    ║
║  │ - Tailwind CSS 4 (Styling)                         │    ║
║  │ - Framer Motion (Animations)                       │    ║
║  │ - Lucide React (Icons)                             │    ║
║  └────────────────────────────────────────────────────┘    ║
║                        ↓                                    ║
║  ┌────────────────────────────────────────────────────┐    ║
║  │ State Management                                   │    ║
║  │ - React Hooks (useState, useEffect)                │    ║
║  │ - localStorage (Client-side persistence)           │    ║
║  └────────────────────────────────────────────────────┘    ║
╚══════════════════════════════════════════════════════════════╝
                          ↓ HTTP/REST
╔══════════════════════════════════════════════════════════════╗
║                    API LAYER                                ║
║                 (Next.js API Routes)                        ║
║                                                             ║
║  ┌────────────────────────────────────────────────────┐    ║
║  │ Route Handlers (./app/api/*)                       │    ║
║  │ - POST /api/goal    → Generate study plans         │    ║
║  │ - GET  /api/users   → List users                   │    ║
║  │ - GET  /api/health  → Health check                 │    ║
║  └────────────────────────────────────────────────────┘    ║
║                        ↓                                    ║
║  ┌────────────────────────────────────────────────────┐    ║
║  │ Middleware & Utilities                             │    ║
║  │ - Zod validation (Input sanitization)              │    ║
║  │ - Error handling                                   │    ║
║  │ - JSON parsing                                     │    ║
║  └────────────────────────────────────────────────────┘    ║
╚══════════════════════════════════════════════════════════════╝
       ↓ SDK Call          ↓ Query/Mutation        ↓ Health
   ┌───────────────┐  ┌──────────────────┐  ┌──────────────┐
   │   AI LAYER    │  │  DATA LAYER      │  │  EXTERNAL    │
   │               │  │                  │  │  SERVICES    │
   │ Google Gemini │  │  Prisma ORM      │  │              │
   │ API           │  │  PostgreSQL      │  │  (Monitoring)│
   │               │  │                  │  │              │
   └───────────────┘  └──────────────────┘  └──────────────┘
```

---

## 🔀 Fluxo de Requisição Detalhado

### 1️⃣ Geração de Plano de Estudos

```
┌─────────────────────────────────────────────────────────────────┐
│ BROWSER (Client)                                                │
│                                                                 │
│  User digita: "Aprender Node.js em 4 semanas, sou intermediário"│
│  Clica em: "Gerar Plano"                                        │
│                                                                 │
│  ↓ handleGeneratePlan()                                         │
│                                                                 │
│  ↓ setIsGenerating(true)                                        │
│                                                                 │
│  ↓ fetch("/api/goal", {                                         │
│      method: "POST",                                             │
│      headers: { "Content-Type": "application/json" },           │
│      body: JSON.stringify({ prompt: userInput })                │
│    })                                                            │
└─────────────────────────────────────┬───────────────────────────┘
                                      │ HTTP POST
                                      ↓
┌─────────────────────────────────────────────────────────────────┐
│ SERVER (API Route: /api/goal)                                   │
│                                                                 │
│  ↓ export async function POST(request: Request)                 │
│                                                                 │
│  ↓ const { prompt } = await request.json()                      │
│                                                                 │
│  ↓ Validação: if (!prompt) return error 400                     │
│                                                                 │
│  ↓ Chama: GeminiAI.models.generateContent({                     │
│      model: "gemini-3-flash-preview",                           │
│      contents: `Você é um TECH LEAD...                          │
│                ${prompt}`                                       │
│    })                                                            │
└─────────────────────────────────────┬───────────────────────────┘
                                      │ SDK Call (HTTP)
                                      ↓
┌─────────────────────────────────────────────────────────────────┐
│ GOOGLE CLOUD (Gemini API)                                       │
│                                                                 │
│  Processa: prompt com contexto de TECH LEAD                    │
│  Modelo: gemini-3-flash-preview                                │
│  Latência: ~1-2 segundos                                        │
│                                                                 │
│  Retorna JSON estruturado:                                      │
│  {                                                               │
│    title: "Aprender Node.js",                                   │
│    level: "Intermediário",                                      │
│    weeks: 4,                                                    │
│    totalTasks: 12,                                              │
│    studyPlan: [...]                                             │
│  }                                                               │
└─────────────────────────────────────┬───────────────────────────┘
                                      │ JSON Response
                                      ↓
┌─────────────────────────────────────────────────────────────────┐
│ SERVER (API Route: /api/goal)                                   │
│                                                                 │
│  ↓ Return NextResponse.json(response) - Status 200              │
│                                                                 │
└─────────────────────────────────────┬───────────────────────────┘
                                      │ HTTP 200 + JSON
                                      ↓
┌─────────────────────────────────────────────────────────────────┐
│ BROWSER (Client)                                                │
│                                                                 │
│  ↓ const json = await response.json()                           │
│                                                                 │
│  ↓ setPlans(prev => [...prev, json])                            │
│                                                                 │
│  ↓ localStorage.setItem("plans", JSON.stringify([...]))         │
│                                                                 │
│  ↓ setIsGenerating(false)                                       │
│                                                                 │
│  ↓ UI Atualiza com AnimatePresence + motion.div                │
│                                                                 │
│  ✅ Novo plano aparece na tela com animação                     │
└─────────────────────────────────────────────────────────────────┘
```

### 2️⃣ Consulta de Usuários

```
Browser GET /api/users
    ↓
API Route: export async function GET()
    ↓
Prisma: prisma.user.findMany()
    ↓
Database: SELECT * FROM "User"
    ↓
Return: NextResponse.json({ users: [...] })
    ↓
Browser: Recebe array de usuários
```

---

## 🗄️ Modelo de Dados Relacional

```sql
-- TABELA: "User"
CREATE TABLE "User" (
  id        UUID PRIMARY KEY DEFAULT uuid(),
  name      VARCHAR(255),
  email     VARCHAR(255) UNIQUE NOT NULL,
  password  VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: "Goal" (Objetivo) 
CREATE TABLE "Goal" (
  id        UUID PRIMARY KEY DEFAULT uuid(),
  title     VARCHAR(255) NOT NULL,
  level     VARCHAR(50),  -- "Iniciante", "Intermediário", "Avançado"
  weeks     INTEGER,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userId    UUID REFERENCES "User"(id) ON DELETE CASCADE
);

-- TABELA: "Week" (Semana)
CREATE TABLE "Week" (
  id     UUID PRIMARY KEY DEFAULT uuid(),
  number INTEGER,
  goalId UUID REFERENCES "Goal"(id) ON DELETE CASCADE
);

-- TABELA: "Task" (Tarefa)
CREATE TABLE "Task" (
  id     UUID PRIMARY KEY DEFAULT uuid(),
  title  VARCHAR(500) NOT NULL,
  done   BOOLEAN DEFAULT false,
  order  INTEGER,
  weekId UUID REFERENCES "Week"(id) ON DELETE CASCADE
);

-- ÍNDICES (para performance)
CREATE INDEX idx_user_email ON "User"(email);
CREATE INDEX idx_goal_userId ON "Goal"(userId);
CREATE INDEX idx_week_goalId ON "Week"(goalId);
CREATE INDEX idx_task_weekId ON "Task"(weekId);
```

---

## 🔐 Fluxo de Segurança

```
┌─────────────────────────────┐
│ INPUT VALIDATION            │
├─────────────────────────────┤
│ ✓ Request format check      │
│ ✓ Content-Type header       │
│ ✓ JSON parsing              │
└──────────┬──────────────────┘
           ↓
┌─────────────────────────────┐
│ ZOD SCHEMA VALIDATION       │
├─────────────────────────────┤
│ ✓ Type checking             │
│ ✓ Required fields           │
│ ✓ Buffer overflow prevent   │
└──────────┬──────────────────┘
           ↓
┌─────────────────────────────┐
│ BUSINESS LOGIC              │
├─────────────────────────────┤
│ ✓ Authorization checks      │
│ ✓ Database constraints      │
│ ✓ Rate limiting (TODO)      │
└──────────┬──────────────────┘
           ↓
┌─────────────────────────────┐
│ ERROR HANDLING              │
├─────────────────────────────┤
│ ✓ Try-catch blocks          │
│ ✓ Safe error messages       │
│ ✓ Logging (TODO)            │
└──────────┬──────────────────┘
           ↓
┌─────────────────────────────┐
│ SECURE RESPONSE             │
├─────────────────────────────┤
│ ✓ Status codes corretos     │
│ ✓ Header sanitization       │
│ ✓ No sensitive data exposed │
└─────────────────────────────┘
```

---

## 📊 Stack de Desenvolvimento

### Frontend Stack
```
React 19.2.4 (UI Library)
├── TypeScript 5 (Type Safety)
├── Next.js 16.2.1 (Framework)
│   ├── App Router (File-based Routing)
│   ├── Server Components
│   └── API Routes
├── TailwindCSS 4 (Styling)
│   └── PostCSS 4 (Processing)
├── Framer Motion 12 (Animation)
└── Lucide React 1 (Icons)
```

### Backend Stack
```
Node.js (Runtime)
├── Next.js 16.2.1
│   └── API Routes
├── Prisma 7.5.0 (ORM)
│   ├── Client
│   └── Adapter PG
└── PostgreSQL (Database)
    └── pg driver 8.20.0
```

### IA Stack
```
Google Cloud
└── Generative AI API
    ├── Model: gemini-3-flash-preview
    ├── SDK: @google/genai 1.46.0
    └── Authentication: API Key
```

### Dev Tools
```
TypeScript 5 (Type Checking)
ESLint 9 (Code Quality)
dotenv 17.3.1 (Environment Config)
Zod 4.3.6 (Validation)
```

---

## 🔄 Ciclo de Vida de Componentes

### Dashboard Page Lifecycle

```typescript
// MOUNT
useEffect(() => {
  // 1. Load plans from localStorage on mount
  const saved = localStorage.getItem("plans");
  if (saved) {
    setPlans(JSON.parse(saved));
  }
}, []); // Dependency: [] = run once on mount

// RENDER
return (
  <div>
    {/* Input */}
    <input value={prompt} onChange={...} />
    
    {/* Loading indicator */}
    {isGenerating && <Loader2 />}
    
    {/* Animated Plans */}
    <AnimatePresence>
      {plans.map((plan) => (
        <motion.div key={plan.id} ...>
          {/* Plan content */}
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

// UPDATE
// - Trigger: File input onChange or click submit
// - Handler: handleGeneratePlan()
// - State update: setPlans()
// - Side effect: localStorage.setItem()

// UNMOUNT (cleanup handled by React)
```

---

## ⚙️ Environment Configuration

### .env.local (Never commit)
```env
# Google Gemini API
GOOGLE_API_KEY=sk_test_...

# Database
DATABASE_URL=postgresql://user:pass@host:port/dbname

# Node Environment
NODE_ENV=development
```

### .env.production (Secrets Manager)
```
Deploy time secrets via:
- Vercel Secrets
- Docker environment
- CI/CD Pipeline
```

---

## 📈 Performance Considerations

### Client-side
- **State Management**: React Hooks (lightweight)
- **Caching**: localStorage for plans
- **Animations**: GPU-accelerated (Framer Motion)
- **Bundle Size**: Optimized with Next.js

### Server-side
- **Database**: Indexes on foreign keys
- **API Response**: JSON (efficient)
- **Latency**: ~1-2s for AI generation

### Scalability
```
Current: Single instance (localhost:3000)

Future improvements:
├── Caching layer (Redis)
├── Database read replicas
├── CDN for static assets
├── Load balancing
└── Horizontal scaling (Kubernetes)
```

---

## 🎯 Padrões de Design Utilizados

### 1. Component-Based Architecture
```typescript
Dashboard (Container)
├── InputSection (Presentation)
├── PlansGrid (Presentation)
│   └── PlanCard (Presentation)
│       └── WeekAccordion (Presentation)
│           └── TaskItem (Presentation)
└── LoadingSpinner (Presentation)
```

### 2. Hooks Pattern
```typescript
- useState: Client state
- useEffect: Side effects
- useCallback: Memoized handlers (future)
- useContext: Theme/Auth (future)
```

### 3. API Gateway Pattern
```typescript
Client → API Routes (Gateway)
         ├── Validate input
         ├── Auth check
         ├── Call services
         └── Format response
```

### 4. Separation of Concerns
```
- /app/api/*    → Business logic
- /app/*        → Presentation logic
- /utils/*      → Shared utilities
- /utils/database/* → Data access
```

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────┐
│ Source Code (GitHub)                │
│ - Push to main branch               │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│ CI/CD Pipeline (GitHub Actions)     │
│ - Run tests                         │
│ - ESLint check                      │
│ - Build                             │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│ Vercel / Docker Container           │
│ - Deploy Next.js app                │
│ - Setup environment                 │
│ - Start server                      │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│ PostgreSQL (Remote or Kubernetes)   │
│ - Database                          │
│ - Backups                           │
└─────────────────────────────────────┘
```

---

## 📋 Checklist de Deployment

```bash
☐ Environment variables configured
☐ Database migrations applied
☐ Prisma client generated
☐ Build succeeds without errors
☐ Tests pass
☐ No console errors/warnings
☐ API endpoints tested
☐ Gemini API key valid
☐ Database backups scheduled
☐ Monitoring setup
☐ Error logging configured
☐ CORS properly configured
```

---

## 🔗 Referências de Decisões Técnicas

### Por que Next.js 16.2.1?
✅ Full-stack framework (frontend + backend)
✅ File-based routing
✅ Built-in API routes
✅ TypeScript support
✅ Deployment friendly (Vercel)

### Por que Prisma?
✅ Type-safe ORM
✅ Auto-generated client
✅ Migration system
✅ Multi-database support
✅ Developer experience

### Por que Google Gemini?
✅ State-of-the-art AI
✅ Cost-effective (Flash model)
✅ Good for structured output (JSON)
✅ Fast latency (~1-2s)

### Por que Tailwind CSS?
✅ Utility-first approach
✅ Small bundle size
✅ Easy customization
✅ Great DX

### Por que Zod?
✅ Runtime type checking
✅ TypeScript integration
✅ Custom validations
✅ Clear error messages

---

**Documento gerado em**: 30/03/2026
**Versão**: 1.0
**Status**: Completo

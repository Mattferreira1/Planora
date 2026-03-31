# Planora - Guia de Desenvolvimento e Boas Práticas

## 📖 Índice

1. [Padrões de Código](#padrões-de-código)
2. [Estrutura de Componentes](#estrutura-de-componentes)
3. [Boas Práticas TypeScript](#boas-práticas-typescript)
4. [API Routes](#api-routes)
5. [Banco de Dados](#banco-de-dados)
6. [Testes](#testes)
7. [Performance](#performance)
8. [Segurança](#segurança)
9. [Contribuição](#contribução)

---

## 🎨 Padrões de Código

### 1. Conventions de Nomes

```typescript
// ✅ BOAS PRÁTICAS

// Componentes: PascalCase
export default function DashboardPage() {}
function UserCard() {}

// Funções: camelCase
function handleGeneratePlan() {}
const fetchUsers = async () => {}

// Constantes: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_BASE_URL = "http://localhost:3000/api";

// Tipos/Interfaces: PascalCase com sufixo
interface TypeUser {
  id: string;
  email: string;
}

type StudyLevel = "Iniciante" | "Intermediário" | "Avançado";

// ❌ EVITAR
function dashboard_page() {} // snake_case em componentes
const HandleClick = () => {} // PascalCase em função
const maximum_retries = 3; // Não constante em snake_case
```

### 2. Imports

```typescript
// ✅ BOAS PRÁTICAS

// Agrupar imports por tipo
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Imports internos após externos
import { typeGoal } from "@/utils/types";
import { prisma } from "@/utils/database/client";

// ❌ EVITAR
import React from "react";
import { typeGoal } from "@/utils/types";
import { motion } from "framer-motion";
import { prisma } from "@/utils/database/client";
```

### 3. Linting com ESLint

```bash
# Rodar verificação
npm run lint

# Rodar com --fix para correção automática
npx eslint . --fix
```

---

## 🧩 Estrutura de Componentes

### Componentes Client (React)

```typescript
// ✅ BOAS PRÁTICAS
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { typeGoal } from "@/utils/types";

interface DashboardPageProps {
  initialPlans?: typeGoal[];
}

export default function DashboardPage({
  initialPlans = []
}: DashboardPageProps) {
  // State declaration
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useState<typeGoal[]>(initialPlans);
  const [error, setError] = useState<string | null>(null);

  // Effects
  useEffect(() => {
    const savedPlans = localStorage.getItem("plans");
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    }
  }, []);

  // Handlers
  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError("Por favor, descreva seu objetivo");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error("Falha ao gerar plano");
      }

      const newPlan = await response.json();
      setPlans(prev => [...prev, newPlan]);
      localStorage.setItem("plans", JSON.stringify([...plans, newPlan]));
      setPrompt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  // Render
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 p-8">
      <form onSubmit={handleGeneratePlan} className="max-w-2xl mx-auto">
        {/* Form content */}
      </form>

      <div className="mt-8 max-w-4xl mx-auto">
        {/* Plans list */}
      </div>
    </div>
  );
}
```

### API Routes

```typescript
// ✅ BOAS PRÁTICAS
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import GeminiAI from "@/utils/aiAgent/gemini/gemini";

// Schema validation
const requestSchema = z.object({
  prompt: z.string().min(10).max(1000)
});

export async function POST(request: NextRequest) {
  try {
    // 1. Parse e validar input
    const body = await request.json();
    const { prompt } = requestSchema.parse(body);

    // 2. Chamada à IA
    const response = await GeminiAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: buildPrompt(prompt)
    });

    // 3. Processar resposta
    const result = JSON.parse(response.text());

    // 4. Validar estrutura
    if (!result.title || !result.studyPlan) {
      throw new Error("Invalid response structure");
    }

    // 5. Retornar sucesso
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function buildPrompt(userPrompt: string): string {
  return `
    Você é um TECH LEAD especializado em criar planos de estudos.
    
    Entrada do usuário: ${userPrompt}
    
    Gere um plano de estudos estruturado em JSON...
  `;
}
```

---

## 📝 Boas Práticas TypeScript

### 1. Type Safety

```typescript
// ✅ BOAS PRÁTICAS

// Sempre tipify arrays
const users: User[] = [];

// Usar type/interface explicitamente
interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Genéricos para flexibilidade
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

// ❌ EVITAR
const users = []; // any[] implícito
const data: any = response.json(); // any tipo
```

### 2. Union Types

```typescript
// ✅ BOAS PRÁTICAS

type StudyLevel = "Iniciante" | "Intermediário" | "Avançado";
type ApiStatus = "pending" | "success" | "error";

// Type guards
function isError(response: ApiResponse<any>): response is ApiError {
  return "error" in response;
}

// ❌ EVITAR
type StudyLevel = string; // Muito genérico
type ApiStatus = string | null | undefined; // Sem precisão
```

### 3. Null Safety

```typescript
// ✅ BOAS PRÁTICAS

// Optional chaining
const userName = user?.name?.toUpperCase();

// Nullish coalescing
const level = userLevel ?? "Iniciante";

// Type narrowing
if (user && user.goals.length > 0) {
  // user.goals é garantidamente não vazio
}

// ❌ EVITAR
const userName = user.name.toUpperCase(); // Pode dar erro se undefined
const level = userLevel || "Iniciante"; // Falha com string vazia
```

---

## 🔌 API Routes

### Padrão Recomendado

```typescript
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

// 1. Definir schema
const createGoalSchema = z.object({
  title: z.string().min(3).max(200),
  level: z.enum(["Iniciante", "Intermediário", "Avançado"]),
  weeks: z.number().int().min(1).max(52)
});

type CreateGoalRequest = z.infer<typeof createGoalSchema>;

// 2. Definir resposta
interface CreateGoalResponse {
  id: string;
  title: string;
  level: string;
  weeks: number;
}

// 3. Implementar handler
export async function POST(
  request: NextRequest
): Promise<NextResponse<CreateGoalResponse | { error: string }>> {
  try {
    // Parse e validar
    const body: unknown = await request.json();
    const data = createGoalSchema.parse(body);

    // Business logic
    const goal = await createGoal(data);

    // Retornar resposta tipada
    return NextResponse.json<CreateGoalResponse>(goal);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function createGoal(
  data: CreateGoalRequest
): Promise<CreateGoalResponse> {
  // TODO: Implement database call
  return {
    id: "uuid",
    ...data
  };
}
```

---

## 🗄️ Banco de Dados

### Operações com Prisma

```typescript
// ✅ BOAS PRÁTICAS

import { prisma } from "@/utils/database/client";

// Create
const user = await prisma.user.create({
  data: {
    name: "João",
    email: "joao@email.com",
    goals: {
      create: [
        {
          title: "Aprender TypeScript",
          level: "Iniciante",
          weeks: 4
        }
      ]
    }
  },
  include: { goals: true }
});

// Read
const goal = await prisma.goal.findUnique({
  where: { id: goalId },
  include: {
    user: true,
    weeksRel: {
      include: { tasks: { orderBy: { order: "asc" } } }
    }
  }
});

// Update
const updated = await prisma.goal.update({
  where: { id: goalId },
  data: { title: "Novo título" }
});

// Delete
await prisma.goal.delete({
  where: { id: goalId }
});

// Batch operations
const results = await prisma.task.updateMany({
  where: { weekId },
  data: { done: true }
});

// Transaction
const result = await prisma.$transaction(async (tx) => {
  const goal = await tx.goal.create({ data: { /* ... */ } });
  await tx.week.createMany({
    data: weeks.map((w) => ({ ...w, goalId: goal.id }))
  });
  return goal;
});

// ❌ EVITAR
const goals = await prisma.goal.findMany(); // N+1 problem
// Sem include, precisa fazer query separada para weeks
```

### Migrations

```bash
# Criar migration
npx prisma migrate dev --name add_status_to_task

# Ver status
npx prisma migrate status

# Deploy em produção
npx prisma migrate deploy

# Reset (APENAS DESENVOLVIMENTO!)
npx prisma migrate reset

# Gerar tipos
npx prisma generate
```

---

## 🧪 Testes

### Exemplo: Teste de API

```typescript
// tests/api/goal.test.ts (exemplo com Jest)
describe("POST /api/goal", () => {
  it("deve gerar um plano válido", async () => {
    const response = await fetch("/api/goal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: "Aprender JavaScript em 2 semanas"
      })
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.title).toBeDefined();
    expect(data.studyPlan).toBeInstanceOf(Array);
  });

  it("deve retornar erro com prompt vazio", async () => {
    const response = await fetch("/api/goal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "" })
    });

    expect(response.status).toBe(400);
  });
});
```

---

## ⚡ Performance

### 1. Otimizações de Componente

```typescript
// ✅ BOAS PRÁTICAS

// Memoizar callbacks
const handleClick = useCallback(() => {
  // Handler
}, [dependency]);

// Lazy loading de componentes
const HeavyComponent = lazy(() => import("./HeavyComponent"));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>

// List virtualization para grandes listas
import { FixedSizeList } from "react-window";
```

### 2. Otimizações de Banco

```typescript
// ✅ BOAS PRÁTICAS

// Usar select para pegar só campos necessários
const goals = await prisma.goal.findMany({
  select: { id: true, title: true, level: true },
  take: 10,  // Paginação
  skip: 0
});

// Índices para queries frequentes no schema.prisma
model Goal {
  id    String @id @default(uuid())
  // ...
  userId String
  user   User   @relation(fields: [userId], references: [id])
  
  @@index([userId])  // Índice em chave estrangeira
}
```

### 3. Caching

```typescript
// ✅ BOAS PRÁTICAS

// Client-side cache
const [cache, setCache] = useState<Map<string, any>>(new Map());

const fetchWithCache = async (key: string, fetcher: () => Promise<any>) => {
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  const result = await fetcher();
  setCache(prev => new Map(prev).set(key, result));
  return result;
};
```

---

## 🔒 Segurança

### 1. Validação de Input

```typescript
// ✅ BOAS PRÁTICAS

import { z } from "zod";

const userInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).max(100)
});

// Sempre validar input da requisição
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validated = userInputSchema.parse(body); // Lança erro se inválido
  // ...
}
```

### 2. Proteção de Dados Sensíveis

```typescript
// ✅ BOAS PRÁTICAS

// Nunca retornar password em APIs
const user = await prisma.user.findUnique({
  where: { id: userId },
  select: {
    id: true,
    name: true,
    email: true
    // password NÃO incluído
  }
});

// Usar .env para secrets
process.env.GOOGLE_API_KEY // Nunca hardcode
```

### 3. CORS

```typescript
// ✅ BOAS PRÁTICAS

// next.config.ts
const nextConfig = {
  headers: async () => [
    {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" },
        { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE" }
      ]
    }
  ]
};
```

---

## 👥 Contribuição

### 1. Branch Naming

```
feature/nome-da-feature     # Nova funcionalidade
bugfix/nome-do-bug          # Correção de bug
refactor/descricao          # Refatoração
docs/descricao              # Documentação
```

### 2. Commit Messages

```
# ✅ BOAS PRÁTICAS

feat: adicionar geração de planos com IA
fix: corrigir erro ao salvar em localStorage
refactor: simplificar componente Dashboard
docs: documentar API de goals
```

### 3. Pull Request Checklist

```markdown
- [ ] Testes passam
- [ ] ESLint sem erros
- [ ] Tipos TypeScript corretos
- [ ] Documentação atualizada
- [ ] Sem dados sensíveis em commits
- [ ] Funcionalidade testada manualmente
```

### 4. Workflow de Contribuição

```bash
# 1. Criar branch
git checkout -b feature/nova-funcionalidade

# 2. Fazer mudanças
# ... editar código ...

# 3. Commit
git add .
git commit -m "feat: descrição da mudança"

# 4. Push
git push origin feature/nova-funcionalidade

# 5. Abrir Pull Request no GitHub
# ... descrever mudanças ...
```

---

## 📚 Recursos Adicionais

- [Next.js Best Practices](https://nextjs.org/docs/guides)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/other/troubleshooting-orm)
- [React Patterns](https://react-patterns.com/)

---

**Último Update**: 30/03/2026 | **Versão**: 1.0

# Planora - Guia Rápido de Referência

## ⚡ Quick Start

```bash
# Setup inicial
npm install

# Configure .env.local com:
# - GOOGLE_API_KEY
# - DATABASE_URL

# Inicie banco e servidor
npx prisma migrate dev
npm run dev

# Acesse http://localhost:3000
```

---

## 🗂️ Estrutura de Pastas Simplificada

```
my-app/
├── app/
│   ├── api/              🔌 APIs REST
│   │   ├── goal/         ⚙️  Gerar planos
│   │   ├── users/        👥 Gerenciar usuários
│   │   └── health/       💓 Health check
│   ├── (dashboard)/      📊 Rotas autenticadas
│   │   └── dashboard/    🎨 Interface principal
│   ├── (public)/         🌐 Rotas públicas
│   │   ├── login/        🔐 Login
│   │   └── register/     📝 Registro
│   └── globals.css       🎨 Estilos gerais
├── utils/
│   ├── types.ts          📦 TypeScript types
│   ├── aiAgent/          🤖 IA (Google Gemini)
│   └── database/         🗄️  Prisma + PostgreSQL
├── public/               📁 Assets estáticos
├── prisma/
│   └── schema.prisma     📋 Modelo de dados
├── .env.local            🔑 Variáveis (não commit)
├── package.json          📦 Dependências
└── tsconfig.json         ⚙️  Config TypeScript
```

---

## 💾 Banco de Dados - Referência Rápida

### Modelos Principais

| Modelo | Colunas | Relação |
|--------|---------|---------|
| **User** | id, name, email, password, createdAt | ← **1:N** → Goal |
| **Goal** | id, title, level, weeks, createdAt, userId | ← **1:N** → Week |
| **Week** | id, number, goalId | ← **1:N** → Task |
| **Task** | id, title, done, order, weekId | (folha) |

### Comandos Prisma Úteis

```bash
# Criar e aplicar migration
npx prisma migrate dev --name "add new field"

# Ver status das migrations
npx prisma migrate status

# Reset banco (⚠️ apenas dev!)
npx prisma migrate reset

# Abrir Prisma Studio (GUI)
npx prisma studio

# Gerar cliente
npx prisma generate
```

---

## 🔌 APIs - Endpoints Essenciais

### POST `/api/goal` - Gerar Plano
```json
REQUEST:
{
  "prompt": "Quero aprender Python em 2 meses, sou iniciante"
}

RESPONSE (200):
{
  "title": "Aprendendo Python",
  "level": "Iniciante",
  "weeks": 8,
  "totalTasks": 24,
  "studyPlan": [
    {
      "week": 1,
      "tasks": [
        { "title": "Instalar Python", "done": false },
        { "title": "Hello World", "done": false }
      ]
    }
  ]
}
```

### GET `/api/users` - Listar Usuários
```json
RESPONSE (200):
{
  "users": [
    {
      "id": "uuid",
      "name": "João",
      "email": "joao@email.com",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### GET `/api/health` - Health Check
```json
RESPONSE (200):
{
  "status": "ok"
}
```

---

## 🤖 Google Gemini - Configuração

### Setup
```typescript
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const GeminiAI = new GoogleGenAI({ 
  apiKey: process.env.GOOGLE_API_KEY 
});

// Usar
const response = await GeminiAI.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: "Your prompt here"
});
```

### Modelo
- **Nome**: `gemini-3-flash-preview`
- **Tipo**: Flash (rápido e econômico)
- **Latência**: ~1-2s
- **Custo**: Baixo

---

## 🎨 Frontend - Stack UI

| Ferramenta | Uso |
|-----------|-----|
| **React 19** | Components, Hooks |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion 12** | Animations |
| **Lucide React 1** | Icons (30+ usadas) |

### Componentes Comuns

```typescript
// Animação de entrada
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// Classe Tailwind comum
className="bg-linear-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"

// Ícones (exemplos)
<Sparkles />  // IA/Magic
<Target />    // Objetivo
<Clock />     // Tempo
<CheckCircle2 /> // Concluído
```

---

## 🚀 Código - Snippets Úteis

### 1. Fetch para API
```typescript
const response = await fetch("/api/goal", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: userInput })
});

const data = await response.json();
```

### 2. State Management
```typescript
const [plans, setPlans] = useState<typeGoal[]>([]);

// Adicionar plano
setPlans(prev => [...prev, newPlan]);

// Salvar em localStorage
localStorage.setItem("plans", JSON.stringify(plans));
```

### 3. Validação com Zod
```typescript
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  level: z.enum(["Iniciante", "Intermediário", "Avançado"])
});

const data = schema.parse(userInput);
```

### 4. API Route Básica
```typescript
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Seu código aqui
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
```

---

## 📊 Fluxo de Dados - Diagrama Simplificado

```
User Input
    ↓
[handleGeneratePlan]
    ↓
Fetch POST /api/goal
    ↓
[API Route]
    ↓
GeminiAI.generateContent()
    ↓
[Parse Response]
    ↓
JSON Plan
    ↓
setPlans() + localStorage
    ↓
UI Update com Animação
```

---

## 🔧 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Erro de API Key | Verifique `.env.local` e reinicie servidor |
| Erro de Banco | Execute `npx prisma migrate dev` |
| Componentes não renderizam | Verifique `"use client"` em componentes React |
| Estilos não aplicam | Verifique classes Tailwind vs CSS |
| IA não responde | Verifique quota Google Cloud e rate limits |

---

## 📦 Dependências Principais (Resumo)

```json
{
  "next": "16.2.1",
  "react": "19.2.4",
  "@google/genai": "^1.46.0",
  "@prisma/client": "^7.5.0",
  "tailwindcss": "^4",
  "framer-motion": "^12.38.0",
  "typescript": "^5",
  "zod": "^4.3.6"
}
```

---

## 🌍 Environment Variables

```env
# 🔑 Obrigatório
GOOGLE_API_KEY=sk-***
DATABASE_URL=postgresql://user:pass@localhost:5432/planora_db

# ⚙️ Opcional
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 📝 Comandos Dev Mais Usados

```bash
# Desenvolvimento
npm run dev              # localhost:3000

# Build & Deploy
npm run build
npm start

# Tipo checking
npx tsc --noEmit

# Linting
npm run lint

# Database
npx prisma studio      # GUI do banco
npx prisma generate    # Gerar tipos Prisma
npx prisma migrate dev # Nova migration

# Limpeza
rm -rf .next node_modules
npm install && npm run dev
```

---

## 🎯 Roadmap de Features

- [ ] Autenticação com NextAuth.js
- [ ] Dashboard com gráficos de progresso
- [ ] Exportar plano em PDF
- [ ] Compartilhar planos com amigos
- [ ] Sistema de metas com notificações
- [ ] Mobile app com React Native
- [ ] Modo offline
- [ ] Dark mode

---

## 📚 Links Úteis

- [Docs Next.js](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Google Gemini API](https://ai.google.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)

---

**📌 Última Atualização**: 30/03/2026 | **Versão**: 0.1.0 | **Status**: Em Desenvolvimento

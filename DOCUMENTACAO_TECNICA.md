# Documentação Técnica - Planora

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Modelo de Dados](#modelo-de-dados)
6. [APIs e Endpoints](#apis-e-endpoints)
7. [Integração com IA (Google Gemini)](#integração-com-ia-google-gemini)
8. [Fluxo de Funcionamento](#fluxo-de-funcionamento)
9. [Componentes Principais](#componentes-principais)
10. [Setup e Instalação](#setup-e-instalação)
11. [Variáveis de Ambiente](#variáveis-de-ambiente)
12. [Guia de Desenvolvimento](#guia-de-desenvolvimento)

---

## 1. Visão Geral {#visão-geral}

### O que é Planora?

**Planora** é uma plataforma inteligente de autodesenvolvimento que utiliza IA generativa (Google Gemini) para gerar planos de estudos personalizados. O sistema permite que usuários descrevam seus objetivos de aprendizado e recebam um cronograma estruturado em semanas, com tarefas específicas adaptadas ao seu nível e disponibilidade de tempo.

### Principais Funcionalidades

- ✅ **Geração Inteligente de Planos**: Usuários inserem um objetivo e a IA cria um plano estruturado
- ✅ **Personalização por Nível**: Adaptação conforme Iniciante, Intermediário ou Avançado
- ✅ **Cronograma em Semanas**: Distribuição de aprendizado em semanas com tarefas diárias
- ✅ **Rastreamento de Progresso**: Marcação de tarefas concluídas
- ✅ **Persistência de Dados**: Armazenamento local e em banco de dados
- ✅ **Interface Intuitiva**: UI moderna com animações suaves

### Público-Alvo

- 👤 Estudantes que desejam estruturar seu aprendizado
- 👤 Profissionais em desenvolvimento contínuo
- 👤 Pessoas interessadas em autodesenvolvimento orientado

---

## 2. Arquitetura do Sistema {#arquitetura-do-sistema}

```
┌─────────────────────────────────────┐
│      Cliente (Next.js Frontend)     │
│  - Dashboard com inputs e outputs   │
│  - UI Responsiva (React + Tailwind) │
└────────────┬────────────────────────┘
             │ HTTP/REST API
             ▼
┌─────────────────────────────────────┐
│   Backend (Next.js API Routes)      │
│  - /api/goal (POST)                 │
│  - /api/users (GET)                 │
│  - /api/health (GET)                │
└────────────┬────────────────────────┘
             │
        ┌────┴────┐
        ▼         ▼
   ┌────────┐  ┌──────────────┐
   │PostgreSQL │ Google Gemini │
   │ Database  │  API (IA)     │
   └────────┘  └──────────────┘
```

### Arquitetura em Camadas

#### 1. **Apresentação (Presentation Layer)**
- Interface do usuário em React
- Componentes reutilizáveis
- Gerenciamento de estado local
- Animações com Framer Motion

#### 2. **API (Application Layer)**
- Routes do Next.js em `/app/api`
- Validação de dados com Zod
- Orquestração de negócio
- Integração com IA

#### 3. **Integração com IA (AI Layer)**
- Comunicação com Google Gemini API
- Prompt engineering específico
- Parsing de respostas JSON
- Tratamento de erros

#### 4. **Persistência (Data Layer)**
- PostgreSQL como banco de dados
- Prisma ORM para abstração
- Migrations automáticas
- Adapter PG para Prisma 7.5.0

---

## 3. Stack Tecnológico {#stack-tecnológico}

### 📦 Dependências Principais

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **Next.js** | 16.2.1 | Framework React fullstack |
| **React** | 19.2.4 | Biblioteca UI |
| **React DOM** | 19.2.4 | Renderização DOM |
| **TypeScript** | 5 | Type safety |
| **Prisma Client** | 7.5.0 | ORM e gerenciamento de BD |
| **Prisma Adapter PG** | 7.5.0 | Adapter PostgreSQL |
| **PostgreSQL** | postgres | Banco de dados relacional |
| **Google GenAI** | 1.46.0 | IA Generativa (Gemini) |
| **Tailwind CSS** | 4 | Utility-first CSS |
| **Framer Motion** | 12.38.0 | Animações React |
| **Lucide React** | 1.0.0 | Ícones SVG |
| **Zod** | 4.3.6 | Validação de schemas |
| **dotenv** | 17.3.1 | Variáveis de ambiente |

### 🛠️ Ferramentas de Desenvolvimento

- **ESLint 9**: Linting de código
- **Tailwind PostCSS 4**: Processamento de CSS
- **TypeScript 5**: Type checking

---

## 4. Estrutura do Projeto {#estrutura-do-projeto}

```
my-app/
├── app/
│   ├── globals.css                 # Estilos globais
│   ├── layout.tsx                  # Layout raiz
│   ├── page.tsx                    # Página inicial (público)
│   ├── (dashboard)/                # Grupo de rotas autenticadas
│   │   ├── layout.tsx              # Layout dashboard
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Dashboard principal
│   │   └── previewMockedDashboard/
│   │       └── page.tsx            # Dashboard com dados mockados
│   ├── (public)/                   # Grupo de rotas públicas
│   │   ├── login/
│   │   │   └── page.tsx            # Página de login
│   │   └── register/
│   │       └── page.tsx            # Página de registro
│   └── api/                        # API Routes
│       ├── goal/
│       │   └── route.ts            # POST - Gerar plano de estudos
│       ├── users/
│       │   └── route.ts            # GET - Listar usuários
│       └── health/
│           └── route.ts            # GET - Health check
├── utils/
│   ├── types.ts                    # Tipos TypeScript compartilhados
│   ├── aiAgent/
│   │   └── gemini/
│   │       └── gemini.ts           # Inicialização Google Gemini
│   └── database/
│       ├── client.ts               # Cliente Prisma
│       ├── prisma/
│       │   └── schema.prisma       # Schema Prisma (modelo de dados)
│       └── generated/              # Código gerado pelo Prisma
│           └── prisma/
├── public/                         # Arquivos estáticos
├── prisma.config.ts               # Configuração Prisma
├── next.config.ts                 # Configuração Next.js
├── tsconfig.json                  # Configuração TypeScript
├── tailwind.config.js             # Configuração Tailwind
├── postcss.config.mjs             # Configuração PostCSS
├── eslint.config.mjs              # Configuração ESLint
├── package.json                   # Dependências e scripts
└── README.md                      # Documentação básica
```

---

## 5. Modelo de Dados {#modelo-de-dados}

### Schema Prisma

```prisma
model User {
  id        String   @id @default(uuid())
  name      String?
  email     String   @unique
  password  String?
  createdAt DateTime @default(now())
  goals     Goal[]   @relation("UserGoals")
}

model Goal {
  id        String   @id @default(uuid())
  title     String
  level     String   // "Iniciante" | "Intermediário" | "Avançado"
  weeks     Int
  createdAt DateTime @default(now())
  
  userId    String
  user      User     @relation("UserGoals", fields: [userId], references: [id])
  
  weeksRel  Week[]
}

model Week {
  id        String @id @default(uuid())
  number    Int    // Semana 1, 2, 3...
  
  goalId    String
  goal      Goal   @relation(fields: [goalId], references: [id])
  
  tasks     Task[]
}

model Task {
  id        String  @id @default(uuid())
  title     String
  done      Boolean @default(false)
  order     Int     // Ordenação dentro da semana
  
  weekId    String
  week      Week    @relation(fields: [weekId], references: [id])
}
```

### Relações

```
User (1) ──── (N) Goal
  │
  └─── Goal (1) ──── (N) Week
         │
         └─── Week (1) ──── (N) Task
```

### Tipos TypeScript

```typescript
interface typeGoal {
  title: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  weeks: number;
  totalTasks?: number;
  studyPlan: Array<{
    week: number;
    tasks: Array<{
      title: string;
      done: boolean;
    }>;
  }>;
  error?: string;
}
```

---

## 6. APIs e Endpoints {#apis-e-endpoints}

### 6.1 POST `/api/goal` - Gerar Plano de Estudos

**Descrição**: Gera um plano de estudos personalizado usando AI.

**Request:**
```json
{
  "prompt": "Quero aprender JavaScript em 4 semanas, sou iniciante"
}
```

**Response (Sucesso):**
```json
{
  "title": "Aprendendo JavaScript",
  "level": "Iniciante",
  "weeks": 4,
  "totalTasks": 12,
  "studyPlan": [
    {
      "week": 1,
      "tasks": [
        {
          "title": "Estudar variáveis e tipos",
          "done": false
        },
        {
          "title": "Praticar exercícios básicos",
          "done": false
        }
      ]
    }
  ]
}
```

**Response (Erro):**
```json
{
  "error": "Não foi possível criar um plano com base na descrição fornecida"
}
```

**Status Codes:**
- `200`: Sucesso
- `400`: Prompt obrigatório não fornecido
- `500`: Erro na geração

**Fluxo Interno:**
1. Recebe prompt do usuário
2. Valida se prompt não está vazio
3. Envia para Google Gemini API com prompt específico
4. Parseia resposta JSON
5. Retorna estrutura formatada

---

### 6.2 GET `/api/users` - Listar Usuários

**Descrição**: Retorna lista de todos os usuários cadastrados.

**Response (Sucesso):**
```json
{
  "users": [
    {
      "id": "uuid-1",
      "name": "João Silva",
      "email": "joao@example.com",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Response (Erro):**
```json
{
  "message": "No users found",
  "status": 404
}
```

**Status Codes:**
- `200`: Usuários encontrados
- `404`: Nenhum usuário encontrado
- `500`: Erro no servidor

---

### 6.3 GET `/api/health` - Health Check

**Descrição**: Verifica se a API está ativa.

**Response:**
```json
{
  "status": "ok"
}
```

---

## 7. Integração com IA (Google Gemini) {#integração-com-ia-google-gemini}

### 7.1 Configuração

**Arquivo**: `utils/aiAgent/gemini/gemini.ts`

```typescript
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const GeminiAI = new GoogleGenAI({ 
  apiKey: process.env.GOOGLE_API_KEY || "" 
});

export default GeminiAI;
```

### 7.2 Modelo Utilizado

- **Modelo**: `gemini-3-flash-preview`
- **Tipo**: Modelo flash otimizado para respostas rápidas
- **Custo**: Econômico
- **Latência**: Baixa (ideal para tempo real)

### 7.3 Prompt Engineering

O prompt enviado para a IA segue uma estrutura específica:

```
Supondo que você é um TECH LEAD.

abaixo irei enviar um texto onde eu cito um objetivo/meta, nível e 
em quanto tempo tenho para alcançar essa meta, analise o texto e 
crie um plano de estudos baseado em semanas e retorne um json 
comforme o exemplo abaixo:

OBJETO ESPERADO:
{
  title: string,
  level: Iniciante | Intermediário | Avançado,
  weeks: number,
  totalTasks: number,
  studyPlan: [
    {
      week: 1,
      tasks: [
        {
          title: "estudar java",
          done: boolean
        }
      ]
    }
  ]
}
```

**Características do Prompt:**
- Define rol: "TECH LEAD"
- Estrutura clara de entrada
- Schema JSON esperado explícito
- Tratamento de erro integrado

### 7.4 Tratamento de Respostas

A resposta da IA é esperada em formato JSON e é:
1. Validada contra a estrutura esperada
2. Parseada com validação de tipo
3. Retornada ao cliente ou erro se inválida

---

## 8. Fluxo de Funcionamento {#fluxo-de-funcionamento}

### Fluxo Completo de Geração de Plano

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USUÁRIO                                                  │
│    - Acessa /dashboard                                      │
│    - Digita objetivo (ex: "Aprender Python em 3 semanas")   │
│    - Clica em "Gerar Plano"                                 │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. FRONTEND (Dashboard)                                     │
│    - useState: prompt, isGenerating, plans                  │
│    - handleGeneratePlan(e)                                  │
│    - Valida: prompt não vazio                               │
│    - setIsGenerating(true)                                  │
│    - Fetch POST /api/goal                                   │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. API ROUTE (/api/goal - POST)                            │
│    - Extrai body: { prompt }                                │
│    - Valida: prompt obrigatório                             │
│    - Chama: GeminiAI.models.generateContent()              │
│    - Parseia resposta                                       │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. GOOGLE GEMINI API                                        │
│    - Recebe prompt estruturado                              │
│    - Processa com modelo gemini-3-flash-preview             │
│    - Gera JSON com plano de estudos                         │
│    - Retorna estrutura esperada                             │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. API RESPONSE                                             │
│    - Retorna: 200 + JSON do plano                           │
│    - Ou Erro: 400/500 + mensagem erro                       │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. FRONTEND RESPONSE HANDLER                                │
│    - if (!response.ok): mostra alerta                       │
│    - else: setPlans([...plans, json])                       │
│    - localStorage.setItem("plans", JSON)                    │
│    - setIsGenerating(false)                                 │
│    - Atualiza UI com novo plano                             │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. USUÁRIO VENDO RESULTADO                                  │
│    - Plano aparece na tela com animação                     │
│    - Pode expandir semanas                                  │
│    - Pode marcar tarefas como concluídas                    │
│    - Dados persistem em localStorage                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. Componentes Principais {#componentes-principais}

### 9.1 Dashboard Page (`app/(dashboard)/dashboard/page.tsx`)

**Responsabilidades:**
- Estado: `prompt`, `isGenerating`, `plans`, `openedTaskId`
- Handler: `handleGeneratePlan()`
- Integração: Fetch API `/api/goal`
- Persistência: localStorage
- Renderização: Planos de estudos com animações

**Principais Estados:**
```typescript
const [prompt, setPrompt] = useState("");              // Input do usuário
const [isGenerating, setIsGenerating] = useState(false); // Estado de loading
const [plans, setPlans] = useState<typeGoal[]>([]);    // Lista de planos
const [openedTaskId, setOpenedTaskId] = useState(null); // Tarefa expandida
```

**Principais Efeitos:**
- Carregamento de planos do localStorage ao montar
- Sincronização com localStorage ao adicionar plano
- Animações com Framer Motion

### 9.2 Componentes de UI

#### Input de Prompt
- Campo de texto com placeholder
- Botão de envio com ícone Send
- Loading spinner durante geração

#### Card de Plano
- Título do objetivo
- Badges: Level (Iniciante/Intermediário/Avançado)
- Icone: Target (objetivo)
- Duração em semanas: Clock
- Menu com opções: MoreVertical

#### Tarefa (Task)
- Checkbox para marcar concluído
- Título descritivo
- Ícone CheckCircle2 animado quando concluída
- Animação de entrada/saída

### 9.3 Ícones Utilizados (Lucide React)

| Ícone | Uso |
|-------|-----|
| 📍 `Sparkles` | IA/Magic |
| ➤ `Send` | Enviar prompt |
| 🎯 `Target` | Objetivo/Meta |
| 🕐 `Clock` | Duração/Semanas |
| ✅ `CheckCircle2` | Tarefa concluída |
| 🔥 `Flame` | Indicador ativo |
| ⋮ `MoreVertical` | Menu opções |
| ⏳ `Loader2` | Loading |
| ▼ `ChevronDown` | Expandir |

---

## 10. Setup e Instalação {#setup-e-instalação}

### 10.1 Pré-requisitos

- Node.js 18+ e npm/yarn
- PostgreSQL 12+ instalado e rodando
- Google Cloud account com API Gemini habilitada

### 10.2 Instalação Passo a Passo

```bash
# 1. Clone o repositório
git clone <repo-url>
cd my-app

# 2. Instale dependências
npm install

# 3. Configure variáveis de ambiente (veja seção 11)
# Criar arquivo .env.local

# 4. Setup do banco de dados
npx prisma migrate dev --name init

# 5. Generate Prisma Client
npx prisma generate

# 6. Inicie servidor de desenvolvimento
npm run dev
```

### 10.3 Comandos Disponíveis

```bash
npm run dev        # Iniciar servidor dev (porta 3000)
npm run build      # Build para produção
npm start          # Rodar build em produção
npm run lint       # Executar ESLint
```

---

## 11. Variáveis de Ambiente {#variáveis-de-ambiente}

### 11.1 Arquivo `.env.local`

```env
# Google Gemini API
GOOGLE_API_KEY=your_google_api_key_here

# Database PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/planora_db

# Node Environment
NODE_ENV=development
```

### 11.2 Obtenção de Chaves

#### Google API Key
1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie novo projeto
3. Ative API: "Generative Language API"
4. Create credential: API Key
5. Copie a chave para `GOOGLE_API_KEY`

#### Database URL
```
postgresql://username:password@host:5432/database_name
```

Se PostgreSQL local:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/planora_db
```

---

## 12. Guia de Desenvolvimento {#guia-de-desenvolvimento}

### 12.1 Adicionando Nova Rota de API

**Exemplo: POST `/api/tasks` - Salvar tarefa concluída**

```typescript
// app/api/tasks/route.ts
import { prisma } from "@/utils/database/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateTaskSchema = z.object({
  taskId: z.string().uuid(),
  done: z.boolean(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { taskId, done } = updateTaskSchema.parse(body);

    const task = await prisma.task.update({
      where: { id: taskId },
      data: { done },
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
```

### 12.2 Adicionando Nova Página

**Exemplo: Página de Planos Salvos**

```typescript
// app/(dashboard)/my-plans/page.tsx
"use client";

import { useEffect, useState } from "react";
import { typeGoal } from "@/utils/types";

export default function MyPlansPage() {
  const [plans, setPlans] = useState<typeGoal[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("plans");
    if (saved) {
      setPlans(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Meus Planos</h1>
      {/* Grid de planos */}
    </div>
  );
}
```

### 12.3 Melhorando o Prompt da IA

Para melhorar qualidade dos planos gerados:

```typescript
// Adicionar contexto ao prompt
const enhancedPrompt = `
  ${userPrompt}
  
  Considere:
  - Estrutura progressiva de dificuldade
  - Prática hands-on em cada semana
  - Review e consolidação de conhecimento
  - Projetos práticos para aplicar conceitos
`;
```

### 12.4 Validação de Dados com Zod

```typescript
import { z } from "zod";

const goalSchema = z.object({
  title: z.string().min(3).max(200),
  level: z.enum(["Iniciante", "Intermediário", "Avançado"]),
  weeks: z.number().min(1).max(52),
});

const validated = goalSchema.parse(data);
```

### 12.5 Estilo com Tailwind CSS

```typescript
// Component com classes Tailwind
<div className="
  bg-linear-to-r from-blue-500 to-purple-600
  rounded-lg shadow-lg p-6
  hover:shadow-xl transition-shadow
  md:p-8 lg:p-10
">
  {/* content */}
</div>
```

### 12.6 Animações com Framer Motion

```typescript
import { motion, AnimatePresence } from "framer-motion";

<AnimatePresence>
  {plans.map((plan, i) => (
    <motion.div
      key={plan.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: i * 0.1 }}
    >
      {/* Plan content */}
    </motion.div>
  ))}
</AnimatePresence>
```

---

## 📊 Diagrama de Entidades

```
┌─────────────┐
│   USER      │
├─────────────┤
│ id (PK)     │
│ name        │
│ email       │
│ password    │
│ createdAt   │
└──────┬──────┘
       │ 1
       │
       │ N
┌──────▼──────┐
│   GOAL      │
├─────────────┤
│ id (PK)     │
│ title       │
│ level       │
│ weeks       │
│ createdAt   │
│ userId (FK) │
└──────┬──────┘
       │ 1
       │
       │ N
┌──────▼──────┐
│    WEEK     │
├─────────────┤
│ id (PK)     │
│ number      │
│ goalId (FK) │
└──────┬──────┘
       │ 1
       │
       │ N
┌──────▼──────┐
│    TASK     │
├─────────────┤
│ id (PK)     │
│ title       │
│ done        │
│ order       │
│ weekId (FK) │
└─────────────┘
```

---

## 🔐 Segurança e Considerações

### Implementado
- ✅ Type safety com TypeScript
- ✅ Validação de entrada com Zod
- ✅ Error handling em APIs
- ✅ Conexão segura com BD via Prisma

### Recomendações Futuras
- 🔒 Autenticação e autorização (JWT, NextAuth.js)
- 🔒 Rate limiting em `/api/goal`
- 🔒 CORS configurado
- 🔒 Sanitização de inputs
- 🔒 Criptografia de passwords com bcrypt
- 🔒 Variáveis sensíveis em secrets manager

---

## 📈 Escalabilidade

### Otimizações Possíveis
- Cache de respostas da IA (Redis)
- Paginação em listagem de usuários
- Database indexing em queries frequentes
- CDN para assets estáticos
- Compression de responses
- Database connection pooling

---

## 🐛 Troubleshooting

### Erro: `GOOGLE_API_KEY not found`
```bash
# Verifique se .env.local existe e contém GOOGLE_API_KEY
# Reinicie o servidor de desenvolvimento
npm run dev
```

### Erro: `DATABASE_URL is not valid`
```bash
# Verifique a URL de conexão PostgreSQL
# Teste a conexão:
psql postgresql://user:password@localhost:5432/dbname
```

### Erro: `Prisma client not generated`
```bash
# Regenere o cliente Prisma
npx prisma generate
# Ou melhor ainda
npx prisma migrate dev
```

---

## 📚 Referências Externas

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [React Documentation](https://react.dev)
- [Google Gemini API](https://ai.google.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📝 Notas de Desenvolvimento

**Última atualização**: 30 de Março de 2026

**Versão do projeto**: 0.1.0

**Ambiente**: Development/Production Ready

---

## 📞 Suporte

Para mais informações sobre o projeto Planora, consulte:
- Este documento técnico
- [Código fonte well-documented](./app)
- Commits Git com histórico de mudanças

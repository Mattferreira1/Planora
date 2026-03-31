# Planora - Exemplos Práticos e Casos de Uso

## 📚 Índice
1. [Exemplos de Uso](#exemplos-de-uso)
2. [Exemplos de Prompts](#exemplos-de-prompts)
3. [Estrutura de Respostas](#estrutura-de-respostas)
4. [Diagramas Visuais](#diagramas-visuais)
5. [Fluxos de Usuário](#fluxos-de-usuário)
6. [Integração com Sistemas Externos](#integração-com-sistemas-externos)

---

## 🎯 Exemplos de Uso

### Exemplo 1: Aluno Iniciante em Programação

#### Input do Usuário
```
Objetivo: Aprender Python do zero para análise de dados
Nível: Completo iniciante
Tempo disponível: 8 semanas
Experiência anterior: Nenhuma com programação
```

#### Prompt Enviado para IA
```
Supondo que você é um TECH LEAD.

abaixo irei enviar um texto onde eu cito um objetivo/meta, nível e 
em quanto tempo tenho para alcançar essa meta, analise o texto e 
crie um plano de estudos baseado em semanas e retorne um json 
comforme o exemplo abaixo:

ENTRADA:
"Aprender Python do zero para análise de dados em 8 semanas, 
sou completo iniciante"

OBJETO ESPERADO:
{
  title: string,
  level: "Iniciante" | "Intermediário" | "Avançado",
  weeks: number,
  totalTasks: number,
  studyPlan: [...]
}
```

#### Resposta da IA (JSON)
```json
{
  "title": "Python para Análise de Dados",
  "level": "Iniciante",
  "weeks": 8,
  "totalTasks": 24,
  "studyPlan": [
    {
      "week": 1,
      "tasks": [
        {
          "title": "Instalar Python e VS Code",
          "done": false
        },
        {
          "title": "Aprender conceitos de programação (variáveis, tipos)",
          "done": false
        },
        {
          "title": "Primeiro programa: Hello World + cálculos básicos",
          "done": false
        }
      ]
    },
    {
      "week": 2,
      "tasks": [
        {
          "title": "Estruturas de dados: listas e dicionários",
          "done": false
        },
        {
          "title": "Loops (for e while)",
          "done": false
        },
        {
          "title": "Exercícios práticos: manipular listas",
          "done": false
        }
      ]
    },
    {
      "week": 3,
      "tasks": [
        {
          "title": "Funções e módulos",
          "done": false
        },
        {
          "title": "Tratamento de erros",
          "done": false
        }
      ]
    },
    {
      "week": 4,
      "tasks": [
        {
          "title": "Introdução a bibliotecas: NumPy",
          "done": false
        },
        {
          "title": "Arrays NumPy vs Listas Python",
          "done": false
        }
      ]
    },
    {
      "week": 5,
      "tasks": [
        {
          "title": "Pandas para manipulação de dados",
          "done": false
        },
        {
          "title": "DataFrames: criar, ler, escrever",
          "done": false
        }
      ]
    },
    {
      "week": 6,
      "tasks": [
        {
          "title": "Visualização com Matplotlib",
          "done": false
        },
        {
          "title": "Gráficos básicos: linhas, barras, scatter",
          "done": false
        }
      ]
    },
    {
      "week": 7,
      "tasks": [
        {
          "title": "Análise estatística básica",
          "done": false
        },
        {
          "title": "Limpeza de dados reais",
          "done": false
        }
      ]
    },
    {
      "week": 8,
      "tasks": [
        {
          "title": "Projeto prático: analisar dataset real",
          "done": false
        },
        {
          "title": "Apresentar resultados com visualizações",
          "done": false
        }
      ]
    }
  ]
}
```

#### O que o usuário vê
```
┌─────────────────────────────────────────────────────────────┐
│ Planora - Dashboard                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📝 Qual é seu objetivo de aprendizado?                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Aprender Python do zero para análise de dados...     │  │
│  └──────────────────────────────────────────────────────┘  │
│  [Gerar Plano] 🚀                                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Seus Planos de Estudo                                       │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🎯 Python para Análise de Dados                     │   │
│  │ 📊 Nível: Iniciante                                 │   │
│  │ ⏰ 8 semanas | 24 tarefas                           │   │
│  │                                                     │   │
│  │ Semana 1 ▼ (3 tarefas)                              │   │
│  │ ☐ Instalar Python e VS Code                        │   │
│  │ ☐ Aprender conceitos de programação...             │   │
│  │ ☐ Primeiro programa: Hello World...                │   │
│  │                                                     │   │
│  │ Semana 2 ▶ (3 tarefas)                              │   │
│  │ Semana 3 ▶ (2 tarefas)                              │   │
│  │ ...                                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Exemplo 2: Profissional em Transição

#### Input
```
Objetivo: Aprender React para conseguir novo emprego
Nível: Tenho experiência com JavaScript, sou intermediário
Tempo: 6 semanas (preciso rápido!)
```

#### Resposta Esperada
```json
{
  "title": "React para Desenvolvimento Web",
  "level": "Intermediário",
  "weeks": 6,
  "totalTasks": 18,
  "studyPlan": [
    {
      "week": 1,
      "tasks": [
        { "title": "JSX e componentes funcionais", "done": false },
        { "title": "Hooks básicos: useState, useEffect", "done": false },
        { "title": "Props e comunicação entre componentes", "done": false }
      ]
    },
    {
      "week": 2,
      "tasks": [
        { "title": "Formulários em React", "done": false },
        { "title": "Validações com Zod/Yup", "done": false },
        { "title": "Projeto 1: Formulário de cadastro", "done": false }
      ]
    },
    {
      "week": 3,
      "tasks": [
        { "title": "State management: Context API", "done": false },
        { "title": "Roteamento com Next.js/React Router", "done": false }
      ]
    },
    {
      "week": 4,
      "tasks": [
        { "title": "Chamadas HTTP: fetch/axios", "done": false },
        { "title": "React Query ou SWR", "done": false },
        { "title": "Projeto 2: App que consome API", "done": false }
      ]
    },
    {
      "week": 5,
      "tasks": [
        { "title": "Styling: Tailwind ou Styled Components", "done": false },
        { "title": "Animações com Framer Motion", "done": false }
      ]
    },
    {
      "week": 6,
      "tasks": [
        { "title": "Testing: Jest + React Testing Library", "done": false },
        { "title": "Projeto final: Aplicação completa com portfolio", "done": false },
        { "title": "Deploy no Vercel/Netlify", "done": false }
      ]
    }
  ]
}
```

---

### Exemplo 3: Entusiasta de Hobby

#### Input
```
Objetivo: Aprender fotografia como hobby
Nível: Nunca mexi com câmera profissional
Tempo: 4 semanas para o básico
```

#### Resposta Esperada
```json
{
  "title": "Fotografia Básica para Iniciantes",
  "level": "Iniciante",
  "weeks": 4,
  "totalTasks": 16,
  "studyPlan": [
    {
      "week": 1,
      "tasks": [
        { "title": "Conceitos básicos: luz, composição, enquadramento", "done": false },
        { "title": "Partes da câmera DSLR/Mirrorless", "done": false },
        { "title": "Modos de câmera: automático, semi-automático, manual", "done": false },
        { "title": "Tirar 20 fotos em diferentes condições de luz", "done": false }
      ]
    },
    {
      "week": 2,
      "tasks": [
        { "title": "ISO, Abertura (f-stop), Velocidade do obturador", "done": false },
        { "title": "Triângulo de exposição", "done": false },
        { "title": "Exercício: controlar exposição em modo manual", "done": false }
      ]
    },
    {
      "week": 3,
      "tasks": [
        { "title": "Composição: regra dos terços, linhas guia", "done": false },
        { "title": "Foco automático vs manual", "done": false },
        { "title": "Projeto: fotografar um tema (natureza, retrato, arquitetura)", "done": false }
      ]
    },
    {
      "week": 4,
      "tasks": [
        { "title": "Edição básica com Lightroom", "done": false },
        { "title": "Revisão de suas melhores fotos", "done": false },
        { "title": "Próximos passos: especializações", "done": false }
      ]
    }
  ]
}
```

---

## 📝 Exemplos de Prompts

### ✅ Prompts BEM Estruturados (Funcionam Melhor)

```
1. "Quero aprender Python para data science em 10 semanas. 
   Sou iniciante em programação e já tenho experiência com 
   R do Excel para análise de dados."

2. "Preciso dominar TypeScript avançado em 6 semanas. 
   Tenho 3 anos de experiência com JavaScript e quero 
   focar em tipos genéricos e utilitários."

3. "Aprender Kubernetes para gerenciar contêineres em 8 semanas. 
   Já uso Docker diariamente e entendo conceitos de containers."

4. "Introdução a Machine Learning com Python em 12 semanas. 
   Sou iniciante, mas tenho base matemática e programação."
```

### ❌ Prompts MAL Estruturados (Não Funcionam)

```
1. "Aprender programação"
   ❌ Muito vago

2. "Python"
   ❌ Sem objetivo

3. "Tudo sobre web"
   ❌ Não existe "tudo"

4. "Rápido!"
   ❌ Sem informações
```

### 🎯 Padrão Recomendado

```
"Quero aprender [TÓPICO] [PARA OBJETIVO/CONTEXTO] em [TEMPO] semanas. 
Meu nível é [INICIANTE/INTERMEDIÁRIO/AVANÇADO] e tenho experiência em [CONTEXTO]."

Exemplo:
"Quero aprender React para conseguir emprego frontend em 8 semanas. 
Meu nível é intermediário porque conheço JavaScript sólido 
e já criei alguns sites com vanilla JS."
```

---

## 📊 Estrutura de Respostas

### Resposta Completa (Sucesso)
```json
{
  "title": "string - Título do objetivo",
  "level": "string - Iniciante | Intermediário | Avançado",
  "weeks": "number - Total de semanas",
  "totalTasks": "number - Total de tarefas",
  "studyPlan": [
    {
      "week": "number - Número da semana (1, 2, 3...)",
      "tasks": [
        {
          "title": "string - Descrição da tarefa",
          "done": "boolean - false (inicial) ou true (concluída)"
        }
      ]
    }
  ]
}
```

### Resposta de Erro (Falha)
```json
{
  "error": "string - Mensagem explicando o motivo do erro"
}
```

---

## 🎨 Diagramas Visuais

### Diagrama de Fluxo - Geração de Plano

```
┌─────────────────────────────────────────────────────────────────┐
│                        USUÁRIO                                  │
│                                                                 │
│  "Aprender JavaScript em 3 semanas, sou iniciante"              │
│                        │                                         │
│                        ▼                                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ FRONTEND - Dashboard Page (React)                        │   │
│  │                                                          │   │
│  │ 1. Captura prompt                                        │   │
│  │ 2. Valida: não vazio?                                    │   │
│  │ 3. setIsGenerating(true) - Mostra spinner               │   │
│  │ 4. Fetch POST /api/goal                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                        │                                         │
│                        ▼ HTTP POST                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ BACKEND - API Route /api/goal                            │   │
│  │                                                          │   │
│  │ 1. Parse body JSON                                       │   │
│  │ 2. Validação Zod: prompt não vazio                       │   │
│  │ 3. Chama GeminiAI.generateContent()                     │   │
│  │ 4. Constrói prompt com contexto TECH LEAD               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                        │                                         │
│                        ▼ SDK Call                                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ GOOGLE CLOUD - Gemini API                                │   │
│  │                                                          │   │
│  │ Model: gemini-3-flash-preview                            │   │
│  │ Latência: ~1-2 segundos                                  │   │
│  │                                                          │   │
│  │ Processa e retorna JSON estruturado                      │   │
│  └──────────────────────────────────────────────────────────┘   │
│                        │                                         │
│                        ▼ JSON Response                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ BACKEND - API Route (Resposta)                           │   │
│  │                                                          │   │
│  │ 1. Parse JSON da IA                                      │   │
│  │ 2. Validação: tem todos campos?                          │   │
│  │ 3. NextResponse.json(data) - Status 200                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                        │                                         │
│                        ▼ HTTP 200 + JSON                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ FRONTEND - Processamento da Resposta                     │   │
│  │                                                          │   │
│  │ 1. setPlans([...plans, novoPlano])                       │   │
│  │ 2. localStorage.setItem("plans", JSON)                   │   │
│  │ 3. setIsGenerating(false) - Remove spinner              │   │
│  │ 4. Anima novo plano com Framer Motion                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                        │                                         │
│                        ▼                                         │
│            NOVO PLANO APARECE NA TELA                           │
│           COM TODAS AS SEMANAS COLAPSÁVEIS                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Diagrama de Componentes - Dashboard

```
┌──────────────────────────────────────────────────────────┐
│  DashboardPage (Use Client)                              │
│                                                          │
│  State:                                                  │
│  - prompt: string                                        │
│  - isGenerating: boolean                                 │
│  - plans: typeGoal[]                                     │
│  - openedTaskId: number | null                           │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ INPUT SECTION                                    │   │
│  │                                                  │   │
│  │  <form onSubmit={handleGeneratePlan}>            │   │
│  │    <input value={prompt} onChange={...} />       │   │
│  │    <button>{isGenerating ? <Loader/> : "Gerar"}  │   │
│  │  </form>                                          │   │
│  └──────────────────────────────────────────────────┘   │
│           │                                              │
│           ▼                                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │ PLANS LIST                                       │   │
│  │                                                  │   │
│  │ <AnimatePresence>                                │   │
│  │   {plans.map(plan => (                           │   │
│  │     <motion.div key={plan.id}>                   │   │
│  │       <PlanCard />                               │   │
│  │     </motion.div>                                │   │
│  │   ))}                                            │   │
│  │ </AnimatePresence>                               │   │
│  │                                                  │   │
│  │  ┌────────────────────────────────────────┐     │   │
│  │  │ PlanCard                               │     │   │
│  │  │ - title, level, weeks                  │     │   │
│  │  │ - Menu (opções)                        │     │   │
│  │  │                                        │     │   │
│  │  │  ┌──────────────────────────────────┐ │     │   │
│  │  │  │ Week 1 (Expandível)              │ │     │   │
│  │  │  │                                  │ │     │   │
│  │  │  │  ☐ Task 1                        │ │     │   │
│  │  │  │  ☐ Task 2                        │ │     │   │
│  │  │  │  ✓ Task 3 (concluída)            │ │     │   │
│  │  │  └──────────────────────────────────┘ │     │   │
│  │  │  Week 2 ▶ (Colapsado)                 │     │   │
│  │  └────────────────────────────────────────┘     │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 👤 Fluxos de Usuário

### Fluxo 1: Novo Usuário

```
1. Acessa planora.com
                │
                ▼
2. Vê página inicial com explicação
                │
                ▼
3. Clica "Começar"
                │
                ▼
4. Vai para /dashboard
                │
                ▼
5. Digita objetivo
                │
                ▼
6. Clica "Gerar Plano"
                │
                ▼
7. Aguarda ~2 segundos
                │
                ▼
8. Vê novo plano gerado
                │
                ▼
9. Expande semanas
                │
                ▼
10. Marca tarefas como concluídas
                │
                ▼
11. Gera novo plano
                │
                ▼
12. Mantém histórico em localStorage
```

### Fluxo 2: Usuário Retornando

```
1. Acessa planora.com
                │
                ▼
2. Vai para /dashboard
                │
                ▼
3. Vê seus planos anteriores (localStorage)
                │
                ▼
4. Continua onde parou
                │
                ▼
5. Marca mais tarefas como concluídas
                │
                ▼
6. Começa novo plano
```

---

## 🔌 Integração com Sistemas Externos

### Integração com Google Gemini

```
┌─────────────────────┐
│   Planora Backend    │
│                     │
│  GeminiAI object    │
│  instantiado com    │
│  GOOGLE_API_KEY     │
└──────────┬──────────┘
           │
           ▼ SDK Call
    ┌──────────────────┐
    │ Google GenAI SDK │
    │ @google/genai    │
    └──────────┬───────┘
               │
               ▼ HTTP
        ┌─────────────────────┐
        │ Google Cloud APIs   │
        │                     │
        │ Generative Language │
        │ API Endpoint        │
        └─────────────────────┘
```

### Resposta Esperada

```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent

Body:
{
  "model": "gemini-3-flash-preview",
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "Você é um TECH LEAD... [prompt completo]"
        }
      ]
    }
  ]
}

Response:
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "{\"title\": \"...\", \"level\": \"...\", ...}"
          }
        ]
      }
    }
  ]
}
```

---

## 🗄️ Integração com PostgreSQL

### Exemplo de Salvar Plano (Futuro)

```typescript
// Quando usuário faz login, salvar plano no BD
const goal = await prisma.goal.create({
  data: {
    title: "Python para Análise de Dados",
    level: "Iniciante",
    weeks: 8,
    userId: currentUser.id,
    weeksRel: {
      create: studyPlan.map((week, idx) => ({
        number: idx + 1,
        tasks: {
          create: week.tasks.map((task, order) => ({
            title: task.title,
            done: false,
            order
          }))
        }
      }))
    }
  },
  include: {
    weeksRel: { include: { tasks: true } }
  }
});
```

---

## 📱 Interfaces Visuais

### Tela 1: Home (Público)

```
┌──────────────────────────────────────────┐
│ PLANORA                                  │
│ Seu Plano de Estudos com IA               │
│                                          │
│ Descrição da plataforma                  │
│ Benefícios                               │
│                                          │
│ [Começar] [Saber Mais]                   │
│                                          │
│ Features:                                │
│ ✓ IA Generativa                          │
│ ✓ Personalizado                          │
│ ✓ Estruturado em Semanas                 │
│                                          │
│ [Login] [Cadastro]                       │
└──────────────────────────────────────────┘
```

### Tela 2: Dashboard

```
┌──────────────────────────────────────────┐
│ MEU PLANO                                │
│                                          │
│ ✨ Novo Plano                            │
│ ┌────────────────────────────────────┐   │
│ │ Qual é seu objetivo?               │   │
│ │ [input_field_________________]     │   │
│ │                              [Gerar]  │
│ └────────────────────────────────────┘   │
│                                          │
│ Planos Anteriores:                       │
│ ┌────────────────────────────────────┐   │
│ │ 🎯 Python para Análise             │   │
│ │ 📊 Iniciante | 🕐 8 semanas         │   │
│ │ ⏳ Progresso: 3/24 tarefas         │   │
│ │                                    │   │
│ │ [Semana 1 ▼] (expandida)           │   │
│ │ ☐ Tarefa 1                         │   │
│ │ ☐ Tarefa 2                         │   │
│ │ ✓ Tarefa 3                         │   │
│ │                                    │   │
│ │ [Semana 2 ▶] (colapsada)           │   │
│ └────────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

---

## 📞 Exemplos de Suporte

### Pergunta: "Por que meu plano não foi gerado?"

**Causas Possíveis:**
1. Prompt muito curto ou vago
2. Conexão com internet caiu
3. API Gemini indisponível
4. Quota de requisições esgotada

**Solução:**
- Tente novamente com prompt mais detalhado
- Verifique conexão internet
- Aguarde alguns minutos
- Reporte o bug

---

## 🎓 Conclusão

Estes exemplos práticos demonstram como Planora funciona end-to-end desde o input do usuário até a resposta visualizada. Use estes como referência ao desenvolver ou explicar o projeto.

---

**Criado em**: 30/03/2026 | **Versão**: 1.0

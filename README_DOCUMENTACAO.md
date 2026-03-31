# 🎯 Planora - Plataforma de Autodesenvolvimento com IA

## Bem-vindo ao Planora! 👋

**Planora** é uma plataforma web moderna que usa Inteligência Artificial para gerar **planos de estudos personalizados**. Você descreve seus objetivos de aprendizado e receberá um cronograma estruturado em semanas com tarefas específicas.

---

## 🚀 Quick Start (2 minutos)

```bash
# 1. Clone e instale
git clone <repo>
cd my-app
npm install

# 2. Configure .env.local
GOOGLE_API_KEY=seu_api_key_aqui
DATABASE_URL=postgresql://user:pass@localhost:5432/planora

# 3. Inicie
npx prisma migrate dev
npm run dev

# 4. Abra http://localhost:3000
```

---

## 📚 Documentação Disponível

### 🎯 **Comece Aqui** (Todos)
- **[RESUMO_EXECUTIVO_E_FAQ.md](RESUMO_EXECUTIVO_E_FAQ.md)** - O que é Planora, como funciona, 25+ FAQs

### 👨‍💻 **Para Desenvolvedores**
- **[GUIA_RAPIDO.md](GUIA_RAPIDO.md)** - Referência rápida durante desenvolvimento
- **[DOCUMENTACAO_TECNICA.md](DOCUMENTACAO_TECNICA.md)** - Documentação técnica completa
- **[DESENVOLVIMENTO_BOAS_PRATICAS.md](DESENVOLVIMENTO_BOAS_PRATICAS.md)** - Padrões de código

### 🏗️ **Para Arquitetos**
- **[ARQUITETURA_DETALHADA.md](ARQUITETURA_DETALHADA.md)** - Diagramas e decisões técnicas
- **[EXEMPLOS_PRATICOS.md](EXEMPLOS_PRATICOS.md)** - Casos de uso e exemplos

### 🗂️ **Índice**
- **[INDICE_DOCUMENTACAO.md](INDICE_DOCUMENTACAO.md)** - Guia de navegação de todos os docs
- **[DOCUMENTACAO_COMPLETA_SUMARIO.md](DOCUMENTACAO_COMPLETA_SUMARIO.md)** - Sumário completo

---

## 💡 O que o Planora Faz

```
1. VOCÊ DIGITA:
   "Quero aprender JavaScript em 4 semanas, sou iniciante"

2. IA ANALISA:
   Nível, tempo, objetivo
   
3. IA GERA:
   Plano estruturado em semanas com tarefas
   
4. VOCÊ VÊ:
   Interface moderna com seu plano personalizado
   
5. VOCÊ PROGRIDE:
   Marca tarefas como concluídas e acompanha evolução
```

---

## 🎨 Features Principais

- ✅ **Geração Inteligente com IA**: Google Gemini cria planos em tempo real
- ✅ **Personalização**: Adapta ao seu nível (Iniciante/Intermediário/Avançado)
- ✅ **Organização em Semanas**: Cronograma estruturado com tarefas diárias
- ✅ **Rastreamento**: Marque tarefas como concluídas
- ✅ **UI Moderna**: Animações fluidas, design responsivo
- ✅ **Persistência**: Dados salvos em localStorage (e BD no futuro)

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** + TypeScript
- **Next.js 16** - Framework fullstack
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animações
- **Lucide React** - Ícones

### Backend
- **Next.js API Routes** - Servidores
- **Prisma 7.5** - ORM
- **PostgreSQL** - Banco de dados

### IA
- **Google Gemini API** - Geração de planos

---

## 📁 Estrutura do Projeto

```
my-app/
├── app/
│   ├── (dashboard)/dashboard/  → Dashboard principal
│   ├── (public)/login/         → Login
│   ├── api/
│   │   ├── goal/               → Gera planos
│   │   ├── users/              → Lista usuários
│   │   └── health/             → Health check
│   └── globals.css             → Estilos globais
├── utils/
│   ├── database/               → Prisma + PostgreSQL
│   └── aiAgent/gemini/         → Google Gemini
├── prisma/
│   └── schema.prisma           → Modelo de dados
└── package.json                → Dependências
```

---

## 🔌 Endpoints da API

### `POST /api/goal` - Gerar Plano
```json
REQUEST:
{
  "prompt": "Aprender Python em 2 meses, sou iniciante"
}

RESPONSE:
{
  "title": "Python para Iniciantes",
  "level": "Iniciante",
  "weeks": 8,
  "totalTasks": 24,
  "studyPlan": [...]
}
```

### `GET /api/users` - Listar Usuários
```json
RESPONSE:
{
  "users": [{id, name, email, createdAt}, ...]
}
```

### `GET /api/health` - Health Check
```json
RESPONSE:
{
  "status": "ok"
}
```

---

## 🗄️ Modelo de Dados

```
User (1) ──── (N) Goal
         ────── Goal (1) ──── (N) Week
                      ────── Week (1) ──── (N) Task
```

**Tabelas**:
- `User`: id, name, email, password, createdAt
- `Goal`: id, title, level, weeks, userId, createdAt
- `Week`: id, number, goalId
- `Task`: id, title, done, order, weekId

---

## 🔐 Configuração

### Variáveis de Ambiente
```env
# .env.local (não commitar)
GOOGLE_API_KEY=seu_api_key_google
DATABASE_URL=postgresql://user:password@localhost:5432/planora
NODE_ENV=development
```

### Como Obter Chaves

**Google API Key:**
1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie novo projeto
3. Ative "Generative Language API"
4. Crie uma API Key
5. Copie para `GOOGLE_API_KEY`

**PostgreSQL:**
```bash
# Se tem PostgreSQL local
DATABASE_URL=postgresql://postgres:password@localhost:5432/planora_db

# Se usa servidor remoto
DATABASE_URL=postgresql://user:pass@host.com:5432/planora
```

---

## 📦 Instalação Completa

```bash
# 1. Pré-requisitos
# - Node.js 18+
# - PostgreSQL 12+
# - Conta Google Cloud

# 2. Clone
git clone <repo>
cd my-app

# 3. Instale dependências
npm install

# 4. Setup banco de dados
npx prisma migrate dev

# 5. Configure .env.local
# (Copie do .env.example e preencha)

# 6. Inicie servidor de desenvolvimento
npm run dev

# 7. Acesse
# http://localhost:3000
```

---

## 🚀 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor dev

# Build
npm run build            # Build para produção
npm start                # Roda build em produção

# Linting
npm run lint             # Verifica código

# Banco de Dados
npx prisma migrate dev   # Criar migration
npx prisma studio       # GUI do banco
npx prisma generate     # Gerar tipos

# TypeScript
npx tsc --noEmit        # Verificar tipos
```

---

## 🎓 Exemplos de Prompts

### ✅ Bons Prompts
```
"Aprender React em 8 semanas para conseguir emprego frontend. 
Tenho 2 anos com JavaScript, sou intermediário."

"Python para análise de dados em 6 semanas. 
Completo iniciante, mas tenho base matemática."

"Dominar TypeScript avançado em 4 semanas. 
Tenho 5 anos com JavaScript."
```

### ❌ Prompts Ruins
```
"Programação"           ← Muito vago
"Aprender tudo"        ← Impossível
"Rápido!"              ← Sem informação
```

---

## 📊 Roadmap Futuro

- 🔐 Autenticação com NextAuth.js
- 💾 Sincronização com servidor (vs localStorage)
- 📈 Dashboard com gráficos de progresso
- 🤝 Compartilhamento de planos
- 📱 App mobile (React Native)
- 🎮 Gamification (badges, streaks)
- 🎓 Certificados de conclusão

---

## 🆘 Troubleshooting

### Erro: "GOOGLE_API_KEY not found"
```
✓ Verifique arquivo .env.local
✓ Reinicie servidor (npm run dev)
✓ Check se API key é válida
```

### Erro: "DATABASE_URL is invalid"
```
✓ Verifique sintaxe PostgreSQL URL
✓ Teste conexão: psql <url>
✓ Certifique que BD existe
```

### Errro: "Prisma client not generated"
```
✓ Execute: npx prisma generate
✓ Ou: npx prisma migrate dev
```

---

## 💬 FAQ Rápido

**P: Preciso de conta para usar?**
R: Não! MVP é anônimo, dados em localStorage.

**P: Qual a latência para gerar plano?**
R: ~1-3 segundos (rede + API Gemini).

**P: Posso usar offline?**
R: Sim para visualizar planos anteriores. Não para gerar novos.

**P: Planora é grátis?**
R: Sim! MVP é totalmente gratuito.

**P: Como reportar bug?**
R: Abra issue no GitHub.

Para mais FAQ → [RESUMO_EXECUTIVO_E_FAQ.md](RESUMO_EXECUTIVO_E_FAQ.md)

---

## 🤝 Contribuindo

### Passos para Contribuir
1. Faça fork do repositório
2. Crie branch: `git checkout -b feature/minha-feature`
3. Commit: `git commit -m "feat: descrição"`
4. Push: `git push origin feature/minha-feature`
5. Abra Pull Request

### Padrões de Código
- Use TypeScript
- Siga ESLint
- Prefira Tailwind CSS
- Veja [DESENVOLVIMENTO_BOAS_PRATICAS.md](DESENVOLVIMENTO_BOAS_PRATICAS.md)

---

## 📚 Documentação Completa

Mais de **100 KB de documentação profissional** está disponível:

| Documento | Descrição |
|-----------|-----------|
| [RESUMO_EXECUTIVO_E_FAQ.md](RESUMO_EXECUTIVO_E_FAQ.md) | Visão geral + 25+ FAQs |
| [DOCUMENTACAO_TECNICA.md](DOCUMENTACAO_TECNICA.md) | Técnica completa |
| [GUIA_RAPIDO.md](GUIA_RAPIDO.md) | Referência rápida |
| [ARQUITETURA_DETALHADA.md](ARQUITETURA_DETALHADA.md) | Diagramas + decisões |
| [DESENVOLVIMENTO_BOAS_PRATICAS.md](DESENVOLVIMENTO_BOAS_PRATICAS.md) | Padrões código |
| [EXEMPLOS_PRATICOS.md](EXEMPLOS_PRATICOS.md) | Casos uso |
| [INDICE_DOCUMENTACAO.md](INDICE_DOCUMENTACAO.md) | Índice navegação |

Ver [DOCUMENTACAO_COMPLETA_SUMARIO.md](DOCUMENTACAO_COMPLETA_SUMARIO.md) para sumário completo.

---

## 📞 Contato e Suporte

- 📧 Email: [suporte@planora.com]
- 🐛 Issues: GitHub Issues
- 💬 Discussões: GitHub Discussions
- 🐦 Twitter: [@PlanoraPlatform] (em breve)

---

## 📄 Licença

[MIT License](LICENSE) - Sinta-se livre para usar, modificar e distribuir!

---

## 👏 Créditos

Desenvolvido como **Projeto Final IA + Soft Skills** em Março de 2026.

**Stack**: Next.js + React + TypeScript + Prisma + PostgreSQL + Google Gemini

---

## ⭐ Apoie o Projeto

Se você gostou do Planora:
- ⭐ Star este repositório
- 🤝 Compartilhe com amigos
- 🐛 Reporte bugs
- 💡 Sugira features
- 🙏 Contribua código

---

## 🎉 Começar Agora!

```bash
npm install
npx prisma migrate dev
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) e comece a gerar seus planos! 🚀

---

**Last Updated**: 30/03/2026 | **Version**: 0.1.0 | **Status**: MVP Ready

*Desenvolvido com ❤️ para transformar o aprendizado em autodesenvolvimento*

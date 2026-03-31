# Planora - Resumo Executivo e FAQ

## 📌 Resumo Executivo

### O que é?

**Planora** é uma plataforma web moderna de autodesenvolvimento que utiliza Inteligência Artificial (Google Gemini) para gerar planos de estudos personalizados. Usuarios descrevem seus objetivos de aprendizado e recebem um cronograma estruturado em semanas com tarefas específicas.

### Problema que Resolve

- 😕 Pessoal não sabe por onde começar em seu aprendizado
- 😕 Dificuldade em estruturar e organizar o tempo de estudo
- 😕 Falta de orientação personalizada baseada em nível e disponibilidade
- 😕 Motivação reduzida sem um plano claro

### Solução

✅ Gera planos de estudo automatizados com IA em segundos
✅ Adapta ao nível do usuário (Iniciante/Intermediário/Avançado)
✅ Organiza em semanas com tarefas diárias
✅ Persiste dados localmente e em banco de dados
✅ Interface moderna e intuitiva com animações fluidas

---

## 🎯 Casos de Uso

### 1. Aluno Iniciante
> "Quero aprender Python do zero em 3 meses"

**Fluxo:**
1. Acessa Planora
2. Digita: "Python do zero em 3 meses, sou iniciante"
3. IA gera plano com 12 semanas
4. Cada semana tem 3-4 tarefas práticas
5. Progressão: Variáveis → Loops → Funções → POO → Projetos

### 2. Profissional em Transição
> "Preciso aprender React para mudar de carreira"

**Fluxo:**
1. Inserir: "React para desenvolvimento web, tenho 2 meses, intermediário"
2. Recebe plano com 8 semanas
3. Mistura teoria e prática
4. Inclui projetos reais

### 3. Estudante Aprofundando
> "Quero dominar TypeScript avançado"

**Fluxo:**
1. Descrever: "TypeScript avançado, 4 semanas, tenho experiência"
2. Plano focado em tipos complexos, generics, decorators
3. Tarefas de nível avançado

---

## 💡 Principais Features

### ✨ Feature 1: Geração Inteligente
- IA analisa objetivo e gera plano estruturado
- Tempo de resposta: ~1-2 segundos
- Modelo usado: Google Gemini 3 Flash (otimizado)

### ✨ Feature 2: Personalização
- **Por Nível**: Iniciante → Intermediário → Avançado
- **Por Tempo**: 1 semana até 52 semanas
- **Por Interesse**: Qualquer tópico possível

### ✨ Feature 3: Organização em Semanas
```
Semana 1: Fundamentos (2-4 tarefas)
Semana 2: Conceitos básicos (3-5 tarefas)
Semana 3: Prática (2-3 tarefas)
...
```

### ✨ Feature 4: Rastreamento
- Marcar tarefas como concluídas
- Visualizar progresso
- Sincronização automática

### ✨ Feature 5: UI Moderna
- Animações fluidas com Framer Motion
- Design responsivo com Tailwind CSS
- Ícones modernos com Lucide React
- Tema visual atraente

---

## 📊 Stack Técnico (Resumo)

### Frontend
- **React 19** + TypeScript
- **Next.js 16** (Framework full-stack)
- **Tailwind CSS 4** (Styling)
- **Framer Motion** (Animações)

### Backend
- **Next.js API Routes** (Servidores)
- **Prisma 7.5** (ORM)
- **PostgreSQL** (Banco de dados)

### IA
- **Google Gemini API** (Geração de planos)

### DevOps
- **TypeScript** (Type safety)
- **ESLint** (Code quality)
- **dotenv** (Configuração)

---

## 🚀 Como Funciona - Fluxo Visual

```
1. USUARIO DIGITA OBJETIVO
   ↓
   "Aprender JavaScript em 2 semanas, sou iniciante"
   ↓
2. FRONTEND ENVIA PARA API
   ↓
   POST /api/goal { prompt: "..." }
   ↓
3. API CHAMA IA (GOOGLE GEMINI)
   ↓
   Prompt: "Você é um TECH LEAD. Crie plano de estudos..."
   ↓
4. IA GERA RESPOSTA ESTRUTURADA
   ↓
   JSON com title, level, weeks, studyPlan
   ↓
5. API VALIDA E RETORNA
   ↓
   Response 200 + JSON
   ↓
6. FRONTEND ATUALIZA TELA
   ↓
   Anima novo plano com Framer Motion
   Salva em localStorage
   ↓
7. USUARIO VÊ RESULTADO
   ↓
   Plano apresentado com semanas expandíveis
   Pode marcar tarefas como concluídas
```

---

## 💰 Modelo de Negócio

### Atual
- ✅ MVP público e gratuito
- ✅ Sem modelo de monetização
- ✅ Apenas custos de infraestrutura (Gemini API)

### Futuras Oportunidades
- 💡 Plano free (básico) vs premium (avançado)
- 💡 Certificados após conclusão de plano
- 💡 Comunidade com compartilhamento de planos
- 💡 Integração com plataformas educacionais
- 💡 Análise de progresso com gráficos
- 💡 Recomendações de cursos externos

---

## 🎓 Requisitos para Usar

### Para Usuários
- ✅ Navegador moderno (Chrome, Firefox, Safari, Edge)
- ✅ Conexão com internet
- ✅ Nenhum software adicional necessário

### Para Desenvolvedores
- ✅ Node.js 18+
- ✅ npm ou yarn
- ✅ PostgreSQL 12+
- ✅ Conta Google Cloud (para API Gemini)

---

## 🔒 Considerações de Segurança

### Implementado
✅ Type safety com TypeScript
✅ Validação de entrada com Zod
✅ Error handling apropriado
✅ Conexão segura com BD

### Roadmap de Segurança
- 🔐 Autenticação com NextAuth.js
- 🔐 Rate limiting em APIs
- 🔐 Criptografia de senhas (bcrypt)
- 🔐 CORS configuration
- 🔐 Sanitização de inputs
- 🔐 Logging de segurança

---

## 📈 Métricas de Sucesso

### Técnicas
- ⏱️ Tempo de resposta: < 3 segundos
- 📊 Taxa de sucesso de geração: > 95%
- 🚀 Uptime: > 99%
- 🔧 Cobertura de testes: > 80%

### Usuário
- 📝 Planos gerados por dia
- ✅ Taxa de conclusão de tarefas
- ⭐ Satisfação do usuário
- 🔄 Retenção de usuários

---

## 📞 FAQ - Perguntas Frequentes

### ❓ P: Como os planos são gerados?

**R:** Você descreve seu objetivo e a IA (Google Gemini) analisa o texto para criar um plano estruturado em semanas com tarefas específicas. A IA é treinada para atuar como um "TECH LEAD" e gera planos progressivos.

---

### ❓ P: Posso usar Planora offline?

**R:** Você pode visualizar planos já salvos offline, mas para gerar novos planos precisa de conexão com internet (para chamar a IA). Os planos são salvos em localStorage no seu navegador.

---

### ❓ P: Meus dados são salvos com segurança?

**R:** Atualmente, os planos são salvos em localStorage no navegador (dados locais). Estamos desenvolvendo um sistema de accounts para salvar no servidor. Não compartilhamos dados com terceiros.

---

### ❓ P: Qual é o custo de usar Planora?

**R:** Planora é completamente gratuito! Os custos de API são cobertos pelo servidor. No futuro, pode haver um modelo freemium, mas o acesso básico será sempre gratuito.

---

### ❓ P: Posso gerar planos para qualquer assunto?

**R:** Sim! Qualquer coisa que possa ser aprendida em semanas:
- ✅ Programação (Python, JavaScript, Go, etc)
- ✅ Idiomas (Inglês, Espanhol, Japonês)
- ✅ Design (UX, UI, Graphic Design)
- ✅ Hobbies (Guitarra, Fotografia, Culinária)
- ✅ Profissional (Liderança, Comunicação, Marketing)

---

### ❓ P: Posso editar o plano após geração?

**R:** Atualmente, você pode marcar tarefas como concluídas. Estamos desenvolvendo funcionalidade para editar tarefas individuais e adicionar novas.

---

### ❓ P: Como é determinado o nível (Iniciante/Intermediário/Avançado)?

**R:** A IA analisa sua descrição:
- **Iniciante**: "do zero", "sem experiência", "novato"
- **Intermediário**: "tenho experiência", "já conheço", "básico"
- **Avançado**: "dominar", "especializar", "aprofundar"

---

### ❓ P: Quanto tempo leva para gerar um plano?

**R:** Geralmente 1-3 segundos, dependendo:
- Latência da rede
- Tamanho do objetivo descrito
- Carga do servidor Google Gemini

---

### ❓ P: Posso compartilhar meu plano com amigos?

**R:** Atualmente você pode copiar o URL ou exportar como JSON. Estamos desenvolvendo funcionalidade de compartilhamento direto com link.

---

### ❓ P: E se a IA gerar um plano ruim?

**R:** Você pode tentar novamente com uma descrição mais detalhada:
- ❌ "Aprender programação" (vago)
- ✅ "Aprender Python para análise de dados em 6 semanas, sou iniciante" (claro)

---

### ❓ P: Preciso criar uma conta?

**R:** No MVP atual, não! Tudo é anônimo e salvo no navegador. Em breve adicionaremos contas para sincronizar entre dispositivos.

---

### ❓ P: Como reportar um problema?

**R:** Abra uma issue no GitHub ou envie email. Estamos sempre melhorando!

---

### ❓ P: Planora é open source?

**R:** Atualmente é um projeto privado, mas estamos considerando open source no futuro!

---

## 🗺️ Roadmap Futuro

### Q1 2026
- ✅ MVP inicial (concluído)
- 🔲 Autenticação de usuários
- 🔲 Persistência em servidor

### Q2 2026
- 🔲 Sistema de certificados
- 🔲 Análise de progresso
- 🔲 Recomendações de recursos

### Q3 2026
- 🔲 Comunidade com fórum
- 🔲 Compartilhamento de planos
- 🔲 Integração com plataformas educacionais

### Q4 2026
- 🔲 Aplicativo mobile (React Native)
- 🔲 Modo offline completo
- 🔲 Gamification (badges, streaks)

---

## 🎓 Casos de Sucesso (Futuros)

> "Com Planora, consegui estruturar meu aprendizado de React e conseguir um novo emprego em 3 meses!" — *João Silva*

> "Adorei como o plano foi personalizado para meu nível intermediário. Muito útil!" — *Maria Santos*

> "Finalmente consegui começar meu hobby de fotografia com um plano bem organizado." — *Pedro Costa*

---

## 📞 Contato e Suporte

### Issues e Bugs
- GitHub Issues: [projeto/issues](https://github.com/projeto)
- Email: suporte@planora.com

### Sugestões
- Abra uma discussion no GitHub
- Envie email com feedback

### Comunidade
- Discord: [link do servidor]
- Twitter: @PlanoraPlatform (futuro)

---

## 📚 Recursos Educacionais

Enquanto usa Planora, confira também:

### Plataformas Recomendadas
- [Codecademy](https://codecademy.com) - Aprendizado interativo
- [Udemy](https://udemy.com) - Cursos pagos
- [freeCodeCamp](https://freecodecamp.org) - Cursos gratuitos
- [Coursera](https://coursera.org) - Cursos universidade

### Comunidades
- [Stack Overflow](https://stackoverflow.com) - Q&A
- [Dev.to](https://dev.to) - Blog de tech
- [GitHub](https://github.com) - Código open source

---

## ⚖️ Política de Uso

### Permitido
✅ Gerar quantos planos quiser
✅ Compartilhar seus planos
✅ Usar para fins educacionais
✅ Dar feedback e sugestões

### Não Permitido
❌ Usar para fins comerciais sem permissão
❌ Spamming de requisições
❌ Tentar hackar a plataforma
❌ Redistribuir sem créditos

---

## 🏆 Prêmios e Reconhecimento

- 🎯 Projeto desenvolvido como trabalho final de IA + Soft Skills
- 🎯 Demonstra integração de IA com desenvolvimento web moderno
- 🎯 Foco em UX/UI com tecnologias modernas

---

## 📝 Versão da Documentação

- **Versão**: 1.0 Completa
- **Data**: 30/03/2026
- **Status**: Completo e Detalhado
- **Próximas Atualizações**: Q2 2026

---

## 🎉 Conclusão

Planora é mais que uma ferramenta — é um **facilitador de autodesenvolvimento** que torna o aprendizado mais estruturado, personalizado e acessível. Com suporte de IA e interface moderna, está pronto para revolucionar como as pessoas planejam seu desenvolvimento.

**Bem-vindo ao futuro do aprendizado! 🚀**

---

**Desenvolvido com ❤️ por Matheus | Março 2026**

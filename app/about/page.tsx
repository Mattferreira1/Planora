"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Brain,
  Target,
  Zap,
  Layers,
  ArrowRight,
  Code2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-violet-500/30 pb-24">
      {/* Navbar Simples (Caso não esteja usando um layout global) */}
      <nav className="sticky top-0 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Brain className="w-6 h-6 text-violet-500 group-hover:text-violet-400 transition-colors" />
            <span className="font-bold text-lg tracking-tight">Planora</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            Ir para o Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-20">
        {/* Cabeçalho */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            variants={fadeIn}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            Nossa Missão
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-100 mb-6"
          >
            Menos tempo planejando. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-violet-600">
              Mais tempo executando.
            </span>
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-lg text-zinc-400 leading-relaxed"
          >
            Acreditamos que o maior obstáculo para o aprendizado não é a falta
            de conteúdo, mas sim a sobrecarga de informações. Construímos o
            Planora para eliminar a &quot;paralisia de análise&quot; e
            transformar grandes ambições em passos diários.
          </motion.p>
        </motion.div>

        {/* Seção: Como Funciona (Bento Grid) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[280px]"
        >
          {/* Card 1: O Input */}
          <motion.div
            variants={fadeIn}
            className="col-span-1 md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden group hover:border-zinc-700 transition-colors"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] -mr-20 -mt-20 transition-opacity group-hover:opacity-100 opacity-50"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 text-violet-400">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-zinc-100 mb-2">
                  1. Defina o Alvo
                </h3>
                <p className="text-zinc-400 leading-relaxed max-w-md">
                  Você nos diz o que quer aprender, seu nível de conhecimento
                  atual e quanto tempo livre tem na agenda. Não precisa
                  organizar tópicos, nós fazemos isso.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: A IA (Menor) */}
          <motion.div
            variants={fadeIn}
            className="col-span-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between hover:border-violet-500/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-6 text-violet-400">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">
                2. A IA Trabalha
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Nossos modelos analisam seu objetivo e quebram conceitos
                complexos em uma trilha pedagógica lógica e sequencial.
              </p>
            </div>
          </motion.div>

          {/* Card 3: O Cronograma (Menor) */}
          <motion.div
            variants={fadeIn}
            className="col-span-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between hover:border-zinc-700 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 text-violet-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">
                3. Plano Estruturado
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                O resultado é um cronograma dividido em semanas e tarefas
                diárias claras, perfeitamente ajustado ao seu ritmo.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Execução */}
          <motion.div
            variants={fadeIn}
            className="col-span-1 md:col-span-2 bg-linear-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden group hover:border-violet-500/30 transition-colors"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center mb-6 text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-zinc-100 mb-2">
                  4. Foco na Execução
                </h3>
                <p className="text-zinc-400 leading-relaxed max-w-md">
                  Abra o dashboard, veja a tarefa do dia e execute. Marque como
                  concluído e assista sua barra de progresso encher. A
                  consistência se torna inevitável.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Seção: Para quem é? */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-32 border-t border-zinc-800/50 pt-20 text-center"
        >
          <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Code2 className="w-8 h-8 text-violet-400" />
          </div>
          <h2 className="text-3xl font-bold text-zinc-100 mb-6">
            Criado para mentes inquietas
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Seja você um desenvolvedor aprendendo uma nova stack, um estudante
            se preparando para certificações, ou alguém buscando migrar de
            carreira. Se o caminho parece confuso, a IA ilumina os próximos
            passos.
          </p>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] active:scale-95"
          >
            Começar a planejar
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

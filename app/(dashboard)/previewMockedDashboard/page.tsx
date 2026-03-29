"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Send,
  Target,
  Clock,
  CheckCircle2,
  Flame,
  MoreVertical,
  Loader2,
} from "lucide-react";

// Dados simulados das metas atuais
const mockGoals = [
  {
    id: 1,
    title: "Dominar React Server Components",
    category: "Programação",
    progress: 65,
    totalTasks: 24,
    completedTasks: 15,
    timeLeft: "2 semanas",
    color: "from-blue-500 to-violet-500",
  },
  {
    id: 2,
    title: "Inglês para Entrevistas Tech",
    category: "Idiomas",
    progress: 30,
    totalTasks: 40,
    completedTasks: 12,
    timeLeft: "1 mês",
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: 3,
    title: "Fundamentos de UX/UI",
    category: "Design",
    progress: 100,
    totalTasks: 15,
    completedTasks: 15,
    timeLeft: "Concluído",
    color: "from-violet-500 to-fuchsia-500",
  },
];

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [newPlan, setNewPlan] = useState(null);
  //   async function createGoal() {
  //     try {
  //       const response = await fetch("/api/goal", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },

  //         body: JSON.stringify({
  //           prompt:
  //             "Quero aprender Next.js e Tailwind em 1 mês. Meu nível é iniciante.",
  //         }),
  //       });
  //       const json = await response.json();

  //       console.log("nova tarefa registrada:", json);
  //     } catch (error) {
  //       console.error("Erro", error);
  //     }
  //   }
  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    // Simula o tempo de resposta da IA
    setTimeout(() => {
      setIsGenerating(false);
      setPrompt("");
      // Aqui você redirecionaria para a tela do plano gerado ou abriria um modal
    }, 3000);
  };
  // console.log(newPlan);

  return (
    <div className="space-y-10 pb-10">
      {/* Seção 1: Criador de Planos com IA */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-1 overflow-hidden"
        >
          {/* Efeito de borda brilhante animada */}
          <div className="absolute inset-0 bg-linear-to-r from-violet-600/20 via-fuchsia-600/20 to-violet-600/20 opacity-50 blur-xl"></div>

          <div className="relative bg-zinc-950 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-violet-500/10 rounded-lg border border-violet-500/20">
                <Sparkles className="w-5 h-5 text-violet-400" />
              </div>
              <h2 className="text-xl font-semibold text-zinc-100">
                Qual é o seu próximo objetivo?
              </h2>
            </div>
            <form onSubmit={handleGeneratePlan} className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Quero aprender Next.js e Tailwind em 1 mês. Tenho 2 horas livres por dia após o trabalho..."
                className="w-full min-h-30 bg-zinc-900 border border-zinc-800 rounded-xl p-4 pr-16 text-zinc-100 placeholder:text-zinc-600 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                disabled={isGenerating}
              />

              <button
                type="submit"
                disabled={!prompt.trim() || isGenerating}
                className="absolute bottom-4 right-4 p-3 rounded-lg bg-violet-600 text-white hover:bg-violet-700 disabled:bg-zinc-800 disabled:text-zinc-500 transition-all active:scale-95"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>

            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex items-center gap-2 text-sm text-violet-400"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>
                  A IA está analisando seu objetivo e estruturando o
                  cronograma...
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Seção 2: Widgets de Visão Geral */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Metas Ativas",
            value: "2",
            icon: Target,
            color: "text-blue-400",
          },
          {
            label: "Tarefas Hoje",
            value: "5",
            icon: CheckCircle2,
            color: "text-violet-400",
          },
          {
            label: "Horas Estudadas",
            value: "24h",
            icon: Clock,
            color: "text-emerald-400",
          },
          {
            label: "Ofensiva (Dias)",
            value: "12",
            icon: Flame,
            color: "text-orange-400",
          },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-400">
                {stat.label}
              </span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <span className="text-3xl font-bold text-zinc-100">
              {stat.value}
            </span>
          </motion.div>
        ))}
      </section>

      {/* Seção 3: Meus Planos de Estudo */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-zinc-100">
            Seus Planos em Andamento
          </h3>
          <button className="text-sm text-violet-400 hover:text-violet-300 transition-colors disabled:text-violet-800">
            Ver todos
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGoals.map((goal, idx) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300">
                  {goal.category}
                </span>
                <button className="text-zinc-500 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <h4 className="text-lg font-bold text-zinc-100 mb-6 leading-tight group-hover:text-violet-300 transition-colors">
                {goal.title}
              </h4>

              {/* Barra de Progresso */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Progresso</span>
                  <span className="text-zinc-100 font-medium">
                    {goal.progress}%
                  </span>
                </div>
                <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className={`h-full bg-linear-to-r ${goal.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              {/* Rodapé do Card */}
              <div className="flex items-center justify-between text-sm border-t border-zinc-800 pt-4">
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {goal.completedTasks}/{goal.totalTasks} tasks
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Clock className="w-4 h-4" />
                  <span>{goal.timeLeft}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

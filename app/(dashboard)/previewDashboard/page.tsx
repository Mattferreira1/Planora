"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  Send,
  Target,
  Clock,
  CheckCircle2,
  Flame,
  MoreVertical,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { typeGoal } from "@/utils/types";
import { mockData } from "./MockedData";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [plans, setPlans] = useState<typeGoal[]>([]);
  const [openedTaskId, setOpenedTaskId] = useState<number | null>(null);

  // const handleGeneratePlan = async (e: any) => {
  //   e.preventDefault();

  //   if (!prompt) return;

  //   try {
  //     setIsGenerating(true);
  //     const userPrompt = prompt;

  //     const response = await fetch("/api/goal", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ prompt: userPrompt }),
  //     });

  //     const json = await response.json();

  //     if (!response.ok) {
  //       alert(json.error || "Erro ao criar plano");
  //       return;
  //     }

  //     console.log("novo plano:", json);
  //     localStorage.setItem("plans", JSON.stringify([...plans, json]));
  //     setPlans((prev) => [...prev, json]);
  //   } catch (error) {
  //     console.error("Erro", error);
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  function handleCompletetask(
    goalIndex: number,
    planIndex: number,
    taskIdx: number,
  ) {
    setPlans((prevPlans) => {
      // Cria uma cópia profunda do array de planos
      const newPlans = prevPlans.map((goal, gIdx) => {
        if (gIdx !== goalIndex) return goal;

        // Cria uma cópia profunda do goal atual
        const newStudyPlan = goal.studyPlan.map((week, wIdx) => {
          if (wIdx !== planIndex) return week;

          // Cria uma cópia das tasks com a task específica atualizada
          const newTasks = week.tasks.map((task, tIdx) => {
            if (tIdx !== taskIdx) return task;
            return { ...task, done: !task.done };
          });

          return { ...week, tasks: newTasks };
        });

        // Calcula o total de tarefas concluídas
        const completedTasks = newStudyPlan
          .flatMap((week) => week.tasks)
          .filter((task) => task.done).length;

        return { ...goal, studyPlan: newStudyPlan, completedTasks };
      });

      localStorage.setItem("plans", JSON.stringify(newPlans));
      return newPlans;
    });
  }

  useEffect(() => {
    const storedPlans = localStorage.getItem("plans");
    if (storedPlans) {
      // setPlans(JSON.parse(storedPlans));
      setPlans(mockData);
    }
  }, []);
  // console.log(plans);

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
            {/* <button onClick={createGoal}>Criar Plano</button> */}
            <form className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Quero aprender Next.js e Tailwind em 1 mês. Tenho 2 horas livres por dia após o trabalho..."
                className="w-full min-h-30 bg-zinc-900 border border-zinc-800 rounded-xl p-4 pr-16 text-zinc-100 placeholder:text-zinc-600 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                disabled={isGenerating}
              />

              <button
                type="submit"
                disabled={true}
                className="absolute bottom-4 right-4 p-3 rounded-lg cursor-not-allowed bg-violet-600 text-white hover:bg-violet-700 disabled:bg-zinc-800 disabled:text-zinc-500 transition-all active:scale-95"
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
            value: plans.length.toString(),
            icon: Target,
            color: "text-blue-400",
          },
          {
            label: "Tarefas Hoje",
            value: plans.length.toString(),
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
            value: "0",
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
          <button className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
            Ver todos
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((goal, goalIndex) => (
            <motion.div
              key={goalIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + goalIndex * 0.1 }}
              className={`bg-zinc-900 border border-zinc-800 p-6 rounded-2xl transition-all duration-300 group overflow-hidden ${
                openedTaskId === goalIndex
                  ? "col-span-1 md:col-span-2 lg:col-span-3 border-violet-500/50 shadow-[0_0_30px_rgba(124,58,237,0.1)] order-first"
                  : "hover:border-zinc-700"
              }`}
            >
              {/* Cabeçalho do Card */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300">
                  {"teste"}
                </span>

                <div className="flex items-center gap-1">
                  {/* NOVO: Botão de Expandir/Recolher */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenedTaskId(
                        openedTaskId === goalIndex ? null : goalIndex,
                      );
                    }}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-all flex items-center justify-center"
                    aria-label="Expandir plano"
                  >
                    <motion.div
                      animate={{
                        rotate: openedTaskId === goalIndex ? 180 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  {/* Botão de Opções (More) */}
                  <button className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 opacity-0 group-hover:opacity-100 transition-all">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h4 className="text-lg font-bold text-zinc-100 mb-6 leading-tight">
                {goal.title}
              </h4>

              {/* Barra de Progresso */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Progresso</span>
                  <span className="text-zinc-100 font-medium">
                    {((goal.completedTasks! / goal.totalTasks) * 100).toFixed(
                      0,
                    ) + "%"}
                  </span>
                </div>
                <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="h-full bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${(goal.completedTasks! / goal.totalTasks) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Rodapé do Card */}
              <div className="flex items-center justify-between text-sm border-t border-zinc-800 pt-4">
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {goal.completedTasks!.toString()} / {goal.totalTasks}{" "}
                    tarefas
                  </span>
                </div>
                {/* <div className="flex items-center gap-1.5 text-zinc-400">
                  <Clock className="w-4 h-4" />
                  <span>{goal.timeLeft}</span>
                </div> */}
              </div>

              {/* CONTEÚDO EXPANDIDO: Cronograma Semanal */}
              <AnimatePresence>
                {openedTaskId === goalIndex && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="border-t border-zinc-800/80 pt-6"
                  >
                    <div className="space-y-6">
                      {goal.studyPlan.map((plan, planIndex) => (
                        <div key={planIndex} className="space-y-3">
                          {/* Título da Semana (Divisor visual) */}
                          <div className="flex items-center gap-3">
                            <div className="h-px bg-zinc-800 flex-1"></div>
                            <h5 className="text-xs font-bold text-violet-400 uppercase tracking-widest">
                              Semana {plan.week}
                            </h5>
                            <div className="h-px bg-zinc-800 flex-1"></div>
                          </div>

                          {/* Lista de Tarefas */}
                          <div className="grid gap-2 lg:grid-cols-2">
                            {plan.tasks.map((task, taskIdx) => (
                              <div
                                key={taskIdx}
                                className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50 hover:border-violet-500/30 hover:bg-zinc-800/50 transition-all group/task cursor-pointer"
                              >
                                <button
                                  onClick={() =>
                                    handleCompletetask(
                                      goalIndex,
                                      planIndex,
                                      taskIdx,
                                    )
                                  }
                                >
                                  {task.done ? (
                                    <CheckCircle2
                                      className={` mt-0.5 w-4 h-4 text-violet-500 transition-colors`}
                                    />
                                  ) : (
                                    <div className="mt-0.5 w-4 h-4 rounded-full border-2 border-zinc-700 group-hover/task:border-violet-500 shrink-0 transition-colors" />
                                  )}
                                </button>

                                <p className="text-sm text-zinc-300 leading-relaxed group-hover/task:text-zinc-100 transition-colors">
                                  {task.title}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

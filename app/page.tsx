"use client";
import { motion, Variants } from "framer-motion";
import {
  Brain,
  Calendar,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { redirect } from "next/navigation";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut", // válido para Transition
    },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-violet-500/30">
      {/* Navbar Minimalista */}
      <nav className="fixed top-0 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-violet-500" />
            <span className="font-bold text-lg tracking-tight">Planora</span>
          </div>
          <button
            className="text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
            onClick={() => redirect("/login")}
          >
            Entrar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.div
            variants={fadeIn}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-violet-500 animate-pulse"></span>
            Acelere sua evolução
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-100 mb-6"
          >
            Transforme objetivos em{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-violet-600">
              planos de ação executáveis.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Elimine a dúvida sobre o que estudar. Nossa Inteligência Artificial
            gera cronogramas estruturados e semanais adaptados ao seu nível e
            tempo disponível.
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => redirect("dashboard")}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] active:scale-95"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 font-semibold transition-all active:scale-95">
              Ver como funciona
            </button>
          </motion.div>
        </motion.div>

        {/* Mockup / Dashboard Preview Emulado */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 w-full max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-2 shadow-2xl overflow-hidden"
        >
          <div className="rounded-xl bg-zinc-950 border border-zinc-800/50 h-100 w-full relative flex items-center justify-center overflow-hidden">
            {/* Elementos decorativos do mockup */}
            <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-violet-500/50 to-transparent"></div>
            {/* <p className="text-zinc-600 font-mono text-sm"> */}
            <iframe
              src="/previewMockedDashboard"
              className="w-full h-full"
            ></iframe>
            {/* </p> */}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-zinc-900/30 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
              A proposta é simples: executar.
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Deixe o planejamento com a IA e foque 100% da sua energia em
              aprender e evoluir diariamente.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-violet-500/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-violet-600/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-6">
              Do objetivo à maestria em 3 passos
            </h2>
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Defina seu objetivo",
                  desc: "Informe o que você quer aprender, seu nível atual e quantas horas tem disponíveis.",
                },
                {
                  step: "02",
                  title: "A IA estrutura o caminho",
                  desc: "Receba um cronograma inteligente dividido em semanas e tarefas diárias.",
                },
                {
                  step: "03",
                  title: "Acompanhe e execute",
                  desc: "Marque as tarefas concluídas e veja seu progresso subir no dashboard.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-violet-400 font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-zinc-100 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-violet-500 blur-[100px] opacity-20"></div>
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
              <ul className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800/50 bg-zinc-950"
                  >
                    <CheckCircle2
                      className={`w-5 h-5 ${i === 1 ? "text-violet-500" : "text-zinc-600"}`}
                    />
                    <div className="h-2 w-3/4 bg-zinc-800 rounded-full"></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-violet-600 blur-[120px] opacity-30"></div>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-6 relative z-10">
            Pronto para parar de planejar e começar a agir?
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto relative z-10">
            Junte-se a dezenas de estudantes e profissionais que estão
            acelerando suas carreiras com nosso planejador.
          </p>
          <button className="relative z-10 px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-all active:scale-95">
            Criar meu primeiro plano grátis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-zinc-500 text-sm border-t border-zinc-900">
        <p>
          &copy; {new Date().getFullYear()} Planora. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
}

// Dados das features
const features = [
  {
    icon: <Calendar className="w-6 h-6 text-violet-400" />,
    title: "Cronogramas Dinâmicos",
    description:
      "Sua rotina mudou? O plano se adapta automaticamente. Nunca mais fique frustrado por perder um dia de estudos.",
  },
  {
    icon: <Brain className="w-6 h-6 text-violet-400" />,
    title: "Curadoria Inteligente",
    description:
      "A IA divide tópicos complexos em conceitos digeríveis, seguindo as melhores práticas pedagógicas e ordem cronológica.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-violet-400" />,
    title: "Progresso Visível",
    description:
      "Gamificação e dashboards claros mostram exatamente o quanto você evoluiu e o que falta para dominar o assunto.",
  },
];

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  User,
  Mail,
  Lock,
  Github,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userRegisterData = {
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };
    console.log(userRegisterData);
    if (userRegisterData.password !== userRegisterData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setIsLoading(true);
    // Simulação de delay da API de cadastro
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-6 selection:bg-violet-500/30">
      {/* Elemento decorativo de fundo */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-violet-500/50 transition-colors">
              <Brain className="w-6 h-6 text-violet-500" />
            </div>
          </Link>
        </div>

        {/* Card de Cadastro */}
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-zinc-100 mb-2">
              Crie sua conta
            </h1>
            <p className="text-zinc-400 text-sm">
              Dê o primeiro passo para organizar seus estudos com IA.
            </p>
          </div>

          {/* Botões Sociais */}
          {/* <div className="flex flex-col gap-3 mb-6">
            <button className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 font-medium transition-all active:scale-[0.98]">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Cadastrar com Google
            </button>

            <button className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 font-medium transition-all active:scale-[0.98]">
              <Github className="w-5 h-5" />
              Cadastrar com GitHub
            </button>
          </div> */}

          <div className="relative flex items-center py-4">
            <div className="grow border-t border-zinc-800"></div>
            <span className="shrink-0 mx-4 text-zinc-500 text-xs uppercase tracking-wider">
              cadastre-se aqui
            </span>
            <div className="grow border-t border-zinc-800"></div>
          </div>

          {/* Formulário Tradicional */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {/* Campo Nome */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-400 pl-1">
                Nome completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  id="username"
                  name="username"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                />
              </div>
            </div>

            {/* Campo Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-400 pl-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="email"
                  required
                  name="email"
                  id="email"
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-400 pl-1">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="password"
                  required
                  name="password"
                  id="password"
                  placeholder="Mínimo 8 caracteres"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-400 pl-1">
                Confirme sua senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="password"
                  required
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Mínimo 8 caracteres"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                />
              </div>
            </div>
            {error && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-400 pl-1">
                  {error}
                </label>
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-6 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Criar conta grátis
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Link para Login */}
        <p className="text-center text-zinc-500 text-sm mt-8">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
          >
            Entrar na plataforma
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

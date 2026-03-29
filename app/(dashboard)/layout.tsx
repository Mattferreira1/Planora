"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  LayoutDashboard,
  Target,
  BookOpenText,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Itens de navegação da barra lateral
const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    disabled: false,
  },
  // { name: "Meus Planos", href: "/planos", icon: Target, disabled: true },
  // {
  //   name: "Biblioteca",
  //   href: "/biblioteca",
  //   icon: BookOpenText,
  //   disabled: true,
  // },
  // {
  //   name: "Configurações",
  //   href: "/configuracoes",
  //   icon: Settings,
  //   disabled: true,
  // },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans selection:bg-violet-500/30">
      {/* Barra Lateral (Sidebar) - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-zinc-900 border-r border-zinc-800 p-6 fixed inset-y-0 z-40">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Barra Lateral (Sidebar) - Mobile (Overlay) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay de fundo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            {/* Painel da Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-72 bg-zinc-900 border-r border-zinc-800 p-6 z-50 md:hidden flex flex-col"
            >
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <SidebarContent
                pathname={pathname}
                closeSidebar={() => setIsSidebarOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Área Principal (Main Content) */}
      <div className="flex-1 md:pl-64 flex flex-col">
        {/* Cabeçalho Topo (Header) */}
        <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50 h-20 flex items-center px-6 md:px-10 justify-between">
          <div className="flex items-center gap-4">
            {/* Botão Menu Mobile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 md:hidden text-zinc-300 hover:border-zinc-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-zinc-100">
              {navItems.find((item) => item.href === pathname)?.name ||
                "Visão Geral"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notificações */}
            <button className="p-2.5 rounded-xl hover:bg-zinc-900 text-zinc-400 hover:text-violet-400 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
            </button>

            {/* Avatar/Perfil Simplificado */}
            <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-semibold text-violet-300">
                ML
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-zinc-100">
                  Matheus Lima
                </p>
                <p className="text-xs text-zinc-500">Plano Pro</p>
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo da Página */}
        <main className="flex-1 p-6 md:p-10 bg-zinc-950/50">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

// Componente auxiliar para o conteúdo da Sidebar (evita repetição)
interface SidebarContentProps {
  pathname: string;
  closeSidebar?: () => void;
}

function SidebarContent({ pathname, closeSidebar }: SidebarContentProps) {
  return (
    <>
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-3 mb-12"
        onClick={closeSidebar}
      >
        <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shadow-inner">
          <Brain className="w-6 h-6 text-violet-500" />
        </div>
        <span className="font-bold text-lg tracking-tight text-zinc-50">
          Planora
        </span>
      </Link>

      {/* Navegação Principal */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.disabled ? "#" : item.href}
              onClick={closeSidebar}
              className={`group flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium transition-all duration-150 relative
                ${
                  isActive
                    ? "bg-violet-600/10 text-violet-300 border border-violet-500/20"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 border border-transparent"
                }`}
            >
              <item.icon
                className={`w-5 h-5 transition-colors ${isActive ? "text-violet-400" : "text-zinc-500 group-hover:text-zinc-300"}`}
              />
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute left-0 w-1 h-6 bg-violet-500 rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Ações Inferiores (Sair) */}
      <div className="border-t border-zinc-800 pt-6 mt-6">
        <button className="flex w-full items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut className="w-5 h-5" />
          Sair da Conta
        </button>
      </div>
    </>
  );
}

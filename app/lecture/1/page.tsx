"use client";

import VisionaryQuotes from "@/components/sections/VisionaryQuotes";
import TechLeadersOnAI from "@/components/sections/TechLeadersOnAI";
import ProgrammingEvolution from "@/components/sections/ProgrammingEvolution";
import WhatIsVibeCoding from "@/components/sections/WhatIsVibeCoding";
import ChatWidget from "@/components/ChatWidget";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Lecture1() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">강의 목록</span>
          </Link>
          <span className="text-sm text-gray-500">Lecture 1 — 프로그래밍의 진화와 바이브코딩</span>
        </div>
      </nav>

      <div className="pt-14">
        {/* Hero for Lecture 1 */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-[1]">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-gray-300">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                Week 1
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4"
            >
              프로그래밍의 진화와<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">바이브코딩</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              기계어에서 자연어까지 — 80년의 프로그래밍 역사를 한 눈에 살펴봅시다
            </motion.p>
          </div>
        </section>
        <VisionaryQuotes />
        <TechLeadersOnAI />
        <ProgrammingEvolution />
        <WhatIsVibeCoding />

        {/* Next Lecture Teaser */}
        <section className="py-20 bg-slate-950">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-500 mb-4">다음 시간에 계속됩니다</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Lecture 2: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">AI Agent & 환경 설정</span>
              </h3>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Claude, ChatGPT 등 다양한 AI 도구를 비교하고,
                Claude Code를 직접 설치하여 첫 바이브코딩을 체험합니다.
              </p>
              <Link
                href="/lecture/2"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/25 hover:scale-105"
              >
                Lecture 2로 이동
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>

      <footer className="py-8 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">2026 Fall Semester | 바이브코딩 기초</p>
        </div>
      </footer>

      <ChatWidget />
    </main>
  );
}

"use client";

import PromptPrinciples from "@/components/sections/PromptPrinciples";
import PromptExercises from "@/components/sections/PromptExercises";
import PromptAdvanced from "@/components/sections/PromptAdvanced";
import GoogleDeepMindPrompt from "@/components/sections/GoogleDeepMindPrompt";
import PromptResponses from "@/components/sections/PromptResponses";
import PromptDangers from "@/components/sections/PromptDangers";
import PromptBattle from "@/components/sections/PromptBattle";
import PromptTemplates from "@/components/sections/PromptTemplates";
import PromptSummary from "@/components/sections/PromptSummary";
import PromptHomework from "@/components/sections/PromptHomework";
import ChatWidget from "@/components/ChatWidget";
import Link from "next/link";
import { motion } from "framer-motion";
import LectureGuard from "@/components/LectureGuard";

export default function Lecture3() {
  return (
    <LectureGuard>
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
          <span className="text-sm text-gray-500">Lecture 3 — 프롬프트 엔지니어링</span>
        </div>
      </nav>

      <div className="pt-14">
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-[1]">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-500/15 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-gray-300">
                <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
                Week 3
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4"
            >
              프롬프트<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">엔지니어링</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              AI에게 공학 문제를 정확히 전달하는 기술 — 열전달 예제로 연습합니다
            </motion.p>
          </div>
        </section>

        <PromptPrinciples />
        <PromptExercises />
        <PromptAdvanced />
        <GoogleDeepMindPrompt />
        <PromptResponses />
        <PromptDangers />
        <PromptBattle />
        <PromptTemplates />
        <PromptSummary />
        <PromptHomework />

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
                Lecture 4: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Git & 버전 관리</span>
              </h3>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                AI가 만든 코드를 안전하게 관리하는 방법을 배우고,
                GitHub으로 버전 관리하는 기초를 익힙니다.
              </p>
              <Link
                href="/lecture/4"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold text-lg hover:from-emerald-500 hover:to-cyan-500 transition-all shadow-lg shadow-emerald-500/25 hover:scale-105"
              >
                Lecture 4로 이동
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
    </LectureGuard>
  );
}

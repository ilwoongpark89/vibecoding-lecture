"use client";

import AIAgents from "@/components/sections/AIAgents";
import HowLLMWorks from "@/components/sections/HowLLMWorks";
import PromptingTechniques from "@/components/sections/PromptingTechniques";
import ClaudeComparison from "@/components/sections/ClaudeComparison";
import Installation from "@/components/sections/Installation";
import LiveDemo from "@/components/sections/LiveDemo";
import FirstProject from "@/components/sections/FirstProject";
import CourseInfo from "@/components/sections/CourseInfo";
import ChatWidget from "@/components/ChatWidget";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Lecture2() {
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
          <span className="text-sm text-gray-500">Lecture 2 — AI Agent & 환경 설정</span>
        </div>
      </nav>

      <div className="pt-14">
        {/* Hero for Lecture 2 */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-[1]">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-gray-300">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                Week 2
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4"
            >
              AI Agent &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">환경 설정</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              다양한 AI 코딩 도구를 알아보고, Claude Code를 설치해봅시다
            </motion.p>
          </div>
        </section>

        <AIAgents />
        <HowLLMWorks />
        <PromptingTechniques />
        <ClaudeComparison />
        <Installation />
        <LiveDemo />
        <FirstProject />
        <CourseInfo />
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

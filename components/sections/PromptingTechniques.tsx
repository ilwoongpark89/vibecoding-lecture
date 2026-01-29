"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const techniques = [
  {
    id: 0,
    name: "Zero-Shot",
    badge: "기본",
    description: "예시 없이 직접 질문하는 가장 기본적인 방법",
    example: {
      label: "열전달 예시",
      prompt: `"원관 내부 강제 대류의 열전달 계수를 구하는 방법을 알려줘"`,
      result: "→ AI가 일반적인 설명을 제공",
    },
    pros: "빠르고 간단",
    cons: "맥락이 부족하면 부정확할 수 있음",
  },
  {
    id: 1,
    name: "Few-Shot",
    badge: "패턴 학습",
    description: "원하는 답변 형식의 예시를 먼저 보여주는 기법",
    example: {
      label: "열전달 예시",
      prompt: `"예시 1: 평판 자연대류 → Nu = C(GrPr)^n, h = Nu·k/L
예시 2: 원관 강제대류 → Nu = 0.023Re^0.8·Pr^0.4, h = Nu·k/D

문제: 구(sphere) 주위 강제대류의 열전달 계수를 같은 형식으로 구해줘"`,
      result: "→ AI가 같은 패턴으로 일관되게 답변",
    },
    pros: "출력 형식을 정확히 제어 가능",
    cons: "프롬프트가 길어짐",
  },
  {
    id: 2,
    name: "Chain-of-Thought",
    badge: "Google Research",
    description:
      'Google Research(2022)가 제안. "단계별로 생각해봐(Let\'s think step by step)"를 추가하면 AI의 추론 정확도가 크게 향상',
    example: {
      label: "열전달 예시",
      promptBefore: `Without CoT:\n"복합벽의 열저항을 구해줘"\n→ 가끔 단계를 건너뜀`,
      promptAfter: `With CoT:\n"복합벽의 열저항을 구해줘. 단계별로 생각해봐:\n1) 각 층의 전도 열저항\n2) 양쪽 대류 열저항\n3) 총 열저항\n4) 열유속 순서로."\n→ 정확한 단계별 풀이`,
    },
    keyPoint:
      '"Let\'s think step by step" 한 문장이 수학 문제 정확도를 40% 이상 향상시킴',
    paper:
      'Wei et al., "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models", 2022',
  },
  {
    id: 3,
    name: "Role Prompting",
    badge: "MIT Sloan",
    description:
      "AI에게 특정 역할/전문가 페르소나를 부여하는 기법. MIT Sloan EdTech에서 권장하는 핵심 전략",
    example: {
      label: "열전달 예시",
      promptBefore: `Without Role:\n"핀 효율을 구해줘"`,
      promptAfter: `With Role:\n"너는 20년 경력의 열전달 교수야. 학부 3학년 학생에게\n핀 효율을 설명하듯이, 각 단계를 명확히 보여주면서\n계산해줘. 학생이 자주 실수하는 부분도 짚어줘."\n→ AI가 교수 관점에서 상세하고 교육적인 답변 제공`,
    },
    quote:
      '"Providing a persona or voice to the AI significantly improves output quality"',
    quoteSource: "— MIT Sloan EdTech",
  },
];

export default function PromptingTechniques() {
  const [activeTab, setActiveTab] = useState(0);
  const tech = techniques[activeTab];

  return (
    <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            Advanced Techniques
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            프롬프팅 기법:{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              연구에서 실전까지
            </span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {techniques.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === t.id
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200 bg-slate-900/50 border border-slate-800"
              }`}
            >
              {activeTab === t.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {t.name}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === t.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-800 text-gray-500"
                  }`}
                >
                  {t.badge}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8"
          >
            {/* Description */}
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {tech.description}
            </p>

            {/* Example section */}
            <div className="mb-6">
              <h4 className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
                {tech.example.label}
              </h4>

              {/* Single prompt style (Zero-Shot, Few-Shot) */}
              {tech.example.prompt && (
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 font-mono text-sm text-gray-300 whitespace-pre-wrap mb-3">
                  {tech.example.prompt}
                </div>
              )}
              {tech.example.result && (
                <p className="text-cyan-400 text-sm font-medium">
                  {tech.example.result}
                </p>
              )}

              {/* Before/After style (CoT, Role) */}
              {tech.example.promptBefore && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-900 border border-red-500/20 rounded-xl p-5">
                    <span className="text-xs text-red-400 font-semibold uppercase tracking-wider">
                      Before
                    </span>
                    <pre className="font-mono text-sm text-gray-400 whitespace-pre-wrap mt-2">
                      {tech.example.promptBefore}
                    </pre>
                  </div>
                  <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-5">
                    <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                      After
                    </span>
                    <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap mt-2">
                      {tech.example.promptAfter}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Pros/Cons (Zero-Shot, Few-Shot) */}
            {tech.pros && (
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  장점: {tech.pros}
                </span>
                <span className="flex items-center gap-2 text-red-400">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  단점: {tech.cons}
                </span>
              </div>
            )}

            {/* Key point (CoT) */}
            {tech.keyPoint && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-3">
                <p className="text-emerald-300 font-medium text-sm">
                  핵심: {tech.keyPoint}
                </p>
              </div>
            )}
            {tech.paper && (
              <p className="text-gray-500 text-xs italic">
                논문: {tech.paper}
              </p>
            )}

            {/* Quote (Role Prompting) */}
            {tech.quote && (
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 mt-2">
                <p className="text-cyan-300 italic text-sm">{tech.quote}</p>
                <p className="text-cyan-500 text-xs mt-1">
                  {tech.quoteSource}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom MIT Sloan card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8"
        >
          <h3 className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-4">
            MIT Sloan의 핵심 조언
          </h3>
          <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
            &ldquo;프롬프트 엔지니어링의 현재 최선책은{" "}
            <span className="text-emerald-400 font-medium">
              &lsquo;프롬프트 엔지니어링을 하지 않는 것&rsquo;
            </span>
            이다. 대신 검증된 프롬프트 템플릿을 사용하라. 매번 새로 만들지
            말고, 잘 작동하는 패턴을 재사용하라.&rdquo;
          </blockquote>
          <p className="text-gray-500 mt-4 text-sm">— MIT Sloan, 2025</p>
        </motion.div>
      </div>
    </section>
  );
}

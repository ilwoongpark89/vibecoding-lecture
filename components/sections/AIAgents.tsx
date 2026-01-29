"use client";

import { motion } from "framer-motion";

const aiAgents = [
  {
    name: "Claude",
    company: "Anthropic",
    description: "안전하고 도움이 되도록 설계된 AI. 코드 작성, 분석, 디버깅에 탁월한 성능을 보여줍니다.",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
    features: ["코드 생성", "버그 수정", "코드 리뷰", "문서 작성"],
  },
  {
    name: "ChatGPT",
    company: "OpenAI",
    description: "세계에서 가장 널리 사용되는 AI 챗봇. 다양한 프로그래밍 언어를 지원합니다.",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
      </svg>
    ),
    features: ["대화형 코딩", "GPT-4o", "플러그인", "DALL-E 연동"],
  },
  {
    name: "Gemini",
    company: "Google",
    description: "Google의 최신 AI 모델. 멀티모달 기능과 Google 서비스 통합이 강점입니다.",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    features: ["멀티모달", "긴 컨텍스트", "Google 연동", "실시간 검색"],
  },
  {
    name: "GitHub Copilot",
    company: "GitHub / Microsoft",
    description: "IDE에 통합되어 실시간으로 코드를 제안해주는 AI 페어 프로그래머입니다.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    features: ["실시간 제안", "IDE 통합", "코드 완성", "채팅 기능"],
  },
  {
    name: "Cursor",
    company: "Cursor Inc.",
    description: "AI-first 코드 에디터. VS Code 기반으로 AI 기능이 네이티브로 통합되어 있습니다.",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M5.5 3l14 9-14 9V3z"/>
      </svg>
    ),
    features: ["AI 에디터", "Cmd+K", "코드베이스 이해", "멀티 파일 편집"],
  },
  {
    name: "Claude Code",
    company: "Anthropic",
    description: "터미널에서 직접 사용하는 AI 코딩 어시스턴트. 파일 시스템과 직접 상호작용합니다.",
    color: "from-rose-500 to-orange-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M7 8h2l2 4-2 4H7"/>
        <path d="M17 8h-2l-2 4 2 4h2"/>
      </svg>
    ),
    features: ["터미널 기반", "파일 수정", "Git 연동", "프로젝트 이해"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function AIAgents() {
  return (
    <section id="ai-agents" className="relative py-24 bg-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
            AI Agents
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            다양한 <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">AI 코딩 도구</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            바이브코딩에 활용할 수 있는 다양한 AI Agent들을 소개합니다.
            <br />
            각각의 특성을 이해하고 상황에 맞게 활용해보세요.
          </p>
        </motion.div>

        {/* AI Agent Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {aiAgents.map((agent) => (
            <motion.div
              key={agent.name}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative p-6 rounded-2xl ${agent.bgColor} border ${agent.borderColor} backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-black/20`}
            >
              {/* Icon & Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${agent.color} text-white`}>
                  {agent.icon}
                </div>
                <span className="text-xs text-gray-500 font-medium">{agent.company}</span>
              </div>

              {/* Name & Description */}
              <h3 className="text-xl font-bold text-white mb-2">{agent.name}</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{agent.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {agent.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2.5 py-1 rounded-full bg-white/5 text-gray-300 text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Gradient line at bottom */}
              <div className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r ${agent.color} opacity-50 rounded-full`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">
            이 중에서 우리는 <span className="text-violet-400 font-semibold">Claude</span>와{" "}
            <span className="text-rose-400 font-semibold">Claude Code</span>를 주로 사용할 예정입니다.
            이 강의에서 다루는 핵심 개념은 도구에 관계없이 적용됩니다.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            이 외에도 Llama, DeepSeek Coder 등 오픈소스 모델도 빠르게 발전하고 있습니다.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600/20 to-rose-600/20 border border-violet-500/30">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-gray-300">다음 섹션에서 자세히 알아보기</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

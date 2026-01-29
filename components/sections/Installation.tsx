"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type OS = "mac" | "windows" | "linux";

const installSteps: Record<OS, { title: string; steps: { label: string; command?: string; description: string }[] }> = {
  mac: {
    title: "macOS",
    steps: [
      {
        label: "Node.js 설치",
        command: "brew install node",
        description: "Homebrew가 없다면 nodejs.org에서 직접 설치도 가능합니다.",
      },
      {
        label: "Claude Code 설치",
        command: "npm install -g @anthropic-ai/claude-code",
        description: "전역으로 Claude Code CLI를 설치합니다.",
      },
      {
        label: "실행",
        command: "claude",
        description: "터미널에서 claude를 입력하면 시작됩니다. 처음 실행 시 로그인이 필요합니다.",
      },
    ],
  },
  windows: {
    title: "Windows",
    steps: [
      {
        label: "Node.js 설치",
        description: "nodejs.org에서 LTS 버전을 다운로드하여 설치합니다.",
      },
      {
        label: "터미널 열기",
        command: "wsl --install",
        description: "WSL(Windows Subsystem for Linux) 사용을 권장합니다. PowerShell에서 위 명령어를 실행하세요.",
      },
      {
        label: "Claude Code 설치",
        command: "npm install -g @anthropic-ai/claude-code",
        description: "WSL 터미널 또는 PowerShell에서 설치합니다.",
      },
      {
        label: "실행",
        command: "claude",
        description: "터미널에서 claude를 입력하면 시작됩니다.",
      },
    ],
  },
  linux: {
    title: "Linux",
    steps: [
      {
        label: "Node.js 설치",
        command: "curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs",
        description: "Node.js LTS 버전을 설치합니다.",
      },
      {
        label: "Claude Code 설치",
        command: "npm install -g @anthropic-ai/claude-code",
        description: "전역으로 Claude Code CLI를 설치합니다.",
      },
      {
        label: "실행",
        command: "claude",
        description: "터미널에서 claude를 입력하면 시작됩니다.",
      },
    ],
  },
};

const osIcons: Record<OS, React.ReactNode> = {
  mac: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  ),
  windows: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 12V6.75l6-1.32v6.48L3 12zm6.73-.07l8.27-.01V4.7L9.73 5.86v6.07zM3 13l6 .09v6.81l-6-1.32V13zm6.73.09l8.27.01v6.5l-8.27-1.15V13.09z"/>
    </svg>
  ),
  linux: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.368 1.884 1.43.868.074 1.741-.313 2.425-.881.67-.559 1.24-1.334 1.498-2.17.128-.413.09-.685.049-.93a3.093 3.093 0 01-.057-.425c0-.564.207-1.204.227-1.816.009-.339-.047-.677-.142-1.014l.003-.03c.24-1.6-.46-3.07-1.2-4.25-.66-1.06-1.39-1.94-1.9-2.93-.46-.89-.65-1.87-.65-3.07-.02-1.66-.82-5.408-5.04-5.408z"/>
    </svg>
  ),
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-gray-500 hover:text-white transition-colors p-1"
      title="복사"
    >
      {copied ? (
        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

export default function Installation() {
  const [selectedOS, setSelectedOS] = useState<OS>("mac");
  const current = installSteps[selectedOS];

  return (
    <section id="installation" className="relative py-24 bg-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            Getting Started
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Claude Code</span> 설치하기
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            단 3단계로 시작할 수 있습니다.
            <br />
            여러분의 운영체제를 선택하고 따라해보세요.
          </p>
        </motion.div>

        {/* Subscription Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-14"
        >
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-orange-600/10 border border-violet-500/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Icon */}
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-2">하나의 구독으로 모두 사용!</h3>
                <p className="text-gray-400 leading-relaxed">
                  Claude Pro 또는 Max 구독 하나로{" "}
                  <span className="text-orange-400 font-semibold">claude.ai</span>와{" "}
                  <span className="text-rose-400 font-semibold">Claude Code</span>를 모두 사용할 수 있습니다.
                  별도의 API 키 없이 로그인만 하면 됩니다.
                </p>
              </div>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { name: "Free", price: "무료", features: ["claude.ai 기본 사용", "일일 제한 있음"], highlight: false },
                { name: "Pro", price: "$20/월", features: ["claude.ai 확장 사용", "Claude Code 사용 가능", "우선 접근권"], highlight: true },
                { name: "Max", price: "$100/월", features: ["무제한에 가까운 사용", "Claude Code 대량 사용", "최고 성능 모델"], highlight: false },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`p-4 rounded-xl ${
                    plan.highlight
                      ? "bg-gradient-to-b from-violet-600/20 to-fuchsia-600/20 border-2 border-violet-500/40"
                      : "bg-slate-800/50 border border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">{plan.name}</span>
                    {plan.highlight && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/30 text-violet-300">추천</span>
                    )}
                  </div>
                  <p className="text-lg font-semibold text-gray-300 mb-3">{plan.price}</p>
                  <ul className="space-y-1.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* OS Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-3 mb-10"
        >
          {(["mac", "windows", "linux"] as OS[]).map((os) => (
            <button
              key={os}
              onClick={() => setSelectedOS(os)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedOS === os
                  ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg shadow-emerald-500/20"
                  : "bg-slate-800 text-gray-400 hover:bg-slate-700 border border-slate-700"
              }`}
            >
              {osIcons[os]}
              {installSteps[os].title}
            </button>
          ))}
        </motion.div>

        {/* Steps */}
        <motion.div
          key={selectedOS}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          {current.steps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative pl-12"
            >
              {/* Step number */}
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              {/* Connector line */}
              {index < current.steps.length - 1 && (
                <div className="absolute left-[15px] top-10 w-0.5 h-[calc(100%+8px)] bg-gradient-to-b from-emerald-500/50 to-transparent" />
              )}

              <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-2">{step.label}</h4>
                {step.command && (
                  <div className="flex items-center gap-2 bg-slate-950 rounded-lg px-4 py-3 mb-3 font-mono text-sm overflow-x-auto">
                    <span className="text-emerald-400 select-none">$</span>
                    <code className="text-gray-300 flex-1">{step.command}</code>
                    <CopyButton text={step.command} />
                  </div>
                )}
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Login Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-14"
        >
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              처음 실행하면?
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">1</div>
                <div>
                  <p className="text-white font-medium">브라우저가 자동으로 열립니다</p>
                  <p className="text-gray-400 text-sm">Anthropic 로그인 페이지로 이동합니다.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">2</div>
                <div>
                  <p className="text-white font-medium">Google 또는 이메일로 로그인</p>
                  <p className="text-gray-400 text-sm">claude.ai에서 사용하는 동일한 계정으로 로그인하세요.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">3</div>
                <div>
                  <p className="text-white font-medium">터미널로 돌아오면 준비 완료!</p>
                  <p className="text-gray-400 text-sm">이제 프로젝트 폴더에서 <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 text-xs">claude</code>를 입력하면 바로 사용할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step {
  number: number;
  title: string;
  code?: string;
  prompt?: string;
  details: string[];
}

const steps: Step[] = [
  {
    number: 1,
    title: "프로젝트 폴더 생성",
    code: "mkdir heat-calculator && cd heat-calculator",
    details: ["모든 프로젝트는 깨끗한 폴더에서 시작"],
  },
  {
    number: 2,
    title: "Claude Code 실행",
    code: "claude",
    details: ["터미널에서 claude를 입력하면 AI 코딩 세션이 시작됩니다"],
  },
  {
    number: 3,
    title: "프로젝트 초기화 요청",
    prompt:
      "Next.js 프로젝트를 만들어줘. TypeScript와 Tailwind CSS를 사용해.",
    details: ["AI가 자동으로 npx create-next-app을 실행하고 설정"],
  },
  {
    number: 4,
    title: "기능 구현 요청",
    prompt:
      "뉴턴의 냉각법칙으로 열유속을 계산하는 페이지를 만들어줘. h, A, ΔT를 입력하면 q = h × A × ΔT를 계산해서 보여줘.",
    details: ["AI가 입력 폼과 계산 로직을 자동 생성"],
  },
  {
    number: 5,
    title: "결과 확인",
    code: "npm run dev",
    details: [
      "localhost:3000에서 결과 확인",
      "코드를 한 줄도 직접 작성하지 않았지만, 동작하는 웹 계산기 완성",
    ],
  },
  {
    number: 6,
    title: "기능 추가",
    prompt:
      "h 값에 따른 q 변화를 차트로 보여줘. Recharts 라이브러리를 사용해.",
    details: ["AI가 라이브러리 설치부터 차트 구현까지 자동 처리"],
  },
  {
    number: 7,
    title: "배포",
    prompt: "Vercel에 배포해줘",
    details: [
      "전 세계에서 접속 가능한 URL 생성",
      "기획 → 구현 → 배포까지 대화만으로 완료!",
    ],
  },
];

export default function FirstProject() {
  const [openStep, setOpenStep] = useState<number | null>(null);

  const toggle = (step: number) => {
    setOpenStep(openStep === step ? null : step);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/20 mb-4">
            Hands-on
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            첫 번째 바이브코딩 프로젝트
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="rounded-2xl bg-slate-800/50 border border-slate-700 overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => toggle(step.number)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-slate-700/30 transition-colors"
              >
                {/* Step Number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  {step.number}
                </div>
                <span className="flex-1 text-lg font-semibold text-white">
                  {step.title}
                </span>
                {/* Chevron */}
                <motion.svg
                  animate={{ rotate: openStep === step.number ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-5 h-5 text-slate-400 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>

              {/* Expandable Content */}
              <AnimatePresence initial={false}>
                {openStep === step.number && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-19 space-y-3">
                      {step.code && (
                        <div className="rounded-lg bg-slate-900 border border-slate-700 px-4 py-3">
                          <code className="font-mono text-sm text-green-400">
                            $ {step.code}
                          </code>
                        </div>
                      )}
                      {step.prompt && (
                        <div className="rounded-lg bg-slate-900 border border-slate-700 px-4 py-3">
                          <p className="text-xs text-slate-500 mb-1 font-mono">
                            prompt
                          </p>
                          <p className="font-mono text-sm text-cyan-300">
                            &quot;{step.prompt}&quot;
                          </p>
                        </div>
                      )}
                      {step.details.map((detail, i) => (
                        <p key={i} className="text-slate-400 text-sm leading-relaxed">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-6 md:p-8"
        >
          <p className="text-slate-300 leading-relaxed text-base md:text-lg">
            여러분은 코드를 한 줄도 직접 작성하지 않았습니다. 하지만{" "}
            <span className="text-cyan-400 font-semibold">
              &apos;뉴턴의 냉각법칙&apos;
            </span>
            과{" "}
            <span className="text-cyan-400 font-semibold font-mono">
              &apos;q = hAΔT&apos;
            </span>
            를 알고 있었기에, AI에게 정확한 요구를 할 수 있었습니다.{" "}
            <span className="text-white font-bold">
              이것이 바이브코딩의 핵심입니다.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

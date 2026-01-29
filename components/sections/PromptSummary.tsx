"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const checklistItems = [
  '나의 역할/수준을 밝혔는가? (예: "기계공학 3학년")',
  '어떤 물리적 상황인지 명시했는가? (예: "강제 대류, 원관 내부")',
  '모든 물리량에 단위를 붙였는가? (예: "h = 50 W/(m²·K)")',
  '유체와 온도를 지정했는가? (예: "80°C 물")',
  '사용할 상관식/공식을 지정했는가? (예: "Dittus-Boelter")',
  "상관식의 적용범위 확인을 요청했는가?",
  "SI 단위 사용을 명시했는가?",
  "풀이 과정을 단계별로 요청했는가?",
  "결과의 물리적 타당성 검증을 요청했는가?",
  "최종 답의 유효숫자와 표시 형식을 지정했는가?",
];

const promptTemplate = `나는 [역할/수준]이고, [과목/과제]를 하고 있다.

[물리적 상황 상세 설명]
- 형상: [원관/평판/핀 등]
- 유체: [물/공기 등] (온도: [__°C])
- 조건: [유속/Re/열유속 등]

[구체적 요청사항]
- 사용할 공식/상관식: [___]
- 구해야 할 값: [Nu, h, q 등]

제약조건:
- SI 단위로 계산
- 상관식의 적용범위 확인
- 풀이과정을 단계별로 표시
- 결과의 물리적 타당성 검증
- 최종 답은 유효숫자 3자리, 박스 표시`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function PromptSummary() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(promptTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4">
            Summary
          </span>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            프롬프트 엔지니어링 체크리스트
          </h2>
        </motion.div>

        {/* 1. Checklist Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            좋은 프롬프트를 위한 체크리스트
          </h3>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {checklistItems.map((item, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-start gap-3 text-gray-300"
              >
                <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span>
                  <span className="text-gray-500 mr-2 font-mono text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* 2. Prompt Template */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              프롬프트 템플릿
            </h3>
            <button
              onClick={handleCopy}
              className="px-4 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-gray-400 text-sm font-medium hover:bg-slate-700 hover:text-gray-200 transition-colors"
            >
              {copied ? "복사됨!" : "복사"}
            </button>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
              {promptTemplate}
            </pre>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

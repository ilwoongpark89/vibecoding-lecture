"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const pyramid = [
  {
    level: "Level 3",
    title: "자율 에이전트",
    tools: "Claude Code, Devin",
    desc: "프로젝트 전체를 자율적으로 수행. 파일 생성, 테스트, 배포까지.",
    color: "from-violet-600 to-cyan-500",
    borderColor: "border-violet-500/40",
    textColor: "text-violet-400",
    width: "w-1/3",
    pros: "프로젝트 전체 자동화, 최소한의 개입",
    cons: "러닝커브, 비용, 복잡한 프로젝트에서 예측 어려움",
  },
  {
    level: "Level 2",
    title: "IDE 통합 AI",
    tools: "GitHub Copilot, Cursor",
    desc: "코드 에디터 안에서 실시간 코드 제안 및 자동완성.",
    color: "from-cyan-600 to-cyan-400",
    borderColor: "border-cyan-500/40",
    textColor: "text-cyan-400",
    width: "w-2/3",
    pros: "실시간 코드 제안, IDE 통합, 높은 생산성",
    cons: "개발 환경 필요, 코드 맥락 이해 제한적",
  },
  {
    level: "Level 1",
    title: "대화형 AI",
    tools: "ChatGPT, Claude",
    desc: "자연어로 질문하고 답변을 받는 범용 AI 도구. 누구나 사용 가능.",
    color: "from-blue-600 to-blue-400",
    borderColor: "border-blue-500/40",
    textColor: "text-blue-400",
    width: "w-full",
    pros: "누구나 사용 가능, 범용적, 설치 불필요",
    cons: "코드 실행 불가, 파일 시스템 접근 불가",
  },
];

const flowSteps = [
  { question: "간단한 질문?", answer: "ChatGPT / Claude", color: "text-blue-400" },
  { question: "코드 작성 중?", answer: "Copilot / Cursor", color: "text-cyan-400" },
  { question: "프로젝트 전체?", answer: "Claude Code", color: "text-violet-400" },
];

export default function MITAIToolchain() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
            Week 2 — AI Tools
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            MIT가 제안하는{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              AI 도구 활용 전략
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            MIT CSAIL과 MIT Sloan이 제안하는 AI 도구 채택 프레임워크
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-10">
          {/* 3-tier pyramid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-slate-800/60 border border-slate-700 p-6"
          >
            <h3 className="text-sm font-bold text-cyan-400 mb-6 text-center">AI 도구 피라미드</h3>
            <div className="flex flex-col items-center gap-3">
              {pyramid.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  onClick={() => setSelectedLevel(selectedLevel === i ? null : i)}
                  className={`${p.width} cursor-pointer rounded-xl bg-gradient-to-r ${p.color} p-[1px] transition-all hover:shadow-lg`}
                >
                  <div className="bg-slate-900 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold ${p.textColor} uppercase tracking-wider`}>{p.level}</span>
                      <span className="text-[10px] text-gray-500">{p.tools}</span>
                    </div>
                    <h4 className="text-white font-bold text-sm">{p.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{p.desc}</p>
                    {selectedLevel === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-3 border-t border-slate-700 grid grid-cols-2 gap-3"
                      >
                        <div>
                          <p className="text-[10px] text-green-400 font-bold mb-1">장점</p>
                          <p className="text-[10px] text-gray-400">{p.pros}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-red-400 font-bold mb-1">단점</p>
                          <p className="text-[10px] text-gray-400">{p.cons}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Decision flowchart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-slate-800/60 border border-slate-700 p-6"
          >
            <h3 className="text-sm font-bold text-cyan-400 mb-6 text-center">어떤 도구를 언제 쓸까?</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              {flowSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="rounded-xl bg-slate-900 border border-slate-700 p-4 text-center min-w-[140px]">
                    <p className="text-xs text-gray-400 mb-2">{step.question}</p>
                    <p className={`text-sm font-bold ${step.color}`}>{step.answer}</p>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <span className="text-gray-600 text-lg hidden md:block">&rarr;</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-slate-800/60 border border-slate-700 p-6 overflow-x-auto"
          >
            <h3 className="text-sm font-bold text-cyan-400 mb-4">레벨별 비교</h3>
            <table className="w-full text-xs min-w-[500px]">
              <thead>
                <tr className="text-gray-500 border-b border-slate-700">
                  <th className="pb-2 text-left">항목</th>
                  <th className="pb-2 text-left text-blue-400">Level 1 (대화형)</th>
                  <th className="pb-2 text-left text-cyan-400">Level 2 (IDE 통합)</th>
                  <th className="pb-2 text-left text-violet-400">Level 3 (자율)</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                {[
                  ["접근성", "누구나", "개발자", "고급 사용자"],
                  ["코드 실행", "불가", "가능", "자율 실행"],
                  ["파일 관리", "불가", "현재 파일", "프로젝트 전체"],
                  ["학습 곡선", "낮음", "중간", "높음"],
                  ["대표 도구", "ChatGPT, Claude", "Copilot, Cursor", "Claude Code, Devin"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    <td className="py-2 text-gray-300 font-semibold">{row[0]}</td>
                    <td className="py-2">{row[1]}</td>
                    <td className="py-2">{row[2]}</td>
                    <td className="py-2">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center p-8 mt-12 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-violet-500/5 border border-cyan-500/20"
        >
          <p className="text-gray-300 leading-relaxed mb-4">
            <span className="text-cyan-400 font-semibold">
              이 수업에서는 Level 3(Claude Code)를 중심으로 배웁니다.
            </span>
            <br />
            가장 높은 레벨의 도구를 다룰 수 있으면, 나머지는 자연스럽게 사용할 수 있습니다.
          </p>
          <p className="text-xs text-gray-500">
            참고: MIT CSAIL · MIT Technology Review · MIT Sloan Management Review
          </p>
        </motion.div>
      </div>
    </section>
  );
}

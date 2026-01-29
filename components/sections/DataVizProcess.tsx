"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const steps = [
  {
    num: 1,
    title: "데이터 준비",
    key: "데이터를 직접 제공하거나 파일 경로를 명시",
    bad: "이 데이터 그래프로 그려줘",
    badNote: "데이터 없이 요청",
    good: "다음 CSV 데이터를 차트로 시각화해줘: 시간(s), 온도(°C) → [0,100], [10,85], [20,73], [30,65], [40,59], [50,55]",
  },
  {
    num: 2,
    title: "차트 유형 지정",
    key: "차트 유형 + 라이브러리 + 인터랙션 명시",
    bad: "보기 좋게 그래프 만들어줘",
    badNote: "유형 미지정",
    good: "X축: 시간(s), Y축: 온도(°C)인 라인 차트를 Recharts로 만들어줘. 격자선 포함, 데이터 포인트에 마우스 올리면 값 표시.",
  },
  {
    num: 3,
    title: "스타일 & 레이블",
    key: "논문/보고서 기준에 맞는 스타일 지정",
    bad: "(AI가 기본 스타일로 만듦 → 논문에 못 씀)",
    badNote: "스타일 미지정",
    good: "축 라벨에 단위 포함해줘. 폰트 크기 14pt. 범례는 오른쪽 상단. 색상은 논문용으로 색맹 친화적인 팔레트(viridis)를 사용해줘.",
  },
  {
    num: 4,
    title: "다중 데이터 & 비교",
    key: "각 시리즈의 타입, 색상, 데이터 소스를 명확히",
    bad: "실험 결과랑 이론값 비교해줘",
    badNote: "시리즈 미구분",
    good: "같은 차트에 두 시리즈를 그려줘: ① 실험 데이터(scatter, 파란 원), ② 이론값 T(t)=T∞+(T₀−T∞)exp(−t/τ)(실선, 빨간). τ=20s, T₀=100°C, T∞=25°C.",
  },
];

export default function DataVizProcess() {
  const [activeStep, setActiveStep] = useState(0);

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
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-4">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            AI에게 시각화 시키는 프로세스
          </h2>
        </motion.div>

        {/* Step selector */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeStep === idx
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                  : "bg-slate-800 text-gray-400 border border-slate-700 hover:border-slate-600"
              }`}
            >
              Step {step.num}: {step.title}
            </button>
          ))}
        </div>

        {/* All steps displayed */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`rounded-xl border p-6 transition-all ${
                activeStep === idx
                  ? "bg-slate-800 border-teal-500/40 shadow-lg shadow-teal-500/5"
                  : "bg-slate-900/50 border-slate-800"
              }`}
            >
              {/* Step header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 text-sm font-bold">
                  {step.num}
                </span>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
              </div>

              {/* Bad vs Good comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Bad */}
                <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-xs font-bold rounded bg-red-500/20 text-red-400">Bad</span>
                    <span className="text-xs text-red-400/70">{step.badNote}</span>
                  </div>
                  <p className="text-sm text-gray-400 italic">&quot;{step.bad}&quot;</p>
                </div>

                {/* Good */}
                <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-xs font-bold rounded bg-emerald-500/20 text-emerald-400">Good</span>
                  </div>
                  <p className="text-sm text-gray-300">&quot;{step.good}&quot;</p>
                </div>
              </div>

              {/* Key point */}
              <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-teal-500/5 border border-teal-500/10">
                <span className="text-teal-400 font-bold text-sm mt-0.5">핵심:</span>
                <p className="text-sm text-gray-300">{step.key}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

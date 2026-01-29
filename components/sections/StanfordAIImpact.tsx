"use client";

import { motion } from "framer-motion";

const patentComparison = [
  { year: "2015", value: 12, label: "~12,000건" },
  { year: "2024", value: 100, label: "~120,000건" },
];

const paperTrend = [
  { year: "2015", value: 25 },
  { year: "2017", value: 35 },
  { year: "2019", value: 50 },
  { year: "2021", value: 70 },
  { year: "2023", value: 90 },
  { year: "2024", value: 100 },
];

const aiMilestones = [
  { year: "2015", event: "이미지 인식", desc: "AI가 인간 수준의 이미지 분류 달성 (ImageNet)", color: "bg-blue-500" },
  { year: "2019", event: "자연어 이해", desc: "GPT-2 등장, AI가 인간 수준의 글쓰기 가능", color: "bg-violet-500" },
  { year: "2023", event: "코드 생성", desc: "GPT-4, Claude가 프로그래머 수준의 코드 작성", color: "bg-cyan-500" },
  { year: "2024", event: "수학 올림피아드", desc: "AI가 국제수학올림피아드 금메달 수준 달성", color: "bg-amber-500" },
];

const investmentBars = [
  { sector: "헬스케어", value: 85, amount: "$18.5B" },
  { sector: "자동차/모빌리티", value: 65, amount: "$14.2B" },
  { sector: "제조/산업", value: 50, amount: "$10.8B" },
  { sector: "금융", value: 45, amount: "$9.7B" },
  { sector: "에너지", value: 35, amount: "$7.5B" },
];

export default function StanfordAIImpact() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4">
            Week 1 — AI Landscape
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stanford HAI AI Index 2025로 보는{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              AI의 현재
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stanford Human-Centered AI Institute가 매년 발표하는 AI Index Report의 핵심 데이터
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Patent & Paper charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Patents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl bg-slate-800/60 border border-slate-700 p-6"
            >
              <h3 className="text-sm font-bold text-violet-400 mb-4">AI 특허 출원 수 — 10배 증가</h3>
              <div className="flex items-end justify-center gap-12 h-40">
                {patentComparison.map((p, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <span className="text-xs text-gray-400">{p.label}</span>
                    <div
                      className="w-16 bg-gradient-to-t from-blue-600 to-violet-400 rounded-t"
                      style={{ height: `${p.value}%` }}
                    />
                    <span className="text-sm font-bold text-white">{p.year}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-gray-500 mt-3">10년간 AI 특허 10배 증가</p>
            </motion.div>

            {/* AI Research Papers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl bg-slate-800/60 border border-slate-700 p-6"
            >
              <h3 className="text-sm font-bold text-violet-400 mb-4">AI 연구 논문 수 — 연도별 증가</h3>
              <div className="h-40 relative overflow-hidden rounded">
                <svg className="w-full h-full" viewBox="0 0 300 140" preserveAspectRatio="none">
                  {[35, 70, 105].map((y) => (
                    <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#334155" strokeWidth="0.5" />
                  ))}
                  <polyline
                    points={paperTrend.map((p, i) => `${i * 60},${140 - p.value * 1.3}`).join(" ")}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2.5"
                  />
                  {paperTrend.map((p, i) => (
                    <circle key={i} cx={i * 60} cy={140 - p.value * 1.3} r="3" fill="#8b5cf6" />
                  ))}
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1 text-[8px] text-gray-600">
                  {paperTrend.map(p => <span key={p.year}>{p.year}</span>)}
                </div>
              </div>
            </motion.div>
          </div>

          {/* AI surpassing humans timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-slate-800/60 border border-slate-700 p-6"
          >
            <h3 className="text-sm font-bold text-violet-400 mb-6">AI가 인간을 앞선 분야 — 타임라인</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-violet-500 to-amber-500" />
              <div className="space-y-6">
                {aiMilestones.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start gap-4 pl-1"
                  >
                    <div className={`w-8 h-8 rounded-full ${m.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                      {m.year.slice(2)}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{m.year} — {m.event}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Industry investment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-slate-800/60 border border-slate-700 p-6"
          >
            <h3 className="text-sm font-bold text-violet-400 mb-4">산업별 AI 투자액 (2024)</h3>
            <div className="space-y-3">
              {investmentBars.map((bar, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-24 text-right">{bar.sector}</span>
                  <div className="flex-1 h-6 bg-slate-900 rounded overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-blue-600 to-violet-500 rounded"
                    />
                  </div>
                  <span className="text-xs text-gray-300 w-14 font-mono">{bar.amount}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center p-8 mt-12 rounded-2xl bg-gradient-to-br from-blue-500/5 to-violet-500/5 border border-violet-500/20"
        >
          <p className="text-gray-300 leading-relaxed mb-4">
            <span className="text-violet-400 font-semibold">
              이 강의에서 배우는 바이브코딩은 이 거대한 변화의 가장 실용적인 출발점입니다.
            </span>
          </p>
          <p className="text-xs text-gray-500">
            참고: Stanford HAI AI Index Report 2025 (aiindex.stanford.edu)
          </p>
        </motion.div>
      </div>
    </section>
  );
}

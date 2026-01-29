"use client";

import { motion } from "framer-motion";

const calculators = [
  {
    title: "뉴턴 냉각법칙 계산기",
    formula: "q = h × A × ΔT",
    difficulty: "★☆☆",
    difficultyLabel: "입문",
    color: "emerald",
    lessons: "기본 입력 폼, 계산 로직, 결과 표시",
    mockUI: (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <div className="text-[10px] text-gray-400 mb-1">h (W/m²·K)</div>
            <div className="bg-slate-700/60 rounded px-2 py-1.5 text-xs text-emerald-300 border border-slate-600">100</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 mb-1">A (m²)</div>
            <div className="bg-slate-700/60 rounded px-2 py-1.5 text-xs text-emerald-300 border border-slate-600">0.5</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 mb-1">ΔT (K)</div>
            <div className="bg-slate-700/60 rounded px-2 py-1.5 text-xs text-emerald-300 border border-slate-600">125</div>
          </div>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
          <div className="text-[10px] text-emerald-400 mb-1">결과</div>
          <div className="text-lg font-bold text-emerald-300">q = 6,250 W</div>
          <div className="text-xs text-emerald-400/70">= 6.25 kW</div>
        </div>
      </div>
    ),
  },
  {
    title: "복합벽 열저항 계산기",
    formula: "R_total = Σ(L/kA) + 1/(h₁A) + 1/(h₂A)",
    difficulty: "★★☆",
    difficultyLabel: "중급",
    color: "orange",
    lessons: "동적 입력 (층 추가/삭제), 다단계 계산",
    mockUI: (
      <div className="space-y-2">
        <div className="space-y-1.5">
          {[
            { name: "콘크리트", L: "0.20", k: "1.40" },
            { name: "단열재", L: "0.05", k: "0.04" },
            { name: "석고보드", L: "0.02", k: "0.17" },
          ].map((layer, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-slate-700/40 rounded px-2 py-1 text-[10px]">
              <span className="text-orange-300 w-12 truncate">{layer.name}</span>
              <span className="text-gray-400">{layer.L}m</span>
              <span className="text-gray-400">k={layer.k}</span>
              <span className="ml-auto text-red-400/60 cursor-default">×</span>
            </div>
          ))}
          <div className="text-center text-[10px] text-orange-400/60 cursor-default">+ 층 추가</div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2 space-y-1">
          <div className="flex justify-between text-[10px]">
            <span className="text-gray-400">총 열저항</span>
            <span className="text-orange-300 font-mono">1.539 m²·K/W</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-gray-400">열유속</span>
            <span className="text-orange-300 font-mono">32.5 W/m²</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-gray-400">경계면 온도</span>
            <span className="text-orange-300 font-mono">T₁=24.5 T₂=20.1°C</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "관내 유동 열전달 계산기",
    formula: "Re → Nu (Dittus-Boelter) → h → q",
    difficulty: "★★★",
    difficultyLabel: "종합",
    color: "violet",
    lessons: "조건 분기 (층류/난류), 물성치 데이터, 상관식 적용범위 검증",
    mockUI: (
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: "관 내경", val: "25 mm" },
            { label: "유속", val: "2.0 m/s" },
            { label: "유체 온도", val: "60°C" },
            { label: "관벽 온도", val: "100°C" },
          ].map((f, i) => (
            <div key={i} className="bg-slate-700/40 rounded px-2 py-1">
              <div className="text-[9px] text-gray-500">{f.label}</div>
              <div className="text-[11px] text-violet-300">{f.val}</div>
            </div>
          ))}
        </div>
        <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-2 space-y-1">
          <div className="flex justify-between text-[10px]">
            <span className="text-gray-400">Re</span>
            <span className="text-violet-300 font-mono">105,200</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-gray-400">유동 상태</span>
            <span className="text-red-400 font-mono text-[10px]">난류 (Turbulent)</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-gray-400">Nu</span>
            <span className="text-violet-300 font-mono">388.2</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-gray-400">h</span>
            <span className="text-violet-300 font-mono">10,230 W/m²·K</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-gray-400">출구 온도</span>
            <span className="text-violet-300 font-mono">72.3°C</span>
          </div>
        </div>
      </div>
    ),
  },
];

const colorMap: Record<string, { border: string; badge: string; dot: string }> = {
  emerald: {
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-300",
    dot: "bg-emerald-400",
  },
  orange: {
    border: "border-orange-500/30",
    badge: "bg-orange-500/20 text-orange-300",
    dot: "bg-orange-400",
  },
  violet: {
    border: "border-violet-500/30",
    badge: "bg-violet-500/20 text-violet-300",
    dot: "bg-violet-400",
  },
};

export default function CalcShowcase() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-medium mb-4">
            What We Build
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">이번 시간에 만들 것들</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {calculators.map((calc, i) => {
            const colors = colorMap[calc.color];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`rounded-2xl bg-slate-800/60 border ${colors.border} overflow-hidden`}
              >
                {/* Mock browser frame */}
                <div className="bg-slate-800 border-b border-slate-700 px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 bg-slate-700/60 rounded text-[10px] text-gray-500 px-2 py-0.5 text-center">
                    localhost:3000
                  </div>
                </div>

                {/* Mock UI */}
                <div className="p-4">{calc.mockUI}</div>

                {/* Info */}
                <div className="px-4 pb-4 space-y-3">
                  <h3 className="text-lg font-bold text-white">{calc.title}</h3>
                  <code className="block text-xs text-gray-400 bg-slate-900/60 rounded px-2 py-1.5 font-mono">
                    {calc.formula}
                  </code>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge}`}>
                      난이도: {calc.difficulty} {calc.difficultyLabel}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    <span className="text-gray-300 font-medium">배울 점:</span> {calc.lessons}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

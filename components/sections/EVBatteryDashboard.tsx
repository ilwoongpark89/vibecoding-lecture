"use client";

import { motion } from "framer-motion";

const summaryCards = [
  { label: "셀 최고온도", value: "45.2°C", color: "text-red-400", icon: "🌡️" },
  { label: "평균 SOC", value: "78%", color: "text-teal-400", icon: "🔋" },
  { label: "충전 전력", value: "150 kW", color: "text-cyan-400", icon: "⚡" },
  { label: "셀 편차 ΔT", value: "3.1°C", color: "text-amber-400", icon: "📊" },
];

const cellTemps = [
  42, 44, 45, 43,
  38, 41, 43, 40,
  35, 37, 39, 36,
];

function getTempColor(t: number) {
  if (t >= 44) return "bg-red-500";
  if (t >= 42) return "bg-orange-500";
  if (t >= 40) return "bg-amber-500";
  if (t >= 38) return "bg-yellow-500";
  if (t >= 36) return "bg-teal-400";
  return "bg-cyan-400";
}

const tempDistribution = [
  { range: "34-36", count: 2, pct: 17 },
  { range: "36-38", count: 2, pct: 17 },
  { range: "38-40", count: 2, pct: 17 },
  { range: "40-42", count: 2, pct: 17 },
  { range: "42-44", count: 2, pct: 17 },
  { range: "44-46", count: 2, pct: 17 },
];

const prompts = [
  "전기차 배터리 열관리 대시보드를 만들어줘. 셀 최고온도, 평균 SOC, 충전전력, 셀 편차 요약 카드와 4×3 배터리 팩 시각화를 포함해줘.",
  "배터리 셀별 온도를 색상으로 표현해줘. 파란색(저온)에서 빨간색(고온)까지 그라데이션을 사용하고, 충전 곡선(SOC vs 시간)과 온도 오버레이 차트를 추가해줘.",
  "셀 온도 분포 히스토그램과 실시간 알림 기능을 추가해줘. PyBaMM 시뮬레이션 데이터를 연동할 수 있게 구조를 만들어줘.",
];

export default function EVBatteryDashboard() {
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
            Week 6 — EV Battery
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            EV 배터리 열관리 대시보드
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            전기차 배터리의 급속충전 시 열 관리는 안전과 수명의 핵심입니다.
            이 대시보드를 AI에게 만들어달라고 해봅시다.
          </p>
        </motion.div>

        {/* Mock Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-14 rounded-2xl border border-slate-700 bg-slate-800 overflow-hidden shadow-2xl"
        >
          {/* Dashboard header */}
          <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">🔋 Battery Thermal Management</h3>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {summaryCards.map((card, i) => (
                <div key={i} className="rounded-lg bg-slate-900/80 border border-slate-700 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">{card.icon} {card.label}</p>
                  <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                </div>
              ))}
            </div>

            {/* Main content: Battery Pack + Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Battery Pack Visualization */}
              <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                <p className="text-xs text-gray-500 mb-3">배터리 팩 — 셀별 온도 (4×3)</p>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {cellTemps.map((t, i) => (
                    <div
                      key={i}
                      className={`${getTempColor(t)} rounded-lg h-16 flex items-center justify-center text-white text-xs font-bold shadow-lg`}
                    >
                      {t}°C
                    </div>
                  ))}
                </div>
                {/* Legend */}
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-[10px] text-gray-500">저온</span>
                  <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-cyan-400 via-yellow-400 to-red-500" />
                  <span className="text-[10px] text-gray-500">고온</span>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                {/* Charging curve */}
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                  <p className="text-xs text-gray-500 mb-3">충전 곡선 (SOC vs Time + 온도)</p>
                  <div className="h-32 relative overflow-hidden rounded">
                    <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                      {[30, 60, 90].map((y) => (
                        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#334155" strokeWidth="0.5" />
                      ))}
                      {/* SOC curve */}
                      <polyline
                        points="0,110 50,90 100,70 150,55 200,42 250,32 300,25 350,20 400,18"
                        fill="none"
                        stroke="#2dd4bf"
                        strokeWidth="2.5"
                      />
                      {/* Temperature overlay */}
                      <polyline
                        points="0,100 50,85 100,65 150,50 200,45 250,50 300,55 350,58 400,60"
                        fill="none"
                        stroke="#f87171"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                      />
                    </svg>
                    <div className="absolute top-2 right-2 flex gap-3 text-[10px]">
                      <span className="text-teal-400">— SOC</span>
                      <span className="text-red-400">-- 온도</span>
                    </div>
                  </div>
                </div>

                {/* Temperature distribution */}
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                  <p className="text-xs text-gray-500 mb-3">셀 온도 분포</p>
                  <div className="flex items-end gap-2 h-20">
                    {tempDistribution.map((d, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-gradient-to-t from-teal-600 to-cyan-400 rounded-t"
                          style={{ height: `${20 + i * 12}%` }}
                        />
                        <span className="text-[8px] text-gray-500">{d.range}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prompts used */}
        <div className="max-w-4xl mx-auto mb-14">
          <h3 className="text-xl font-bold text-white text-center mb-6">
            이 대시보드를 만든 <span className="text-teal-400">3개의 프롬프트</span>
          </h3>
          <div className="space-y-4">
            {prompts.map((prompt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="flex gap-4 items-start p-5 rounded-xl bg-slate-800/60 border border-slate-700"
              >
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 text-sm font-bold">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-300 leading-relaxed">&quot;{prompt}&quot;</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border border-teal-500/20"
        >
          <p className="text-gray-300 leading-relaxed mb-4">
            <span className="text-teal-400 font-semibold">PyBaMM</span>(Python Battery Mathematical Modelling)과 같은
            오픈소스 도구로 실제 배터리 시뮬레이션을 수행하고,
            그 결과를 이런 대시보드로 시각화할 수 있습니다.
          </p>
          <p className="text-xs text-gray-500">
            참고: PyBaMM (pybamm.org) · Tesla Battery Day Technical Presentations · CATL Engineering Dashboards
          </p>
        </motion.div>
      </div>
    </section>
  );
}

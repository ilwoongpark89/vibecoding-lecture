"use client";

import { motion } from "framer-motion";

const months = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];

const heatwaveBars = [
  { decade: "1990s", days: 10 },
  { decade: "2000s", days: 13 },
  { decade: "2010s", days: 15 },
  { decade: "2020s", days: 18 },
];

const decades = ["1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];
const heatmapData: number[][] = [
  [-2.1, -1.8, -1.5, -0.8, -0.3, 0.2],
  [-1.5, -1.2, -0.9, -0.4, 0.0, 0.5],
  [-1.0, -0.7, -0.3, 0.1, 0.4, 0.8],
  [-0.5, -0.2, 0.1, 0.4, 0.7, 1.1],
  [0.0, 0.2, 0.5, 0.8, 1.0, 1.4],
  [0.3, 0.5, 0.8, 1.1, 1.3, 1.6],
  [0.5, 0.8, 1.0, 1.3, 1.5, 1.9],
  [0.4, 0.7, 0.9, 1.2, 1.4, 1.8],
  [0.1, 0.3, 0.6, 0.9, 1.1, 1.5],
  [-0.3, 0.0, 0.3, 0.6, 0.8, 1.2],
  [-1.0, -0.7, -0.4, 0.0, 0.3, 0.7],
  [-1.8, -1.4, -1.1, -0.5, -0.1, 0.4],
];

function anomalyColor(val: number): string {
  if (val >= 1.5) return "bg-red-600";
  if (val >= 1.0) return "bg-red-500/80";
  if (val >= 0.5) return "bg-orange-500/70";
  if (val >= 0.0) return "bg-yellow-500/50";
  if (val >= -0.5) return "bg-cyan-400/30";
  if (val >= -1.0) return "bg-cyan-500/50";
  return "bg-blue-600/60";
}

export default function ClimateDataExplorer() {
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
            Week 6 — Climate Data
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            기후 데이터 탐색기
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            NASA의 기후 스파이럴처럼, 한국의 기온 변화를 시각적으로 보여주는 대시보드
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
          <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">🌍 Climate Data Explorer — Seoul</h3>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Main: Climate spiral + side stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Climate spiral mockup */}
              <div className="md:col-span-2 rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                <p className="text-xs text-gray-500 mb-3">기후 스파이럴 — 서울 연평균 기온 (1970-2024)</p>
                <div className="flex items-center justify-center h-64">
                  <svg viewBox="0 0 300 300" className="w-full h-full max-w-[300px]">
                    {/* Concentric circles */}
                    {[40, 60, 80, 100, 120].map((r) => (
                      <circle key={r} cx="150" cy="150" r={r} fill="none" stroke="#334155" strokeWidth="0.5" />
                    ))}
                    {/* Month labels */}
                    {months.map((m, i) => {
                      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
                      const x = 150 + Math.cos(angle) * 130;
                      const y = 150 + Math.sin(angle) * 130;
                      return <text key={i} x={x} y={y} textAnchor="middle" fill="#64748b" fontSize="8">{m}</text>;
                    })}
                    {/* Spiral path (past=blue, recent=red) */}
                    <path
                      d="M 150,90 Q 200,100 210,150 Q 200,200 150,215 Q 100,200 85,150 Q 95,95 150,80 Q 210,90 220,150 Q 210,210 150,225 Q 90,210 75,150 Q 85,85 150,70 Q 220,80 235,150 Q 220,220 150,240"
                      fill="none"
                      stroke="url(#spiralGrad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="spiralGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="40%" stopColor="#06b6d4" />
                        <stop offset="70%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                    {/* Center label */}
                    <text x="150" y="148" textAnchor="middle" fill="#94a3b8" fontSize="10">서울</text>
                    <text x="150" y="162" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">+1.7°C</text>
                  </svg>
                </div>
                <div className="flex justify-center gap-4 text-[10px] mt-2">
                  <span className="text-blue-400">● 1970s (과거/저온)</span>
                  <span className="text-red-400">● 2020s (최근/고온)</span>
                </div>
              </div>

              {/* Side stats */}
              <div className="space-y-4">
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                  <p className="text-xs text-gray-500 mb-2">서울 연평균 기온 변화</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">1970</span>
                      <span className="text-lg font-bold text-blue-400">11.8°C</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full">
                      <div className="h-full w-full bg-gradient-to-r from-blue-500 to-red-500 rounded-full" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">2024</span>
                      <span className="text-lg font-bold text-red-400">13.5°C</span>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-2xl font-bold text-amber-400">+1.7°C</span>
                    <p className="text-[10px] text-gray-500 mt-1">54년간 상승폭</p>
                  </div>
                </div>

                {/* Heatwave days */}
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                  <p className="text-xs text-gray-500 mb-3">폭염일수 변화</p>
                  <div className="space-y-2">
                    {heatwaveBars.map((d, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 w-10">{d.decade}</span>
                        <div className="flex-1 h-4 bg-slate-800 rounded overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded"
                            style={{ width: `${(d.days / 20) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-300 w-8 text-right">{d.days}일</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Seasonal anomaly heatmap */}
            <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
              <p className="text-xs text-gray-500 mb-3">계절별 기온 편차 히트맵 (월 x 연대)</p>
              <div className="overflow-x-auto">
                <div className="min-w-[400px]">
                  {/* Header */}
                  <div className="grid gap-1 mb-1" style={{ gridTemplateColumns: `60px repeat(${decades.length}, 1fr)` }}>
                    <div />
                    {decades.map((d, i) => (
                      <span key={i} className="text-[9px] text-gray-500 text-center">{d}</span>
                    ))}
                  </div>
                  {/* Rows */}
                  {months.map((m, mi) => (
                    <div key={mi} className="grid gap-1 mb-0.5" style={{ gridTemplateColumns: `60px repeat(${decades.length}, 1fr)` }}>
                      <span className="text-[9px] text-gray-500 flex items-center">{m}</span>
                      {heatmapData[mi].map((val, di) => (
                        <div key={di} className={`h-5 rounded-sm ${anomalyColor(val)} flex items-center justify-center`}>
                          <span className="text-[7px] text-white/70">{val > 0 ? "+" : ""}{val.toFixed(1)}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 justify-center">
                <span className="text-[9px] text-gray-500">-2°C</span>
                <div className="w-32 h-2 rounded bg-gradient-to-r from-blue-600 via-cyan-400 via-yellow-400 to-red-600" />
                <span className="text-[9px] text-gray-500">+2°C</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Why ME students need climate data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-14"
        >
          <h3 className="text-xl font-bold text-white text-center mb-6">
            왜 <span className="text-teal-400">기계공학도</span>가 기후 데이터를?
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "냉난방 설계 기준 변화", desc: "외기 온도 상승으로 냉방 용량 설계 기준이 변경됩니다. 30년 전 설계 기준은 더 이상 유효하지 않습니다.", icon: "❄️" },
              { title: "열섬효과 분석", desc: "도시 열섬효과는 건물 에너지 소비에 직접 영향을 줍니다. 기후 데이터가 곧 설계 입력입니다.", icon: "🏙️" },
              { title: "건물 에너지 시뮬레이션", desc: "EnergyPlus, TRNSYS 등 시뮬레이션 도구의 필수 입력이 기상 데이터(TMY)입니다.", icon: "🔧" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl bg-slate-800/60 border border-slate-700 p-5">
                <span className="text-2xl">{item.icon}</span>
                <h4 className="text-sm font-bold text-white mt-2 mb-1">{item.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border border-teal-500/20"
        >
          <p className="text-gray-300 leading-relaxed mb-4">
            <span className="text-teal-400 font-semibold">NASA Climate Spiral</span>은 기후 변화를 한눈에 보여주는
            가장 효과적인 시각화 중 하나입니다. AI에게 이런 시각화를 만들어달라고 해보세요.
          </p>
          <p className="text-xs text-gray-500">
            참고: NASA Climate Spiral · Copernicus Interactive Climate Atlas · 기상청 기후정보포털
          </p>
        </motion.div>
      </div>
    </section>
  );
}

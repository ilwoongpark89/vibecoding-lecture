"use client";

import { motion } from "framer-motion";

const summaryCards = [
  { label: "일일 전력사용", value: "2,450 kWh", color: "text-cyan-400", icon: "⚡" },
  { label: "EUI", value: "185 kWh/m²·yr", color: "text-teal-400", icon: "📐" },
  { label: "냉방부하", value: "340 kW", color: "text-blue-400", icon: "❄️" },
  { label: "CO₂ 배출", value: "1.2 ton/day", color: "text-amber-400", icon: "🌍" },
];

const floors = [
  { name: "5F 연구실", eui: 220, color: "bg-red-500/80" },
  { name: "4F 실험실", eui: 200, color: "bg-orange-500/80" },
  { name: "3F 강의실", eui: 160, color: "bg-yellow-500/80" },
  { name: "2F 사무실", eui: 140, color: "bg-teal-400/80" },
  { name: "1F 로비", eui: 100, color: "bg-cyan-400/80" },
];

const hourlyData = [
  20, 15, 12, 10, 10, 15, 30, 60, 85, 95, 90, 88,
  92, 95, 100, 98, 90, 80, 70, 55, 45, 35, 28, 22,
];

const monthlyComparison = [
  { month: "1월", last: 75, this: 70 },
  { month: "3월", last: 60, this: 55 },
  { month: "5월", last: 65, this: 68 },
  { month: "7월", last: 95, this: 100 },
  { month: "9월", last: 80, this: 78 },
  { month: "11월", last: 70, this: 65 },
];

const prompts = [
  "건물 에너지 디지털 트윈 대시보드를 만들어줘. 층별 에너지 사용 강도를 색상으로 보여주는 건물 단면도와 요약 카드를 포함해줘.",
  "24시간 에너지 사용 패턴 차트와 월별 에너지 비교(작년 vs 올해) 바 차트를 추가해줘. 피크 시간대를 강조해줘.",
  "HVAC COP 트렌드와 실내온도 vs 설정온도 비교 차트를 추가하고, 건물 에너지 최적화 인사이트를 표시해줘.",
];

export default function BuildingEnergyTwin() {
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
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-4">
            Week 6 — Building Energy
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            건물 에너지 디지털 트윈
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            인하대학교 기계공학관의 에너지 사용을 실시간으로 모니터링한다면?
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
            <h3 className="text-lg font-bold text-white">🏢 Building Energy Digital Twin</h3>
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

            {/* Building silhouette + 24h chart */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Building cross-section */}
              <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                <p className="text-xs text-gray-500 mb-3">층별 에너지 사용 강도 (EUI)</p>
                <div className="space-y-1">
                  {floors.map((floor, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 w-16 text-right">{floor.name}</span>
                      <div className={`${floor.color} h-8 rounded flex items-center px-2`}
                        style={{ width: `${(floor.eui / 220) * 100}%` }}>
                        <span className="text-[10px] text-white font-bold">{floor.eui}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <span className="text-[10px] text-gray-500">저</span>
                  <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-cyan-400 via-yellow-400 to-red-500" />
                  <span className="text-[10px] text-gray-500">고</span>
                </div>
              </div>

              {/* 24h energy pattern */}
              <div className="md:col-span-2 rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                <p className="text-xs text-gray-500 mb-3">24시간 에너지 사용 패턴</p>
                <div className="h-36 relative overflow-hidden rounded">
                  <svg className="w-full h-full" viewBox="0 0 480 130" preserveAspectRatio="none">
                    {[30, 60, 90].map((y) => (
                      <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="#334155" strokeWidth="0.5" />
                    ))}
                    {/* Peak zone highlight */}
                    <rect x="160" y="0" width="160" height="130" fill="#f59e0b" opacity="0.05" />
                    <text x="240" y="12" textAnchor="middle" fill="#f59e0b" fontSize="8" opacity="0.6">피크 시간대</text>
                    {/* Line */}
                    <polyline
                      points={hourlyData.map((v, i) => `${i * 20},${130 - v * 1.2}`).join(" ")}
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="2.5"
                    />
                    <polyline
                      points={`0,130 ${hourlyData.map((v, i) => `${i * 20},${130 - v * 1.2}`).join(" ")} 460,130`}
                      fill="url(#energyGrad)"
                      opacity="0.15"
                    />
                    <defs>
                      <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute bottom-1 left-0 right-0 flex justify-between px-1 text-[8px] text-gray-600">
                    {[0, 4, 8, 12, 16, 20, 24].map(h => <span key={h}>{h}시</span>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Monthly comparison */}
              <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                <p className="text-xs text-gray-500 mb-3">월별 에너지 비교 (작년 vs 올해)</p>
                <div className="flex items-end gap-3 h-28">
                  {monthlyComparison.map((m, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="flex gap-0.5 items-end h-20 w-full">
                        <div className="flex-1 bg-slate-600 rounded-t" style={{ height: `${m.last}%` }} />
                        <div className="flex-1 bg-gradient-to-t from-teal-600 to-teal-400 rounded-t" style={{ height: `${m.this}%` }} />
                      </div>
                      <span className="text-[9px] text-gray-500">{m.month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-4 mt-2 text-[10px]">
                  <span className="text-gray-500">■ 작년</span>
                  <span className="text-teal-400">■ 올해</span>
                </div>
              </div>

              {/* HVAC performance */}
              <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                <p className="text-xs text-gray-500 mb-3">HVAC 성능 — COP 트렌드</p>
                <div className="h-28 relative overflow-hidden rounded">
                  <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                    {[25, 50, 75].map((y) => (
                      <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#334155" strokeWidth="0.5" />
                    ))}
                    {/* COP trend */}
                    <polyline points="0,60 40,55 80,50 120,52 160,48 200,45 240,42 300,40" fill="none" stroke="#2dd4bf" strokeWidth="2" />
                    {/* Indoor temp */}
                    <polyline points="0,35 40,33 80,34 120,32 160,33 200,34 240,33 300,34" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
                    {/* Set temp */}
                    <line x1="0" y1="33" x2="300" y2="33" stroke="#64748b" strokeWidth="1" strokeDasharray="4 2" />
                  </svg>
                  <div className="absolute top-2 right-2 flex flex-col gap-1 text-[9px]">
                    <span className="text-teal-400">— COP</span>
                    <span className="text-cyan-400">— 실내온도</span>
                    <span className="text-gray-500">-- 설정온도</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prompts */}
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
            Cornell, Berkeley 등 세계 유수 대학이 캠퍼스 건물 에너지 대시보드를 운영합니다.
            <br />
            <span className="text-teal-400 font-semibold">
              AI에게 &ldquo;우리 학교 건물의 에너지 대시보드를 만들어줘&rdquo;라고 말해보세요.
            </span>
          </p>
          <p className="text-xs text-gray-500">
            참고: Cornell Building Energy Dashboard · Berkeley Campus Energy Dashboard · EnergyPlus
          </p>
        </motion.div>
      </div>
    </section>
  );
}

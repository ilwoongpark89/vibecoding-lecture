"use client";

import { motion } from "framer-motion";

const summaryCards = [
  { label: "최고 온도", value: "142°C", color: "text-red-400" },
  { label: "최저 온도", value: "28°C", color: "text-cyan-400" },
  { label: "평균 열유속", value: "2,450 W/m²", color: "text-teal-400" },
  { label: "실험 횟수", value: "24회", color: "text-amber-400" },
];

const prompts = [
  "열전달 실험 대시보드를 만들어줘. 상단에 요약 카드 4개(최고온도, 최저온도, 평균열유속, 실험횟수), 아래에 시간-온도 라인 차트와 실험별 열유속 바 차트를 배치해줘.",
  "CSV 파일을 업로드하면 자동으로 파싱해서 차트에 반영되게 해줘. 파일 형식: 첫 행은 헤더, 이후 데이터.",
  "차트에 마우스 호버 시 툴팁으로 정확한 값 표시. 차트 이미지를 PNG로 다운로드하는 버튼도 추가해줘.",
];

const tableRows = [
  { id: "#001", temp: "132°C", flux: "2,380 W/m²", date: "2026-03-12" },
  { id: "#002", temp: "142°C", flux: "2,510 W/m²", date: "2026-03-13" },
  { id: "#003", temp: "128°C", flux: "2,290 W/m²", date: "2026-03-14" },
  { id: "#004", temp: "137°C", flux: "2,660 W/m²", date: "2026-03-15" },
];

export default function DashboardShowcase() {
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
            Dashboard
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            대시보드 만들기 실전
          </h2>
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
            <h3 className="text-lg font-bold text-white">열전달 실험 대시보드</h3>
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
                  <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                  <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                </div>
              ))}
            </div>

            {/* Charts area */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Large line chart mock */}
              <div className="md:col-span-2 rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                <p className="text-xs text-gray-500 mb-3">시간-온도 라인 차트</p>
                <div className="h-44 relative overflow-hidden rounded">
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-500/10 to-transparent" />
                  <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
                    {/* Grid lines */}
                    {[40, 80, 120].map((y) => (
                      <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#334155" strokeWidth="0.5" />
                    ))}
                    {/* Line */}
                    <polyline
                      points="0,140 40,120 80,90 120,70 160,80 200,60 240,50 280,55 320,40 360,30 400,25"
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="2.5"
                    />
                    <polyline
                      points="0,140 40,120 80,90 120,70 160,80 200,60 240,50 280,55 320,40 360,30 400,25"
                      fill="url(#tealGrad)"
                      opacity="0.15"
                    />
                    <defs>
                      <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                {/* Bar chart mock */}
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                  <p className="text-xs text-gray-500 mb-3">실험별 열유속</p>
                  <div className="flex items-end gap-2 h-20">
                    {[65, 80, 55, 90, 72, 85].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Data table mock */}
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                  <p className="text-xs text-gray-500 mb-2">실험 데이터</p>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-gray-500 border-b border-slate-700">
                        <th className="pb-1 text-left">ID</th>
                        <th className="pb-1 text-left">Temp</th>
                        <th className="pb-1 text-left">Flux</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      {tableRows.map((row, i) => (
                        <tr key={i} className="border-b border-slate-800">
                          <td className="py-1">{row.id}</td>
                          <td className="py-1">{row.temp}</td>
                          <td className="py-1">{row.flux}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border border-teal-500/20"
        >
          <p className="text-gray-300 leading-relaxed">
            논문 Figure, 실험 보고서, 학회 발표 자료 — 모두 AI에게 시켜서 만들 수 있습니다.
            <br />
            <span className="text-teal-400 font-semibold">
              여러분이 할 일은 &lsquo;어떤 데이터를, 어떤 형태로, 왜 보여줄 것인가&rsquo;를 결정하는 것입니다.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const variables = ["온도", "압력", "속도"];
const colormaps = ["viridis", "jet", "coolwarm"];

function getContourColor(row: number, col: number, totalRows: number, totalCols: number): string {
  const cx = totalCols / 2;
  const cy = totalRows / 2;
  const dist = Math.sqrt((col - cx) ** 2 + (row - cy) ** 2);
  const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
  const norm = 1 - dist / maxDist;
  if (norm > 0.85) return "#dc2626";
  if (norm > 0.7) return "#f97316";
  if (norm > 0.55) return "#eab308";
  if (norm > 0.4) return "#22c55e";
  if (norm > 0.25) return "#06b6d4";
  return "#3b82f6";
}

const stats = [
  { label: "Max", value: "142.3°C", color: "text-red-400" },
  { label: "Min", value: "25.0°C", color: "text-blue-400" },
  { label: "Avg", value: "68.7°C", color: "text-teal-400" },
  { label: "Std Dev", value: "28.4°C", color: "text-gray-400" },
];

const ROWS = 16;
const COLS = 24;

export default function CFDContourViewer() {
  const [selectedVar, setSelectedVar] = useState(0);
  const [selectedCmap, setSelectedCmap] = useState(1);

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
            Week 6 — CFD Visualization
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            인터랙티브 CFD 컨투어 뷰어
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            CFD 시뮬레이션 결과를 브라우저에서 인터랙티브하게 보여주는 대시보드
          </p>
        </motion.div>

        {/* Mock Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-14 rounded-2xl border border-slate-700 bg-slate-800 overflow-hidden shadow-2xl"
        >
          <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">🔬 CFD Post-Processor</h3>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Main contour area */}
              <div className="md:col-span-3 space-y-4">
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                  <p className="text-xs text-gray-500 mb-3">온도 컨투어 — 가열 실린더 주변 유동</p>
                  {/* Contour grid */}
                  <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
                    {Array.from({ length: ROWS * COLS }).map((_, idx) => {
                      const row = Math.floor(idx / COLS);
                      const col = idx % COLS;
                      return (
                        <div
                          key={idx}
                          className="aspect-square rounded-[1px]"
                          style={{ backgroundColor: getContourColor(row, col, ROWS, COLS) }}
                        />
                      );
                    })}
                  </div>
                  {/* Colorbar */}
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-[10px] text-gray-500">25°C</span>
                    <div className="flex-1 h-3 rounded bg-gradient-to-r from-blue-500 via-cyan-400 via-green-500 via-yellow-400 to-red-600" />
                    <span className="text-[10px] text-gray-500">142°C</span>
                  </div>
                </div>

                {/* Streamlines */}
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                  <p className="text-xs text-gray-500 mb-3">유선(Streamline) 시각화</p>
                  <svg className="w-full h-24" viewBox="0 0 500 80">
                    <path d="M0,40 Q80,10 160,40 T320,40 T500,40" fill="none" stroke="#2dd4bf" strokeWidth="1.5" opacity="0.8" />
                    <path d="M0,25 Q80,5 160,25 T320,25 T500,28" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.6" />
                    <path d="M0,55 Q80,75 160,55 T320,55 T500,52" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.6" />
                    <path d="M0,15 Q80,2 160,15 T320,18 T500,15" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
                    <path d="M0,65 Q80,78 160,65 T320,62 T500,65" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
                    {/* Flow arrows */}
                    {[100, 250, 400].map(x => (
                      <polygon key={x} points={`${x},37 ${x-6},33 ${x-6},41`} fill="#2dd4bf" opacity="0.7" />
                    ))}
                    {/* Cylinder */}
                    <circle cx="250" cy="40" r="18" fill="#475569" stroke="#64748b" strokeWidth="1.5" />
                    <text x="250" y="44" textAnchor="middle" fill="#94a3b8" fontSize="8">실린더</text>
                  </svg>
                </div>
              </div>

              {/* Side panel */}
              <div className="space-y-4">
                {/* Variable selector */}
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                  <p className="text-xs text-gray-500 mb-2">변수 선택</p>
                  <div className="space-y-1">
                    {variables.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedVar(i)}
                        className={`w-full text-left text-xs px-3 py-2 rounded transition-colors ${
                          selectedVar === i
                            ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                            : "text-gray-400 hover:bg-slate-800"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colormap selector */}
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                  <p className="text-xs text-gray-500 mb-2">컬러맵</p>
                  <div className="space-y-1">
                    {colormaps.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedCmap(i)}
                        className={`w-full text-left text-xs px-3 py-2 rounded transition-colors ${
                          selectedCmap === i
                            ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                            : "text-gray-400 hover:bg-slate-800"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Range slider mockup */}
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                  <p className="text-xs text-gray-500 mb-2">범위 설정</p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] text-gray-400">Min: 25°C</span>
                      <div className="h-1.5 bg-slate-700 rounded-full mt-1">
                        <div className="h-full w-1/6 bg-teal-500 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400">Max: 142°C</span>
                      <div className="h-1.5 bg-slate-700 rounded-full mt-1">
                        <div className="h-full w-5/6 bg-teal-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                  <p className="text-xs text-gray-500 mb-2">통계</p>
                  <div className="space-y-2">
                    {stats.map((s, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-[11px] text-gray-500">{s.label}</span>
                        <span className={`text-[11px] font-bold ${s.color}`}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border border-teal-500/20"
        >
          <p className="text-gray-300 leading-relaxed mb-4">
            AI에게 <span className="text-teal-400 font-semibold">ParaView 수준의 시각화를 웹에서 구현해달라고 할 수 있습니다.</span>
            <br />
            Three.js, D3.js, WebGL 등을 활용하면 브라우저에서 실시간 CFD 후처리가 가능합니다.
          </p>
          <p className="text-xs text-gray-500">
            참고: NASA Scientific Visualization Studio · SimScale · ParaView (paraview.org)
          </p>
        </motion.div>
      </div>
    </section>
  );
}

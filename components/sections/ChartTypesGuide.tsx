"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const chartTypes = [
  {
    name: "라인 차트 (Line)",
    when: "시간 축이 있을 때",
    example: "냉각 곡선 T(t), 온도 이력 데이터",
    color: "teal",
    render: () => (
      <div className="relative w-full h-32 flex items-end gap-1 px-4 pb-2">
        {/* Axis lines */}
        <div className="absolute left-3 bottom-2 top-2 w-px bg-slate-600" />
        <div className="absolute left-3 bottom-2 right-3 h-px bg-slate-600" />
        {/* Line chart points connected */}
        <svg className="absolute inset-0" viewBox="0 0 200 120" preserveAspectRatio="none">
          <polyline
            points="20,100 60,70 100,45 140,55 180,30"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {[
            [20, 100], [60, 70], [100, 45], [140, 55], [180, 30],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="#2dd4bf" />
          ))}
        </svg>
      </div>
    ),
  },
  {
    name: "바 차트 (Bar)",
    when: "항목을 비교할 때",
    example: "재질별 열전도율 비교 (구리 vs 알루미늄 vs 철)",
    color: "cyan",
    render: () => (
      <div className="relative w-full h-32 flex items-end justify-center gap-4 px-6 pb-2">
        <div className="absolute left-3 bottom-2 top-2 w-px bg-slate-600" />
        <div className="absolute left-3 bottom-2 right-3 h-px bg-slate-600" />
        <div className="flex items-end gap-4 h-full pt-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 bg-gradient-to-t from-teal-600 to-teal-400 rounded-t" style={{ height: "90%" }} />
            <span className="text-[10px] text-gray-500">Cu</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t" style={{ height: "60%" }} />
            <span className="text-[10px] text-gray-500">Al</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 bg-gradient-to-t from-slate-600 to-slate-400 rounded-t" style={{ height: "35%" }} />
            <span className="text-[10px] text-gray-500">Fe</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "스캐터 플롯 (Scatter)",
    when: "상관관계를 볼 때",
    example: "Re vs Nu 실험 데이터",
    color: "teal",
    render: () => (
      <div className="relative w-full h-32 px-4 pb-2">
        <div className="absolute left-3 bottom-2 top-2 w-px bg-slate-600" />
        <div className="absolute left-3 bottom-2 right-3 h-px bg-slate-600" />
        <svg className="absolute inset-0" viewBox="0 0 200 120">
          {[
            [30, 95], [45, 80], [55, 75], [70, 60], [80, 55],
            [95, 50], [110, 40], [125, 38], [140, 30], [155, 25],
            [50, 85], [75, 65], [100, 48], [130, 35], [160, 28],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.5" fill="#2dd4bf" opacity={0.8} />
          ))}
        </svg>
      </div>
    ),
  },
  {
    name: "히트맵 (Heatmap)",
    when: "공간 분포를 볼 때",
    example: "평판 위 온도 분포, CFD 결과",
    color: "cyan",
    render: () => (
      <div className="w-full h-32 flex items-center justify-center p-4">
        <div className="grid grid-cols-6 grid-rows-4 gap-0.5 w-full h-full">
          {[
            "#1e3a5f","#1e5f8a","#2596be","#4db8d1","#7fcce0","#a3dced",
            "#1e5f8a","#2596be","#4db8d1","#7fcce0","#e8c468","#e8a040",
            "#2596be","#4db8d1","#e8c468","#e8a040","#e07030","#d94040",
            "#4db8d1","#e8c468","#e8a040","#e07030","#d94040","#c02020",
          ].map((bg, i) => (
            <div key={i} className="rounded-sm" style={{ backgroundColor: bg }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    name: "파이 차트 (Pie)",
    when: "비율을 볼 때 (항목 5개 이하)",
    example: "열저항 기여도 (대류 40%, 전도 50%, 접촉 10%)",
    color: "teal",
    render: () => (
      <div className="w-full h-32 flex items-center justify-center">
        <div
          className="w-24 h-24 rounded-full"
          style={{
            background: "conic-gradient(#2dd4bf 0% 50%, #06b6d4 50% 90%, #64748b 90% 100%)",
          }}
        >
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-slate-800" />
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "서피스 플롯 (Surface/Contour)",
    when: "파라메트릭 스터디 결과",
    example: "핀 효율 = f(길이, 두께)",
    color: "cyan",
    render: () => (
      <div className="w-full h-32 flex items-center justify-center p-4">
        <div className="relative w-full h-full">
          {[
            { color: "#1e3a5f", inset: "0%" },
            { color: "#1e5f8a", inset: "10%" },
            { color: "#2596be", inset: "20%" },
            { color: "#4db8d1", inset: "30%" },
            { color: "#e8c468", inset: "40%" },
            { color: "#e07030", inset: "50%" },
          ].map((layer, i) => (
            <div
              key={i}
              className="absolute rounded-lg"
              style={{
                backgroundColor: layer.color,
                inset: layer.inset,
                opacity: 0.9,
              }}
            />
          ))}
        </div>
      </div>
    ),
  },
];

export default function ChartTypesGuide() {
  const [selected, setSelected] = useState(0);

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
            Chart Selection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            어떤 차트를 써야 할까?
          </h2>
        </motion.div>

        {/* Grid of chart type cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {chartTypes.map((chart, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setSelected(idx)}
              className={`cursor-pointer rounded-xl border p-5 transition-all duration-300 ${
                selected === idx
                  ? "bg-slate-800 border-teal-500/50 shadow-lg shadow-teal-500/10"
                  : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
              }`}
            >
              {/* Chart illustration */}
              <div className="bg-slate-900/80 rounded-lg mb-4 overflow-hidden">
                {chart.render()}
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{chart.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{chart.example}</p>
              <span className="inline-block px-2 py-0.5 text-xs rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                언제: {chart.when}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center p-6 rounded-xl bg-slate-800/50 border border-slate-700"
        >
          <p className="text-gray-300">
            <span className="text-teal-400 font-semibold">차트 선택의 원칙:</span>{" "}
            전달하고 싶은 메시지가 먼저, 차트 유형은 그 다음입니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

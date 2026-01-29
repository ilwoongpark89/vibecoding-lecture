"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "2010",
    title: "MIT App Inventor",
    desc: "블록으로 앱 만들기 — 프로그래밍 없이 안드로이드 앱 개발",
    color: "bg-orange-500",
    icon: "🧱",
  },
  {
    year: "2019",
    title: "Scratch 3.0",
    desc: "어린이도 프로그래밍 — MIT Media Lab의 비주얼 프로그래밍",
    color: "bg-amber-500",
    icon: "🐱",
  },
  {
    year: "2020",
    title: "No-Code Tools",
    desc: "Bubble, Webflow — 드래그앤드롭으로 웹앱 제작",
    color: "bg-yellow-500",
    icon: "🖱️",
  },
  {
    year: "2023",
    title: "AI Code Generation",
    desc: "GPT-4, Claude — 자연어로 코드 생성, Copilot 등장",
    color: "bg-orange-400",
    icon: "🤖",
  },
  {
    year: "2025",
    title: "Vibe Coding",
    desc: "도메인 전문가가 AI에게 지시하여 소프트웨어를 만드는 시대",
    color: "bg-orange-600",
    icon: "🎵",
  },
];

const calcEvolution = [
  { era: "과거", tool: "Excel 매크로", desc: "수식 입력, VBA 스크립트", accessibility: 20 },
  { era: "과거", tool: "MATLAB 스크립트", desc: "행렬 연산, 플롯 생성", accessibility: 40 },
  { era: "과거", tool: "Python 스크립트", desc: "라이브러리 활용, 데이터 분석", accessibility: 60 },
  { era: "현재", tool: "AI 바이브코딩", desc: "\"열전달 계산기 만들어줘\" → 웹앱 완성", accessibility: 95 },
];

const mitExamples = [
  { title: "재료 물성 데이터베이스 앱", desc: "App Inventor로 만들 수 있는 재료별 열전도율, 비열 검색 앱. 현장에서 스마트폰으로 즉시 조회.", icon: "📱" },
  { title: "실험 데이터 로거", desc: "Arduino 센서 데이터를 블루투스로 받아 실시간 그래프를 그리는 앱. 코딩 없이 블록으로 제작.", icon: "📊" },
  { title: "공학 단위 변환기", desc: "SI/영국 단위 간 변환, 열역학 상수 참조 기능을 갖춘 유틸리티 앱.", icon: "🔧" },
];

export default function MITAppInventor() {
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
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-4">
            Week 5 — From Blocks to Vibes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            MIT App Inventor에서 바이브코딩까지:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              누구나 만드는 시대
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            2010년 MIT App Inventor의 블록 코딩에서 2025년 바이브코딩까지, &ldquo;비전공자도 만든다&rdquo;의 진화
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Evolution Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-slate-800/60 border border-slate-700 p-6"
          >
            <h3 className="text-sm font-bold text-orange-400 mb-6 text-center">&ldquo;누구나 만든다&rdquo;의 진화 타임라인</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500 via-amber-500 to-orange-600" />
              <div className="space-y-6">
                {timeline.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start gap-4 pl-1"
                  >
                    <div className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center text-sm flex-shrink-0`}>
                      {t.icon}
                    </div>
                    <div className={`flex-1 rounded-lg p-4 ${
                      i === timeline.length - 1
                        ? "bg-orange-500/10 border border-orange-500/30"
                        : "bg-slate-900/80 border border-slate-700"
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-orange-400">{t.year}</span>
                        <span className="text-sm font-bold text-white">{t.title}</span>
                      </div>
                      <p className="text-xs text-gray-400">{t.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Engineering Calculator Evolution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-slate-800/60 border border-slate-700 p-6"
          >
            <h3 className="text-sm font-bold text-orange-400 mb-1">공학 계산기의 진화</h3>
            <p className="text-[10px] text-gray-500 mb-4">막대 길이 = 사용자 접근성 (비전공자가 해당 도구를 사용할 수 있는 용이성, 높을수록 쉬움)</p>
            <div className="space-y-3">
              {calcEvolution.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded ${
                    c.era === "현재" ? "bg-orange-500/20 text-orange-400" : "bg-slate-700 text-gray-500"
                  }`}>{c.era}</span>
                  <span className="text-xs text-white font-semibold w-28">{c.tool}</span>
                  <div className="flex-1">
                    <div className="h-5 bg-slate-900 rounded overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.accessibility}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.15 }}
                        className={`h-full rounded ${
                          c.era === "현재"
                            ? "bg-gradient-to-r from-orange-600 to-amber-400"
                            : "bg-slate-600"
                        }`}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 w-40 text-right">{c.desc}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-orange-500/5 border border-orange-500/20 text-center">
              <p className="text-sm text-white">
                &ldquo;열전달 계산기 만들어줘&rdquo; → AI가 <span className="text-orange-400 font-bold">웹앱 완성</span>
              </p>
            </div>
          </motion.div>

          {/* MIT Student Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-slate-800/60 border border-slate-700 p-6"
          >
            <h3 className="text-sm font-bold text-orange-400 mb-6 text-center">
              App Inventor로 만들 수 있는 공학 앱 예시
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {mitExamples.map((ex, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-lg bg-slate-900/80 border border-slate-700 p-4"
                >
                  <span className="text-2xl">{ex.icon}</span>
                  <h4 className="text-sm font-bold text-white mt-2 mb-1">{ex.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{ex.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Comparison: App Inventor vs Vibe Coding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-slate-800/60 border border-slate-700 p-6 overflow-x-auto"
          >
            <h3 className="text-sm font-bold text-orange-400 mb-4">App Inventor vs 바이브코딩</h3>
            <table className="w-full text-xs min-w-[400px]">
              <thead>
                <tr className="text-gray-500 border-b border-slate-700">
                  <th className="pb-2 text-left">항목</th>
                  <th className="pb-2 text-left text-amber-400">App Inventor (2010)</th>
                  <th className="pb-2 text-left text-orange-400">바이브코딩 (2025)</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                {[
                  ["입력 방식", "블록 드래그앤드롭", "자연어 대화"],
                  ["결과물", "안드로이드 앱", "웹앱, API, 대시보드 등"],
                  ["학습 곡선", "몇 시간", "몇 분"],
                  ["복잡도 한계", "간단한 앱만 가능", "복잡한 프로젝트도 가능"],
                  ["핵심 역량", "블록 조합 능력", "프롬프트 작성 + 도메인 지식"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    <td className="py-2 text-gray-300 font-semibold">{row[0]}</td>
                    <td className="py-2">{row[1]}</td>
                    <td className="py-2">{row[2]}</td>
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
          className="max-w-3xl mx-auto text-center p-8 mt-12 rounded-2xl bg-gradient-to-br from-orange-500/5 to-amber-500/5 border border-orange-500/20"
        >
          <p className="text-gray-300 leading-relaxed mb-4">
            <span className="text-orange-400 font-semibold">
              여러분은 Excel보다 더 강력한 도구를 AI로 만들 수 있습니다.
            </span>
            <br />
            MIT App Inventor가 시작한 &ldquo;누구나 만든다&rdquo;의 철학은 바이브코딩으로 완성됩니다.
          </p>
          <p className="text-xs text-gray-500">
            참고: MIT App Inventor (appinventor.mit.edu) · MIT Media Lab · Scratch (scratch.mit.edu)
          </p>
        </motion.div>
      </div>
    </section>
  );
}

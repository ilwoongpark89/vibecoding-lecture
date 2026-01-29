"use client";

import { motion } from "framer-motion";

const scenarios = [
  {
    icon: "💥",
    title: "AI가 코드를 망쳤을 때",
    situation: "AI에게 \"차트 색상 바꿔줘\"라고 했는데 계산 로직까지 바뀜",
    without: "이전 코드를 기억에 의존해서 복구 시도 → 실패",
    withGit: "git checkout 한 줄로 이전 버전 복구",
  },
  {
    icon: "🔀",
    title: "여러 방향으로 실험하고 싶을 때",
    situation: "열전달 계산기에 차트를 Recharts로 할지 Chart.js로 할지 비교",
    without: "폴더를 복사해서 \"계산기_v1\", \"계산기_v2\", \"계산기_최종_진짜최종\"",
    withGit: "branch로 깔끔하게 분리, 마음에 드는 쪽을 merge",
  },
  {
    icon: "📜",
    title: "작업 이력을 남기고 싶을 때",
    situation: "교수님이 \"지난주 버전이 더 나았는데\" 라고 하심",
    without: "... 없음",
    withGit: "git log로 모든 변경 이력 확인, 원하는 시점으로 이동",
  },
];

export default function WhyGit() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 mb-4">
            Why Git?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">왜 Git이 필요한가?</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {scenarios.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-sm text-gray-400 mb-5">
                <span className="text-gray-500 font-medium">상황:</span> {s.situation}
              </p>

              {/* Without Git */}
              <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 mb-3">
                <p className="text-xs font-semibold text-red-400 mb-1">Git 없이</p>
                <p className="text-sm text-gray-300">{s.without}</p>
              </div>

              {/* With Git */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                <p className="text-xs font-semibold text-emerald-400 mb-1">Git 있으면</p>
                <p className="text-sm text-gray-300">{s.withGit}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <p className="text-gray-400 text-lg leading-relaxed border-l-4 border-emerald-500/50 pl-6 text-left">
            바이브코딩에서 코드를 직접 쓰지 않더라도, AI가 만든 코드의 &apos;역사&apos;를 관리하는 건 여러분의 몫입니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

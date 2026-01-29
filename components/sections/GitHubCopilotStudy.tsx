"use client";

import { motion } from "framer-motion";

const productivityStats = [
  { label: "개발 속도", before: "기준", after: "55% 향상", icon: "⚡" },
  { label: "코드 품질", before: "기준", after: "동일 유지", icon: "✅" },
  { label: "일일 커밋 수", before: "3회", after: "8회", icon: "📸" },
  { label: "작업 만족도", before: "기준", after: "75% 향상", icon: "😊" },
];

const synergies = [
  {
    title: "AI 생성 → Git 추적 → 즉시 롤백",
    desc: "AI가 코드를 생성하면 Git으로 변경사항을 추적합니다. 문제가 생기면 git revert로 즉시 이전 상태로 복구합니다.",
    icon: "🔄",
  },
  {
    title: "Git diff로 AI 변경분만 정확히 검토",
    desc: "AI가 수십 개 파일을 한번에 수정해도, git diff로 정확히 어떤 부분이 바뀌었는지 한눈에 파악할 수 있습니다.",
    icon: "🔍",
  },
  {
    title: "GitHub PR로 AI 코드를 리뷰 받기",
    desc: "AI가 작성한 코드를 Pull Request로 올리면 동료나 교수님이 리뷰할 수 있습니다. 코드의 품질을 보장하는 안전망입니다.",
    icon: "👥",
  },
];

const commitComparison = {
  before: [
    { time: "10:00", msg: "전체 수정", size: "large" },
    { time: "14:00", msg: "추가 수정", size: "large" },
    { time: "18:00", msg: "최종", size: "large" },
  ],
  after: [
    { time: "09:00", msg: "열전달 모듈 추가" },
    { time: "09:30", msg: "단위 변환 함수" },
    { time: "10:15", msg: "차트 컴포넌트" },
    { time: "11:00", msg: "데이터 파싱" },
    { time: "13:00", msg: "UI 레이아웃" },
    { time: "14:30", msg: "에러 핸들링" },
    { time: "16:00", msg: "테스트 추가" },
    { time: "17:00", msg: "문서화" },
  ],
};

export default function GitHubCopilotStudy() {
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
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            Week 4 — AI + Git Synergy
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            GitHub의 개발자 생산성 연구:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              AI와 Git의 시너지
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            GitHub이 발표한 Copilot의 개발자 생산성 연구 결과와 AI 시대의 Git 활용법
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Productivity stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {productivityStats.map((stat, i) => (
              <div key={i} className="rounded-xl bg-slate-800/60 border border-slate-700 p-5 text-center">
                <span className="text-2xl">{stat.icon}</span>
                <p className="text-xs text-gray-500 mt-2">{stat.label}</p>
                <p className="text-lg font-bold text-emerald-400 mt-1">{stat.after}</p>
                <p className="text-[10px] text-gray-600 mt-0.5">vs {stat.before}</p>
              </div>
            ))}
          </motion.div>

          {/* Key finding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-6 text-center"
          >
            <p className="text-lg text-white font-semibold mb-2">
              &ldquo;AI가 만든 코드일수록 Git이 더 중요하다&rdquo;
            </p>
            <p className="text-sm text-gray-400">
              AI는 한번에 수십 파일을 변경하므로, 세밀한 버전 관리가 필수입니다.
              Git 없이 AI를 쓰는 것은 안전벨트 없이 고속도로를 달리는 것과 같습니다.
            </p>
          </motion.div>

          {/* 55% speed improvement visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-slate-800/60 border border-slate-700 p-6"
          >
            <h3 className="text-sm font-bold text-emerald-400 mb-4">개발 속도 비교 — 동일 과제 수행 시간</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">AI 없이</span>
                  <span className="text-gray-400">평균 2시간 41분</span>
                </div>
                <div className="h-8 bg-slate-900 rounded overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="h-full bg-slate-600 rounded flex items-center justify-end pr-2"
                  >
                    <span className="text-[10px] text-gray-300">161분</span>
                  </motion.div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-emerald-400">AI와 함께</span>
                  <span className="text-emerald-400">평균 1시간 13분</span>
                </div>
                <div className="h-8 bg-slate-900 rounded overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "55%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-cyan-500 rounded flex items-center justify-end pr-2"
                  >
                    <span className="text-[10px] text-white">73분</span>
                  </motion.div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-emerald-400 font-bold mt-3">55% 더 빠르게 완료</p>
          </motion.div>

          {/* AI + Git synergy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-slate-800/60 border border-slate-700 p-6"
          >
            <h3 className="text-sm font-bold text-emerald-400 mb-6 text-center">AI + Git 시너지 3가지</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {synergies.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-lg bg-slate-900/80 border border-slate-700 p-4"
                >
                  <span className="text-2xl">{s.icon}</span>
                  <h4 className="text-sm font-bold text-white mt-2 mb-1">{s.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Commit frequency comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-slate-800/60 border border-slate-700 p-6"
          >
            <h3 className="text-sm font-bold text-emerald-400 mb-4">커밋 패턴 변화 — 더 자주, 더 작게</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Before */}
              <div>
                <p className="text-xs text-gray-500 mb-3">AI 사용 전 (하루 3커밋)</p>
                <div className="space-y-2">
                  {commitComparison.before.map((c, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500 w-10 font-mono">{c.time}</span>
                      <div className="flex-1 h-6 bg-slate-600 rounded flex items-center px-2">
                        <span className="text-[10px] text-gray-300">{c.msg}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* After */}
              <div>
                <p className="text-xs text-emerald-400 mb-3">AI 사용 후 (하루 8커밋)</p>
                <div className="space-y-1.5">
                  {commitComparison.after.map((c, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500 w-10 font-mono">{c.time}</span>
                      <div className="flex-1 h-5 bg-gradient-to-r from-emerald-600/60 to-cyan-500/60 rounded flex items-center px-2">
                        <span className="text-[10px] text-white">{c.msg}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center p-8 mt-12 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border border-emerald-500/20"
        >
          <p className="text-gray-300 leading-relaxed mb-4">
            <span className="text-emerald-400 font-semibold">
              AI가 코드를 생성하는 시대일수록, Git을 잘 다루는 사람이 진짜 실력자입니다.
            </span>
          </p>
          <p className="text-xs text-gray-500">
            참고: GitHub Copilot Research Blog · Ziegler et al. 2024 · GitHub Universe 2024
          </p>
        </motion.div>
      </div>
    </section>
  );
}

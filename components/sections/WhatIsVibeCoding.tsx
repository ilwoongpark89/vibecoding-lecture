"use client";

import { motion } from "framer-motion";

const timeline = [
  { year: "1950s", short: "'50", label: "어셈블리어", desc: "기계에 가까운 언어" },
  { year: "1970s", short: "'70", label: "C / Fortran", desc: "공학 계산의 표준" },
  { year: "1990s", short: "'90", label: "Python / MATLAB", desc: "고수준 스크립트 언어" },
  { year: "2020s", short: "'20", label: "AI 코딩 어시스턴트", desc: "Copilot, ChatGPT 등장" },
  { year: "2025~", short: "'25", label: "바이브코딩", desc: "자연어로 프로그램 생성", highlight: true },
];

const comparisons = [
  {
    title: "기존 코딩",
    items: [
      "문법(syntax)을 암기해야 함",
      "에러 메시지를 직접 해석",
      "라이브러리 문서를 읽고 학습",
      "디버깅에 많은 시간 소요",
    ],
    color: "gray",
  },
  {
    title: "바이브코딩",
    items: [
      "자연어로 원하는 기능을 설명",
      "AI가 코드를 생성하고 설명",
      "대화로 수정·개선 요청",
      "결과 확인에 집중",
    ],
    color: "violet",
  },
];

const coreThesis = {
  before: {
    title: "과거: 프로그래밍이 병목",
    desc: "좋은 아이디어가 있어도 코딩 능력이 없으면 실현 불가. 개발자에게 의뢰하면 소통 비용 + 도메인 오해 발생.",
    items: [
      "열역학 시뮬레이션 → 6개월 외주 개발",
      "실험 데이터 분석 → Excel 한계에 갇힘",
      "논문 결과 시각화 → MATLAB 라이선스 의존",
    ],
  },
  after: {
    title: "지금: 도메인 지식이 핵심 경쟁력",
    desc: "프로그래밍 장벽이 사라지면, 문제를 정확히 정의할 수 있는 사람이 가장 강력한 개발자가 된다.",
    items: [
      "열역학 시뮬레이션 → 대화로 직접 구현",
      "실험 데이터 분석 → 맞춤형 웹 대시보드 제작",
      "논문 결과 시각화 → 인터랙티브 웹앱 배포",
    ],
  },
};

const advantages = [
  {
    emoji: "🎯",
    title: "정확한 문제 정의",
    desc: "프로그래머는 '열전달'이 뭔지 모르지만, 여러분은 q = hAΔT를 안다. AI에게 정확한 요구사항을 전달할 수 있는 건 도메인 전문가뿐이다.",
    example: "\"대류 열전달 계수를 Nusselt 상관식으로 계산해줘\" — 이 한 문장이 코딩 능력보다 강력하다.",
  },
  {
    emoji: "🔍",
    title: "결과 검증 능력",
    desc: "AI가 코드를 만들어도 결과가 맞는지 판단할 수 있는 건 역학을 아는 사람뿐이다. Reynolds 수가 음수로 나오면 뭔가 잘못된 걸 즉시 알 수 있다.",
    example: "비전공자: \"코드가 돌아가니까 맞겠지\" vs 기계공학도: \"Nu가 100 이상? 상관식 범위를 벗어났네\"",
  },
  {
    emoji: "⚙️",
    title: "현실 문제 해결",
    desc: "세상의 진짜 문제는 코드가 아니라 물리에 있다. 배관 설계, 열교환기 최적화, 구조 해석 — 이 문제를 이해하는 사람이 도구를 만들면 가장 효과적이다.",
    example: "공장 냉각 시스템 최적화 → 역학 지식 + AI 코딩 = 직접 시뮬레이션 도구 제작",
  },
  {
    emoji: "🚀",
    title: "10배 빠른 연구",
    desc: "실험 → 데이터 분석 → 시각화 → 논문의 전 과정을 혼자서 자동화할 수 있다. 개발자를 기다리거나 도구의 한계에 갇히지 않는다.",
    example: "실험 데이터 100개 → AI에게 분석 스크립트 요청 → 30분 만에 인터랙티브 논문 Figure 완성",
  },
];

const realWorldExamples = [
  {
    field: "열유체",
    problem: "배관 시스템의 압력 강하 계산",
    traditional: "MATLAB 코드 수백 줄 작성, 디버깅에 일주일",
    vibecoding: "\"Darcy-Weisbach 방정식으로 배관 압력 강하 계산기 만들어줘. 관 직경, 길이, 유속을 입력하면 되게.\"",
  },
  {
    field: "고체역학",
    problem: "외팔보의 처짐과 응력 분포 시각화",
    traditional: "FEA 소프트웨어 라이선스 구매, 별도 학습 필요",
    vibecoding: "\"외팔보에 집중 하중이 걸릴 때 처짐과 응력을 그래프로 보여주는 웹 도구를 만들어줘.\"",
  },
  {
    field: "열전달",
    problem: "핀(fin)의 효율 최적화",
    traditional: "수식 정리 → 엑셀 반복 계산 → 수동 그래프 작성",
    vibecoding: "\"핀 효율을 길이, 두께, 열전도율에 따라 계산하고 3D 서피스 플롯으로 보여줘.\"",
  },
];

const meReasons = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "공학 계산 자동화",
    desc: "열전달, 유체역학 계산기를 대화만으로 구현. 반복 계산을 웹 도구로 전환합니다.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "데이터 시각화",
    desc: "실험 데이터와 CFD/FEA 결과를 인터랙티브 차트와 웹 대시보드로 표현합니다.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "IoT & 제어 대시보드",
    desc: "센서 데이터를 실시간 모니터링하고, 장비 제어 인터페이스를 웹으로 직접 구축합니다.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "프로토타입 제작",
    desc: "아이디어를 빠르게 프로토타입으로 구현. 논문의 데모, 교육 도구 등을 신속하게 만듭니다.",
  },
];

export default function WhatIsVibeCoding() {
  return (
    <section id="what-is-vibecoding" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-sm font-medium mb-4">
            What is Vibe Coding?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400">바이브코딩</span>이란?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            코드를 직접 작성하지 않고, <span className="text-violet-400">자연어로 AI에게 의도를 전달</span>하여
            프로그램을 만드는 새로운 프로그래밍 패러다임입니다.
          </p>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <blockquote className="relative p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 border border-violet-500/20">
            <svg className="absolute top-4 left-4 w-8 h-8 text-violet-500/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z"/>
            </svg>
            <p className="text-lg text-gray-300 leading-relaxed pl-8 italic">
              &ldquo;There&rsquo;s a new kind of coding I call <strong className="text-violet-400">vibe coding</strong>,
              where you fully give in to the vibes, embrace exponentials,
              and forget that the code even exists.&rdquo;
            </p>
            <footer className="mt-4 pl-8 text-gray-500">
              — Andrej Karpathy, 2025
            </footer>
          </blockquote>
        </motion.div>

        {/* Evolution Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-10">프로그래밍의 진화</h3>
          <div className="relative">
            {/* Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-700 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className={`relative mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                    "highlight" in item && item.highlight
                      ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30"
                      : "bg-slate-700"
                  }`}>
                    <span className="text-white text-xs font-bold">{item.short}</span>
                  </div>
                  <p className="text-sm font-bold text-white">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  <p className={`text-xs font-mono mt-1 ${
                    "highlight" in item && item.highlight ? "text-violet-400" : "text-gray-600"
                  }`}>{item.year}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Comparison: Traditional vs Vibe */}
        <div className="max-w-4xl mx-auto mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-10">기존 코딩 vs 바이브코딩</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {comparisons.map((col) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`p-6 rounded-2xl border ${
                  col.color === "violet"
                    ? "bg-violet-500/10 border-violet-500/30"
                    : "bg-slate-800/50 border-slate-700"
                }`}
              >
                <h4 className={`text-lg font-bold mb-4 ${
                  col.color === "violet" ? "text-violet-400" : "text-gray-400"
                }`}>{col.title}</h4>
                <ul className="space-y-3">
                  {col.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                        col.color === "violet" ? "bg-violet-500" : "bg-gray-600"
                      }`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══ Core Thesis: Why ME Students ═══ */}
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
              Core Thesis
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              기계공학도에게 바이브코딩이<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">왜 가장 강력한가?</span>
            </h3>
          </motion.div>

          {/* Big Quote / Thesis Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto mb-16 p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 text-center"
          >
            <p className="text-xl md:text-2xl text-white leading-relaxed font-medium">
              프로그래밍을 <span className="text-amber-400">누구나</span> 할 수 있게 된 세상에서,<br />
              변화의 주역은 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400 font-bold">역학에 대한 깊은 이해</span>를 가진 사람이<br />
              프로그래밍을 <span className="text-amber-400">도구</span>로 사용하는 경우다.
            </p>
            <p className="text-gray-500 mt-4 text-sm">
              코드를 잘 짜는 사람이 아니라, 문제를 정확히 아는 사람이 이긴다.
            </p>
          </motion.div>

          {/* Before vs After */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {[coreThesis.before, coreThesis.after].map((side, idx) => (
              <motion.div
                key={side.title}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`p-6 rounded-2xl border ${
                  idx === 0
                    ? "bg-slate-800/50 border-slate-700"
                    : "bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/30"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-2xl`}>{idx === 0 ? "⛓️" : "🔓"}</span>
                  <h4 className={`text-lg font-bold ${idx === 0 ? "text-gray-400" : "text-amber-400"}`}>{side.title}</h4>
                </div>
                <p className="text-sm text-gray-400 mb-4">{side.desc}</p>
                <ul className="space-y-2">
                  {side.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className={`mt-0.5 ${idx === 0 ? "text-red-400" : "text-green-400"}`}>{idx === 0 ? "✗" : "✓"}</span>
                      <span className={idx === 0 ? "text-gray-500" : "text-gray-300"}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* 4 Advantages */}
          <div className="mb-16">
            <h4 className="text-xl font-bold text-white text-center mb-2">도메인 전문가의 4가지 결정적 우위</h4>
            <p className="text-gray-500 text-center text-sm mb-8">프로그래머가 아닌 기계공학도만이 가진 강점</p>
            <div className="grid md:grid-cols-2 gap-5">
              {advantages.map((adv, i) => (
                <motion.div
                  key={adv.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{adv.emoji}</span>
                    <h5 className="text-lg font-bold text-white">{adv.title}</h5>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed mb-3">{adv.desc}</p>
                  <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700">
                    <p className="text-xs text-amber-400/80 font-mono leading-relaxed">{adv.example}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Real-world Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h4 className="text-xl font-bold text-white text-center mb-2">실제 기계공학 문제에 적용하면?</h4>
            <p className="text-gray-500 text-center text-sm mb-8">같은 문제를 기존 방식 vs 바이브코딩으로 비교</p>
            <div className="space-y-4">
              {realWorldExamples.map((ex, i) => (
                <motion.div
                  key={ex.field}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium">{ex.field}</span>
                    <span className="text-white font-semibold text-sm">{ex.problem}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700">
                      <span className="text-[10px] text-red-400 font-medium">기존 방식</span>
                      <p className="text-xs text-gray-500 mt-1">{ex.traditional}</p>
                    </div>
                    <div className="px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/20">
                      <span className="text-[10px] text-amber-400 font-medium">바이브코딩</span>
                      <p className="text-xs text-amber-200/70 mt-1 font-mono">&ldquo;{ex.vibecoding}&rdquo;</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Original 4 cards */}
          <div>
            <h4 className="text-xl font-bold text-white text-center mb-2">기계공학도가 만들 수 있는 것들</h4>
            <p className="text-gray-500 text-center text-sm mb-8">바이브코딩으로 직접 제작 가능한 도구들</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {meReasons.map((reason, i) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-violet-500/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4">
                    {reason.icon}
                  </div>
                  <h4 className="font-semibold text-white mb-2">{reason.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{reason.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-500/20 text-center"
          >
            <p className="text-2xl font-bold text-white mb-2">
              코딩을 배우는 것이 아니라,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">여러분의 공학 지식에 날개를 다는 것</span>입니다.
            </p>
            <p className="text-gray-400 mt-3 text-sm max-w-2xl mx-auto">
              Navier-Stokes 방정식을 이해하는 사람이 AI에게 &ldquo;유동 시뮬레이션 해줘&rdquo;라고 말하는 것과,<br />
              프로그래머가 같은 말을 하는 것은 완전히 다른 결과를 만든다.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

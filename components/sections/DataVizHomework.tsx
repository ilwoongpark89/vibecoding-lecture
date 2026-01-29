"use client";

import { motion } from "framer-motion";

const missions = [
  {
    num: 1,
    points: 30,
    title: "차트 유형 선택",
    difficulty: "기본",
    diffColor: "bg-green-500/20 text-green-300 border-green-500/30",
    desc: "주어진 열전달 실험 데이터셋에 대해 적절한 차트 유형 3가지를 선택하고 이유를 설명하세요.",
    requirements: [
      "열전달 실험 데이터셋 분석 (온도 변화, 열유속, 시간 등)",
      "최소 3가지 차트 유형 선택 (예: 라인, 바, 히트맵, 산점도 등)",
      "각 차트 유형을 선택한 이유를 데이터 특성과 연결하여 설명",
      "부적절한 차트 유형 1가지를 선택하고 왜 부적절한지 설명",
      "설명은 문서(README 또는 PDF)로 제출",
    ],
    hint: "데이터의 차원(시간, 범주, 연속), 비교 목적(추세, 분포, 관계)에 따라 적합한 차트가 달라집니다.",
  },
  {
    num: 2,
    points: 40,
    title: "인터랙티브 대시보드 만들기",
    difficulty: "응용",
    diffColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    desc: "AI에게 요청하여 본인의 실험/과제 데이터를 시각화하는 인터랙티브 대시보드를 제작하세요.",
    requirements: [
      "본인의 실험 데이터 또는 공개 데이터셋 사용 (출처 명시)",
      "최소 2종류의 차트 포함 (예: 라인 + 바, 산점도 + 히트맵 등)",
      "인터랙티브 요소 1개 이상 (필터, 드롭다운, 슬라이더 등)",
      "React + Recharts/Chart.js/D3.js 등 라이브러리 활용",
      "데이터 출처와 사용한 프롬프트를 README에 기록",
    ],
    hint: "수업에서 본 기후 데이터 탐색기나 배터리 대시보드를 참고하되, 본인만의 데이터를 사용하세요.",
  },
  {
    num: 3,
    points: 30,
    title: "논문급 차트 만들기",
    difficulty: "심화",
    diffColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    desc: "학술 논문에 넣을 수 있는 수준의 차트 1개를 제작하세요.",
    requirements: [
      "축 라벨 (변수명 + 단위) 명확히 표시",
      "범례(Legend) 포함",
      "적절한 폰트 크기 (제목 > 축 라벨 > 눈금)",
      "불필요한 장식 제거 (Tufte 원칙: 데이터-잉크 비율 최대화)",
      "출력 형식: PNG(300dpi 이상) 또는 SVG",
    ],
    hint: "matplotlib, Plotly, 또는 AI에게 \"논문용 차트 스타일로 만들어줘\"라고 요청해보세요. Nature/IEEE 스타일 가이드를 참고하면 좋습니다.",
  },
];

const bonusTask = {
  title: "보너스: 인터랙티브 요소 추가",
  points: "+10",
  desc: "대시보드에 툴팁, 필터, 애니메이션 등 추가 인터랙티브 요소를 구현하세요.",
  tech: "Recharts 툴팁, Framer Motion 애니메이션, 또는 D3.js 트랜지션 활용 가능",
};

const submission = [
  { icon: "1", label: "GitHub Repository URL", desc: "코드 전체가 포함된 공개 저장소" },
  { icon: "2", label: "스크린샷", desc: "대시보드 작동 화면 캡처 (차트 + 인터랙션 포함)" },
];

const rubric = [
  { item: "차트 유형 선택 및 설명", points: 20, desc: "적절한 차트 선택과 논리적 설명" },
  { item: "대시보드 완성도", points: 25, desc: "2종류 이상 차트, 인터랙티브 요소 동작" },
  { item: "학술 차트 품질", points: 20, desc: "축 라벨, 범례, 단위, 폰트 등 학술 기준 충족" },
  { item: "코드 품질 및 구조", points: 15, desc: "컴포넌트 분리, 가독성, 데이터 분리" },
  { item: "문서화", points: 20, desc: "README, 데이터 출처, 프롬프트 기록, 스크린샷" },
];

export default function DataVizHomework() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-medium mb-4">
            Homework
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            이번 주 과제
          </h2>
          <p className="text-gray-400">
            Week 6 — 데이터 시각화 대시보드 만들기 (총 100점 + 보너스 10점)
          </p>
        </motion.div>

        {/* Missions */}
        <div className="space-y-6 mb-10">
          {missions.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-slate-900/70 border border-slate-700/50 overflow-hidden"
            >
              {/* Mission header */}
              <div className="bg-slate-800/80 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-300 font-bold">
                    M{m.num}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{m.title}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${m.diffColor}`}>
                      {m.difficulty}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-300">{m.points}</div>
                  <div className="text-[10px] text-gray-500">점</div>
                </div>
              </div>

              {/* Mission body */}
              <div className="p-6">
                <p className="text-sm text-gray-300 mb-4">{m.desc}</p>

                <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2">
                  요구사항
                </div>
                <ul className="space-y-1.5 mb-4">
                  {m.requirements.map((req, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-teal-500 mt-1 text-xs">&#9654;</span>
                      {req}
                    </li>
                  ))}
                </ul>

                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3">
                  <span className="text-xs font-medium text-cyan-300">HINT: </span>
                  <span className="text-xs text-gray-400">{m.hint}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bonus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 p-6 mb-10"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-base font-bold text-teal-300">{bonusTask.title}</h4>
            <span className="text-lg font-bold text-cyan-300">{bonusTask.points}점</span>
          </div>
          <p className="text-sm text-gray-300 mb-2">{bonusTask.desc}</p>
          <p className="text-xs text-gray-500">{bonusTask.tech}</p>
        </motion.div>

        {/* Submission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-slate-900/70 border border-slate-700/50 p-6 mb-10"
        >
          <h4 className="text-sm font-semibold text-teal-300 uppercase tracking-wider mb-4">
            제출 방법
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {submission.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 text-xs font-bold flex-shrink-0">
                  {s.icon}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{s.label}</div>
                  <div className="text-xs text-gray-500">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rubric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-slate-900/70 border border-slate-700/50 overflow-hidden"
        >
          <div className="bg-slate-800/80 border-b border-slate-700 px-6 py-3">
            <h4 className="text-sm font-semibold text-teal-300 uppercase tracking-wider">
              평가 기준 (100점)
            </h4>
          </div>
          <div className="divide-y divide-slate-700/50">
            {rubric.map((r, i) => (
              <div key={i} className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14">
                    <div className="text-lg font-bold text-teal-300">{r.points}</div>
                    <div className="text-[9px] text-gray-500">점</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{r.item}</div>
                    <div className="text-xs text-gray-500">{r.desc}</div>
                  </div>
                </div>
                {/* Visual bar */}
                <div className="hidden sm:block w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full"
                    style={{ width: `${r.points}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-800/40 border-t border-slate-700 px-6 py-3 flex items-center justify-between">
            <span className="text-sm font-bold text-white">합계</span>
            <span className="text-lg font-bold text-teal-300">100점</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

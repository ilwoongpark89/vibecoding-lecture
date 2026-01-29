"use client";

import { motion } from "framer-motion";

const missions = [
  {
    num: 1,
    points: 40,
    title: "뉴턴 냉각법칙 계산기 만들기",
    difficulty: "기본",
    diffColor: "bg-green-500/20 text-green-300 border-green-500/30",
    desc: "AI에게 요청하여 뉴턴 냉각법칙(q = h × A × ΔT) 기본 계산기를 완성하세요.",
    requirements: [
      "입력: h (대류 열전달 계수), A (전열 면적), Tₛ (표면 온도), T∞ (유체 온도)",
      "출력: ΔT, 열유속 q (W/m²), 총 열전달량 Q (W)",
      "입력 검증: 음수 면적 불가, 각 입력에 단위 라벨 표시",
      "실시간 계산: 입력 변경 즉시 결과 업데이트",
      "React + Next.js + Tailwind CSS 사용",
    ],
    hint: "수업에서 보여준 프롬프트를 참고하되, 자신만의 디자인을 적용해보세요.",
  },
  {
    num: 2,
    points: 40,
    title: "자기 전공 관련 계산기 만들기",
    difficulty: "응용",
    diffColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    desc: "열역학, 유체역학, 재료역학 중 하나를 선택하여 전공 관련 공학 계산기를 만드세요.",
    requirements: [
      "어떤 공식을 사용할지 직접 결정 (교과서 참고)",
      "AI에게 해당 공식의 계산기 구현을 요청",
      "최소 3개 이상의 입력 변수",
      "단위 표시 + 입력 검증 필수",
      "사용한 공식과 참고문헌을 계산기에 표시",
    ],
    hint: "예시 — 열역학: 카르노 효율, 열교환기 LMTD / 유체역학: 무디 선도, 마찰 손실 / 재료역학: 응력-변형률, 모어원",
    examples: [
      { field: "열역학", formula: "카르노 효율: η = 1 − Tc/Th" },
      { field: "유체역학", formula: "레이놀즈 수: Re = ρvD/μ → 층류/난류 판정" },
      { field: "재료역학", formula: "축 응력: σ = P/A, 안전계수: n = Sy/σ" },
    ],
  },
  {
    num: 3,
    points: 20,
    title: "AI 결과 검증",
    difficulty: "검증",
    diffColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    desc: "본인이 만든 계산기에 알려진 값을 넣어 결과를 손계산과 비교하세요.",
    requirements: [
      "최소 3가지 입력 조합으로 테스트",
      "각 테스트: 입력값 → 계산기 결과 → 손계산 결과 → 오차율",
      "오차가 있으면 원인 분석 (반올림? 단위 오류? 공식 오류?)",
      "검증 결과를 표로 정리",
      "결론: AI 계산기를 신뢰할 수 있는가?",
    ],
    hint: "교과서 예제 문제를 활용하면 정답을 알고 있으므로 검증이 쉽습니다.",
  },
];

const bonusTask = {
  title: "보너스: 차트 시각화 추가",
  points: "+10",
  desc: "파라미터 하나를 변화시키며 결과가 어떻게 달라지는지 라인 차트로 시각화하세요. (예: h가 10~500일 때 Q의 변화)",
  tech: "Recharts, Chart.js, 또는 D3.js 사용 가능",
};

const rubric = [
  { item: "계산기 동작", points: 25, desc: "입력 → 계산 → 출력이 정확히 동작하는가" },
  { item: "UI/UX 품질", points: 20, desc: "레이아웃, 색상, 반응형, 사용 편의성" },
  { item: "입력 검증", points: 15, desc: "잘못된 입력에 대한 경고, 범위 제한, 에러 처리" },
  { item: "공식 정확성", points: 20, desc: "사용된 공식이 정확한가, 단위가 올바른가" },
  { item: "검증 보고서", points: 20, desc: "손계산과 비교, 오차 분석, 신뢰성 평가" },
];

const submission = [
  { icon: "1", label: "GitHub Repository URL", desc: "코드 전체가 포함된 공개 저장소" },
  { icon: "2", label: "스크린샷", desc: "계산기 작동 화면 캡처 (입력값 + 결과 포함)" },
  { icon: "3", label: "검증 보고서", desc: "손계산 비교 표 + 오차 분석 (PDF 또는 README)" },
];

export default function CalcHomework() {
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
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-medium mb-4">
            Homework
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            이번 주 과제
          </h2>
          <p className="text-gray-400">
            Week 5 — 공학 계산기 만들기 (총 100점 + 보너스 10점)
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
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-300 font-bold">
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
                  <div className="text-2xl font-bold text-orange-300">{m.points}</div>
                  <div className="text-[10px] text-gray-500">점</div>
                </div>
              </div>

              {/* Mission body */}
              <div className="p-6">
                <p className="text-sm text-gray-300 mb-4">{m.desc}</p>

                <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
                  요구사항
                </div>
                <ul className="space-y-1.5 mb-4">
                  {m.requirements.map((req, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-orange-500 mt-1 text-xs">&#9654;</span>
                      {req}
                    </li>
                  ))}
                </ul>

                {m.examples && (
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-500 mb-2">선택 가능한 예시</div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      {m.examples.map((ex, j) => (
                        <div key={j} className="bg-slate-800/60 border border-slate-700 rounded-lg p-2.5">
                          <div className="text-xs font-medium text-orange-300 mb-1">{ex.field}</div>
                          <div className="text-[11px] text-gray-400 font-mono">{ex.formula}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                  <span className="text-xs font-medium text-amber-300">HINT: </span>
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
          className="rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 p-6 mb-10"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-base font-bold text-orange-300">{bonusTask.title}</h4>
            <span className="text-lg font-bold text-amber-300">{bonusTask.points}점</span>
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
          <h4 className="text-sm font-semibold text-orange-300 uppercase tracking-wider mb-4">
            제출 방법
          </h4>
          <div className="grid sm:grid-cols-3 gap-4">
            {submission.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-300 text-xs font-bold flex-shrink-0">
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
            <h4 className="text-sm font-semibold text-orange-300 uppercase tracking-wider">
              평가 기준 (100점)
            </h4>
          </div>
          <div className="divide-y divide-slate-700/50">
            {rubric.map((r, i) => (
              <div key={i} className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14">
                    <div className="text-lg font-bold text-orange-300">{r.points}</div>
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
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${r.points}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-800/40 border-t border-slate-700 px-6 py-3 flex items-center justify-between">
            <span className="text-sm font-bold text-white">합계</span>
            <span className="text-lg font-bold text-orange-300">100점</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

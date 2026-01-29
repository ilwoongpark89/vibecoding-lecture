"use client";

import { motion } from "framer-motion";

interface Mission {
  id: number;
  title: string;
  tag: string;
  description: string;
  steps: string[];
  tip: string;
  points: number;
}

const missions: Mission[] = [
  {
    id: 1,
    title: "AI에게 열역학 문제 풀어달라고 하기",
    tag: "프롬프트 비교",
    description:
      "카르노 사이클 효율 계산 문제를 나쁜 프롬프트와 좋은 프롬프트로 각각 한 번씩 질문하고, 두 응답의 차이를 분석하세요.",
    steps: [
      "문제: 고온원 600°C, 저온원 30°C인 카르노 열기관의 최대 효율과, Q_H = 2000 kJ일 때 최대 일(W)을 구하라.",
      "나쁜 프롬프트로 AI에게 질문 → 응답 스크린샷 캡처",
      "좋은 프롬프트(5원칙 적용)로 AI에게 질문 → 응답 스크린샷 캡처",
      "두 응답의 차이점을 3가지 이상 서술 (정보량, 정확도, 활용가능성)",
    ],
    tip: "좋은 프롬프트에는 반드시 '단위(SI)', '풀이과정', '검증'을 요청하세요.",
    points: 30,
  },
  {
    id: 2,
    title: "나만의 프롬프트 템플릿 만들기",
    tag: "템플릿 작성",
    description:
      "수업에서 배운 템플릿 구조를 참고하여, 자신만의 공학 프롬프트 템플릿 1개를 작성하세요. 열역학, 열전달, 유체역학 중 하나를 선택.",
    steps: [
      "템플릿 카테고리 선택 (계산/개념/코드/설계검토/보고서/디버깅 중 택1)",
      "템플릿 작성: [변수] 형태의 빈칸을 포함한 범용 프롬프트 구조",
      "작성한 템플릿으로 실제 문제 1개를 풀어서 효과를 검증",
      "템플릿 + 적용 결과 + 왜 이 구조가 효과적인지 1문단 설명",
    ],
    tip: "템플릿에 '역할 부여', '출력 형식 지정', '검증 요청'을 포함하면 높은 점수를 받습니다.",
    points: 30,
  },
  {
    id: 3,
    title: "AI 응답 검증하기",
    tag: "비판적 검증",
    description:
      "AI가 준 풀이 답이 맞는지 직접 손계산으로 확인하고, 틀린 부분이 있다면 찾아내세요.",
    steps: [
      "AI에게 다음 문제를 풀게 하세요: \"수평 평판(L=0.5m) 위를 20°C 공기가 3m/s로 흐를 때, 평판 끝단의 경계층 두께와 평균 마찰계수를 구해줘.\"",
      "AI 응답의 각 계산 단계를 직접 손계산(또는 계산기)으로 검증",
      "AI가 틀린 부분이 있다면 구체적으로 지적 (어느 단계, 어떤 숫자가 틀렸는지)",
      "올바른 풀이를 자신이 직접 제시 (AI가 모두 맞았다면 그 검증 과정을 서술)",
    ],
    tip: "AI는 물성치 대입이나 단위 환산에서 실수하는 경우가 많습니다. 중간 계산값을 하나하나 확인하세요.",
    points: 30,
  },
];

const bonusMission = {
  title: "Chain-of-Thought로 복합 문제 풀기",
  description:
    "CoT 기법을 사용하여 다음 복합 문제를 AI에게 풀게 하세요: \"증기 랭킨 사이클(보일러 압력 10 MPa, 응축기 압력 10 kPa, 터빈 입구 과열증기 500°C)의 열효율, 터빈 출력(증기유량 5 kg/s), 냉각수 필요량(냉각수 온도상승 10°C)을 단계별로 구해줘.\"",
  points: 10,
};

const rubric = [
  { criteria: "프롬프트 품질", weight: 25, description: "5원칙 적용도, 구체성, 명확성" },
  { criteria: "응답 분석", weight: 20, description: "나쁜/좋은 응답 차이 분석의 깊이" },
  { criteria: "템플릿 완성도", weight: 20, description: "범용성, 구조화, 실용성" },
  { criteria: "검증 과정", weight: 25, description: "손계산 정확성, 오류 발견 능력" },
  { criteria: "보고서 형식", weight: 10, description: "구조화, 가독성, 스크린샷 포함" },
];

export default function PromptHomework() {
  return (
    <section className="relative py-24 bg-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            Homework
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            이번 주{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              실습 과제
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            3단계 미션을 수행하고, 분석 보고서를 LMS에 제출하세요.
          </p>
        </motion.div>

        {/* Missions */}
        <div className="max-w-4xl mx-auto space-y-8">
          {missions.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-slate-800/50 border border-slate-700 overflow-hidden"
            >
              {/* Mission Header */}
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white">
                      Mission {m.id}
                    </span>
                    <span className="text-xs text-gray-500 bg-slate-700/50 px-2 py-0.5 rounded">
                      {m.tag}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-cyan-400">{m.points}점</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{m.title}</h3>
                <p className="text-sm text-gray-400">{m.description}</p>
              </div>

              {/* Steps */}
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  {m.steps.map((step, si) => (
                    <div key={si} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 text-xs font-bold flex items-center justify-center mt-0.5">
                        {si + 1}
                      </span>
                      <p className="text-sm text-gray-300 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>

                {/* Tip */}
                <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-4 flex items-start gap-2">
                  <span className="text-cyan-400 text-sm font-bold mt-0.5">TIP</span>
                  <p className="text-sm text-cyan-300/80">{m.tip}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Bonus Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/30 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    BONUS
                  </span>
                  <span className="text-sm font-bold text-amber-400">+{bonusMission.points}점</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{bonusMission.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{bonusMission.description}</p>
            </div>
          </motion.div>

          {/* Submission Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-slate-800/50 border border-slate-700 p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400">&#9997;</span> 제출 안내
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span className="text-gray-300">
                    <span className="text-white font-medium">제출처:</span> LMS 과제 게시판
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span className="text-gray-300">
                    <span className="text-white font-medium">형식:</span> PDF (스크린샷 + 분석 보고서)
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="text-gray-300">
                    <span className="text-white font-medium">마감:</span> 다음 주 수업 전까지
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="text-gray-300">
                    <span className="text-white font-medium">총점:</span> 100점 (Mission 90 + Bonus 10)
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rubric */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-slate-800/50 border border-slate-700 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">&#9733;</span> 평가 기준표
              </h3>
            </div>
            <div className="divide-y divide-slate-700">
              {rubric.map((r, i) => (
                <div key={i} className="p-4 flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 text-center">
                    <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                      {r.weight}
                    </span>
                    <p className="text-[10px] text-gray-500">점</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{r.criteria}</p>
                    <p className="text-xs text-gray-400">{r.description}</p>
                  </div>
                  <div className="flex-shrink-0 w-24">
                    <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${r.weight}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

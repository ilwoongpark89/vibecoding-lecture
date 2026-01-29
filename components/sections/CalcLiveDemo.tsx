"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    num: 1,
    title: "프로젝트 생성",
    action: "교수가 터미널을 열고 새 프로젝트를 생성합니다",
    command: `npx create-next-app@latest calc \\
  --typescript --tailwind --app --eslint`,
    result: "Creating a new Next.js app in ./calc\n✓ Installing dependencies\n✓ Initialized a git repository\nSuccess! Created calc at /home/user/calc",
    highlight: "Next.js + Tailwind 프로젝트가 한 줄 명령어로 생성됩니다. 직접 설정할 것이 없습니다.",
  },
  {
    num: 2,
    title: "Claude에 첫 요청",
    action: "AI에게 계산기의 핵심 기능을 요청합니다",
    command: `"뉴턴 냉각법칙 계산기를 만들어줘.
q = h × A × (Ts - Tinf) 공식을 사용.
입력: h, A, Ts, Tinf
출력: 열유속 q, 총 열전달량 Q
React + TypeScript로 만들어줘."`,
    result: "✓ app/page.tsx 생성 — 4개 입력 필드\n✓ useState로 상태 관리\n✓ 실시간 계산 로직 추가\n✓ 기본 결과 표시 UI",
    highlight: "공학 공식과 변수를 정확히 명시하면 AI가 올바른 계산 코드를 생성합니다.",
  },
  {
    num: 3,
    title: "브라우저 확인",
    action: "개발 서버를 실행하고 결과를 확인합니다",
    command: "npm run dev\n\n→ http://localhost:3000 접속",
    result: "▶ Ready on http://localhost:3000\n\n브라우저: 계산기가 동작하지만...\n- 디자인이 밋밋함 (기본 HTML 스타일)\n- 입력과 결과가 세로로 나열\n- 단위 표시 없음",
    highlight: "첫 결과는 완벽하지 않습니다. 이제부터 반복 개선(iteration)이 시작됩니다.",
  },
  {
    num: 4,
    title: "UI 개선 요청",
    action: "레이아웃과 디자인을 개선합니다",
    command: `"Tailwind CSS로 다크 테마 디자인 적용해줘.
- 입력은 왼쪽, 결과는 오른쪽 (2컬럼)
- 각 입력에 라벨과 단위 표시
- 결과 카드에 색상 코딩
- 오렌지/앰버 색상 사용"`,
    result: "✓ grid grid-cols-2 레이아웃 적용\n✓ bg-slate-900 다크 테마\n✓ 입력 필드에 단위 라벨 추가\n✓ 결과 카드 3개 (ΔT, q, Q) 색상 분리\n✓ 전문적인 계산기 디자인 완성",
    highlight: "디자인 요구사항을 구체적으로 설명하면 AI가 Tailwind 클래스를 정확히 적용합니다.",
  },
  {
    num: 5,
    title: "입력 검증 추가",
    action: "잘못된 입력을 방지하는 validation을 추가합니다",
    command: `"입력 검증을 추가해줘:
- h는 0 이상만 가능 (음수 열전달계수 불가)
- A는 양수만 (면적은 음수 불가)
- 음수 온도는 허용하되 경고 표시
- 잘못된 입력 시 빨간 테두리 + 메시지"`,
    result: "✓ 각 입력에 min/max 범위 제한\n✓ h < 0 → 빨간 경고: '열전달 계수는 양수여야 합니다'\n✓ A ≤ 0 → 빨간 경고: '면적은 양수여야 합니다'\n✓ Ts < Tinf → 주황 알림: '표면이 유체보다 차갑습니다 (냉각 방향 반대)'",
    highlight: "입력 검증은 AI가 스스로 추가하지 않는 경우가 많습니다. 반드시 요청하세요.",
  },
  {
    num: 6,
    title: "차트 추가",
    action: "파라미터 변화에 따른 결과를 시각화합니다",
    command: `"h값이 10~500까지 변할 때
Q가 어떻게 변하는지 라인 차트로 보여줘.
Recharts 라이브러리 사용.
현재 h값 위치에 점 표시."`,
    result: "✓ npm install recharts\n✓ h vs Q 라인 차트 생성\n✓ 현재 입력값 위치에 빨간 점 표시\n✓ X축: h (W/m²·K), Y축: Q (W)\n✓ 툴팁에 정확한 값 표시",
    highlight: "시각화를 추가하면 공학적 감각(engineering intuition)을 기를 수 있습니다.",
  },
  {
    num: 7,
    title: "수식 표시",
    action: "사용된 공식을 수학 표기로 보여줍니다",
    command: `"사용된 공식을 LaTeX로 표시해줘.
KaTeX 또는 react-katex 사용.
수식: q = h(T_s - T_\\infty)
실제 값을 대입한 계산 과정도 보여줘."`,
    result: "✓ npm install katex react-katex\n✓ 뉴턴 냉각법칙 공식 렌더링\n✓ 대입 과정: q = 100 × (150 − 25) = 12,500 W/m²\n✓ 값이 바뀌면 대입 과정도 실시간 업데이트",
    highlight: "수식 표시는 계산기의 '블랙박스' 문제를 해결합니다. 어떤 공식을 쓰는지 투명하게!",
  },
  {
    num: 8,
    title: "단위 변환",
    action: "SI/영국 단위 시스템 전환 기능을 추가합니다",
    command: `"SI 단위 ↔ 영국 단위 토글 버튼 추가해줘.
SI: W/m²·K, m², °C, W
영국: BTU/(hr·ft²·°F), ft², °F, BTU/hr
토글하면 값도 자동 변환."`,
    result: "✓ SI / Imperial 토글 스위치\n✓ 변환 계수 적용 (1 W/m²·K = 0.1761 BTU/hr·ft²·°F)\n✓ 온도 변환: °C ↔ °F\n✓ 면적 변환: m² ↔ ft²\n✓ 모든 라벨과 단위 동적 변경",
    highlight: "단위 변환은 국제 협업에서 필수입니다. AI가 변환 계수를 정확히 아는지 검증하세요.",
  },
  {
    num: 9,
    title: "Git 저장",
    action: "완성된 코드를 버전 관리 시스템에 저장합니다",
    command: `git add .
git commit -m "뉴턴 냉각법칙 계산기 완성

- 실시간 계산 (h, A, Ts, Tinf → q, Q)
- 입력 검증 및 경고
- h-Q 차트 시각화
- SI/영국 단위 전환
- LaTeX 수식 표시"`,
    result: "[main abc1234] 뉴턴 냉각법칙 계산기 완성\n 8 files changed, 485 insertions(+)\n create mode 100644 app/page.tsx\n create mode 100644 components/Calculator.tsx\n create mode 100644 components/Chart.tsx\n create mode 100644 utils/conversion.ts",
    highlight: "커밋 메시지에 주요 기능을 명시하면 나중에 변경 이력을 추적하기 쉽습니다.",
  },
  {
    num: 10,
    title: "배포",
    action: "GitHub Push → Vercel 자동 배포로 전 세계에 공개합니다",
    command: `git remote add origin https://github.com/student/calc.git
git push -u origin main

# Vercel이 자동으로 감지하여 빌드 & 배포`,
    result: "✓ Pushed to GitHub\n✓ Vercel: Build started...\n✓ Vercel: Build completed (32s)\n✓ Vercel: Deployed to production\n\n🌐 https://calc-student.vercel.app\n\n전 세계 누구나 접속 가능한 URL 생성!",
    highlight: "Git Push만 하면 자동 배포됩니다. 서버 설정, 도메인 구매 모두 불필요.",
  },
];

export default function CalcLiveDemo() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-medium mb-4">
            Live Coding
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            라이브 코딩 시나리오
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            교수가 수업 중 AI와 함께 공학 계산기를 만드는 10단계 과정
          </p>
        </motion.div>

        {/* Step navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeStep === i
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-gray-300"
              }`}
            >
              {step.num}. {step.title}
            </button>
          ))}
        </div>

        {/* Active step detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-slate-800/60 border border-orange-500/20 overflow-hidden"
          >
            {/* Step header */}
            <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-300 font-bold text-lg">
                {steps[activeStep].num}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {steps[activeStep].title}
                </h3>
                <p className="text-sm text-gray-400">
                  {steps[activeStep].action}
                </p>
              </div>
              <div className="ml-auto text-xs text-gray-500">
                {activeStep + 1} / {steps.length}
              </div>
            </div>

            {/* Two panels */}
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-700">
              {/* Left: Command/Prompt */}
              <div className="p-6">
                <div className="text-xs font-semibold text-orange-300 uppercase tracking-wider mb-3">
                  {steps[activeStep].num <= 2 || steps[activeStep].num >= 9
                    ? "터미널 명령어"
                    : "AI에게 보내는 프롬프트"}
                </div>
                <pre className="bg-slate-900 rounded-lg p-4 text-sm text-green-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto border border-slate-700">
                  {steps[activeStep].command}
                </pre>
              </div>

              {/* Right: Result */}
              <div className="p-6">
                <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-3">
                  결과
                </div>
                <pre className="bg-slate-900 rounded-lg p-4 text-sm text-gray-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto border border-slate-700">
                  {steps[activeStep].result}
                </pre>
              </div>
            </div>

            {/* Highlight */}
            <div className="bg-orange-500/5 border-t border-orange-500/20 px-6 py-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-orange-400 text-xs">!</span>
                </div>
                <div>
                  <span className="text-xs font-medium text-orange-300">
                    학생에게 강조할 포인트
                  </span>
                  <p className="text-sm text-gray-300 mt-1">
                    {steps[activeStep].highlight}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="px-4 py-2 rounded-lg bg-slate-800 text-gray-400 text-sm hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            ← 이전 단계
          </button>
          <button
            onClick={() =>
              setActiveStep(Math.min(steps.length - 1, activeStep + 1))
            }
            disabled={activeStep === steps.length - 1}
            className="px-4 py-2 rounded-lg bg-orange-500/20 text-orange-300 text-sm hover:bg-orange-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            다음 단계 →
          </button>
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-orange-500/10 border border-orange-500/30 rounded-2xl px-8 py-5">
            <p className="text-lg font-bold text-orange-300 mb-2">
              10단계 만에 공학 계산기가 완성되었습니다.
            </p>
            <p className="text-sm text-gray-400">
              코드를 한 줄도 직접 쓰지 않았습니다. AI에게 &quot;무엇을&quot; 원하는지만
              정확히 설명했습니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Step {
  step: number;
  prompt: string;
  note: string;
}

interface TabData {
  label: string;
  steps: Step[];
}

const tabs: TabData[] = [
  {
    label: "뉴턴 냉각법칙",
    steps: [
      {
        step: 1,
        prompt: "Next.js 프로젝트를 만들어줘. TypeScript, Tailwind CSS 사용.",
        note: "AI가 프로젝트 구조를 자동 생성하고 필요한 패키지를 설치합니다.",
      },
      {
        step: 2,
        prompt:
          "뉴턴의 냉각법칙(q = hAΔT) 계산기 페이지를 만들어줘. h(W/m²·K), A(m²), ΔT(K)를 입력하면 열유속 q(W)와 q(kW)를 계산해서 보여줘.",
        note: "AI가 입력 폼, 상태 관리, 계산 함수, 결과 표시 UI를 한 번에 생성합니다.",
      },
      {
        step: 3,
        prompt:
          "입력값이 비어있으면 경고를 보여주고, 결과 아래에 수식 풀이 과정도 보여줘.",
        note: "유효성 검사와 교육적 설명을 추가하여 완성도를 높입니다.",
      },
    ],
  },
  {
    label: "복합벽 열저항",
    steps: [
      {
        step: 1,
        prompt: "Next.js 프로젝트를 만들어줘. TypeScript, Tailwind CSS 사용.",
        note: "프로젝트 초기화 — 동일한 기술 스택을 사용합니다.",
      },
      {
        step: 2,
        prompt:
          "복합벽 열저항 계산기를 만들어줘. 벽 층을 추가/삭제할 수 있게 해줘. 각 층에 재질 이름, 두께(m), 열전도율 k(W/m·K)를 입력. 양쪽 대류 열전달 계수도 입력 가능하게.",
        note: "동적 배열 관리(층 추가/삭제)를 포함한 복잡한 폼을 생성합니다.",
      },
      {
        step: 3,
        prompt:
          "총 열저항, 단위면적당 열유속, 각 층 경계면 온도를 모두 계산해서 표로 보여줘.",
        note: "다단계 계산 로직과 테이블 형태의 결과 표시를 구현합니다.",
      },
      {
        step: 4,
        prompt:
          "벽 단면을 그래픽으로 시각화해줘. 각 층의 두께에 비례하게 그리고, 온도 분포를 색상으로 표현해줘.",
        note: "CSS/Canvas를 활용한 시각화 컴포넌트를 추가합니다.",
      },
    ],
  },
  {
    label: "관내 유동 열전달",
    steps: [
      {
        step: 1,
        prompt: "Next.js 프로젝트를 만들어줘. TypeScript, Tailwind CSS 사용.",
        note: "프로젝트 초기화.",
      },
      {
        step: 2,
        prompt:
          "관내 유동 열전달 계산기를 만들어줘. 입력: 관 내경(mm), 유속(m/s), 유체 온도(°C), 관벽 온도(°C), 관 길이(m). 유체는 물로 고정.",
        note: "기본 입력 폼과 레이아웃을 구성합니다.",
      },
      {
        step: 3,
        prompt:
          "온도에 따른 물의 물성치(ρ, μ, k, Pr, cp)를 내장 데이터로 넣어줘. 평균온도 기준으로 보간해서 사용해.",
        note: "물성치 데이터 테이블과 선형 보간 함수를 구현합니다.",
      },
      {
        step: 4,
        prompt:
          "Re를 계산해서 층류/천이/난류를 자동 판별하고, 적절한 상관식(층류: Nu=3.66 or 4.36, 난류: Dittus-Boelter)을 선택해줘. 상관식 적용범위도 표시해줘.",
        note: "조건 분기 로직과 상관식 선택, 유효 범위 검증을 추가합니다.",
      },
      {
        step: 5,
        prompt:
          "결과를 요약 카드로 보여주고: Re, 유동 상태, Nu, h, 출구 온도. 물성치 출처와 상관식 근거도 각주로 달아줘.",
        note: "결과 카드 UI와 학술적 참고문헌 표기를 완성합니다.",
      },
    ],
  },
];

export default function CalcBuildSteps() {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab];

  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-medium mb-4">
            Build Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">AI와 함께 만드는 과정</h2>
        </motion.div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex gap-2 justify-center flex-wrap">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === i
                    ? "bg-orange-500/20 text-orange-300 border border-orange-500/40"
                    : "bg-slate-800/60 text-gray-400 border border-slate-700 hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-3xl mx-auto space-y-6">
          {current.steps.map((s, i) => (
            <motion.div
              key={`${activeTab}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-10"
            >
              {/* Step number */}
              <div className="absolute left-0 top-0 w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-sm font-bold text-orange-300">
                {s.step}
              </div>
              {/* Connector line */}
              {i < current.steps.length - 1 && (
                <div className="absolute left-[13px] top-7 w-px h-[calc(100%+8px)] bg-slate-700" />
              )}

              {/* Prompt box */}
              <div className="bg-slate-800/60 border border-cyan-500/30 rounded-xl p-4 mb-2">
                <div className="text-[10px] text-cyan-400/70 uppercase tracking-wider mb-2 font-medium">
                  Prompt
                </div>
                <p className="text-sm text-gray-200 font-mono leading-relaxed whitespace-pre-wrap">
                  &quot;{s.prompt}&quot;
                </p>
              </div>
              {/* Note */}
              <p className="text-xs text-gray-500 ml-1">
                → {s.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

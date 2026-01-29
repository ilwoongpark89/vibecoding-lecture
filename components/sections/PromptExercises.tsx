"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Level {
  label: string;
  prompt: string;
  response: string;
  quality: "bad" | "mid" | "good";
}

interface Exercise {
  id: number;
  title: string;
  topic: string;
  situation: string;
  levels: Level[];
}

const exercises: Exercise[] = [
  {
    id: 1,
    title: "뉴턴의 냉각법칙",
    topic: "열전달 기초",
    situation: "가열된 금속판의 표면에서 주변 공기로의 열전달량을 구해야 하는 상황",
    levels: [
      {
        label: "Level 1",
        prompt: "열전달 계산해줘",
        response: "열전달은 전도, 대류, 복사 세 가지 방식이 있습니다.\n\n전도: q = -kA(dT/dx)\n대류: q = hA(Ts - T∞)\n복사: q = εσA(Ts⁴ - Tsur⁴)\n\n어떤 방식의 열전달을 계산하고 싶으신가요?",
        quality: "bad",
      },
      {
        label: "Level 2",
        prompt: "뉴턴 냉각법칙으로 열유속 구해줘.\nh=100, A=0.5, 온도차 125도",
        response: "뉴턴의 냉각법칙: q = hAΔT\n\nq = 100 × 0.5 × 125 = 6,250\n\n열전달량은 6,250입니다.\n\n(단위가 명시되지 않았습니다. W/(m²·K)인지 BTU/(hr·ft²·°F)인지에 따라 결과가 달라집니다.)",
        quality: "mid",
      },
      {
        label: "Level 3",
        prompt: "h=100 W/(m²·K), A=0.5 m²,\nT_s=150°C, T_∞=25°C일 때\n뉴턴 냉각법칙으로 열유속(q\")과\n총 열전달량(Q)을 구해줘. SI 단위로.",
        response: "■ 뉴턴의 냉각법칙\n\n1단계: 온도차\n  ΔT = T_s - T_∞ = 150 - 25 = 125 K\n\n2단계: 열유속 (단위면적당)\n  q\" = h × ΔT = 100 × 125\n  ┌─────────────────────┐\n  │ q\" = 12,500 W/m²    │\n  └─────────────────────┘\n\n3단계: 총 열전달량\n  Q = q\" × A = 12,500 × 0.5\n  ┌─────────────────────┐\n  │ Q = 6,250 W (6.25 kW) │\n  └─────────────────────┘\n\n검증: 자연대류 h≈5~25, 강제대류 h≈25~250 범위이므로 h=100은 강제대류 조건에 해당. 결과 타당.",
        quality: "good",
      },
    ],
  },
  {
    id: 2,
    title: "복합벽 열저항",
    topic: "열전도",
    situation: "겨울철 건물 외벽의 열손실을 계산하여 단열재 두께를 결정해야 하는 상황",
    levels: [
      {
        label: "Level 1",
        prompt: "벽 열전달 알려줘",
        response: "벽을 통한 열전달은 전도에 의해 이루어집니다.\n\n푸리에 법칙: q = kA(T1-T2)/L\n\nk는 열전도도, A는 면적, L은 두께입니다.\n열전도도가 낮을수록 단열 성능이 좋습니다.\n\n더 구체적인 조건을 알려주시면 계산해드리겠습니다.",
        quality: "bad",
      },
      {
        label: "Level 2",
        prompt: "3층 복합벽 열저항 계산해줘.\n콘크리트, 단열재, 석고보드로 되어있어.",
        response: "3층 복합벽의 열저항:\n\nR_total = R₁ + R₂ + R₃ = L₁/k₁ + L₂/k₂ + L₃/k₃\n\n각 층의 두께(L)와 열전도도(k)를 알려주시면 계산하겠습니다.\n\n일반적인 값:\n- 콘크리트: k ≈ 1.0~1.8 W/(m·K)\n- 단열재: k ≈ 0.03~0.05\n- 석고보드: k ≈ 0.16~0.17\n\n(정확한 값은 재료에 따라 다릅니다)",
        quality: "mid",
      },
      {
        label: "Level 3",
        prompt: "두께 20cm 콘크리트(k=1.4 W/(m·K)),\n5cm 단열재(k=0.04), 1cm 석고보드(k=0.17)\n로 된 복합벽. 내부 20°C, 외부 -10°C일 때\n단위면적당 열손실(q\")과 각 층 경계면의\n온도를 구해줘. 접촉열저항은 무시.",
        response: "■ 복합벽 열저항 해석\n\n1단계: 각 층의 열저항 (R = L/k)\n  R₁(콘크리트) = 0.20/1.4 = 0.143 m²·K/W\n  R₂(단열재)   = 0.05/0.04 = 1.250 m²·K/W\n  R₃(석고보드) = 0.01/0.17 = 0.059 m²·K/W\n  R_total = 1.452 m²·K/W\n\n2단계: 열유속\n  q\" = ΔT/R_total = 30/1.452\n  ┌──────────────────────┐\n  │ q\" = 20.66 W/m²      │\n  └──────────────────────┘\n\n3단계: 각 경계면 온도\n  T₁(콘크리트↔단열재) = 20 - q\"×R₁\n    = 20 - 20.66×0.143 = 17.05°C\n  T₂(단열재↔석고보드) = 17.05 - q\"×R₂\n    = 17.05 - 20.66×1.250 = -8.78°C\n  T₃(석고보드↔외부) = -8.78 - q\"×R₃\n    = -8.78 - 20.66×0.059 = -10.0°C ✓\n\n→ 단열재가 전체 열저항의 86%를 담당",
        quality: "good",
      },
    ],
  },
  {
    id: 3,
    title: "카르노 사이클",
    topic: "열역학",
    situation: "열기관의 이론적 최대 효율을 구하고 실제 발전소와 비교해야 하는 상황",
    levels: [
      {
        label: "Level 1",
        prompt: "카르노 효율 알려줘",
        response: "카르노 효율은 열기관의 이론적 최대 효율입니다.\n\nη = 1 - T_L/T_H\n\n여기서 T는 절대온도(K)입니다.\n카르노 효율은 실제로 달성할 수 없는 이상적인 효율입니다.",
        quality: "bad",
      },
      {
        label: "Level 2",
        prompt: "카르노 사이클 효율 계산해줘.\n고온 500도, 저온 25도",
        response: "카르노 효율:\n\nη = 1 - T_L/T_H\n\n주의: 온도를 켈빈으로 변환해야 합니다.\nT_H = 500 + 273.15 = 773.15 K\nT_L = 25 + 273.15 = 298.15 K\n\nη = 1 - 298.15/773.15 = 0.614\n\n약 61.4%입니다.\n\n(°C와 K를 혼동하지 않도록 주의)",
        quality: "mid",
      },
      {
        label: "Level 3",
        prompt: "고온원 500°C, 저온원 25°C인 카르노 열기관.\n(1) 최대 효율\n(2) 고온원에서 Q_H=1000 kJ 받을 때\n    최대 일(W)과 방출열(Q_L)\n(3) 실제 화력발전소 효율(~40%)과 비교\n풀이과정을 단계별로 보여줘.",
        response: "■ 카르노 열기관 해석\n\n1단계: 절대온도 변환\n  T_H = 500 + 273.15 = 773.15 K\n  T_L = 25 + 273.15 = 298.15 K\n\n2단계: 카르노 효율\n  η_carnot = 1 - T_L/T_H = 1 - 298.15/773.15\n  ┌──────────────────────┐\n  │ η_carnot = 61.4%     │\n  └──────────────────────┘\n\n3단계: Q_H = 1000 kJ 일 때\n  W_max = η × Q_H = 0.614 × 1000\n  ┌──────────────────────┐\n  │ W_max = 614 kJ       │\n  │ Q_L = Q_H - W = 386 kJ│\n  └──────────────────────┘\n\n4단계: 실제 비교\n  • 카르노 (이론 최대): 61.4%\n  • 현대 화력발전소: ~40% (카르노의 65%)\n  • 차이 원인: 비가역성(마찰, 열손실,\n    유한온도차 열전달, 배기가스 손실)\n\n→ 실제 효율은 항상 카르노 미만 (열역학 2법칙)",
        quality: "good",
      },
    ],
  },
  {
    id: 4,
    title: "핀(Fin) 효율",
    topic: "확장표면 열전달",
    situation: "CPU 방열판이나 열교환기에서 핀의 열전달 성능을 평가해야 하는 상황",
    levels: [
      {
        label: "Level 1",
        prompt: "핀 효율 구해줘",
        response: "핀 효율(η_fin)은 실제 핀의 열전달량과 핀 전체가 기저부 온도일 때의 이상적 열전달량의 비입니다.\n\nη_fin = q_fin / q_max\n\n핀의 형상, 재질, 대류 조건에 따라 달라집니다.\n어떤 핀에 대해 알고 싶으신가요?",
        quality: "bad",
      },
      {
        label: "Level 2",
        prompt: "알루미늄 핀 효율 계산해줘.\n직사각형 핀이고 길이 5cm",
        response: "직사각형 핀의 효율:\n\nη = tanh(mL) / (mL)\n여기서 m = √(hP/kA_c)\n\nP: 핀 둘레, A_c: 핀 단면적\n\n알루미늄 k = 237 W/(m·K)\nL = 0.05 m\n\nh(대류계수)와 핀 두께를 알려주시면 계산하겠습니다.",
        quality: "mid",
      },
      {
        label: "Level 3",
        prompt: "길이 L=5cm, 두께 t=2mm, 폭 w=1m인\n알루미늄(k=237) 직사각형 핀.\n대류계수 h=50 W/(m²·K), T_b=100°C, T_∞=25°C.\n핀 끝단은 단열(insulated tip) 가정.\n(1) m, mL 계산\n(2) 핀 효율(η_fin)\n(3) 핀 유효도(ε_fin)\n(4) 핀 하나의 열전달량\n풀이과정과 검증 포함.",
        response: "■ 직사각형 핀 해석 (단열 끝단)\n\n1단계: 핀 파라미터\n  P = 2(w + t) = 2(1 + 0.002) ≈ 2.004 m\n  A_c = w × t = 1 × 0.002 = 0.002 m²\n  m = √(hP/kA_c) = √(50×2.004/237×0.002)\n  ┌──────────────────────┐\n  │ m = 14.54 m⁻¹        │\n  │ mL = 14.54×0.05=0.727│\n  └──────────────────────┘\n\n2단계: 핀 효율\n  η = tanh(mL)/mL = tanh(0.727)/0.727\n    = 0.621/0.727\n  ┌──────────────────────┐\n  │ η_fin = 85.4%        │\n  └──────────────────────┘\n\n3단계: 핀 유효도\n  A_fin = P×L = 2.004×0.05 = 0.1002 m²\n  ε = η×A_fin/A_c = 0.854×0.1002/0.002\n  ┌──────────────────────┐\n  │ ε_fin = 42.8         │\n  └──────────────────────┘\n  → ε > 2 이므로 핀 사용이 효과적!\n\n4단계: 열전달량\n  Q = η × h × A_fin × (T_b-T_∞)\n    = 0.854 × 50 × 0.1002 × 75\n  ┌──────────────────────┐\n  │ Q = 320.9 W          │\n  └──────────────────────┘\n\n검증: η=85%는 mL<1인 짧은 핀에 적합.\nε=42.8 ≫ 2이므로 핀 사용 매우 효과적.",
        quality: "good",
      },
    ],
  },
  {
    id: 5,
    title: "관내 유동 열전달",
    topic: "강제 대류 종합",
    situation: "열교환기 설계 시 관 내부의 열전달 계수와 출구 온도를 예측해야 하는 상황",
    levels: [
      {
        label: "Level 1",
        prompt: "파이프 열전달",
        response: "파이프 열전달은 내부 유체와 관벽 사이의 열 교환입니다.\n\n관련 무차원수:\n- Reynolds 수: Re = ρVD/μ\n- Nusselt 수: Nu = hD/k\n- Prandtl 수: Pr = μc_p/k\n\n구체적인 조건을 알려주시면 계산해드리겠습니다.",
        quality: "bad",
      },
      {
        label: "Level 2",
        prompt: "관내 열전달 계수 구해줘.\n물이 파이프 안을 흘러. Dittus-Boelter 써줘.",
        response: "Dittus-Boelter 상관식:\nNu = 0.023 × Re^0.8 × Pr^n\n(가열: n=0.4, 냉각: n=0.3)\n\n적용조건:\n- Re > 10,000 (완전 난류)\n- 0.6 < Pr < 160\n- L/D > 10\n\n유속, 관 직경, 물 온도를 알려주시면 Re, Pr을 구해서 계산하겠습니다.",
        quality: "mid",
      },
      {
        label: "Level 3",
        prompt: "내경 D=25mm 원관에 80°C 물이 V=2m/s로 흐름.\n관벽 T_w=120°C (등온). Dittus-Boelter(n=0.4).\n(1) 80°C 물의 물성치 명시 후 Re, Pr 계산\n(2) Nu, h 계산\n(3) 관 길이 L=3m일 때 출구 온도\n물성치는 평균온도(bulk) 기준, SI 단위.",
        response: "■ 관내 강제 대류 열전달\n\n0단계: 80°C 물 물성치\n  ρ=971.8 kg/m³, μ=354×10⁻⁶ Pa·s\n  k=0.670 W/(m·K), Pr=2.22\n  c_p=4197 J/(kg·K)\n\n1단계: Reynolds 수\n  Re = ρVD/μ = 971.8×2×0.025/354×10⁻⁶\n  ┌──────────────────────┐\n  │ Re = 137,006 (난류 ✓) │\n  └──────────────────────┘\n  Re > 10,000 → Dittus-Boelter 적용 가능\n\n2단계: Nusselt 수 & h\n  Nu = 0.023 × Re^0.8 × Pr^0.4\n     = 0.023 × 137006^0.8 × 2.22^0.4\n  ┌──────────────────────┐\n  │ Nu = 385.2            │\n  │ h = Nu×k/D            │\n  │   = 385.2×0.670/0.025 │\n  │ h = 10,323 W/(m²·K)   │\n  └──────────────────────┘\n\n3단계: 출구 온도 (등온 벽면)\n  ṁ = ρVA = 971.8×2×π(0.0125)²\n    = 0.953 kg/s\n  As = πDL = π×0.025×3 = 0.2356 m²\n\n  T_out = T_w-(T_w-T_in)exp(-hAs/ṁc_p)\n  = 120-(120-80)exp(-10323×0.2356/953×4.197)\n  ┌──────────────────────┐\n  │ T_out = 80.9°C        │\n  └──────────────────────┘\n\n검증:\n• h ≈ 10,000: 물 강제대류 범위 (500~10,000) 상한\n  → 높은 유속(2m/s) 때문에 타당\n• 출구온도 ≈ 입구온도: 유량이 크고 관이 짧아\n  온도 변화가 작음 → 물리적으로 타당",
        quality: "good",
      },
    ],
  },
];

const qualityStyles = {
  bad: { border: "border-red-500/30", bg: "bg-red-500/5", badge: "bg-red-500/20 text-red-400", label: "애매한 응답" },
  mid: { border: "border-amber-500/30", bg: "bg-amber-500/5", badge: "bg-amber-500/20 text-amber-400", label: "개선된 응답" },
  good: { border: "border-emerald-500/30", bg: "bg-emerald-500/5", badge: "bg-emerald-500/20 text-emerald-400", label: "정확한 응답" },
};

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [activeLevel, setActiveLevel] = useState(0);
  const level = exercise.levels[activeLevel];
  const style = qualityStyles[level.quality];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-slate-800/50 border border-slate-700 overflow-hidden"
    >
      {/* Exercise header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            연습 {exercise.id}
          </span>
          <span className="text-xs text-gray-500">{exercise.topic}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{exercise.title}</h3>
        <p className="text-sm text-gray-400">{exercise.situation}</p>
      </div>

      {/* Level selector */}
      <div className="flex border-b border-slate-700">
        {exercise.levels.map((l, i) => (
          <button
            key={i}
            onClick={() => setActiveLevel(i)}
            className={`flex-1 py-3 text-sm font-medium transition-all relative ${
              activeLevel === i
                ? "text-white bg-slate-700/50"
                : "text-gray-500 hover:text-gray-300 hover:bg-slate-800"
            }`}
          >
            {l.label}
            {activeLevel === i && (
              <motion.div
                layoutId={`tab-${exercise.id}`}
                className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                  i === 0 ? "bg-red-500" : i === 1 ? "bg-amber-500" : "bg-emerald-500"
                }`}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Prompt */}
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">프롬프트</p>
          <div className={`rounded-xl border ${style.border} ${style.bg} p-4`}>
            <p className="text-sm text-gray-200 font-mono whitespace-pre-wrap">&ldquo;{level.prompt}&rdquo;</p>
          </div>
        </div>

        {/* AI Response */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">AI 응답</p>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${style.badge}`}>{style.label}</span>
          </div>
          <div className="rounded-xl bg-slate-900 border border-slate-700 p-4">
            <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">{level.response}</pre>
          </div>
        </div>

        {/* Quality indicator bar */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-600">정보량</span>
          <div className="flex-1 h-2 rounded-full bg-slate-700 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: activeLevel === 0 ? "20%" : activeLevel === 1 ? "55%" : "95%" }}
              transition={{ duration: 0.4 }}
              className={`h-full rounded-full ${
                activeLevel === 0 ? "bg-red-500" : activeLevel === 1 ? "bg-amber-500" : "bg-emerald-500"
              }`}
            />
          </div>
          <span className="text-[10px] text-gray-600">정확도</span>
          <div className="flex-1 h-2 rounded-full bg-slate-700 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: activeLevel === 0 ? "15%" : activeLevel === 1 ? "50%" : "98%" }}
              transition={{ duration: 0.4 }}
              className={`h-full rounded-full ${
                activeLevel === 0 ? "bg-red-500" : activeLevel === 1 ? "bg-amber-500" : "bg-emerald-500"
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PromptExercises() {
  return (
    <section className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl" />
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
            Practice
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            프롬프트 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">연습</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            같은 문제에 다른 수준의 프롬프트를 넣으면 결과가 어떻게 달라지는지 직접 비교해보세요.
            <br />
            <span className="text-gray-500">Level 1 → 2 → 3 탭을 클릭하여 차이를 확인하세요.</span>
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-10">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} exercise={ex} />
          ))}
        </div>
      </div>
    </section>
  );
}

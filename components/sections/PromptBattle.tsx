"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Battle {
  title: string;
  novice: {
    prompt: string;
    grade: string;
    preview: string;
  };
  expert: {
    prompt: string;
    grade: string;
    preview: string;
  };
  keyDifference: string;
}

const battles: Battle[] = [
  {
    title: "카르노 열기관",
    novice: {
      prompt: "카르노 효율 알려줘",
      grade: "초급",
      preview: "η = 1 - T_L/T_H 입니다.",
    },
    expert: {
      prompt:
        "너는 열역학 교수야. 고온원 500°C(773K), 저온원 25°C(298K)인 카르노 열기관의 최대 효율을 구해줘. 단계별로 풀이하고, 실제 화력발전소(η≈40%)와 비교해서 왜 카르노 효율에 도달할 수 없는지 3가지 이유를 설명해줘.",
      grade: "고급",
      preview:
        "단계 1: η_carnot = 1 - 298/773 = 61.4%\n단계 2: 실제 화력발전소 효율 약 40%\n단계 3: 도달 불가 이유\n  ① 비가역 과정\n  ② 마찰 손실\n  ③ 유한 온도차 열전달...",
    },
    keyDifference: "역할 부여 + 구체적 수치 + 출력 형식 + 비교 분석 요청",
  },
  {
    title: "열교환기 설계",
    novice: {
      prompt: "열교환기 설계해줘",
      grade: "초급",
      preview:
        "열교환기는 두 유체 사이에서 열을 전달하는 장치입니다... (일반론만 장황하게)",
    },
    expert: {
      prompt:
        "향류(counterflow) 이중관 열교환기를 설계해야 해. 조건: 뜨거운 물 입구 90°C→출구 60°C, 유량 0.5 kg/s. 차가운 물 입구 20°C, 유량 0.8 kg/s. U=1000 W/(m²·K)로 가정. LMTD법으로 필요한 전열면적을 구하고, 내경 25mm 관이면 필요한 관 길이를 계산해줘.",
      grade: "고급",
      preview:
        "1) 에너지 균형: Q = 0.5×4186×(90-60) = 62,790 W\n2) 차가운물 출구: T_co = 20 + 62790/(0.8×4186) = 38.8°C\n3) LMTD = 45.5°C\n4) A = Q/(U×LMTD) = 1.38 m²\n5) L = A/(π×D) = 17.6 m",
    },
    keyDifference: "열교환기 유형 + 모든 조건 수치화 + 방법론(LMTD) 지정",
  },
  {
    title: "레이놀즈 수와 유동 판별",
    novice: {
      prompt: "레이놀즈 수 구해줘",
      grade: "초급",
      preview: "Re = ρVD/μ 입니다. 여기서 ρ는 밀도, V는 유속...",
    },
    expert: {
      prompt:
        "내경 50mm 원관에 40°C 물이 2.5 m/s로 흐를 때, Re를 구하고 층류/천이/난류를 판별해줘. 40°C 물성치(NIST 기준)를 명시하고, 만약 유속을 0.01~5 m/s로 변화시키면 어느 유속에서 천이가 시작되는지도 구해줘.",
      grade: "고급",
      preview:
        "40°C 물성치(NIST): ρ=992.2, μ=653×10⁻⁶, ν=6.58×10⁻⁷\nRe = 190,229 → 난류\n천이 시작(Re=2300):\n  V_crit = 0.030 m/s",
    },
    keyDifference: "온도/물성치 지정 + 추가 분석(파라메트릭 스터디) 요청",
  },
];

const gradeConfig: Record<string, { color: string; label: string; stars: string }> = {
  "초급": { color: "text-red-400", label: "초급 — 구체성, 맥락, 조건 부족", stars: "★☆☆" },
  "중급": { color: "text-amber-400", label: "중급 — 일부 조건 제시, 개선 여지 있음", stars: "★★☆" },
  "고급": { color: "text-emerald-400", label: "고급 — 구체적 수치, 맥락, 검증 요청 포함", stars: "★★★" },
};

function GradeBadge({ grade }: { grade: string }) {
  const config = gradeConfig[grade] || gradeConfig["초급"];
  return (
    <div className="mt-3 flex items-center justify-between">
      <span className="text-slate-400 text-sm">프롬프트 품질</span>
      <span className={`${config.color} font-bold text-sm`} title={config.label}>
        {config.stars} {grade}
      </span>
    </div>
  );
}

function BattleCard({ battle, index }: { battle: Battle; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700"
    >
      {/* Battle Title */}
      <div className="text-center py-4 bg-slate-800 border-b border-slate-700">
        <span className="text-xs text-slate-500 uppercase tracking-widest">
          Battle {index + 1}
        </span>
        <h3 className="text-xl font-bold text-white mt-1">
          &ldquo;{battle.title}&rdquo;
        </h3>
      </div>

      {/* Two Corners */}
      <div className="grid md:grid-cols-[1fr_auto_1fr] grid-cols-1">
        {/* Novice - Red Corner */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-bold rounded uppercase tracking-wider">
              Red Corner
            </span>
            <span className="text-red-400 font-semibold text-sm">초보 프롬프트</span>
          </div>
          <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-3">
            <p className="text-red-200 text-sm font-mono">&ldquo;{battle.novice.prompt}&rdquo;</p>
          </div>
          <div className="bg-slate-900/60 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">AI 응답 미리보기:</p>
            <p className="text-slate-300 text-xs font-mono whitespace-pre-line leading-relaxed">
              {battle.novice.preview}
            </p>
          </div>
          <GradeBadge grade={battle.novice.grade} />
        </div>

        {/* VS Divider */}
        <div className="flex items-center justify-center md:flex-col py-4 md:py-0 md:px-2">
          <div className="hidden md:block w-px h-full bg-gradient-to-b from-transparent via-slate-600 to-transparent absolute" />
          <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <span className="text-black font-extrabold text-lg">VS</span>
          </div>
        </div>

        {/* Expert - Blue Corner */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-bold rounded uppercase tracking-wider">
              Blue Corner
            </span>
            <span className="text-blue-400 font-semibold text-sm">전문가 프롬프트</span>
          </div>
          <div className="bg-blue-950/30 border border-blue-900/50 rounded-lg p-3">
            <p className="text-blue-200 text-sm font-mono leading-relaxed">
              &ldquo;{battle.expert.prompt}&rdquo;
            </p>
          </div>
          <div className="bg-slate-900/60 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">AI 응답 미리보기:</p>
            <p className="text-slate-300 text-xs font-mono whitespace-pre-line leading-relaxed">
              {battle.expert.preview}
            </p>
          </div>
          <GradeBadge grade={battle.expert.grade} />
        </div>
      </div>

      {/* Key Difference */}
      <div className="mx-5 mb-5 mt-2 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-start gap-2">
        <span className="text-amber-400 text-lg leading-none mt-0.5">&#9889;</span>
        <div>
          <span className="text-amber-400 font-bold text-sm">핵심 차이: </span>
          <span className="text-amber-200 text-sm">{battle.keyDifference}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PromptBattle() {
  const [revealedCount, setRevealedCount] = useState(0);

  const handleRevealNext = () => {
    if (revealedCount < battles.length) {
      setRevealedCount((prev) => prev + 1);
    }
  };

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-sm font-bold rounded-full mb-4">
            Battle!
          </span>
          <h2 className="text-4xl font-bold text-white">
            프롬프트 배틀
          </h2>
          <p className="text-slate-400 mt-3 text-lg">
            초보 vs 전문가 — 같은 AI, 다른 결과
          </p>
        </motion.div>

        {/* Battles */}
        <div className="space-y-8">
          <AnimatePresence>
            {battles.slice(0, revealedCount).map((battle, i) => (
              <BattleCard key={i} battle={battle} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Reveal Button */}
        {revealedCount < battles.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-10"
          >
            <button
              onClick={handleRevealNext}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-xl hover:from-orange-400 hover:to-red-400 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95"
            >
              {revealedCount === 0
                ? "첫 번째 배틀 시작!"
                : `다음 배틀 공개! (${revealedCount}/${battles.length})`}
            </button>
          </motion.div>
        )}

        {/* Bottom Message */}
        {revealedCount === battles.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center bg-gradient-to-r from-slate-800 to-slate-800 border border-slate-700 rounded-2xl p-8"
          >
            <p className="text-xl text-white font-semibold leading-relaxed">
              같은 AI에게 물어봐도,{" "}
              <span className="text-orange-400">프롬프트에 따라 결과가 천지 차이</span>
              입니다.
            </p>
            <p className="text-lg text-slate-300 mt-3">
              여러분의{" "}
              <span className="text-emerald-400 font-bold">도메인 지식</span>이 곧
              프롬프트의 품질을 결정합니다.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

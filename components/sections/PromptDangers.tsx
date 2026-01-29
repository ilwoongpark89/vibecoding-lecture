"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface DangerCase {
  id: number;
  title: string;
  icon: string;
  desc: string;
  badPrompt: string;
  badResponse: string;
  badProblem: string;
  goodPrompt: string;
  goodResponse: string;
}

const cases: DangerCase[] = [
  {
    id: 1,
    title: "단위 혼동",
    icon: "📏",
    desc: "단위를 명시하지 않으면 AI가 SI와 영국단위를 섞어서 답한다. 1999년 NASA 화성기후궤도선(MCO)은 SI/영국단위 혼동으로 1억 2,500만 달러짜리 우주선이 파괴되었다.",
    badPrompt: "열전달 계수가 50이고 면적 10, 온도차 100일 때 열전달량 구해줘",
    badResponse: "q = h × A × ΔT = 50 × 10 × 100 = 50,000\n\n열전달량은 50,000입니다.\n\n(단위 없이 숫자만 제시됨 — 이것이 W인지 BTU/hr인지 알 수 없음.\nh가 W/(m²·K)이면 q = 50,000 W\nh가 BTU/(hr·ft²·°F)이면 q = 50,000 BTU/hr ≈ 14,654 W\n→ 3.4배 차이!)",
    badProblem: "단위가 없어 결과가 W인지 BTU/hr인지 알 수 없음. 실제 설계에서 이런 모호함은 장비 과열이나 용량 부족으로 이어질 수 있다.",
    goodPrompt: "h=50 W/(m²·K), A=10 m², ΔT=100 K일 때 열전달량을 SI 단위(W, kW)로 구해줘.",
    goodResponse: "q = h × A × ΔT\n  = 50 W/(m²·K) × 10 m² × 100 K\n  ┌─────────────────────┐\n  │ q = 50,000 W = 50 kW │\n  └─────────────────────┘\n\n단위 검증: [W/(m²·K)] × [m²] × [K] = [W] ✓",
  },
  {
    id: 2,
    title: "상관식 오용",
    icon: "⚠️",
    desc: "AI는 상관식의 적용범위를 확인하지 않고 계산해버릴 수 있다. Dittus-Boelter는 Re > 10,000인 난류에서만 유효하지만, 층류 조건을 주면 경고 없이 계산한다.",
    badPrompt: "내경 5mm 관에 물이 0.01 m/s로 흘러. Dittus-Boelter로 h 구해줘.",
    badResponse: "Dittus-Boelter: Nu = 0.023 × Re^0.8 × Pr^0.4\n\n80°C 물: ρ=971.8, μ=354×10⁻⁶, k=0.670, Pr=2.22\n\nRe = 971.8 × 0.01 × 0.005 / 354×10⁻⁶ = 137\n\nNu = 0.023 × 137^0.8 × 2.22^0.4 = 1.72\nh = 1.72 × 0.670 / 0.005 = 230 W/(m²·K)\n\n(⚠ 경고 없이 계산 완료 — 하지만 Re=137은 완전히 층류!\nDittus-Boelter는 Re>10,000에서만 유효.\n실제 층류 Nu ≈ 3.66이므로 h ≈ 490 — 결과가 완전히 다름!)",
    badProblem: "Re = 137로 완전한 층류인데 난류 상관식을 적용. 실제 값과 크게 달라질 수 있고, AI는 이 오류를 지적하지 않았다.",
    goodPrompt: "내경 5mm 관에 80°C 물이 0.01 m/s로 흐를 때 h를 구해줘.\nRe를 먼저 계산해서 층류/난류를 판단하고, 적절한 상관식을 선택해줘.\n상관식의 적용 범위도 명시해줘.",
    goodResponse: "1단계: Re 계산\n  Re = ρVD/μ = 971.8×0.01×0.005/354×10⁻⁶ = 137\n  → Re = 137 < 2,300 → 층류 유동\n\n⚠ Dittus-Boelter는 Re > 10,000에서만 유효!\n→ 층류 상관식 사용\n\n2단계: 층류, 등온벽 (fully developed)\n  Nu = 3.66 (이론해)\n\n3단계: h 계산\n  h = Nu × k / D = 3.66 × 0.670 / 0.005\n  ┌─────────────────────┐\n  │ h = 490 W/(m²·K)    │\n  └─────────────────────┘\n\n검증: 층류 물 h ≈ 100~1,000 범위. 타당.",
  },
  {
    id: 3,
    title: "물성치 온도 오류",
    icon: "🌡️",
    desc: "물성치는 온도에 따라 크게 변한다. 온도를 지정하지 않으면 AI가 임의 온도(보통 20~25°C)의 물성치를 사용하여 결과가 수십% 달라진다.",
    badPrompt: "물이 관을 흘러갈 때 Re 구해줘. 유속 1 m/s, 관 직경 20mm.",
    badResponse: "Re = ρVD/μ\n\n물의 물성치:\n  ρ = 998 kg/m³\n  μ = 1.002×10⁻³ Pa·s\n\nRe = 998 × 1 × 0.02 / 1.002×10⁻³\n  = 19,920\n\n(⚠ AI가 20°C 물성치를 사용!\n만약 실제 온도가 80°C라면:\n  ρ=971.8, μ=354×10⁻⁶\n  Re = 971.8 × 1 × 0.02 / 354×10⁻⁶ = 54,904\n\n→ Re가 19,920 vs 54,904로 2.8배 차이!\n  열전달 계수도 크게 달라짐)",
    badProblem: "AI가 암묵적으로 20°C를 가정. 실제 80°C였다면 Re가 2.8배 달라지고, 이에 따라 열전달 계수도 완전히 다른 값이 나온다.",
    goodPrompt: "80°C 물이 내경 20mm 관을 1 m/s로 흐를 때 Re를 구해줘.\n80°C에서의 물성치(ρ, μ)를 명시하고 출처도 밝혀줘.",
    goodResponse: "80°C 물 물성치 (NIST 기준):\n  ρ = 971.8 kg/m³\n  μ = 354 × 10⁻⁶ Pa·s\n\nRe = ρVD/μ\n   = 971.8 × 1.0 × 0.020 / 354×10⁻⁶\n  ┌─────────────────────┐\n  │ Re = 54,904 (난류)   │\n  └─────────────────────┘\n\n참고: 20°C였다면 Re ≈ 19,920으로\n온도에 따라 Re가 크게 달라집니다.\n물성치 온도를 반드시 명시하세요.",
  },
];

export default function PromptDangers() {
  const [activeCase, setActiveCase] = useState(0);
  const [showGood, setShowGood] = useState(false);
  const c = cases[activeCase];

  return (
    <section className="relative py-24 bg-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
            Warning
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            잘못된 프롬프트의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">위험성</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            AI는 틀려도 자신있게 답합니다. 검증할 수 있는 건 도메인 지식을 가진 여러분뿐입니다.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Case selector */}
          <div className="flex gap-3 mb-8 flex-wrap justify-center">
            {cases.map((c, i) => (
              <button
                key={c.id}
                onClick={() => { setActiveCase(i); setShowGood(false); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeCase === i
                    ? "bg-red-500/20 border border-red-500/40 text-red-300"
                    : "bg-slate-800 border border-slate-700 text-gray-400 hover:bg-slate-700"
                }`}
              >
                <span className="text-lg">{c.icon}</span>
                {c.title}
              </button>
            ))}
          </div>

          <motion.div
            key={activeCase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-slate-800/50 border border-slate-700 overflow-hidden"
          >
            {/* Description */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{c.icon}</span>
                <h3 className="text-xl font-bold text-white">사례: {c.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
            </div>

            {/* Bad prompt & response */}
            <div className="p-6 space-y-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500/20 text-red-400">✗ 부정확한 프롬프트</span>
              </div>
              <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4">
                <p className="text-sm text-red-300/80 font-mono">&ldquo;{c.badPrompt}&rdquo;</p>
              </div>
              <div className="rounded-xl bg-slate-900 border border-slate-700 p-4">
                <p className="text-[10px] text-gray-600 mb-2">AI 응답</p>
                <pre className="text-xs text-gray-400 font-mono whitespace-pre-wrap leading-relaxed">{c.badResponse}</pre>
              </div>
              <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-3">
                <p className="text-xs text-red-400 font-medium mb-1">문제점</p>
                <p className="text-xs text-red-300/70 leading-relaxed">{c.badProblem}</p>
              </div>
            </div>

            {/* Toggle good prompt */}
            <div className="p-6">
              <button
                onClick={() => setShowGood(!showGood)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  showGood
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                <svg className={`w-4 h-4 transition-transform ${showGood ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {showGood ? "올바른 프롬프트 닫기" : "✓ 올바른 프롬프트 보기"}
              </button>

              {showGood && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-4"
                >
                  <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4">
                    <p className="text-xs font-bold text-emerald-400 mb-2">✓ 올바른 프롬프트</p>
                    <p className="text-sm text-emerald-300/80 font-mono">&ldquo;{c.goodPrompt}&rdquo;</p>
                  </div>
                  <div className="rounded-xl bg-slate-900 border border-emerald-500/20 p-4">
                    <p className="text-[10px] text-emerald-500 mb-2">AI 응답</p>
                    <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">{c.goodResponse}</pre>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Bottom message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-red-500/10 via-amber-500/10 to-orange-500/10 border border-red-500/20 text-center"
          >
            <p className="text-2xl font-bold text-white mb-3">
              AI는 <span className="text-red-400">틀려도 자신있게</span> 답한다
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              프롬프트가 부정확하면 AI는 빈 정보를 임의로 채워넣고, 그 결과가 틀려도 경고하지 않습니다.
              <br />
              <span className="text-amber-400 font-medium">결과를 검증할 수 있는 건 역학을 이해하는 여러분뿐입니다.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

interface Technique {
  name: string;
  tag: string;
  description: string;
  normalPrompt: string;
  advancedPrompt: string;
  normalResponse: string;
  advancedResponse: string;
  keyPoint: string;
}

const techniques: Technique[] = [
  {
    name: "Chain-of-Thought (단계별 사고)",
    tag: "CoT",
    description:
      "복잡한 문제를 단계별로 쪼개서 사고 과정을 유도하면, AI가 중간 과정을 건너뛰지 않고 정확하게 풀어냅니다.",
    normalPrompt: "이중관 열교환기의 LMTD 구해줘",
    advancedPrompt:
      "이중관 열교환기에서 고온측 입구 150°C, 출구 90°C, 저온측 입구 20°C, 출구 60°C일 때,\n(1) 병류와 향류 각각의 ΔT₁, ΔT₂를 구하고,\n(2) LMTD 공식을 적용하고,\n(3) 병류 vs 향류 LMTD를 비교해서 왜 향류가 효율적인지 설명해줘",
    normalResponse:
      "LMTD(Log Mean Temperature Difference)는 열교환기의 평균 온도차를 나타내는 값입니다.\n\n공식: LMTD = (ΔT₁ - ΔT₂) / ln(ΔT₁/ΔT₂)\n\n온도 조건을 알려주시면 계산해드리겠습니다.",
    advancedResponse:
      "■ 이중관 열교환기 LMTD 해석\n\n━━ (1) 온도차 계산 ━━\n\n【병류 (Parallel Flow)】\n  ΔT₁ = T_h,in - T_c,in = 150 - 20 = 130°C\n  ΔT₂ = T_h,out - T_c,out = 90 - 60 = 30°C\n\n【향류 (Counter Flow)】\n  ΔT₁ = T_h,in - T_c,out = 150 - 60 = 90°C\n  ΔT₂ = T_h,out - T_c,in = 90 - 20 = 70°C\n\n━━ (2) LMTD 계산 ━━\n\n  LMTD = (ΔT₁ - ΔT₂) / ln(ΔT₁/ΔT₂)\n\n【병류】\n  LMTD_p = (130 - 30) / ln(130/30)\n         = 100 / ln(4.333) = 100 / 1.466\n  ┌───────────────────────────┐\n  │ LMTD_병류 = 68.2°C        │\n  └───────────────────────────┘\n\n【향류】\n  LMTD_c = (90 - 70) / ln(90/70)\n         = 20 / ln(1.286) = 20 / 0.2513\n  ┌───────────────────────────┐\n  │ LMTD_향류 = 79.6°C        │\n  └───────────────────────────┘\n\n━━ (3) 비교 분석 ━━\n\n  향류 LMTD (79.6°C) > 병류 LMTD (68.2°C)\n  → 향류가 16.7% 더 큰 유효 온도차\n  → 같은 열전달량(Q = UA × LMTD)을 달성하려면\n    향류가 더 작은 전열면적(A)으로 충분\n  → 실무에서 향류가 표준 설계인 이유",
    keyPoint:
      "단계를 명시하면 AI가 '중간 과정 생략' 없이 체계적으로 풀이합니다. 특히 비교 분석까지 요청하면 깊이 있는 답변을 얻습니다.",
  },
  {
    name: "Few-Shot (예시 제공)",
    tag: "Few-Shot",
    description:
      "원하는 풀이 방식을 예시로 보여주면, AI가 같은 패턴으로 새 문제를 풀어줍니다.",
    normalPrompt: "레이놀즈 수 계산해줘",
    advancedPrompt:
      "예시: 물이 내경 50mm 관에서 2m/s로 흐를 때\n→ Re = ρVD/μ = 998×2×0.05 / 1.002×10⁻³ = 99,600 (난류)\n\n이제 문제: 공기가 내경 100mm 관에서 5m/s일 때 Re를 같은 방식으로 구해줘\n(공기 20°C 물성치 사용)",
    normalResponse:
      "레이놀즈 수(Reynolds number)는 유동의 층류/난류를 판별하는 무차원수입니다.\n\nRe = ρVD/μ = VD/ν\n\n- Re < 2,300: 층류\n- 2,300 < Re < 4,000: 천이\n- Re > 4,000: 난류\n\n유속, 직경, 유체의 물성치를 알려주시면 계산하겠습니다.",
    advancedResponse:
      "■ 레이놀즈 수 계산 (예시 패턴 적용)\n\n0단계: 공기 20°C 물성치\n  ρ = 1.204 kg/m³\n  μ = 1.825×10⁻⁵ Pa·s\n  ν = μ/ρ = 1.516×10⁻⁵ m²/s\n\n풀이:\n  Re = ρVD/μ\n     = 1.204 × 5 × 0.1 / 1.825×10⁻⁵\n  ┌───────────────────────────┐\n  │ Re = 32,986 (난류)         │\n  └───────────────────────────┘\n\n검증: ν 방법으로 교차 확인\n  Re = VD/ν = 5 × 0.1 / 1.516×10⁻⁵ = 32,981 ✓\n  (소수점 차이는 반올림 때문)\n\nRe > 4,000 → 완전 난류 유동\n\n비교: 같은 관에 물이 흐르면 Re ≈ 500,000 수준\n→ 공기는 점성이 높고(ν가 물의 15배) 밀도가 낮아\n  같은 유속에서도 Re가 훨씬 작음",
    keyPoint:
      "풀이 예시를 하나 보여주면 AI가 '출력 형식 + 풀이 깊이 + 검증 방식'을 모두 학습합니다. 물성치 명시와 교차 검증까지 따라합니다.",
  },
  {
    name: "Role Prompting (역할 부여)",
    tag: "Role",
    description:
      "AI에게 전문가 역할을 부여하면, 단순 계산을 넘어 실무적 인사이트와 설계 관점의 답변을 얻을 수 있습니다.",
    normalPrompt: "열전달 핀 설계해줘",
    advancedPrompt:
      "너는 20년 경력의 열교환기 설계 엔지니어야. 신입 엔지니어에게 가르치듯이 설명해줘.\n알루미늄 직사각형 핀(길이 5cm, 두께 1mm)의 효율을 구하고,\n핀 재질을 구리로 바꾸면 효율이 얼마나 올라가는지 비교해줘.\n실무에서 주의할 점도 알려줘.",
    normalResponse:
      "핀(Fin)은 열전달 면적을 확장하여 방열 성능을 높이는 구조물입니다.\n\n핀 효율: η = tanh(mL)/(mL)\n여기서 m = √(hP/kAc)\n\n핀 설계 시 재질의 열전도도, 핀의 기하학적 형상, 대류 조건을 고려해야 합니다.\n\n구체적인 조건을 알려주시면 계산하겠습니다.",
    advancedResponse:
      "■ 핀 효율 비교 분석 (선배 엔지니어 관점)\n\n━━ 공통 조건 ━━\n  L = 5cm, t = 1mm, w = 1m (단위폭)\n  h = 50 W/(m²·K), 단열 끝단 가정\n  P = 2(w+t) ≈ 2.002 m, Ac = w×t = 0.001 m²\n\n━━ 알루미늄 (k = 237 W/m·K) ━━\n  m = √(hP/kAc) = √(50×2.002 / 237×0.001)\n    = √(422.6) = 20.56 m⁻¹\n  mL = 20.56 × 0.05 = 1.028\n  η_Al = tanh(1.028)/1.028 = 0.765/1.028\n  ┌───────────────────────────┐\n  │ η_Al = 74.4%              │\n  └───────────────────────────┘\n\n━━ 구리 (k = 401 W/m·K) ━━\n  m = √(50×2.002 / 401×0.001)\n    = √(249.7) = 15.80 m⁻¹\n  mL = 15.80 × 0.05 = 0.790\n  η_Cu = tanh(0.790)/0.790 = 0.658/0.790\n  ┌───────────────────────────┐\n  │ η_Cu = 83.3%              │\n  └───────────────────────────┘\n\n━━ 비교 ━━\n  구리가 알루미늄 대비 효율 +8.9%p 향상\n  그러나 구리 밀도(8,960) vs 알루미늄(2,700)\n  → 무게 3.3배, 가격 ~5배\n\n━━ 실무 주의사항 ━━\n  ① 핀 효율 < 60%면 재설계 (재질 변경 or 핀 짧게)\n  ② 알루미늄이 대부분 실무 표준 (무게 대비 성능)\n  ③ 핀 간격이 좁으면 공기측 압력강하 급증 주의\n  ④ 부식 환경이면 알루미늄 양극산화 처리 필수\n  ⑤ 구리는 해양/화학공정 등 부식저항 필요 시 채택",
    keyPoint:
      "역할 부여하면 AI가 '계산' + '실무 판단' + '비용/무게 트레이드오프'까지 고려합니다. 교과서에 없는 엔지니어링 인사이트를 얻을 수 있습니다.",
  },
];

export default function PromptAdvanced() {
  return (
    <section className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
            Advanced Techniques
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            고급 프롬프트{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              기법 실습
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Chain-of-Thought, Few-Shot, Role Prompting을 열전달 문제로 직접 비교해봅시다.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-16">
          {techniques.map((tech, i) => (
            <motion.div
              key={tech.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-slate-800/50 border border-slate-700 overflow-hidden"
            >
              {/* Technique Header */}
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white">
                    기법 {i + 1}
                  </span>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                    {tech.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{tech.name}</h3>
                <p className="text-sm text-gray-400">{tech.description}</p>
              </div>

              {/* Two-column prompt comparison */}
              <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-700">
                {/* Normal prompt side */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                      일반 프롬프트
                    </span>
                  </div>
                  <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4">
                    <p className="text-sm text-red-300/90 font-mono whitespace-pre-wrap">
                      &ldquo;{tech.normalPrompt}&rdquo;
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                      AI 응답
                    </p>
                    <div className="rounded-xl bg-slate-900 border border-red-500/10 p-4">
                      <pre className="text-xs text-gray-400 font-mono whitespace-pre-wrap leading-relaxed">
                        {tech.normalResponse}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Advanced prompt side */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      {tech.tag} 적용 프롬프트
                    </span>
                  </div>
                  <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4">
                    <p className="text-sm text-emerald-300/90 font-mono whitespace-pre-wrap">
                      &ldquo;{tech.advancedPrompt}&rdquo;
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                      AI 응답
                    </p>
                    <div className="rounded-xl bg-slate-900 border border-emerald-500/10 p-4">
                      <pre className="text-xs text-emerald-200/80 font-mono whitespace-pre-wrap leading-relaxed">
                        {tech.advancedResponse}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Point */}
              <div className="mx-6 mb-6 mt-2 bg-violet-500/10 border border-violet-500/30 rounded-xl p-4 flex items-start gap-3">
                <span className="text-violet-400 text-lg leading-none mt-0.5">&#9889;</span>
                <div>
                  <span className="text-violet-400 font-bold text-sm">핵심 포인트: </span>
                  <span className="text-violet-200 text-sm">{tech.keyPoint}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-4xl mx-auto text-center bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 rounded-2xl p-8"
        >
          <p className="text-xl text-white font-semibold leading-relaxed">
            세 가지 기법을{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              조합
            </span>
            하면 더 강력합니다.
          </p>
          <p className="text-gray-400 mt-3">
            예: Role + CoT = &quot;너는 열역학 교수야. 다음 문제를 단계별로 풀어줘...&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
}

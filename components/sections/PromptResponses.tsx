"use client";

import { motion } from "framer-motion";

interface ResponseComparison {
  id: number;
  title: string;
  topic: string;
  bad: {
    prompt: string;
    response: string;
    highlights: { text: string; note: string }[];
  };
  good: {
    prompt: string;
    response: string;
    highlights: { text: string; note: string }[];
  };
}

const comparisons: ResponseComparison[] = [
  {
    id: 1,
    title: "보일러 효율 계산",
    topic: "열역학 / 에너지 변환",
    bad: {
      prompt: "보일러 효율 알려줘",
      response:
        "보일러 효율은 투입된 연료 에너지 대비 유용하게 사용된 에너지의 비율입니다.\n\n일반적으로 보일러 효율은 80~95% 범위에 있습니다.\n- 구형 보일러: 80~85%\n- 현대식 콘덴싱 보일러: 90~95%\n\n효율을 높이려면 배기가스 온도를 낮추고, 단열을 잘 하며, 공연비를 최적화해야 합니다.\n\n정확한 효율은 보일러의 종류와 운전 조건에 따라 달라집니다.",
      highlights: [
        { text: "80~95% 범위", note: "구체적 수치 없이 범위만 제시" },
        { text: "정확한 효율은 보일러의 종류와 운전 조건에 따라 달라집니다", note: "결론이 애매함" },
      ],
    },
    good: {
      prompt:
        "증기 보일러: 연료 투입열량 5000 kW, 증기 생산 4200 kW, 배기가스 손실 400 kW, 방열 손실 150 kW.\n직접법과 간접법으로 보일러 효율을 각각 구해줘.",
      response:
        "■ 보일러 효율 계산\n\n━━ 직접법 (Input-Output Method) ━━\n  η_직접 = Q_출력 / Q_입력 × 100\n         = 4200 / 5000 × 100\n  ┌──────────────────────────┐\n  │ η_직접 = 84.0%            │\n  └──────────────────────────┘\n\n━━ 간접법 (Heat Loss Method) ━━\n  총 손실 = 배기가스 + 방열 + 기타\n         = 400 + 150 + (5000-4200-400-150)\n         = 400 + 150 + 250 = 800 kW\n  η_간접 = (1 - Q_손실/Q_입력) × 100\n         = (1 - 800/5000) × 100\n  ┌──────────────────────────┐\n  │ η_간접 = 84.0%            │\n  └──────────────────────────┘\n\n검증: 직접법과 간접법 결과가 동일(84.0%) → 에너지 보존 성립 ✓\n\n손실 분석:\n  • 배기가스: 400kW (총손실의 50%) — 가장 큰 손실원\n  • 방열: 150kW (19%)\n  • 미계량 손실: 250kW (31%)",
      highlights: [
        { text: "84.0%", note: "정확한 수치 계산" },
        { text: "직접법과 간접법 결과가 동일(84.0%) → 에너지 보존 성립 ✓", note: "검증 포함" },
        { text: "kW", note: "단위 포함" },
      ],
    },
  },
  {
    id: 2,
    title: "자연대류 열전달",
    topic: "열전달 / 대류",
    bad: {
      prompt: "대류 열전달 계수 구해줘",
      response:
        "대류 열전달 계수(h)는 유체와 고체 표면 사이의 열전달 효율을 나타내는 값입니다.\n\n일반적인 범위:\n- 자연대류(공기): 5~25 W/(m²·K)\n- 강제대류(공기): 25~250 W/(m²·K)\n- 강제대류(물): 50~20,000 W/(m²·K)\n\n정확한 h를 구하려면 유동 조건, 형상, 유체의 종류를 알아야 합니다.\n어떤 상황의 열전달 계수를 구하고 싶으신가요?",
      highlights: [
        { text: "5~25 W/(m²·K)", note: "범위만 제시, 계산 없음" },
        { text: "어떤 상황의 열전달 계수를 구하고 싶으신가요?", note: "되물어봄 — 정보 부족" },
      ],
    },
    good: {
      prompt:
        "수평 원관 외부, 직경 25mm, 표면온도 80°C, 주위 공기 20°C, 자연대류.\nChurchill-Chu 상관식으로 Nu와 h를 구해줘. 물성치는 막온도 기준.",
      response:
        "■ 수평 원관 외부 자연대류\n\n0단계: 막온도 & 공기 물성치\n  T_f = (80+20)/2 = 50°C = 323K\n  공기@50°C: ν=1.798×10⁻⁵ m²/s, k=0.02735 W/(m·K)\n  Pr=0.7228, β=1/T_f=3.096×10⁻³ K⁻¹\n\n1단계: Rayleigh 수\n  Ra = gβΔTD³/(να)\n  α = k/(ρcp) = ν/Pr = 2.488×10⁻⁵ m²/s\n  Ra = 9.81×3.096×10⁻³×60×(0.025)³ / (1.798×10⁻⁵ × 2.488×10⁻⁵)\n  ┌──────────────────────────┐\n  │ Ra = 64,200              │\n  └──────────────────────────┘\n\n2단계: Churchill-Chu 상관식 (수평 원관)\n  Nu = {0.60 + 0.387[Ra/(1+(0.559/Pr)^(9/16))^(16/9)]^(1/6)}²\n  Nu = {0.60 + 0.387×(64200/1.897)^(1/6)}²\n     = {0.60 + 0.387×(33,843)^(1/6)}²\n     = {0.60 + 0.387×5.685}²\n     = {0.60 + 2.200}² = (2.800)²\n  ┌──────────────────────────┐\n  │ Nu = 7.84                │\n  └──────────────────────────┘\n\n3단계: 열전달 계수\n  h = Nu×k/D = 7.84×0.02735/0.025\n  ┌──────────────────────────┐\n  │ h = 8.57 W/(m²·K)       │\n  └──────────────────────────┘\n\n검증: 자연대류 공기 h ≈ 5~25 범위 내 ✓\nRa ≈ 6.4×10⁴ → 층류 자연대류 영역 (Ra < 10⁹) ✓",
      highlights: [
        { text: "T_f = (80+20)/2 = 50°C", note: "막온도 정확히 적용" },
        { text: "h = 8.57 W/(m²·K)", note: "정확한 수치 결과" },
        { text: "자연대류 공기 h ≈ 5~25 범위 내 ✓", note: "검증 포함" },
      ],
    },
  },
  {
    id: 3,
    title: "냉동 사이클 COP",
    topic: "열역학 / 냉동공조",
    bad: {
      prompt: "냉동기 COP 구해줘",
      response:
        "COP(Coefficient of Performance, 성능계수)는 냉동기의 효율을 나타내는 지표입니다.\n\nCOP = Q_L / W\n\n여기서 Q_L은 냉동 능력(증발기에서 흡수한 열), W는 압축기 일입니다.\n\n일반적으로:\n- 가정용 냉장고: COP 1.5~3\n- 에어컨: COP 3~5\n- 산업용 칠러: COP 4~7\n\nCOP가 높을수록 에너지 효율이 좋습니다. 냉매와 운전 조건에 따라 크게 달라집니다.",
      highlights: [
        { text: "COP 1.5~3", note: "범위만 제시" },
        { text: "냉매와 운전 조건에 따라 크게 달라집니다", note: "구체적 답변 없음" },
      ],
    },
    good: {
      prompt:
        "R-134a 증기압축 냉동사이클. 증발온도 -10°C, 응축온도 40°C.\n이상적 사이클 가정. COP, 냉동능력(증발기 1kW 기준), 압축기 소요동력을 구해줘.\n카르노 COP와도 비교해줘.",
      response:
        "■ R-134a 이상적 증기압축 냉동사이클\n\n0단계: R-134a 열역학적 상태점 (냉매표)\n  상태1 (증발기 출구, 포화증기, -10°C):\n    h₁ = 392.3 kJ/kg, s₁ = 1.7319 kJ/(kg·K)\n  상태2 (압축기 출구, 등엔트로피, 40°C 응축압)\n    P₂ = P_sat(40°C) = 1017 kPa\n    s₂ = s₁ → h₂ = 421.2 kJ/kg\n  상태3 (응축기 출구, 포화액, 40°C):\n    h₃ = 256.5 kJ/kg\n  상태4 (팽창밸브 출구, h₄ = h₃):\n    h₄ = 256.5 kJ/kg\n\n1단계: 각 과정의 에너지\n  q_L = h₁ - h₄ = 392.3 - 256.5 = 135.8 kJ/kg\n  w_comp = h₂ - h₁ = 421.2 - 392.3 = 28.9 kJ/kg\n  q_H = h₂ - h₃ = 421.2 - 256.5 = 164.7 kJ/kg\n  검증: q_H = q_L + w → 135.8+28.9 = 164.7 ✓\n\n2단계: COP\n  ┌──────────────────────────┐\n  │ COP = q_L/w = 135.8/28.9│\n  │ COP = 4.70               │\n  └──────────────────────────┘\n\n3단계: 증발기 1kW 기준\n  냉매 유량: ṁ = 1.0/135.8 = 7.36×10⁻³ kg/s\n  ┌──────────────────────────┐\n  │ 냉동능력: Q_L = 1.0 kW   │\n  │ 압축기: W = 0.213 kW     │\n  │ 방열: Q_H = 1.213 kW     │\n  └──────────────────────────┘\n\n4단계: 카르노 COP 비교\n  COP_Carnot = T_L/(T_H-T_L)\n    = 263.15/(313.15-263.15) = 263.15/50\n  ┌──────────────────────────┐\n  │ COP_Carnot = 5.26        │\n  │ η_II = 4.70/5.26 = 89.4% │\n  └──────────────────────────┘\n  → 이상적 사이클도 카르노의 89.4%에 불과\n  → 실제 사이클은 과열, 과냉, 압축 비효율로 COP ≈ 3.0~3.5",
      highlights: [
        { text: "COP = 4.70", note: "정확한 수치" },
        { text: "q_H = q_L + w → 135.8+28.9 = 164.7 ✓", note: "에너지 보존 검증" },
        { text: "η_II = 4.70/5.26 = 89.4%", note: "카르노 대비 2법칙 효율" },
      ],
    },
  },
];

function HighlightedResponse({
  text,
  highlights,
  type,
}: {
  text: string;
  highlights: { text: string; note: string }[];
  type: "bad" | "good";
}) {
  const borderColor = type === "bad" ? "border-red-500/20" : "border-emerald-500/20";
  const bgColor = type === "bad" ? "bg-slate-900" : "bg-slate-900";

  let processed = text;
  const parts: (string | { highlighted: string; note: string })[] = [];
  let remaining = processed;

  // Simple approach: split by highlights
  for (const h of highlights) {
    const idx = remaining.indexOf(h.text);
    if (idx >= 0) {
      if (idx > 0) parts.push(remaining.slice(0, idx));
      parts.push({ highlighted: h.text, note: h.note });
      remaining = remaining.slice(idx + h.text.length);
    }
  }
  if (remaining) parts.push(remaining);

  const highlightBg =
    type === "bad" ? "bg-red-500/20 text-red-300 border-b border-red-500/40" : "bg-emerald-500/15 text-emerald-300 border-b border-emerald-500/40";
  const noteBg =
    type === "bad" ? "text-red-400 bg-red-500/10" : "text-emerald-400 bg-emerald-500/10";

  return (
    <div className={`rounded-xl ${bgColor} border ${borderColor} p-4`}>
      <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">
        {parts.map((part, i) =>
          typeof part === "string" ? (
            <span key={i}>{part}</span>
          ) : (
            <span key={i} className="relative group">
              <span className={`${highlightBg} px-0.5 rounded`}>
                {part.highlighted}
              </span>
              <span
                className={`ml-1 inline-block text-[10px] px-1.5 py-0.5 rounded ${noteBg} font-sans`}
              >
                {part.note}
              </span>
            </span>
          )
        )}
      </pre>
    </div>
  );
}

export default function PromptResponses() {
  return (
    <section className="relative py-24 bg-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
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
            Response Comparison
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            실제 AI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              응답 비교
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            같은 문제를 다르게 물어봤을 때 AI 응답이 어떻게 달라지는지 직접 확인하세요.
            <br />
            <span className="text-gray-500">
              <span className="text-red-400">빨간색</span> = 문제점 /{" "}
              <span className="text-emerald-400">초록색</span> = 장점
            </span>
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-16">
          {comparisons.map((comp, idx) => (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl bg-slate-800/50 border border-slate-700 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white">
                    문제 {comp.id}
                  </span>
                  <span className="text-xs text-gray-500">{comp.topic}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{comp.title}</h3>
              </div>

              {/* Two columns */}
              <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-700">
                {/* Bad side */}
                <div className="p-6 space-y-4">
                  <span className="inline-block text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                    나쁜 프롬프트
                  </span>
                  <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4">
                    <p className="text-sm text-red-300/90 font-mono">
                      &ldquo;{comp.bad.prompt}&rdquo;
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                      AI 응답
                    </p>
                    <HighlightedResponse
                      text={comp.bad.response}
                      highlights={comp.bad.highlights}
                      type="bad"
                    />
                  </div>
                </div>

                {/* Good side */}
                <div className="p-6 space-y-4">
                  <span className="inline-block text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    좋은 프롬프트
                  </span>
                  <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4">
                    <p className="text-sm text-emerald-300/90 font-mono whitespace-pre-wrap">
                      &ldquo;{comp.good.prompt}&rdquo;
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                      AI 응답
                    </p>
                    <HighlightedResponse
                      text={comp.good.response}
                      highlights={comp.good.highlights}
                      type="good"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-4xl mx-auto text-center bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-2xl p-8"
        >
          <p className="text-xl text-white font-semibold">
            프롬프트의 <span className="text-cyan-400">구체성</span>이 응답의{" "}
            <span className="text-violet-400">정확도</span>를 결정합니다.
          </p>
          <p className="text-gray-400 mt-3">
            조건, 수치, 방법론을 명시할수록 AI는 &quot;교과서 같은 일반론&quot; 대신
            &quot;실제 풀이&quot;를 제공합니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

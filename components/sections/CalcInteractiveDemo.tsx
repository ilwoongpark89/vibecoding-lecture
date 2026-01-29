"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function CalcInteractiveDemo() {
  const [h, setH] = useState(100);
  const [A, setA] = useState(0.5);
  const [Ts, setTs] = useState(150);
  const [Tinf, setTinf] = useState(25);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const results = useMemo(() => {
    const deltaT = Ts - Tinf;
    const q = h * deltaT;
    const Q = h * A * deltaT;
    return { deltaT, q, Q };
  }, [h, A, Ts, Tinf]);

  const maxQ = 200 * 2.0 * 300; // rough max for bar scale

  const inputs = [
    {
      label: "h — 대류 열전달 계수",
      unit: "W/m²·K",
      value: h,
      set: setH,
      min: 1,
      max: 500,
      step: 1,
      desc: "자연대류 5~25, 강제대류(공기) 25~250, 강제대류(물) 100~20,000",
    },
    {
      label: "A — 전열 면적",
      unit: "m²",
      value: A,
      set: setA,
      min: 0.01,
      max: 5,
      step: 0.01,
      desc: "열이 전달되는 표면의 면적",
    },
    {
      label: "Tₛ — 표면 온도",
      unit: "°C",
      value: Ts,
      set: setTs,
      min: -50,
      max: 500,
      step: 1,
      desc: "고체 표면의 온도",
    },
    {
      label: "T∞ — 유체 온도",
      unit: "°C",
      value: Tinf,
      set: setTinf,
      min: -50,
      max: 500,
      step: 1,
      desc: "표면에서 충분히 먼 곳의 유체 온도",
    },
  ];

  const resultCards = [
    {
      label: "ΔT — 온도차",
      value: results.deltaT,
      unit: "°C",
      color: "amber",
      formula: "Tₛ − T∞",
    },
    {
      label: "q — 열유속",
      value: results.q,
      unit: "W/m²",
      color: "orange",
      formula: "h × ΔT",
    },
    {
      label: "Q — 총 열전달량",
      value: results.Q,
      unit: "W",
      color: "red",
      formula: "h × A × ΔT",
    },
  ];

  const colorClasses: Record<string, { bg: string; border: string; text: string; bar: string }> = {
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-300",
      bar: "bg-amber-500",
    },
    orange: {
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
      text: "text-orange-300",
      bar: "bg-orange-500",
    },
    red: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-300",
      bar: "bg-red-500",
    },
  };

  const extensionIdeas = [
    { icon: "🔄", title: "단위 변환 추가", desc: "SI ↔ 영국 단위 (BTU/hr·ft²·°F) 토글" },
    { icon: "📊", title: "차트로 시각화", desc: "h 변화에 따른 Q 그래프 (Recharts)" },
    { icon: "☀️", title: "복사 열전달 추가", desc: "q_rad = εσ(T⁴ₛ − T⁴∞) 항 추가" },
    { icon: "💾", title: "결과 내보내기", desc: "CSV/PDF로 계산 결과 저장" },
  ];

  const promptText = `"뉴턴 냉각법칙(Newton's Law of Cooling) 계산기를 React로 만들어줘.

입력값:
- h: 대류 열전달 계수 (W/m²·K), 범위 슬라이더 포함
- A: 전열 면적 (m²)
- Ts: 표면 온도 (°C)
- Tinf: 유체 온도 (°C)

출력값:
- ΔT = Ts - Tinf
- q = h × ΔT (열유속, W/m²)
- Q = h × A × ΔT (총 열전달량, W)

실시간 계산, 입력 왼쪽/결과 오른쪽 레이아웃,
Tailwind CSS 다크 테마, 결과에 색상 코딩."`;

  const codeSnippet = `const results = useMemo(() => {
  const deltaT = Ts - Tinf;
  const q = h * deltaT;        // 열유속 [W/m²]
  const Q = h * A * deltaT;    // 총 열전달량 [W]
  return { deltaT, q, Q };
}, [h, A, Ts, Tinf]);`;

  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-medium mb-4">
            Interactive Demo
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            직접 사용해보세요 — 뉴턴 냉각법칙 계산기
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            이 계산기는 AI가 만든 실제 코드입니다. 값을 바꿔보세요.
          </p>
        </motion.div>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-slate-900/80 border border-orange-500/20 overflow-hidden mb-8"
        >
          {/* Browser chrome */}
          <div className="bg-slate-800 border-b border-slate-700 px-4 py-2.5 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 bg-slate-700/60 rounded text-xs text-gray-500 px-3 py-1 text-center font-mono">
              localhost:3000/newton-cooling
            </div>
          </div>

          {/* Calculator body */}
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Inputs */}
              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-orange-300 uppercase tracking-wider mb-4">
                  입력 파라미터
                </h3>
                {inputs.map((input, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <label className="text-sm font-medium text-gray-300">
                        {input.label}
                      </label>
                      <span className="text-xs text-gray-500">{input.unit}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={input.min}
                        max={input.max}
                        step={input.step}
                        value={input.value}
                        onChange={(e) => input.set(Number(e.target.value))}
                        className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                      />
                      <input
                        type="number"
                        min={input.min}
                        max={input.max}
                        step={input.step}
                        value={input.value}
                        onChange={(e) => input.set(Number(e.target.value))}
                        className="w-24 bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-orange-300 font-mono text-right focus:outline-none focus:border-orange-500/50"
                      />
                    </div>
                    <p className="text-[11px] text-gray-500">{input.desc}</p>
                  </div>
                ))}

                {/* Formula display */}
                <div className="mt-6 bg-slate-800/80 border border-slate-700 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-2">적용 공식</div>
                  <div className="text-sm font-mono text-amber-300">
                    Q = h × A × (T<sub>s</sub> − T<sub>∞</sub>)
                  </div>
                  <div className="text-sm font-mono text-amber-300/70 mt-1">
                    Q = {h} × {A} × ({Ts} − {Tinf})
                  </div>
                </div>
              </div>

              {/* Right: Results */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-orange-300 uppercase tracking-wider mb-4">
                  계산 결과
                </h3>

                {resultCards.map((card, i) => {
                  const c = colorClasses[card.color];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`${c.bg} border ${c.border} rounded-xl p-4`}
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-xs text-gray-400">{card.label}</span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {card.formula}
                        </span>
                      </div>
                      <div className={`text-2xl font-bold ${c.text} font-mono`}>
                        {card.value.toLocaleString("ko-KR", {
                          maximumFractionDigits: 2,
                        })}
                        <span className="text-sm ml-1 opacity-70">{card.unit}</span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Bar visualization */}
                <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 mt-4">
                  <div className="text-xs text-gray-500 mb-3">온도 & 열전달 시각화</div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                        <span>ΔT</span>
                        <span>{results.deltaT}°C</span>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-amber-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min(Math.abs(results.deltaT) / 500 * 100, 100)}%`,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                        <span>q (열유속)</span>
                        <span>{results.q.toLocaleString()} W/m²</span>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-orange-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min(Math.abs(results.q) / 100000 * 100, 100)}%`,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                        <span>Q (총 열전달)</span>
                        <span>{results.Q.toLocaleString()} W</span>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-red-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min(Math.abs(results.Q) / maxQ * 100, 100)}%`,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Temperature bar */}
                  <div className="mt-4 pt-3 border-t border-slate-700">
                    <div className="text-[11px] text-gray-500 mb-2">온도 위치</div>
                    <div className="relative h-6 bg-gradient-to-r from-blue-600 via-yellow-500 to-red-600 rounded-full">
                      <div
                        className="absolute top-0 h-6 flex items-center"
                        style={{
                          left: `${Math.min(Math.max((Tinf + 50) / 550 * 100, 0), 100)}%`,
                        }}
                      >
                        <div className="w-0.5 h-6 bg-white/80" />
                        <span className="text-[9px] text-white ml-1 whitespace-nowrap">
                          T∞={Tinf}°C
                        </span>
                      </div>
                      <div
                        className="absolute top-0 h-6 flex items-center"
                        style={{
                          left: `${Math.min(Math.max((Ts + 50) / 550 * 100, 0), 100)}%`,
                        }}
                      >
                        <div className="w-0.5 h-6 bg-white/80" />
                        <span className="text-[9px] text-white ml-1 whitespace-nowrap">
                          Tₛ={Ts}°C
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {results.deltaT < 0 && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-xs text-blue-300">
                    ΔT &lt; 0 → 열이 유체에서 표면으로 흐릅니다 (냉각이 아닌 가열)
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Below calculator: prompt, code, extensions */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Prompt used */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl bg-slate-900/80 border border-orange-500/20 p-5"
          >
            <h4
              className="text-sm font-semibold text-orange-300 mb-3 cursor-pointer flex items-center justify-between"
              onClick={() => setShowPrompt(!showPrompt)}
            >
              이 계산기를 만든 프롬프트
              <span className="text-orange-500 text-xs">
                {showPrompt ? "접기 ▲" : "펼치기 ▼"}
              </span>
            </h4>
            {showPrompt && (
              <motion.pre
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-[11px] text-gray-400 bg-slate-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed"
              >
                {promptText}
              </motion.pre>
            )}
            {!showPrompt && (
              <p className="text-xs text-gray-500">
                클릭하면 AI에게 보낸 실제 프롬프트를 볼 수 있습니다.
              </p>
            )}
          </motion.div>

          {/* Code snippet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-xl bg-slate-900/80 border border-orange-500/20 p-5"
          >
            <h4
              className="text-sm font-semibold text-orange-300 mb-3 cursor-pointer flex items-center justify-between"
              onClick={() => setShowCode(!showCode)}
            >
              AI가 생성한 코드 (핵심부분)
              <span className="text-orange-500 text-xs">
                {showCode ? "접기 ▲" : "펼치기 ▼"}
              </span>
            </h4>
            {showCode && (
              <motion.pre
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-[11px] text-green-300 bg-slate-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed"
              >
                {codeSnippet}
              </motion.pre>
            )}
            {!showCode && (
              <p className="text-xs text-gray-500">
                클릭하면 핵심 계산 로직 코드를 볼 수 있습니다.
              </p>
            )}
          </motion.div>

          {/* Extension ideas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-xl bg-slate-900/80 border border-orange-500/20 p-5"
          >
            <h4 className="text-sm font-semibold text-orange-300 mb-3">
              확장 아이디어
            </h4>
            <div className="space-y-3">
              {extensionIdeas.map((idea, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-sm mt-0.5">{idea.icon}</span>
                  <div>
                    <div className="text-xs font-medium text-gray-300">
                      {idea.title}
                    </div>
                    <div className="text-[11px] text-gray-500">{idea.desc}</div>
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

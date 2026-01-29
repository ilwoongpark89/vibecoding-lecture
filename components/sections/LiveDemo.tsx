"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ── types ── */
interface DemoStep {
  type: "user" | "ai" | "result";
  text: string;
  code?: string;
  /** which preview phase to show after this step finishes */
  previewPhase?: number;
}

/* ── demo script ── */
const demoSteps: DemoStep[] = [
  {
    type: "user",
    text: "뉴턴의 냉각 법칙으로 열유속을 계산하는 웹 계산기를 만들어줘. h, A, ΔT를 입력하면 q를 계산해줘.",
    previewPhase: 0,
  },
  {
    type: "ai",
    text: "네, q = h × A × ΔT 기반 계산기를 만들겠습니다. 입력 폼과 결과 표시를 포함한 페이지를 생성합니다.",
  },
  {
    type: "ai",
    text: "heat-calculator.tsx 파일을 생성합니다...",
    code: `const q = h * A * deltaT;  // W`,
    previewPhase: 1,
  },
  {
    type: "result",
    text: "계산기가 완성되었습니다! 오른쪽 프리뷰를 확인하세요.",
    previewPhase: 1,
  },
  {
    type: "user",
    text: "h를 슬라이더로 바꿀 수 있게 하고, h에 따른 q 변화를 차트로 보여줘.",
    previewPhase: 1,
  },
  {
    type: "ai",
    text: "range 슬라이더와 실시간 바 차트를 추가합니다.",
    previewPhase: 2,
  },
  {
    type: "result",
    text: "완성! 슬라이더를 움직이면 차트가 실시간으로 변합니다.",
    previewPhase: 2,
  },
];

/* ── typing effect ── */
function TypingText({ text, speed = 25, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);
  useEffect(() => {
    setDisplayed("");
    idx.current = 0;
    const iv = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1));
        idx.current++;
      } else {
        clearInterval(iv);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);
  return <>{displayed}<span className="animate-pulse">|</span></>;
}

/* ── live preview ── */
function PreviewPanel({ phase }: { phase: number }) {
  const [h, setH] = useState(100);
  const [A, setA] = useState(0.5);
  const [dT, setDT] = useState(50);
  const q = h * A * dT;

  // bar chart data — q at different h values
  const chartPoints = [50, 200, 400, 600, 800, 1000];
  const maxQ = 1000 * A * dT;

  if (phase === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
          <p className="text-sm">AI가 코드를 생성하면<br/>여기에 결과가 표시됩니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 h-full overflow-y-auto">
      {/* Title */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h4 className="text-base font-bold text-white mb-1">열유속 계산기</h4>
        <p className="text-xs text-gray-500 mb-4">Newton&apos;s Law of Cooling: q = h × A × ΔT</p>
      </motion.div>

      {/* Inputs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="space-y-3 mb-5"
      >
        <div>
          <label className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>열전달 계수 h (W/m²·K)</span>
            <span className="text-emerald-400 font-mono">{h}</span>
          </label>
          {phase >= 2 ? (
            <input
              type="range"
              min={10}
              max={1000}
              value={h}
              onChange={(e) => setH(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none bg-slate-700 accent-emerald-500 cursor-pointer"
            />
          ) : (
            <input
              type="number"
              value={h}
              onChange={(e) => setH(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-sm focus:border-emerald-500 focus:outline-none"
            />
          )}
        </div>
        <div>
          <label className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>면적 A (m²)</span>
            <span className="text-emerald-400 font-mono">{A}</span>
          </label>
          <input
            type="number"
            step={0.1}
            value={A}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-sm focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>온도차 ΔT (K)</span>
            <span className="text-emerald-400 font-mono">{dT}</span>
          </label>
          <input
            type="number"
            value={dT}
            onChange={(e) => setDT(Number(e.target.value))}
            className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-sm focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </motion.div>

      {/* Result */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 mb-5"
      >
        <p className="text-xs text-gray-400 mb-1">계산 결과</p>
        <p className="text-2xl font-bold text-emerald-400 font-mono">
          q = {q.toLocaleString(undefined, { maximumFractionDigits: 1 })} W
        </p>
        <p className="text-xs text-gray-500 mt-1">= {h} × {A} × {dT}</p>
      </motion.div>

      {/* Chart (phase 2) */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs text-gray-400 mb-3">h에 따른 q 변화</p>
            <div className="flex items-end gap-2" style={{ height: 112 }}>
              {chartPoints.map((hVal) => {
                const qVal = hVal * A * dT;
                const barH = maxQ > 0 ? Math.round((qVal / maxQ) * 100) : 0;
                const isActive = Math.abs(hVal - h) < 100;
                return (
                  <div key={hVal} className="flex-1 flex flex-col items-center justify-end h-full">
                    <span className={`text-[9px] font-mono mb-1 ${isActive ? "text-emerald-400" : "text-gray-600"}`}>
                      {Math.round(qVal).toLocaleString()}
                    </span>
                    <motion.div
                      className={`w-full rounded-t-md ${isActive ? "bg-emerald-500" : "bg-slate-600"}`}
                      animate={{ height: barH }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{ minHeight: 4 }}
                    />
                    <span className={`text-[9px] font-mono mt-1 ${isActive ? "text-emerald-400" : "text-gray-600"}`}>{hVal}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-gray-600 text-center mt-1">h (W/m²·K)</p>

            {/* Current marker */}
            <div className="mt-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
              <span className="text-[10px] text-gray-400">현재 h = {h} → q = {q.toLocaleString(undefined, { maximumFractionDigits: 1 })} W</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── main ── */
export default function LiveDemo() {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [previewPhase, setPreviewPhase] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const advance = () => {
    if (visibleSteps < demoSteps.length) {
      setIsTyping(true);
      const next = visibleSteps; // index about to become visible
      setVisibleSteps((v) => v + 1);
      // update preview when step has a phase (after typing finishes we'll set it)
      const step = demoSteps[next];
      if (step.previewPhase !== undefined) {
        // slight delay so preview updates after typing starts
        setTimeout(() => setPreviewPhase(step.previewPhase!), 400);
      }
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [visibleSteps, isTyping]);

  return (
    <section id="live-demo" className="relative py-24 bg-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl translate-x-1/2" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            Live Demo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            바이브코딩 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">실전 데모</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            열전달 계산기를 대화만으로 만드는 과정을 확인해보세요.
          </p>
        </motion.div>

        {/* Two-panel layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-4"
        >
          {/* ─── Left: Terminal ─── */}
          <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col">
            <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-4 text-sm text-gray-400 font-mono">claude — ~/heat-calculator</span>
            </div>
            <div className="bg-slate-950 p-5 flex-1 min-h-[420px] max-h-[500px] overflow-y-auto space-y-4">
              {!started ? (
                <div className="flex items-center justify-center h-[380px]">
                  <motion.button
                    onClick={() => { setStarted(true); advance(); }}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg shadow-emerald-500/25 hover:scale-105"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      데모 시작하기
                    </span>
                  </motion.button>
                </div>
              ) : (
                <>
                  <AnimatePresence>
                    {demoSteps.slice(0, visibleSteps).map((step, i) => {
                      const isLast = i === visibleSteps - 1;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {step.type === "user" && (
                            <div className="flex gap-3">
                              <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center text-white text-xs font-bold">U</span>
                              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-4 py-3 text-cyan-100 text-sm max-w-[90%]">
                                {isLast && isTyping ? <TypingText text={step.text} speed={20} onDone={() => setIsTyping(false)} /> : step.text}
                              </div>
                            </div>
                          )}
                          {step.type === "ai" && (
                            <div className="flex gap-3">
                              <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center text-white text-xs font-bold">AI</span>
                              <div className="max-w-[90%]">
                                <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl px-4 py-3 text-gray-300 text-sm">
                                  {isLast && isTyping ? <TypingText text={step.text} speed={15} onDone={() => setIsTyping(false)} /> : step.text}
                                </div>
                                {step.code && (!isLast || !isTyping) && (
                                  <motion.pre
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    transition={{ duration: 0.5 }}
                                    className="mt-2 p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-gray-400 overflow-x-auto font-mono"
                                  >
                                    {step.code}
                                  </motion.pre>
                                )}
                              </div>
                            </div>
                          )}
                          {step.type === "result" && (
                            <div className="flex gap-3">
                              <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">✓</span>
                              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 text-emerald-300 text-sm font-medium max-w-[90%]">
                                {isLast && isTyping ? <TypingText text={step.text} speed={20} onDone={() => setIsTyping(false)} /> : step.text}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  <div ref={bottomRef} />
                </>
              )}
            </div>
            {started && (
              <div className="bg-slate-900 border-t border-slate-700 px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {visibleSteps} / {demoSteps.length} 단계
                </span>
                {visibleSteps < demoSteps.length ? (
                  <button
                    onClick={advance}
                    disabled={isTyping}
                    className="px-4 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 transition-colors disabled:opacity-40"
                  >
                    다음 단계 →
                  </button>
                ) : (
                  <span className="text-xs text-emerald-400 font-medium">데모 완료!</span>
                )}
              </div>
            )}
          </div>

          {/* ─── Right: Live Preview ─── */}
          <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col">
            {/* Browser chrome */}
            <div className="bg-slate-800 px-4 py-3 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-slate-700 rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                  <span className="text-xs text-gray-400">localhost:3000/heat-calculator</span>
                </div>
              </div>
            </div>
            {/* Preview content */}
            <div className="bg-slate-950 flex-1 min-h-[420px]">
              <PreviewPanel phase={previewPhase} />
            </div>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          왼쪽에서 AI와 대화하면 오른쪽에서 실시간으로 결과가 나타납니다. 프리뷰의 입력값을 직접 바꿔보세요!
        </motion.p>
      </div>
    </section>
  );
}

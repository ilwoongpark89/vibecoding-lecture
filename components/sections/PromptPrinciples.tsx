"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const principles = [
  {
    num: 1,
    title: "맥락 (Context)",
    desc: "AI에게 당신이 누구이고 어떤 상황인지 알려줘라",
    bad: "열전달 계수 구해줘",
    good: "나는 기계공학 3학년이고 열전달 과제를 하고 있어. 강제 대류 조건에서 원관 내부의 열전달 계수를 구해야 해.",
    why: "맥락이 없으면 AI는 건축, 화학공학, 기계공학 중 어떤 분야인지 모른다. 학년 수준을 알면 설명의 깊이도 조절된다.",
    color: "from-blue-500 to-cyan-500",
    icon: "🎯",
  },
  {
    num: 2,
    title: "구체성 (Specificity)",
    desc: "숫자, 조건, 물질, 공식을 명확히 제시하라",
    bad: "열전달 계수 구해줘",
    good: "내경 50mm 원관에 Re=10,000으로 물(80°C)이 흐를 때, Dittus-Boelter 상관식(n=0.4, 가열)으로 Nu와 h를 구해줘.",
    why: "\"열전달 계수\"만으로는 자연대류/강제대류/복사 중 어느 것인지, 어떤 형상인지, 어떤 유체인지 알 수 없다.",
    color: "from-violet-500 to-purple-500",
    icon: "🔍",
  },
  {
    num: 3,
    title: "제약조건 (Constraints)",
    desc: "단위, 가정, 적용범위를 명시하라",
    bad: "복합벽 열전달 계산해줘",
    good: "SI 단위로 계산해줘. 접촉열저항은 무시하고, 대류열저항은 양쪽 모두 포함해줘. 각 상관식의 적용 범위(Re, Pr)도 명시해줘.",
    why: "제약조건이 없으면 AI가 임의로 가정하고, 그 가정이 틀려도 알려주지 않는다. SI/영국단위 혼동은 실제 NASA 사고(MCO)의 원인이었다.",
    color: "from-orange-500 to-amber-500",
    icon: "⚙️",
  },
  {
    num: 4,
    title: "출력형식 (Format)",
    desc: "원하는 답의 형태를 지정하라",
    bad: "카르노 효율 알려줘",
    good: "풀이과정을 단계별로 보여주고, 각 단계에서 사용하는 공식과 대입값을 명시해줘. 최종 답은 박스로 표시하고 유효숫자 3자리로.",
    why: "형식을 지정하지 않으면 때로는 공식만, 때로는 장문의 설명만 나온다. 과제 제출이나 보고서에 바로 쓸 수 있는 형태를 요청하라.",
    color: "from-emerald-500 to-teal-500",
    icon: "📋",
  },
  {
    num: 5,
    title: "검증요청 (Verification)",
    desc: "결과의 물리적 타당성을 확인하게 하라",
    bad: "(검증 없이 결과만 받음)",
    good: "결과가 물리적으로 타당한지 검증해줘. Nu 값이 해당 상관식의 일반적 범위 내인지, 열전달 계수의 크기가 강제 대류 물의 전형적 범위(500~10,000 W/m²·K)에 들어가는지 확인해줘.",
    why: "AI는 계산 실수를 해도 자신있게 답한다. 검증 단계를 요청하면 AI가 스스로 오류를 찾아 수정할 확률이 높아진다.",
    color: "from-rose-500 to-pink-500",
    icon: "✅",
  },
];

export default function PromptPrinciples() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="relative py-24 bg-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
            5 Principles
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            프롬프트 <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">5원칙</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            좋은 프롬프트에는 패턴이 있습니다. 5가지 원칙을 열전달 예시로 배워봅시다.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-5">
          {principles.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl bg-slate-800/50 border border-slate-700 overflow-hidden"
            >
              {/* Header — always visible */}
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full p-6 flex items-center gap-4 text-left hover:bg-slate-800/80 transition-colors"
              >
                <span className="text-3xl">{p.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${p.color} text-white`}>
                      원칙 {p.num}
                    </span>
                    <h3 className="text-lg font-bold text-white">{p.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{p.desc}</p>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${expanded === i ? "rotate-90" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Detail — expandable */}
              {expanded === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Bad */}
                    <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">✗ 나쁜 프롬프트</span>
                      </div>
                      <p className="text-sm text-red-300/80 font-mono">&ldquo;{p.bad}&rdquo;</p>
                    </div>
                    {/* Good */}
                    <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">✓ 좋은 프롬프트</span>
                      </div>
                      <p className="text-sm text-emerald-300/80 font-mono">&ldquo;{p.good}&rdquo;</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-900 border border-slate-700 p-4">
                    <p className="text-xs text-amber-400 font-medium mb-1">왜 중요한가?</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{p.why}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

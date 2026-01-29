"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const conceptCards = [
  {
    icon: "🔤",
    title: "토큰화",
    subtitle: "Tokenization",
    desc: "텍스트를 작은 단위(토큰)로 분해합니다.",
    example: {
      input: '"열전달 계수"',
      output: '["열", "전달", " 계", "수"]',
    },
    note: "한국어는 영어보다 더 많은 토큰을 소모합니다.",
    color: "cyan",
  },
  {
    icon: "🎯",
    title: "다음 토큰 예측",
    subtitle: "Next Token Prediction",
    desc: "이전 토큰들을 보고 다음에 올 가능성이 가장 높은 토큰을 선택합니다.",
    example: {
      input: '"뉴턴의 냉각 법칙에 의하면 q = h ×"',
      output: '"A" (99.2%)  |  "면적" (0.5%)  |  ...',
    },
    note: "확률 기반으로 가장 그럴듯한 다음 단어를 생성합니다.",
    color: "violet",
  },
  {
    icon: "📐",
    title: "컨텍스트 윈도우",
    subtitle: "Context Window",
    desc: "AI가 한 번에 볼 수 있는 텍스트의 양입니다.",
    example: {
      input: "Claude: ~200K tokens",
      output: "대략 책 1.5권 분량",
    },
    note: "길면 길수록 더 정확한 답변이 가능합니다.",
    color: "amber",
  },
];

const temperatureOutputs: Record<string, string[]> = {
  low: [
    "에너지 보존 법칙이다.",
    "에너지 보존 법칙이다.",
    "에너지 보존 법칙이다.",
  ],
  mid: [
    "에너지 보존 법칙이다.",
    "에너지는 생성되거나 소멸되지 않고 형태만 바뀐다.",
    "열역학적 시스템에서 에너지의 총량은 보존된다.",
  ],
  high: [
    "우주의 에너지 장부는 항상 균형을 이룬다 — 빌려가면 반드시 갚아야 한다.",
    "에너지는 변환될 뿐, 사라지지 않는다. 마치 물이 얼음이 되어도 H₂O인 것처럼.",
    "닫힌 계의 내부 에너지 변화는 계에 가해진 열과 일의 합과 같다: ΔU = Q − W.",
  ],
};

const limitations = [
  {
    icon: "👻",
    title: "할루시네이션",
    subtitle: "Hallucination",
    desc: 'AI가 없는 사실을 자신있게 만들어냅니다.',
    example: '"Fe의 열전도율은 237 W/(m·K)" — 이건 알루미늄(Al) 값입니다!',
    color: "red",
  },
  {
    icon: "📅",
    title: "최신 정보 부재",
    subtitle: "Knowledge Cutoff",
    desc: "학습 데이터 이후의 정보를 알지 못합니다.",
    example: "최신 논문이나 업데이트된 규격을 모를 수 있습니다.",
    color: "orange",
  },
  {
    icon: "🧮",
    title: "수학 계산",
    subtitle: "Math Errors",
    desc: "복잡한 수학을 자체적으로 정확히 계산하지 못할 수 있습니다.",
    example: "적분, 행렬 연산 등에서 오류가 발생할 수 있습니다.",
    color: "yellow",
  },
  {
    icon: "🧠",
    title: "맥락 손실",
    subtitle: "Context Loss",
    desc: "대화가 길어지면 앞부분 내용을 잊을 수 있습니다.",
    example: "긴 대화에서 초반 요구사항이 무시될 수 있습니다.",
    color: "pink",
  },
];

const colorMap: Record<string, { badge: string; border: string; bg: string; text: string; hoverBorder: string }> = {
  cyan: {
    badge: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/5",
    text: "text-cyan-400",
    hoverBorder: "hover:border-cyan-500/30",
  },
  violet: {
    badge: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
    text: "text-violet-400",
    hoverBorder: "hover:border-violet-500/30",
  },
  amber: {
    badge: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    text: "text-amber-400",
    hoverBorder: "hover:border-amber-500/30",
  },
  red: {
    badge: "bg-red-500/10 border-red-500/20 text-red-400",
    border: "border-red-500/30",
    bg: "bg-red-500/5",
    text: "text-red-400",
    hoverBorder: "hover:border-red-500/30",
  },
  orange: {
    badge: "bg-orange-500/10 border-orange-500/20 text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/5",
    text: "text-orange-400",
    hoverBorder: "hover:border-orange-500/30",
  },
  yellow: {
    badge: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/5",
    text: "text-yellow-400",
    hoverBorder: "hover:border-yellow-500/30",
  },
  pink: {
    badge: "bg-pink-500/10 border-pink-500/20 text-pink-400",
    border: "border-pink-500/30",
    bg: "bg-pink-500/5",
    text: "text-pink-400",
    hoverBorder: "hover:border-pink-500/30",
  },
};

function getTemperatureLevel(value: number): string {
  if (value < 0.33) return "low";
  if (value < 0.67) return "mid";
  return "high";
}

export default function HowLLMWorks() {
  const [temperature, setTemperature] = useState(0);

  const level = getTemperatureLevel(temperature);
  const outputs = temperatureOutputs[level];

  return (
    <section id="how-llm-works" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              LLM
            </span>
            은 어떻게 작동하는가?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            바이브코딩의 핵심 도구인{" "}
            <span className="text-cyan-400">Large Language Model</span>의
            작동 원리를 이해합니다.
          </p>
        </motion.div>

        {/* 1. Core Concept Cards */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-6">
            {conceptCards.map((card, i) => {
              const c = colorMap[card.color];
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`p-6 rounded-2xl bg-slate-800/50 border border-slate-700 ${c.hoverBorder} transition-colors`}
                >
                  <span className="text-3xl mb-3 block">{card.icon}</span>
                  <h3 className="text-lg font-bold text-white mb-0.5">
                    {card.title}
                  </h3>
                  <span className={`text-xs font-mono ${c.text}`}>
                    {card.subtitle}
                  </span>
                  <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                    {card.desc}
                  </p>
                  <div className="mt-4 px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700">
                    <p className="text-xs text-gray-500 mb-1">Input</p>
                    <p className={`text-xs font-mono ${c.text}`}>
                      {card.example.input}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 mb-1">Output</p>
                    <p className="text-xs font-mono text-gray-300">
                      {card.example.output}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 italic">
                    {card.note}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. Temperature Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-2">
            Temperature 파라미터 체험
          </h3>
          <p className="text-gray-500 text-center text-sm mb-8">
            슬라이더를 움직여 Temperature에 따른 응답 변화를 확인하세요
          </p>

          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
            {/* Prompt */}
            <div className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 mb-6">
              <p className="text-xs text-gray-500 mb-1">Prompt</p>
              <p className="text-sm font-mono text-cyan-400">
                &ldquo;열역학 제1법칙은&rdquo;
              </p>
            </div>

            {/* Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Temperature</span>
                <span className="text-sm font-mono text-white font-bold">
                  {temperature.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-700 accent-cyan-500"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-cyan-400">0.0 (정확)</span>
                <span className="text-xs text-violet-400">1.0 (창의적)</span>
              </div>
            </div>

            {/* Outputs */}
            <div className="space-y-3">
              {outputs.map((output, i) => (
                <motion.div
                  key={`${level}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex items-start gap-3 px-4 py-3 rounded-lg bg-slate-900 border border-slate-700"
                >
                  <span className="text-xs text-gray-600 font-mono mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-300">{output}</p>
                </motion.div>
              ))}
            </div>

            {/* Explanation */}
            <div className="mt-4 px-4 py-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
              <p className="text-xs text-cyan-400 leading-relaxed">
                {level === "low" &&
                  "Temperature 0: 항상 같은 응답을 생성합니다. 정확성이 중요한 공학 계산에 적합합니다."}
                {level === "mid" &&
                  "Temperature 0.5: 약간의 변형이 있는 응답을 생성합니다. 일반적인 대화에 적합합니다."}
                {level === "high" &&
                  "Temperature 1.0: 다양하고 창의적인 응답을 생성합니다. 브레인스토밍에 적합합니다."}
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              낮은 temperature ={" "}
              <span className="text-cyan-400">정확한 답</span> | 높은
              temperature ={" "}
              <span className="text-violet-400">창의적 답</span>
            </p>
          </div>
        </motion.div>

        {/* 3. Limitations */}
        <div className="max-w-5xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              AI의{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                한계
              </span>
            </h3>
            <p className="text-gray-500 text-sm">
              도구를 잘 쓰려면 한계를 먼저 알아야 합니다
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {limitations.map((item, i) => {
              const c = colorMap[item.color];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`p-5 rounded-2xl bg-slate-800/50 border border-slate-700 ${c.hoverBorder} transition-colors`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {item.title}
                      </h4>
                      <span className={`text-[10px] font-mono ${c.text}`}>
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-3 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className={`px-3 py-2 rounded-lg ${c.bg} border ${c.border}`}>
                    <p className={`text-xs ${c.text} leading-relaxed`}>
                      {item.example}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 4. Bottom Insight Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/5 border border-cyan-500/20 text-center"
        >
          <p className="text-lg md:text-xl text-white leading-relaxed font-medium">
            AI는{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-bold">
              &lsquo;이해&rsquo;
            </span>
            하는 것이 아니라{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-bold">
              &lsquo;패턴 매칭&rsquo;
            </span>
            한다.
          </p>
          <p className="text-gray-400 mt-4 leading-relaxed text-sm max-w-2xl mx-auto">
            열역학 제2법칙을 &lsquo;알고&rsquo; 있는 것이 아니라, 수조 개의
            문서에서 그 패턴을 학습했을 뿐이다.
            <br />
            그래서 여러분의{" "}
            <span className="text-cyan-400 font-medium">
              도메인 지식으로 검증하는 것이 필수적
            </span>
            이다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const findings = [
  {
    title: "\"Let's think step by step\"",
    source: "Kojima et al., 2022 (Google Brain)",
    before: 17.9,
    after: 78.7,
    desc: "이 한 문장을 추가하면 수학 문제 정답률이 급상승. Zero-shot Chain-of-Thought의 시작.",
  },
  {
    title: "\"Take a deep breath and work on this problem step-by-step\"",
    source: "Yang et al., 2023 (Google DeepMind)",
    before: 62.1,
    after: 80.3,
    desc: "Google DeepMind가 자동으로 발견한 최적 프롬프트. GPT-4에서 수학 정확도 최고치 달성.",
  },
  {
    title: "\"You are an expert in [field]\"",
    source: "Role Prompting Research, 2023",
    before: 55,
    after: 78,
    desc: "역할을 부여하면 전문 분야 정확도가 15-30% 향상. 도메인 전문성 활성화.",
  },
];

const magicPrompts = [
  { text: "Let's think step by step", effect: "단계적 사고 유도 → 논리적 정확도 향상" },
  { text: "Take a deep breath and work on this problem step-by-step", effect: "DeepMind 발견 최적 프롬프트" },
  { text: "You are an expert [ME professor] with 20 years of experience", effect: "도메인 전문성 활성화" },
  { text: "Show your reasoning before giving the final answer", effect: "추론 과정 명시 → 검증 가능" },
  { text: "Double-check your calculation and verify the units", effect: "공학 계산 오류 방지" },
];

export default function GoogleDeepMindPrompt() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4">
            Week 3 — Prompt Engineering
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Google DeepMind의 프롬프트 연구:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              단순한 한마디가 성능을 바꾼다
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            프롬프트에 한 문장을 추가하는 것만으로 AI의 정확도가 수십 퍼센트 상승합니다
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Research findings with before/after bars */}
          {findings.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl bg-slate-800/60 border border-slate-700 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">{f.source}</p>
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400">{f.desc}</p>
                </div>
                {/* Before/After bar chart */}
                <div className="w-full md:w-56 flex-shrink-0">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-gray-500">Before</span>
                        <span className="text-gray-400">{f.before}%</span>
                      </div>
                      <div className="h-5 bg-slate-900 rounded overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${f.before}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full bg-slate-600 rounded"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-violet-400">After</span>
                        <span className="text-violet-300 font-bold">{f.after}%</span>
                      </div>
                      <div className="h-5 bg-slate-900 rounded overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${f.after}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded"
                        />
                      </div>
                    </div>
                    <p className="text-center text-xs text-cyan-400 font-bold">
                      +{(f.after - f.before).toFixed(1)}%p 향상
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Magic prompts cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-slate-800/60 border border-slate-700 p-6"
          >
            <h3 className="text-sm font-bold text-violet-400 mb-6 text-center">
              마법의 문장들 — 바로 쓸 수 있는 5개 프롬프트 부스터
            </h3>
            <div className="space-y-3">
              {magicPrompts.map((mp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4 items-start p-4 rounded-lg bg-slate-900/80 border border-slate-700"
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-white font-mono bg-slate-800 rounded px-2 py-1 inline-block mb-1">
                      &quot;{mp.text}&quot;
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{mp.effect}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center p-8 mt-12 rounded-2xl bg-gradient-to-br from-violet-500/5 to-cyan-500/5 border border-violet-500/20"
        >
          <p className="text-gray-300 leading-relaxed mb-4">
            <span className="text-violet-400 font-semibold">
              프롬프트 엔지니어링은 &ldquo;AI에게 잘 말하는 기술&rdquo;입니다.
            </span>
            <br />
            단 한 문장이 정답률을 17%에서 78%로 바꿀 수 있다는 것이 과학적으로 증명되었습니다.
          </p>
          <p className="text-xs text-gray-500">
            참고: Kojima et al. 2022 (Google Brain) · Yang et al. 2023 (Google DeepMind) · Wei et al. 2022 (Chain-of-Thought)
          </p>
        </motion.div>
      </div>
    </section>
  );
}

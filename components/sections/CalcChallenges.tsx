"use client";

import { motion } from "framer-motion";

const challenges = [
  {
    title: "카르노 효율 계산기",
    difficulty: "★☆☆",
    description:
      "고온원·저온원 온도 입력 → 최대 효율, 일, 방출열 계산. 실제 발전소 효율과 비교.",
    hint: "η_Carnot = 1 − T_L / T_H (절대온도 사용!)",
    color: "emerald",
  },
  {
    title: "핀(Fin) 효율 계산기",
    difficulty: "★★☆",
    description:
      "핀 형상, 재질, 대류조건 입력 → 핀 효율, 유효도, 열전달량. 핀 온도 분포 그래프.",
    hint: "m = √(hP / kA_c),  η_fin = tanh(mL) / (mL)",
    color: "orange",
  },
  {
    title: "배관 압력강하 계산기",
    difficulty: "★★☆",
    description:
      "Darcy-Weisbach로 직관 압력강하 + 부차적 손실. 배관 네트워크 시각화.",
    hint: "ΔP = f × (L/D) × (ρV²/2) + Σ K_i × (ρV²/2)",
    color: "cyan",
  },
  {
    title: "열교환기 설계 도구",
    difficulty: "★★★",
    description:
      "LMTD법으로 향류/병류 열교환기 전열면적 계산. 온도 프로필 그래프.",
    hint: "Q = U × A × ΔT_lm,  ΔT_lm = (ΔT₁ − ΔT₂) / ln(ΔT₁/ΔT₂)",
    color: "violet",
  },
];

const colorMap: Record<string, { border: string; badge: string; hintBg: string; hintText: string }> = {
  emerald: {
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-300",
    hintBg: "bg-emerald-500/10 border-emerald-500/20",
    hintText: "text-emerald-300",
  },
  orange: {
    border: "border-orange-500/30",
    badge: "bg-orange-500/20 text-orange-300",
    hintBg: "bg-orange-500/10 border-orange-500/20",
    hintText: "text-orange-300",
  },
  cyan: {
    border: "border-cyan-500/30",
    badge: "bg-cyan-500/20 text-cyan-300",
    hintBg: "bg-cyan-500/10 border-cyan-500/20",
    hintText: "text-cyan-300",
  },
  violet: {
    border: "border-violet-500/30",
    badge: "bg-violet-500/20 text-violet-300",
    hintBg: "bg-violet-500/10 border-violet-500/20",
    hintText: "text-violet-300",
  },
};

export default function CalcChallenges() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-medium mb-4">
            Challenges
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">도전 과제</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {challenges.map((c, i) => {
            const colors = colorMap[c.color];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl bg-slate-800/60 border ${colors.border} p-6 space-y-4`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-white">{c.title}</h3>
                  <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${colors.badge}`}>
                    {c.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{c.description}</p>
                <div className={`rounded-lg border ${colors.hintBg} p-3`}>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">
                    힌트 — 프롬프트에 포함할 핵심 수식
                  </div>
                  <code className={`text-xs font-mono ${colors.hintText}`}>{c.hint}</code>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="bg-slate-800/40 border border-orange-500/20 rounded-2xl p-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              핵심은{" "}
              <span className="text-orange-300 font-semibold">물리 법칙을 정확히 아는 것</span>
              입니다.
              <br />
              AI는 코드를 만들지만, 어떤 공식을 쓸지 결정하는 건{" "}
              <span className="text-white font-semibold">여러분</span>입니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

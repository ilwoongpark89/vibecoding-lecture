"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: 1,
    title: "프로젝트 시작",
    desc: "프로젝트 폴더를 만들고 Git을 초기화합니다.",
    code: 'mkdir heat-calculator && cd heat-calculator\ngit init\ngit add . && git commit -m "프로젝트 초기화"',
  },
  {
    num: 2,
    title: "AI에게 기능 요청",
    desc: "Claude에게 원하는 기능을 프롬프트로 요청합니다.",
    code: '> claude "열전달 계산기 만들어줘.\n  뉴턴 냉각법칙 기반, SI 단위, Next.js"',
  },
  {
    num: 3,
    title: "결과 확인 & 커밋",
    desc: "AI가 생성한 코드를 테스트하고, 잘 작동하면 커밋합니다.",
    code: 'npm run dev          # 브라우저에서 확인\ngit add . && git commit -m "열전달 계산기 구현"',
  },
  {
    num: 4,
    title: "추가 기능 요청",
    desc: "새 기능을 요청합니다. 문제 발생 시 이전 커밋으로 롤백합니다.",
    code: '> claude "차트 추가해줘"\n\n# 문제 발생 시\ngit checkout HEAD~1   # 이전 커밋으로 롤백',
  },
  {
    num: 5,
    title: "완성 & 배포",
    desc: "GitHub에 push하면 Vercel이 자동으로 배포합니다.",
    code: "git push origin main\n# → Vercel 자동 배포 완료!",
  },
];

export default function GitWorkflow() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 mb-4">
            Workflow
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">바이브코딩 Git 워크플로우</h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/50 to-emerald-500/50 hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6"
              >
                {/* Number circle */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
                  {step.num}
                </div>

                {/* Content */}
                <div className="flex-1 bg-slate-800/60 rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{step.desc}</p>
                  <div className="bg-slate-900 rounded-xl p-4">
                    <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap">{step.code}</pre>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Golden rule tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⭐</span>
              <div>
                <h4 className="text-amber-400 font-bold mb-2">황금률</h4>
                <p className="text-gray-300 leading-relaxed">
                  AI에게 새로운 요청을 하기 전에 반드시 커밋하세요. 그래야 문제가 생겨도 되돌릴 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

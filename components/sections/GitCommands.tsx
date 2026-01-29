"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const commands = [
  {
    name: "git init",
    desc: "새 저장소 만들기",
    detail: "프로젝트 폴더에서 Git 추적을 시작합니다.",
    example: "mkdir heat-calculator && cd heat-calculator && git init",
    analogy: "새 공책을 꺼내는 것",
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "git add",
    desc: "변경사항 스테이징",
    detail: "저장할 파일을 선택합니다.",
    example: "git add .          # 전체\ngit add page.tsx   # 특정 파일",
    analogy: "시험 답안지에 최종 답을 옮겨 적기 전, 연습장에서 확인하는 것",
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "git commit",
    desc: "변경사항 저장",
    detail: "현재 상태를 스냅샷으로 찍습니다.",
    example: 'git commit -m "뉴턴 냉각법칙 계산기 추가"',
    analogy: "게임 세이브 포인트. 언제든 이 시점으로 돌아올 수 있음",
    color: "from-violet-500 to-purple-500",
  },
  {
    name: "git log",
    desc: "이력 확인",
    detail: "지금까지의 모든 세이브 포인트를 봅니다.",
    example: "git log --oneline",
    output: "a1b2c3d 뉴턴 냉각법칙 계산기 추가\ne4f5g6h 프로젝트 초기화",
    analogy: "",
    color: "from-amber-500 to-orange-500",
  },
  {
    name: "git checkout",
    desc: "이전 버전으로 이동",
    detail: "세이브 포인트를 불러옵니다. (참고: Git 2.23+에서는 git switch와 git restore가 checkout의 역할을 분리하여 대체합니다. 브랜치 전환은 git switch, 파일 복구는 git restore를 권장합니다.)",
    example: "git checkout a1b2c3d\n# 또는 (Git 2.23+)\ngit switch --detach a1b2c3d",
    analogy: "과거를 구경만 하는 것. 수정하려면 branch를 만들어야 함",
    color: "from-rose-500 to-pink-500",
  },
  {
    name: "git branch / git switch",
    desc: "분기 만들기",
    detail: "평행 우주를 만드는 것.",
    example: "git branch chart-experiment && git switch chart-experiment",
    analogy: "실험을 해보되, 원본은 그대로 두는 것",
    color: "from-indigo-500 to-violet-500",
  },
  {
    name: "git push",
    desc: "원격 저장소에 업로드",
    detail: "내 컴퓨터 → GitHub 클라우드",
    example: "git push origin main",
    analogy: "로컬 세이브 → 클라우드 세이브",
    color: "from-emerald-500 to-cyan-500",
  },
];

export default function GitCommands() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 mb-4">
            Essential Commands
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Git 핵심 명령어 7가지</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {commands.map((cmd, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full text-left bg-slate-800/60 rounded-2xl p-5 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className={`inline-block px-3 py-1 rounded-lg bg-gradient-to-r ${cmd.color} text-white text-sm font-mono font-bold whitespace-nowrap`}>
                    {cmd.name}
                  </span>
                  <span className="text-gray-300 text-sm">{cmd.desc}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 ml-auto transition-transform ${expanded === i ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {expanded === i && (
                  <div className="mt-4 space-y-3" onClick={(e) => e.stopPropagation()}>
                    <p className="text-gray-400 text-sm">{cmd.detail}</p>
                    <div className="bg-slate-900 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-2">예시</p>
                      <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap">{cmd.example}</pre>
                      {cmd.output && (
                        <>
                          <p className="text-xs text-gray-500 mt-3 mb-2">출력 예시</p>
                          <pre className="text-gray-400 font-mono text-sm whitespace-pre-wrap">{cmd.output}</pre>
                        </>
                      )}
                    </div>
                    {cmd.analogy && (
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-amber-400 mt-0.5">💡</span>
                        <p className="text-gray-400">
                          <span className="text-gray-500 font-medium">비유:</span> {cmd.analogy}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

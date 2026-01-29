"use client";

import { motion } from "framer-motion";

const mistakes = [
  {
    num: 1,
    title: "커밋 안 하고 AI에게 새 요청",
    situation: {
      description:
        '열전달 계산기가 잘 동작하는 상태에서 커밋을 안 하고 바로 "차트 추가해줘"라고 요청했다.',
      terminal:
        '> claude "차트 기능 추가해줘"\n\n✓ Modified calculator.js\n✓ Created chart.js\n\n# 계산이 깨졌다!\n# 그런데 원래 코드가 어디에도 없다...\n# Ctrl+Z도 안 먹힌다... 😱',
    },
    solution: {
      description:
        "예방법이 유일한 해결법입니다. AI에게 요청하기 전에 반드시 커밋하세요. 이것이 '황금률'입니다.",
      terminal:
        '# ✅ 올바른 순서:\ngit add .\ngit commit -m "열전달 계산기 완성"\n\n# 그 다음에 AI에게 요청:\n> claude "차트 기능 추가해줘"\n\n# 문제 생기면:\ngit checkout .    # 복구 완료!',
      note: "황금률: AI 요청 전에 반드시 커밋. 이것만 지키면 어떤 실수도 복구할 수 있습니다.",
    },
  },
  {
    num: 2,
    title: "커밋 메시지를 잘못 씀",
    situation: {
      description:
        '커밋을 했는데 메시지에 오타가 있거나 내용이 잘못되었다. "열전닫 계산기" 라고 써버렸다.',
      terminal:
        'git commit -m "열전닫 계산기 추가"\n\n[main a1b2c3d] 열전닫 계산기 추가\n 3 files changed\n\n# 아... 오타다 😅',
    },
    solution: {
      description:
        "git commit --amend로 마지막 커밋 메시지를 수정할 수 있습니다. 코드는 그대로, 메시지만 바뀝니다.",
      terminal:
        'git commit --amend -m "열전달 계산기 추가"\n\n[main b2c3d4e] 열전달 계산기 추가\n Date: ...\n 3 files changed',
      note: "--amend는 '마지막 커밋을 고친다'는 뜻입니다. 아직 push 하지 않은 커밋만 수정하세요.",
    },
  },
  {
    num: 3,
    title: "잘못된 파일을 커밋함 (.env, node_modules)",
    situation: {
      description:
        "git add .로 모든 파일을 추가했는데, API 키가 들어있는 .env 파일이나 거대한 node_modules 폴더까지 커밋되어 버렸다.",
      terminal:
        'git add .\ngit commit -m "프로젝트 완성"\n\n# GitHub에 push 했더니...\n# .env에 있던 API 키가 전 세계에 공개됨 💀\n# node_modules 50,000개 파일이 올라감',
    },
    solution: {
      description:
        ".gitignore 파일을 만들어서 Git이 무시할 파일/폴더를 지정합니다. 프로젝트 시작할 때 반드시 만드세요.",
      terminal:
        '# .gitignore 파일 만들기\necho "node_modules/" >> .gitignore\necho ".env" >> .gitignore\necho ".env.local" >> .gitignore\n\n# 이미 커밋한 파일 추적 해제\ngit rm --cached .env\ngit rm -r --cached node_modules/\ngit commit -m ".gitignore 추가, 민감파일 제거"',
      note: ".gitignore는 프로젝트의 '출입금지 목록'입니다. Claude Code로 프로젝트를 시작하면 보통 자동으로 만들어줍니다.",
    },
  },
  {
    num: 4,
    title: "마지막 커밋을 취소하고 싶음",
    situation: {
      description:
        "커밋을 했는데, 아직 테스트를 안 한 상태에서 성급하게 커밋해버렸다. 돌리고 싶다.",
      terminal:
        'git commit -m "새 기능 추가"\n\n# 어... 근데 이거 아직 테스트 안 했는데\n# 버그가 있을 수도 있어\n# 커밋을 취소하고 싶다',
    },
    solution: {
      description:
        "git reset HEAD~1로 마지막 커밋을 취소합니다. 코드는 그대로 유지되고, 커밋만 사라집니다.",
      terminal:
        'git reset HEAD~1\n\nUnstaged changes after reset:\nM calculator.js\nM index.html\n\n# 커밋은 취소됐지만\n# 코드는 그대로 남아있음!\n# 수정 후 다시 커밋하면 됨\ngit add .\ngit commit -m "새 기능 추가 (테스트 완료)"',
      note: "HEAD~1 = '마지막 커밋 1개 전으로'. HEAD~2면 2개 전. 코드는 안전하게 유지됩니다.",
    },
  },
  {
    num: 5,
    title: "파일 하나만 이전 버전으로 되돌리고 싶음",
    situation: {
      description:
        "여러 파일을 수정했는데, 그 중 calculator.js만 이전 버전으로 되돌리고 싶다. 나머지는 그대로 유지하고 싶다.",
      terminal:
        '# 3개 파일을 수정했는데...\ngit status\n  modified: calculator.js  ← 이것만 되돌리고 싶음\n  modified: style.css       ← 이건 유지\n  modified: index.html      ← 이것도 유지',
    },
    solution: {
      description:
        "git checkout HEAD~1 -- filename으로 특정 파일만 이전 커밋 버전으로 되돌릴 수 있습니다.",
      terminal:
        '# calculator.js만 이전 버전으로 되돌리기\ngit checkout HEAD~1 -- calculator.js\n\nUpdated 1 path from a1b2c3d\n\n# 확인\ngit status\n  modified: calculator.js  ← 이전 버전으로 복구됨\n  modified: style.css       ← 그대로 유지\n  modified: index.html      ← 그대로 유지',
      note: "-- 뒤에 파일 이름을 쓰면 그 파일만 되돌립니다. 외과 수술처럼 정밀하게 복구 가능!",
    },
  },
];

export default function GitMistakes() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 mb-4">
            Troubleshooting
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Git{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-emerald-400">
              실수 대처법
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            자주 하는 실수 5가지와 해결법 — 실수는 배움의 시작입니다
          </p>
        </motion.div>

        {/* Mistakes list */}
        <div className="max-w-6xl mx-auto space-y-12">
          {mistakes.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              {/* Mistake header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-lg">
                  {m.num}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {m.title}
                </h3>
              </div>

              {/* Two columns: Situation (red) | Solution (green) */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Left: Situation */}
                <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-6">
                  <h4 className="text-xs font-bold text-red-400 mb-4 uppercase tracking-wider">
                    실수 상황
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {m.situation.description}
                  </p>
                  <div className="bg-slate-950 rounded-xl border border-red-500/10 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-500/5 border-b border-red-500/10">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="text-xs text-red-400 ml-1">
                        문제 발생
                      </span>
                    </div>
                    <div className="p-4">
                      <pre className="text-gray-400 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                        {m.situation.terminal}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Right: Solution */}
                <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-6">
                  <h4 className="text-xs font-bold text-emerald-400 mb-4 uppercase tracking-wider">
                    해결법
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {m.solution.description}
                  </p>
                  <div className="bg-slate-950 rounded-xl border border-emerald-500/10 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border-b border-emerald-500/10">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-xs text-emerald-400 ml-1">
                        해결 완료
                      </span>
                    </div>
                    <div className="p-4">
                      <pre className="text-emerald-400 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                        {m.solution.terminal}
                      </pre>
                    </div>
                  </div>
                  {/* Note */}
                  <div className="mt-4 rounded-lg bg-cyan-500/5 border border-cyan-500/10 p-3">
                    <p className="text-xs text-cyan-300/80 leading-relaxed">
                      {m.solution.note}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              {i < mistakes.length - 1 && (
                <div className="flex justify-center mt-8">
                  <div className="w-px h-10 bg-gradient-to-b from-emerald-500/40 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Encouragement message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 p-8 text-center">
            <p className="text-3xl font-bold text-white mb-4">
              실수해도 괜찮습니다
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Git이 있으면 언제든 되돌릴 수 있습니다.
              <br />
              실수를 두려워하지 말고, 마음껏 실험하세요.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-2xl">🛡️</span>
              <span className="text-emerald-400 font-semibold">
                Git은 여러분의 안전망입니다
              </span>
            </div>
          </div>

          {/* Quick reference */}
          <div className="mt-8 rounded-2xl bg-slate-800/40 border border-slate-700 p-6">
            <h4 className="text-lg font-bold text-white mb-4 text-center">
              실수 대처 명령어 한눈에 보기
            </h4>
            <div className="bg-slate-950 rounded-xl border border-slate-700 p-4 font-mono text-sm space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-500">메시지 수정:</span>
                <span className="text-emerald-400">
                  git commit --amend -m &quot;새 메시지&quot;
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-500">커밋 취소:</span>
                <span className="text-emerald-400">git reset HEAD~1</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-500">전체 복구:</span>
                <span className="text-emerald-400">git checkout .</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-500">파일 하나 복구:</span>
                <span className="text-emerald-400">
                  git checkout HEAD~1 -- 파일명
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-500">무시 목록:</span>
                <span className="text-emerald-400">.gitignore 파일 생성</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

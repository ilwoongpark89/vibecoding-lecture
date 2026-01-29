"use client";

import { motion } from "framer-motion";

const demoSteps = [
  {
    num: 1,
    action: "Terminal 열기",
    professor: "VS Code에서 Terminal을 엽니다. (Ctrl+` 또는 메뉴 → Terminal → New Terminal)",
    screen: "VS Code 하단에 터미널 패널이 나타남. 커서가 깜빡이는 빈 터미널.",
    highlight:
      "터미널은 컴퓨터와 '대화'하는 창입니다. 마우스 대신 글자로 명령을 내리는 곳이에요.",
    code: null,
  },
  {
    num: 2,
    action: "프로젝트 폴더 만들기",
    professor:
      "터미널에 명령어를 입력해서 새 폴더를 만들고 그 안으로 이동합니다.",
    screen: "폴더가 생성되고 프롬프트 경로가 바뀜",
    highlight:
      "mkdir = make directory (폴더 만들기), cd = change directory (폴더 이동). 이 두 명령어만 알면 됩니다.",
    code: "mkdir heat-calculator\ncd heat-calculator",
  },
  {
    num: 3,
    action: "Git 초기화",
    professor:
      "이 폴더를 Git으로 관리하겠다고 선언합니다. 이 순간부터 모든 변경을 추적합니다.",
    screen:
      'Initialized empty Git repository in /Users/.../heat-calculator/.git/',
    highlight:
      "git init은 '이 폴더를 Git으로 관리하겠다'는 선언입니다. .git이라는 숨겨진 폴더가 생기고, 여기에 모든 히스토리가 저장됩니다.",
    code: "git init",
  },
  {
    num: 4,
    action: "Claude Code에 요청하기",
    professor:
      "Claude Code를 실행하고 열전달 계산기를 만들어달라고 요청합니다.",
    screen:
      '✓ Created index.html\n✓ Created style.css\n✓ Created calculator.js\n\nClaude: "열전달 계산기를 만들었습니다.\n뉴턴 냉각법칙(Q = hA(Ts-T∞))을\n사용합니다."',
    highlight:
      "AI가 파일을 만들었지만, 아직 Git에는 기록되지 않았습니다! 이 상태에서 문제가 생기면 복구할 수 없어요.",
    code: 'claude\n\n> "뉴턴 냉각법칙 기반 열전달 계산기를\n   HTML/CSS/JS로 만들어줘.\n   사용자가 h, A, Ts, Tinf를 입력하면\n   Q를 계산해서 보여줘"',
  },
  {
    num: 5,
    action: "결과 확인하기",
    professor: "브라우저에서 index.html을 열어 계산기가 잘 동작하는지 확인합니다.",
    screen:
      "브라우저에 열전달 계산기 UI가 표시됨.\n입력: h=10, A=2, Ts=100, Tinf=25\n결과: Q = 1500 W",
    highlight:
      "항상 AI가 만든 결과를 직접 눈으로 확인하세요. AI도 실수할 수 있습니다. 결과가 맞는지 검증하는 건 여러분의 몫입니다.",
    code: "open index.html    # macOS\n# 또는 브라우저에서 직접 파일 열기",
  },
  {
    num: 6,
    action: "git status로 변경사항 확인",
    professor:
      "Git에게 '지금 뭐가 바뀌었어?'라고 물어봅니다. AI가 만든 파일들이 빨간색으로 표시됩니다.",
    screen:
      "On branch main\n\nNo commits yet\n\nUntracked files:\n  (use \"git add <file>...\" to include)\n\n\tcalculator.js\n\tindex.html\n\tstyle.css\n\nnothing added to commit",
    highlight:
      "빨간색 = Git이 아직 추적하지 않는 새 파일. 이 파일들을 Git에 '등록'해야 합니다. git status는 가장 자주 쓰는 명령어입니다!",
    code: "git status",
  },
  {
    num: 7,
    action: "첫 번째 커밋 만들기",
    professor:
      "변경된 모든 파일을 스테이지에 올리고(add), 스냅샷을 찍습니다(commit).",
    screen:
      '[main (root-commit) a3b7c1d] 뉴턴 냉각법칙 열전달 계산기 구현\n 3 files changed, 142 insertions(+)\n create mode 100644 calculator.js\n create mode 100644 index.html\n create mode 100644 style.css',
    highlight:
      'git add . = "모든 변경 파일을 준비시켜". git commit -m "..." = "이 상태를 저장해. 메모는 이거야." 이 두 줄이 핵심입니다!',
    code: 'git add .\ngit commit -m "뉴턴 냉각법칙 열전달 계산기 구현"',
  },
  {
    num: 8,
    action: "추가 기능 요청 → 문제 발생!",
    professor:
      "Claude에게 차트 기능을 추가해달라고 요청합니다. 그런데 계산 로직이 깨졌습니다!",
    screen:
      '✓ Modified calculator.js\n✓ Created chart.js\n\n# 브라우저에서 확인하니...\n입력: h=10, A=2, Ts=100, Tinf=25\n결과: Q = 1250 W  ← 틀렸다! (정답 1500W)',
    highlight:
      "AI가 차트를 추가하면서 계산 공식을 실수로 바꿔버렸습니다. 이런 일이 실제로 자주 발생합니다!",
    code: '> "계산 결과를 차트로도 보여주는\n   기능을 추가해줘"',
  },
  {
    num: 9,
    action: "git diff로 뭐가 바뀌었는지 확인",
    professor:
      "git diff로 마지막 커밋과 현재 코드의 차이를 확인합니다. 빨간줄(삭제)과 초록줄(추가)로 정확히 뭐가 바뀌었는지 보입니다.",
    screen:
      'diff --git a/calculator.js\n--- a/calculator.js\n+++ b/calculator.js\n@@ -15,7 +15,7 @@\n function calculate() {\n-  const Q = h * A * (Ts - Tinf);\n+  const Q = h * A * (Ts - Tinf) * 0.5;\n                              ^^^^^^ 버그!\n }',
    highlight:
      "빨간줄(-): 원래 코드. 초록줄(+): AI가 바꾼 코드. * 0.5가 잘못 추가되었습니다! git diff는 'AI가 정확히 뭘 바꿨는지' 보여주는 엑스레이입니다.",
    code: "git diff",
  },
  {
    num: 10,
    action: "git checkout으로 복구 → GitHub에 Push",
    professor:
      "문제가 생겼으니 마지막 커밋 상태로 되돌립니다. 그리고 안전한 코드를 GitHub에 백업합니다.",
    screen:
      'Updated 1 path from the index.\n\n# 다시 브라우저에서 확인\n결과: Q = 1500 W  ← 정상으로 복구!\n\nTo https://github.com/you/heat-calc.git\n * [new branch]      main -> main',
    highlight:
      "git checkout . 한 줄로 모든 게 복구됩니다! 이것이 '커밋을 먼저 하는' 이유입니다. 커밋이 없었다면 원래 코드는 영원히 사라졌을 거예요.",
    code: 'git checkout .       # 마지막 커밋으로 복구\n\n# 복구 확인 후, GitHub에 push\ngit remote add origin https://github.com/you/heat-calc.git\ngit push -u origin main',
  },
];

export default function GitLiveDemo() {
  return (
    <section className="py-24 bg-slate-950">
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
            Live Demo
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            라이브 데모:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              열전달 계산기를 Git으로 관리하기
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            처음부터 끝까지, 교수가 실시간으로 보여주는 단계별 시나리오
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto space-y-16">
          {demoSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              {/* Step number + title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
                  {step.num}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {step.action}
                </h3>
              </div>

              {/* 3-column info */}
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                {/* Professor action */}
                <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-5">
                  <h4 className="text-xs font-bold text-cyan-400 mb-3 uppercase tracking-wider">
                    교수 행동
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {step.professor}
                  </p>
                </div>

                {/* What appears on screen */}
                <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-5">
                  <h4 className="text-xs font-bold text-emerald-400 mb-3 uppercase tracking-wider">
                    화면에 보이는 것
                  </h4>
                  <pre className="text-xs text-gray-400 font-mono whitespace-pre-wrap leading-relaxed">
                    {step.screen}
                  </pre>
                </div>

                {/* Key point for students */}
                <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-5">
                  <h4 className="text-xs font-bold text-amber-400 mb-3 uppercase tracking-wider">
                    학생에게 강조할 포인트
                  </h4>
                  <p className="text-sm text-amber-200/80 leading-relaxed">
                    {step.highlight}
                  </p>
                </div>
              </div>

              {/* Terminal command */}
              {step.code && (
                <div className="bg-slate-950 rounded-xl border border-slate-700 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 border-b border-slate-700">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                      Terminal
                    </span>
                  </div>
                  <div className="p-4">
                    <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                      {step.code}
                    </pre>
                  </div>
                </div>
              )}

              {/* Divider */}
              {i < demoSteps.length - 1 && (
                <div className="flex justify-center mt-8">
                  <div className="w-px h-10 bg-gradient-to-b from-emerald-500/40 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 p-8 text-center">
            <p className="text-2xl font-bold text-white mb-4">
              데모 요약: 10단계로 배운 핵심
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="rounded-xl bg-slate-800/60 border border-slate-700 p-4">
                <p className="text-3xl font-bold text-emerald-400">5개</p>
                <p className="text-sm text-gray-400 mt-1">
                  핵심 Git 명령어
                </p>
                <p className="text-xs text-gray-500 mt-2 font-mono">
                  init, status, add, commit, push
                </p>
              </div>
              <div className="rounded-xl bg-slate-800/60 border border-slate-700 p-4">
                <p className="text-3xl font-bold text-cyan-400">2개</p>
                <p className="text-sm text-gray-400 mt-1">
                  문제 해결 명령어
                </p>
                <p className="text-xs text-gray-500 mt-2 font-mono">
                  diff, checkout
                </p>
              </div>
              <div className="rounded-xl bg-slate-800/60 border border-slate-700 p-4">
                <p className="text-3xl font-bold text-amber-400">1개</p>
                <p className="text-sm text-gray-400 mt-1">
                  황금률
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  AI 요청 전에 반드시 커밋!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

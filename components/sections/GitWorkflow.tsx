"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const steps = [
  {
    num: 1,
    title: "프로젝트 시작",
    desc: "프로젝트 폴더를 만들고 Git을 초기화합니다.",
    code: 'mkdir heat-calculator && cd heat-calculator\ngit init\ngit add . && git commit -m "프로젝트 초기화"',
    output: `Initialized empty Git repository in
/Users/you/heat-calculator/.git/

[main (root-commit) a1b2c3d] 프로젝트 초기화
 1 file changed, 0 insertions(+)`,
    outputNote: "git init → .git 폴더가 생성되며 버전 관리 시작. 첫 커밋에 고유 ID(a1b2c3d)가 부여됩니다.",
  },
  {
    num: 2,
    title: "AI에게 기능 요청",
    desc: "Claude에게 원하는 기능을 프롬프트로 요청합니다.",
    code: '> claude "열전달 계산기 만들어줘.\n  뉴턴 냉각법칙 기반, SI 단위, Next.js"',
    output: `✓ Created app/page.tsx
✓ Created components/Calculator.tsx
✓ Created lib/heatTransfer.ts
✓ Updated package.json

3 files created, 1 file modified`,
    outputNote: "AI가 여러 파일을 자동으로 생성합니다. 이 시점에서는 아직 Git에 저장(커밋)되지 않은 상태입니다.",
  },
  {
    num: 3,
    title: "결과 확인 & 커밋",
    desc: "AI가 생성한 코드를 테스트하고, 잘 작동하면 커밋합니다.",
    code: 'npm run dev          # 브라우저에서 확인\n\ngit status           # 변경된 파일 확인\ngit add .\ngit commit -m "열전달 계산기 구현"',
    output: `On branch main
Changes not staged for commit:
  modified:   package.json

Untracked files:
  app/page.tsx
  components/Calculator.tsx
  lib/heatTransfer.ts

[main e4f5g6h] 열전달 계산기 구현
 4 files changed, 287 insertions(+)`,
    outputNote: "git status로 AI가 만든/수정한 파일을 한눈에 볼 수 있습니다. 커밋하면 이 상태가 영구 저장됩니다.",
  },
  {
    num: 4,
    title: "추가 기능 요청 (실패 시 복구)",
    desc: "새 기능을 요청합니다. 문제가 생기면 이전 커밋으로 되돌립니다.",
    code: '> claude "차트 추가해줘"\n\n# 차트는 됐는데 계산이 깨졌다!\ngit diff             # 뭐가 바뀌었는지 확인\ngit checkout .       # 마지막 커밋 상태로 복구',
    output: `diff --git a/lib/heatTransfer.ts
- const Q = h * A * (Ts - Tinf);
+ const Q = h * A * (Ts + Tinf);  // 버그!

--- 3 files changed ---

Restored 3 files to last commit.
Updated 3 paths from the index.`,
    outputNote: "git diff로 AI가 실수로 바꾼 부분(- → +)을 정확히 찾을 수 있습니다. checkout으로 안전하게 복구!",
  },
  {
    num: 5,
    title: "GitHub에 백업 & 배포",
    desc: "GitHub에 push하면 코드가 클라우드에 백업되고, Vercel이 자동 배포합니다.",
    code: "git remote add origin https://github.com/you/heat-calc.git\ngit push origin main",
    output: `Enumerating objects: 12, done.
Counting objects: 100% (12/12), done.
Writing objects: 100% (12/12), 4.23 KiB

To https://github.com/you/heat-calc.git
 * [new branch]      main -> main

✓ Vercel: Deployment ready
  https://heat-calc.vercel.app`,
    outputNote: "push 한 줄로 GitHub 백업 + Vercel 자동 배포가 동시에 이루어집니다.",
  },
];

export default function GitWorkflow() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

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
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            바이브코딩 Git 워크플로우
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            왼쪽은 여러분이 입력하는 명령어, 오른쪽은 터미널에 실제로 나오는 결과입니다
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/50 to-emerald-500/50 hidden md:block" />

          <div className="space-y-10">
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

                {/* Content — two columns */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">{step.desc}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Left: Command input */}
                    <div className="bg-slate-950 rounded-xl border border-slate-700 overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 border-b border-slate-700">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          입력하는 명령어
                        </span>
                      </div>
                      <div className="p-4">
                        <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                          {step.code}
                        </pre>
                      </div>
                    </div>

                    {/* Right: Output */}
                    <div className="bg-slate-950 rounded-xl border border-cyan-500/20 overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/5 border-b border-cyan-500/20">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-xs text-cyan-400 ml-1">
                          터미널 출력 결과
                        </span>
                      </div>
                      <div className="p-4">
                        <pre className="text-gray-300 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                          {step.output}
                        </pre>
                      </div>
                      {/* Explanation note */}
                      <div className="px-4 pb-4">
                        <div className="rounded-lg bg-cyan-500/5 border border-cyan-500/10 p-3">
                          <p className="text-xs text-cyan-300/80 leading-relaxed">
                            {step.outputNote}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Git log visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            이 과정을 거치면 이런 히스토리가 남습니다
          </h3>
          <div className="bg-slate-950 rounded-2xl border border-slate-700 p-6 overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-gray-500 ml-2">
                git log --oneline
              </span>
            </div>
            <div className="space-y-2 font-mono text-sm">
              {[
                {
                  hash: "f7g8h9i",
                  msg: "GitHub 연결 & 배포 설정",
                  color: "text-violet-400",
                  tag: "최신",
                },
                {
                  hash: "e4f5g6h",
                  msg: "열전달 계산기 구현",
                  color: "text-emerald-400",
                  tag: null,
                },
                {
                  hash: "a1b2c3d",
                  msg: "프로젝트 초기화",
                  color: "text-gray-400",
                  tag: null,
                },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-amber-400/80">{log.hash}</span>
                  <span className={log.color}>{log.msg}</span>
                  {log.tag && (
                    <span className="px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-[10px] text-violet-400">
                      {log.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800">
              <p className="text-xs text-gray-500">
                각 커밋(a1b2c3d 등)은 그 시점의 전체 코드 스냅샷입니다. 언제든{" "}
                <span className="text-emerald-400">
                  git checkout a1b2c3d
                </span>
                로 그 시점으로 돌아갈 수 있습니다.
              </p>
            </div>
          </div>

          {/* Why hash is complex */}
          <div className="mt-8 rounded-2xl bg-slate-800/40 border border-amber-500/20 p-6">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400">?</span>
              왜 커밋 번호가 <span className="text-amber-400 font-mono">a1b2c3d</span> 같이 복잡할까?
            </h4>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: simple numbering problem */}
              <div className="rounded-xl bg-slate-900/60 border border-slate-700 p-5">
                <p className="text-xs font-bold text-red-400 mb-3 uppercase tracking-wider">
                  만약 1, 2, 3 같은 단순 번호라면?
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-2">
                    <span className="text-red-400">&#x2717;</span>
                    <p className="text-gray-400">
                      내 컴퓨터의 커밋 #3과 동료 컴퓨터의 커밋 #3이 <span className="text-white">전혀 다른 내용</span>인데 같은 번호
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-red-400">&#x2717;</span>
                    <p className="text-gray-400">
                      인터넷 없이 각자 작업하면 번호가 <span className="text-white">겹침</span> — 누가 진짜 #3인지 알 수 없음
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-red-400">&#x2717;</span>
                    <p className="text-gray-400">
                      번호를 중앙 서버가 관리해야 하므로 <span className="text-white">오프라인 작업 불가</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: SHA hash solution */}
              <div className="rounded-xl bg-slate-900/60 border border-emerald-500/20 p-5">
                <p className="text-xs font-bold text-emerald-400 mb-3 uppercase tracking-wider">
                  Git의 해결법: SHA-1 해시
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-2">
                    <span className="text-emerald-400">&#x2713;</span>
                    <p className="text-gray-400">
                      커밋 내용(코드 + 시간 + 작성자)을 <span className="text-white">수학 공식</span>에 넣으면 고유한 ID가 나옴
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-emerald-400">&#x2713;</span>
                    <p className="text-gray-400">
                      전 세계 어디서든, 같은 내용이면 <span className="text-white">같은 ID</span> — 겹칠 확률 사실상 0
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-emerald-400">&#x2713;</span>
                    <p className="text-gray-400">
                      중앙 서버 없이 각자 컴퓨터에서 <span className="text-white">독립적으로</span> 번호 생성 가능
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hash visualization */}
            <div className="mt-6 rounded-xl bg-slate-900 border border-slate-700 p-5">
              <p className="text-xs text-gray-500 mb-3">실제 커밋 해시 예시</p>
              <div className="font-mono text-sm space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-gray-500">전체:</span>
                  <span className="text-amber-400/60">e015d8c</span>
                  <span className="text-gray-600">4a7f2b1d9e3c8f6a5b0d7e2c4f1a9b3d8e6c7f0a</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-gray-500">앞 7자리만 사용:</span>
                  <span className="text-amber-400 font-bold">e015d8c</span>
                  <span className="text-gray-600 text-xs">← 이것만으로도 충분히 구별됨</span>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                <p className="text-xs text-amber-300/80 leading-relaxed">
                  비유: 사람 이름은 &quot;김민수&quot;처럼 겹칠 수 있지만, <span className="text-white">지문</span>은 절대 겹치지 않습니다.
                  Git 해시는 코드의 지문입니다. 내용이 한 글자라도 다르면 완전히 다른 해시가 나옵니다.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Golden rule tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⭐</span>
              <div>
                <h4 className="text-amber-400 font-bold mb-2">황금률</h4>
                <p className="text-gray-300 leading-relaxed">
                  AI에게 새로운 요청을 하기 <span className="text-amber-400 font-semibold">전에</span> 반드시 커밋하세요.
                  그래야 AI가 코드를 망쳐도 한 줄로 복구할 수 있습니다.
                </p>
                <div className="mt-3 bg-slate-900/50 rounded-lg p-3 font-mono text-sm">
                  <span className="text-gray-500"># AI에게 요청하기 전에 항상:</span>
                  <br />
                  <span className="text-emerald-400">git add . && git commit -m &quot;현재 상태 저장&quot;</span>
                  <br />
                  <span className="text-gray-500"># 그 다음에 AI에게 요청:</span>
                  <br />
                  <span className="text-cyan-400">&gt; claude &quot;차트 기능 추가해줘&quot;</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

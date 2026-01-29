"use client";

import { motion } from "framer-motion";

const missions = [
  {
    num: 1,
    title: "GitHub 계정 만들기",
    difficulty: "쉬움",
    diffColor: "text-emerald-400",
    steps: [
      "github.com에 접속한다",
      '"Sign up" 버튼을 클릭한다',
      "이메일, 비밀번호, 사용자이름을 입력한다",
      "이메일 인증을 완료한다",
      "프로필 사진을 설정한다 (본인 사진 또는 아바타)",
      "Settings → Profile에서 이름과 Bio를 작성한다",
    ],
    tip: "사용자이름은 신중하게! 이것이 여러분의 개발자 ID가 됩니다. 실명 또는 기억하기 쉬운 영문 이름을 추천합니다.",
  },
  {
    num: 2,
    title: "첫 Repository 만들기",
    difficulty: "쉬움",
    diffColor: "text-emerald-400",
    steps: [
      "GitHub에 로그인한 상태에서 우측 상단 '+' → 'New repository' 클릭",
      "Repository name: my-first-repo 입력",
      '"Add a README file" 체크박스를 선택한다',
      '"Create repository" 버튼을 클릭한다',
      "생성된 Repository 페이지에서 README.md를 확인한다",
      "연필 아이콘(Edit)을 클릭하여 자기소개를 작성하고 Commit changes",
    ],
    tip: "README.md는 마크다운 문법을 사용합니다. # 은 제목, - 는 목록, **굵게** 등을 써보세요.",
  },
  {
    num: 3,
    title: "Claude Code로 프로젝트 만들고 GitHub에 올리기",
    difficulty: "도전",
    diffColor: "text-amber-400",
    steps: [
      "터미널을 열고 새 폴더를 만든다: mkdir my-project && cd my-project",
      "Git을 초기화한다: git init",
      'Claude Code를 실행하고 요청한다: claude "Hello World 웹페이지를 만들어줘"',
      "결과를 확인한다: 브라우저에서 열어보기",
      "Git에 저장한다: git add . && git commit -m \"Hello World 페이지 생성\"",
      "GitHub에 새 Repository를 만든다 (이번엔 README 체크 해제)",
      "GitHub에 업로드한다: git remote add origin [URL] && git push -u origin main",
      "GitHub 페이지에서 코드가 올라갔는지 확인한다",
    ],
    tip: "push할 때 인증이 필요합니다. GitHub 설정에서 Personal Access Token을 만들어 비밀번호 대신 사용하세요.",
  },
];

const rubric = [
  { criteria: "GitHub 계정 생성 및 프로필 작성", points: 20, desc: "프로필 사진 + Bio 작성" },
  { criteria: "my-first-repo 생성", points: 20, desc: "README.md에 자기소개 포함" },
  { criteria: "프로젝트 Repository 생성", points: 20, desc: "Claude Code로 만든 프로젝트 업로드" },
  { criteria: "커밋 메시지 품질", points: 20, desc: "한글로 명확하게 작성 (최소 3개 커밋)" },
  { criteria: "코드 정상 동작", points: 20, desc: "HTML 파일이 브라우저에서 열리는지" },
];

export default function GitHomework() {
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
            Homework
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            이번 주{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              실습 과제
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            3단계 미션을 완료하고 GitHub Repository URL을 제출하세요
          </p>
        </motion.div>

        {/* Missions */}
        <div className="max-w-5xl mx-auto space-y-12">
          {missions.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              {/* Mission header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
                  {m.num}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    Mission {m.num}: {m.title}
                  </h3>
                  <span className={`text-xs font-bold ${m.diffColor}`}>
                    난이도: {m.difficulty}
                  </span>
                </div>
              </div>

              {/* Checklist */}
              <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-6">
                <h4 className="text-xs font-bold text-emerald-400 mb-4 uppercase tracking-wider">
                  단계별 체크리스트
                </h4>
                <div className="space-y-3">
                  {m.steps.map((step, si) => (
                    <div key={si} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded border border-slate-600 bg-slate-900/60 flex items-center justify-center">
                        <span className="text-[10px] text-gray-600">
                          {si + 1}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tip */}
                <div className="mt-5 rounded-lg bg-cyan-500/5 border border-cyan-500/10 p-3">
                  <p className="text-xs text-cyan-300/80 leading-relaxed">
                    <span className="font-bold text-cyan-400">Tip: </span>
                    {m.tip}
                  </p>
                </div>
              </div>

              {/* Divider */}
              {i < missions.length - 1 && (
                <div className="flex justify-center mt-8">
                  <div className="w-px h-10 bg-gradient-to-b from-emerald-500/40 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bonus Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⭐</span>
              <div>
                <h4 className="text-amber-400 font-bold mb-2">
                  보너스 미션: GitHub 프로필 README 만들기
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  자신의 GitHub 사용자이름과 동일한 이름의 Repository를 만들면 프로필에 특별한 README가 표시됩니다.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-3 font-mono text-sm">
                  <span className="text-gray-500">
                    # 예: 사용자이름이 student-name이면
                  </span>
                  <br />
                  <span className="text-emerald-400">
                    Repository 이름: student-name
                  </span>
                  <br />
                  <span className="text-gray-500">
                    # README.md에 자기소개, 기술 스택, 관심 분야 등을 작성
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Submission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 max-w-5xl mx-auto"
        >
          <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-6">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400">📮</span> 제출 방법
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-sm mt-0.5">
                  1.
                </span>
                <p className="text-sm text-gray-300">
                  GitHub 프로필 URL 제출:{" "}
                  <span className="font-mono text-cyan-400">
                    https://github.com/여러분의-사용자이름
                  </span>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-sm mt-0.5">
                  2.
                </span>
                <p className="text-sm text-gray-300">
                  프로젝트 Repository URL 제출:{" "}
                  <span className="font-mono text-cyan-400">
                    https://github.com/여러분의-사용자이름/my-project
                  </span>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-sm mt-0.5">
                  3.
                </span>
                <p className="text-sm text-gray-300">
                  LMS 과제 제출란에 위 두 URL을 붙여넣기
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rubric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 max-w-5xl mx-auto"
        >
          <div className="rounded-2xl bg-slate-800/60 border border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">📊</span> 평가 기준 (총
                100점)
              </h4>
            </div>
            <div className="divide-y divide-slate-700">
              {rubric.map((r, i) => (
                <div
                  key={i}
                  className="px-6 py-3 flex items-center gap-4"
                >
                  <span className="flex-shrink-0 w-12 text-right text-lg font-bold text-emerald-400">
                    {r.points}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">
                      {r.criteria}
                    </p>
                    <p className="text-xs text-gray-500">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-emerald-500/20 bg-emerald-500/5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">합계</span>
                <span className="text-lg font-bold text-emerald-400">
                  100점
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Deadline reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 p-8 text-center">
            <p className="text-2xl font-bold text-white mb-2">
              어렵게 느껴져도 괜찮습니다
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              한 단계씩 따라하면 누구나 할 수 있습니다.
              <br />
              막히는 부분이 있으면 Claude Code에게 물어보세요!
            </p>
            <div className="mt-4 inline-block bg-slate-900/50 rounded-lg p-3 font-mono text-sm">
              <span className="text-cyan-400">
                &gt; claude &quot;git push하는 방법을 알려줘&quot;
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

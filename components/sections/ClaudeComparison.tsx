"use client";

import { motion } from "framer-motion";

const comparisonData = [
  {
    category: "접근 방식",
    claude: "웹 브라우저에서 대화",
    claudeCode: "터미널(CLI)에서 직접 실행",
  },
  {
    category: "파일 접근",
    claude: "파일 업로드/다운로드 필요",
    claudeCode: "로컬 파일 직접 읽기/수정",
  },
  {
    category: "코드 실행",
    claude: "코드를 복사해서 직접 실행",
    claudeCode: "터미널 명령어 직접 실행",
  },
  {
    category: "프로젝트 이해",
    claude: "제공된 정보만 이해",
    claudeCode: "전체 프로젝트 구조 파악",
  },
  {
    category: "Git 연동",
    claude: "수동으로 커밋/푸시",
    claudeCode: "자동 Git 작업 가능",
  },
  {
    category: "사용 환경",
    claude: "어디서나 웹 브라우저",
    claudeCode: "개발 환경이 설치된 컴퓨터",
  },
];

export default function ClaudeComparison() {
  return (
    <section id="claude-comparison" className="relative py-24 bg-slate-950">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-3xl translate-x-1/2" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
            Deep Dive
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Claude</span>
            {" vs "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Claude Code</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            같은 Claude AI지만, 사용 방식과 활용 범위가 다릅니다.
            <br />
            각각의 장점을 이해하고 상황에 맞게 선택하세요.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto mt-3">
            이 섹션은 본 강의에서 사용하는 도구(Claude)를 소개합니다. 유사한 기능을 제공하는 도구로 Cursor, GitHub Copilot, Aider 등이 있으며, 핵심 개념은 도구에 관계없이 적용됩니다.
          </p>
        </motion.div>

        {/* Main Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Claude Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-8 rounded-3xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 backdrop-blur-sm"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />

            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Claude</h3>
                  <p className="text-orange-400">웹 기반 AI 어시스턴트</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                claude.ai에서 바로 사용할 수 있는 대화형 AI입니다.
                코드 작성, 설명, 디버깅 등 다양한 작업을 대화로 수행합니다.
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-orange-400 uppercase tracking-wider">장점</h4>
                <ul className="space-y-2">
                  {[
                    "설치 없이 바로 사용 가능",
                    "어디서나 웹으로 접근",
                    "이미지, PDF 등 다양한 파일 분석",
                    "대화 기록 자동 저장",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <svg className="w-5 h-5 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-orange-500/20">
                <span className="text-sm text-gray-500">추천 상황</span>
                <p className="text-gray-300 mt-1">코드 질문, 개념 학습, 간단한 코드 생성</p>
              </div>
            </div>
          </motion.div>

          {/* Claude Code Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-8 rounded-3xl bg-gradient-to-br from-rose-500/10 to-orange-500/5 border border-rose-500/20 backdrop-blur-sm"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl" />

            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M7 8h2l2 4-2 4H7"/>
                    <path d="M17 8h-2l-2 4 2 4h2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Claude Code</h3>
                  <p className="text-rose-400">터미널 기반 AI 코딩 도구</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                터미널에서 직접 실행되어 파일 시스템과 상호작용합니다.
                프로젝트 전체를 이해하고 실제 코드를 수정합니다.
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-rose-400 uppercase tracking-wider">장점</h4>
                <ul className="space-y-2">
                  {[
                    "파일 직접 생성/수정/삭제",
                    "전체 프로젝트 컨텍스트 이해",
                    "터미널 명령어 자동 실행",
                    "Git 작업 자동화",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <svg className="w-5 h-5 text-rose-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-rose-500/20">
                <span className="text-sm text-gray-500">추천 상황</span>
                <p className="text-gray-300 mt-1">실제 프로젝트 개발, 리팩토링, 버그 수정</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-slate-700"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-slate-800">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">비교 항목</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-orange-400">Claude</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-rose-400">Claude Code</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <motion.tr
                  key={row.category}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-t border-slate-700 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-300 font-medium">{row.category}</td>
                  <td className="px-6 py-4 text-center text-gray-400">{row.claude}</td>
                  <td className="px-6 py-4 text-center text-gray-400">{row.claudeCode}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Workflow Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-8">실제 워크플로우 비교</h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Claude Workflow */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700">
              <h4 className="text-orange-400 font-semibold mb-4">Claude로 버그 수정하기</h4>
              <div className="space-y-3 text-left">
                {[
                  "1. 에러 메시지 복사해서 붙여넣기",
                  "2. Claude가 해결책 제시",
                  "3. 코드를 복사",
                  "4. 에디터에 붙여넣기",
                  "5. 직접 실행해서 확인",
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-400">
                    <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    {step.slice(3)}
                  </div>
                ))}
              </div>
            </div>

            {/* Claude Code Workflow */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700">
              <h4 className="text-rose-400 font-semibold mb-4">Claude Code로 버그 수정하기</h4>
              <div className="space-y-3 text-left">
                {[
                  "1. \"이 버그 수정해줘\"",
                  "2. Claude Code가 파일 분석",
                  "3. 자동으로 코드 수정",
                  "4. 테스트 실행까지 완료",
                  "5. 결과 확인만 하면 끝!",
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-400">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    {step.slice(3)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20"
          >
            <p className="text-gray-300">
              <span className="text-violet-400 font-semibold">Pro Tip:</span>{" "}
              두 도구를 함께 사용하면 더 효과적입니다!
              <br className="hidden md:block" />
              개념 학습은 <span className="text-orange-400">Claude</span>로,
              실제 구현은 <span className="text-rose-400">Claude Code</span>로!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

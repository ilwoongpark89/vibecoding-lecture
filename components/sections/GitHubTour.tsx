"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function GitHubTour() {
  const [contributionColors, setContributionColors] = useState<string[]>(() =>
    Array.from({ length: 26 * 7 }, () => "bg-slate-700/50")
  );

  useEffect(() => {
    setContributionColors(
      Array.from({ length: 26 * 7 }, () => {
        const rand = Math.random();
        return rand > 0.85
          ? "bg-emerald-400"
          : rand > 0.7
          ? "bg-emerald-500/70"
          : rand > 0.5
          ? "bg-emerald-600/50"
          : rand > 0.35
          ? "bg-emerald-700/30"
          : "bg-slate-700/50";
      })
    );
  }, []);
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
            GitHub Tour
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            GitHub{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              둘러보기
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            GitHub 웹사이트의 주요 화면을 미리 살펴봅시다
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-20">
          {/* 1. Repository Main Page */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="flex-shrink-0 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                화면 1
              </span>
              <h3 className="text-2xl font-bold text-white">
                Repository 메인 페이지
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Mockup */}
              <div className="md:col-span-2 rounded-2xl bg-slate-800 border border-slate-600 overflow-hidden">
                {/* GitHub-like header */}
                <div className="bg-slate-900 border-b border-slate-700 px-4 py-3 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-600" />
                  <span className="text-sm text-gray-300 font-semibold">
                    student-name
                  </span>
                  <span className="text-gray-500">/</span>
                  <span className="text-sm text-cyan-400 font-bold">
                    heat-calculator
                  </span>
                  <span className="ml-2 px-2 py-0.5 rounded-full border border-slate-600 text-[10px] text-gray-400">
                    Public
                  </span>
                </div>

                {/* Stats bar */}
                <div className="px-4 py-2 border-b border-slate-700 flex flex-wrap gap-4 text-xs text-gray-400">
                  <span>⭐ 0 stars</span>
                  <span>🔀 0 forks</span>
                  <span>👁 1 watching</span>
                  <span className="ml-auto">🟢 main</span>
                  <span>3 commits</span>
                </div>

                {/* File list */}
                <div className="divide-y divide-slate-700">
                  {[
                    {
                      icon: "📄",
                      name: "index.html",
                      msg: "뉴턴 냉각법칙 열전달 계산기 구현",
                      time: "2 hours ago",
                    },
                    {
                      icon: "📄",
                      name: "calculator.js",
                      msg: "뉴턴 냉각법칙 열전달 계산기 구현",
                      time: "2 hours ago",
                    },
                    {
                      icon: "📄",
                      name: "style.css",
                      msg: "뉴턴 냉각법칙 열전달 계산기 구현",
                      time: "2 hours ago",
                    },
                    {
                      icon: "📄",
                      name: ".gitignore",
                      msg: "프로젝트 초기화",
                      time: "3 hours ago",
                    },
                    {
                      icon: "📝",
                      name: "README.md",
                      msg: "프로젝트 초기화",
                      time: "3 hours ago",
                    },
                  ].map((file, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 flex items-center gap-3 text-xs hover:bg-slate-700/30"
                    >
                      <span>{file.icon}</span>
                      <span className="text-cyan-400 font-medium w-32 truncate">
                        {file.name}
                      </span>
                      <span className="text-gray-500 flex-1 truncate">
                        {file.msg}
                      </span>
                      <span className="text-gray-600 flex-shrink-0">
                        {file.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* README */}
                <div className="border-t border-slate-700 px-6 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-500">📖</span>
                    <span className="text-sm font-bold text-white">
                      README.md
                    </span>
                  </div>
                  <div className="bg-slate-900/60 rounded-lg p-4 text-sm text-gray-300 leading-relaxed">
                    <p className="text-lg font-bold mb-2">
                      🔥 Heat Transfer Calculator
                    </p>
                    <p className="text-gray-400">
                      뉴턴 냉각법칙(Q = hA(Ts - T∞))을 기반으로 한 열전달 계산기입니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Annotations */}
              <div className="space-y-4">
                {[
                  {
                    label: "Repository 이름",
                    desc: "프로젝트 이름입니다. URL이 됩니다: github.com/이름/heat-calculator",
                  },
                  {
                    label: "Public / Private",
                    desc: "Public이면 누구나 볼 수 있고, Private이면 나만 볼 수 있습니다.",
                  },
                  {
                    label: "파일 목록",
                    desc: "프로젝트에 포함된 모든 파일. 각 파일 옆에 마지막 커밋 메시지가 표시됩니다.",
                  },
                  {
                    label: "README.md",
                    desc: '프로젝트 소개 문서. 방문자가 가장 먼저 보는 "첫인상"입니다.',
                  },
                  {
                    label: "Stars & Forks",
                    desc: "Star = 좋아요, Fork = 복사해서 내 것으로 가져가기. 인기도 지표입니다.",
                  },
                ].map((ann, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-slate-800/60 border border-slate-700 p-4"
                  >
                    <p className="text-xs font-bold text-emerald-400 mb-1">
                      {ann.label}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {ann.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 2. Commits Tab */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="flex-shrink-0 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                화면 2
              </span>
              <h3 className="text-2xl font-bold text-white">
                Commits 탭 — 커밋 히스토리
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 rounded-2xl bg-slate-800 border border-slate-600 overflow-hidden">
                <div className="bg-slate-900 border-b border-slate-700 px-4 py-3">
                  <span className="text-sm font-bold text-white">
                    Commits
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    on branch main
                  </span>
                </div>
                <div className="divide-y divide-slate-700">
                  {[
                    {
                      hash: "f7g8h9i",
                      msg: "GitHub 연결 & 배포 설정",
                      author: "student-name",
                      date: "Jan 29, 2026",
                      avatar: "🟢",
                    },
                    {
                      hash: "e4f5g6h",
                      msg: "뉴턴 냉각법칙 열전달 계산기 구현",
                      author: "student-name",
                      date: "Jan 29, 2026",
                      avatar: "🟢",
                    },
                    {
                      hash: "a1b2c3d",
                      msg: "프로젝트 초기화",
                      author: "student-name",
                      date: "Jan 29, 2026",
                      avatar: "🟢",
                    },
                  ].map((c, i) => (
                    <div key={i} className="px-4 py-3 flex items-center gap-3">
                      <span>{c.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium truncate">
                          {c.msg}
                        </p>
                        <p className="text-xs text-gray-500">
                          {c.author} committed on {c.date}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-amber-400/80 bg-slate-900 px-2 py-1 rounded border border-slate-700 flex-shrink-0">
                        {c.hash}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "커밋 메시지",
                    desc: "각 커밋에 적은 설명. 나중에 '이때 뭘 했지?' 찾을 때 핵심입니다.",
                  },
                  {
                    label: "커밋 해시",
                    desc: "a1b2c3d 같은 고유 ID. 이 번호로 정확한 시점으로 돌아갈 수 있습니다.",
                  },
                  {
                    label: "시간순 정렬",
                    desc: "최신 커밋이 가장 위에 옵니다. 프로젝트가 어떻게 발전했는지 한눈에 보입니다.",
                  },
                ].map((ann, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-slate-800/60 border border-slate-700 p-4"
                  >
                    <p className="text-xs font-bold text-emerald-400 mb-1">
                      {ann.label}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {ann.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 3. Diff View */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="flex-shrink-0 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                화면 3
              </span>
              <h3 className="text-2xl font-bold text-white">
                Code 변경 보기 (Diff)
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 rounded-2xl bg-slate-800 border border-slate-600 overflow-hidden">
                <div className="bg-slate-900 border-b border-slate-700 px-4 py-3 flex items-center gap-2">
                  <span className="text-sm font-bold text-white">
                    calculator.js
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    +12 -3 lines changed
                  </span>
                </div>

                {/* Diff content */}
                <div className="font-mono text-xs leading-relaxed">
                  {[
                    { num: 12, type: "ctx", text: "function calculate() {" },
                    { num: 13, type: "ctx", text: "  const h = parseFloat(document.getElementById('h').value);" },
                    { num: 14, type: "ctx", text: "  const A = parseFloat(document.getElementById('A').value);" },
                    { num: 15, type: "del", text: "  const result = h * A;" },
                    { num: 15, type: "add", text: "  const Ts = parseFloat(document.getElementById('Ts').value);" },
                    { num: 16, type: "add", text: "  const Tinf = parseFloat(document.getElementById('Tinf').value);" },
                    { num: 17, type: "add", text: "  const Q = h * A * (Ts - Tinf);" },
                    { num: 18, type: "ctx", text: "" },
                    { num: 19, type: "del", text: "  document.getElementById('output').textContent = result;" },
                    { num: 20, type: "add", text: "  document.getElementById('output').textContent = `Q = ${Q.toFixed(2)} W`;" },
                    { num: 21, type: "ctx", text: "}" },
                  ].map((line, i) => (
                    <div
                      key={i}
                      className={`px-4 py-0.5 flex gap-3 ${
                        line.type === "del"
                          ? "bg-red-500/10 text-red-400"
                          : line.type === "add"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "text-gray-500"
                      }`}
                    >
                      <span className="w-8 text-right text-gray-600 select-none">
                        {line.num}
                      </span>
                      <span className="w-4 select-none">
                        {line.type === "del"
                          ? "-"
                          : line.type === "add"
                          ? "+"
                          : " "}
                      </span>
                      <span className="flex-1 whitespace-pre-wrap">
                        {line.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "빨간줄 (삭제)",
                    desc: "- 기호와 빨간 배경은 삭제된 코드입니다. 이전 버전에 있었지만 지금은 없는 줄.",
                  },
                  {
                    label: "초록줄 (추가)",
                    desc: "+ 기호와 초록 배경은 새로 추가된 코드입니다. 이번 커밋에서 새로 작성된 줄.",
                  },
                  {
                    label: "회색줄 (변경 없음)",
                    desc: "변경되지 않은 주변 코드입니다. 맥락을 이해하기 위해 함께 보여줍니다.",
                  },
                ].map((ann, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-slate-800/60 border border-slate-700 p-4"
                  >
                    <p className="text-xs font-bold text-emerald-400 mb-1">
                      {ann.label}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {ann.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 4. Profile Page */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="flex-shrink-0 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                화면 4
              </span>
              <h3 className="text-2xl font-bold text-white">
                프로필 페이지 — 개발 포트폴리오
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 rounded-2xl bg-slate-800 border border-slate-600 overflow-hidden">
                {/* Profile header */}
                <div className="p-6 flex items-start gap-4 border-b border-slate-700">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    S
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">
                      Student Name
                    </p>
                    <p className="text-sm text-gray-400">@student-name</p>
                    <p className="text-xs text-gray-500 mt-1">
                      기계공학과 | 바이브코딩 수강생 | 열전달에 관심 있습니다
                    </p>
                  </div>
                </div>

                {/* Contribution graph (잔디) */}
                <div className="p-6 border-b border-slate-700">
                  <p className="text-sm font-bold text-white mb-3">
                    Contribution Graph (잔디)
                  </p>
                  <div className="grid grid-cols-[repeat(26,1fr)] gap-1">
                    {contributionColors.map((color, i) => (
                        <div
                          key={i}
                          className={`w-full aspect-square rounded-sm ${color}`}
                        />
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-600 mt-2">
                    초록색이 진할수록 그날 커밋을 많이 한 것입니다
                  </p>
                </div>

                {/* Pinned repos */}
                <div className="p-6">
                  <p className="text-sm font-bold text-white mb-3">
                    Pinned Repositories
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        name: "heat-calculator",
                        desc: "뉴턴 냉각법칙 열전달 계산기",
                        lang: "JavaScript",
                        langColor: "bg-yellow-400",
                      },
                      {
                        name: "my-first-repo",
                        desc: "첫 번째 GitHub 저장소",
                        lang: "HTML",
                        langColor: "bg-orange-400",
                      },
                    ].map((repo, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-slate-600 p-3"
                      >
                        <p className="text-xs text-cyan-400 font-bold">
                          {repo.name}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-1">
                          {repo.desc}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <div
                            className={`w-2 h-2 rounded-full ${repo.langColor}`}
                          />
                          <span className="text-[10px] text-gray-500">
                            {repo.lang}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "프로필 사진 & 소개",
                    desc: "면접관이 가장 먼저 보는 곳. 간단한 자기소개와 관심 분야를 적으세요.",
                  },
                  {
                    label: "잔디 (Contribution Graph)",
                    desc: "매일 커밋하면 초록색 칸이 채워집니다. '꾸준함'을 보여주는 가장 직관적인 지표.",
                  },
                  {
                    label: "Pinned Repositories",
                    desc: "자신이 가장 자랑하고 싶은 프로젝트를 최대 6개까지 고정할 수 있습니다.",
                  },
                  {
                    label: "포트폴리오 효과",
                    desc: "코딩 수업 과제물이 자연스럽게 포트폴리오가 됩니다. 취업 시 큰 장점!",
                  },
                ].map((ann, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-slate-800/60 border border-slate-700 p-4"
                  >
                    <p className="text-xs font-bold text-emerald-400 mb-1">
                      {ann.label}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {ann.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Portfolio message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 p-8 text-center">
            <p className="text-3xl font-bold text-white mb-4">
              GitHub = 여러분의 개발 포트폴리오
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              취업할 때 면접관이 가장 먼저 보는 곳입니다.
              <br />
              지금부터 하나씩 채워나가면, 졸업할 때 훌륭한 포트폴리오가 완성됩니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

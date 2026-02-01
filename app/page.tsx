"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

/* ── Animated Text (reused from Hero) ────────────────────────── */
function AnimatedText({ text, delay }: { text: string; delay: number }) {
  return (
    <span>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.3, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.3, delay: delay + i * 0.025, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Lecture data ─────────────────────────────────────────────── */
const lectures = [
  { id: 1, title: "프로그래밍의 진화와 바이브코딩", subtitle: "기계어에서 자연어까지 — 새로운 패러다임", ready: true },
  { id: 2, title: "AI Agent & 환경 설정", subtitle: "Claude, ChatGPT 비교 & Claude Code 설치", ready: true },
  { id: 3, title: "프롬프트 엔지니어링", subtitle: "AI에게 공학 문제를 정확히 전달하기", ready: true },
  { id: 4, title: "Git & 버전 관리", subtitle: "AI가 만든 코드를 안전하게 관리하는 법", ready: true },
  { id: 5, title: "공학 계산기 만들기", subtitle: "열전달·유체역학 계산기를 AI로 처음부터 끝까지", ready: true },
  { id: 6, title: "데이터 시각화", subtitle: "실험 데이터를 인터랙티브 대시보드로 만들기", ready: true },
  { id: 7, title: "AI가 만든 코드 이해하기", subtitle: "코드 검증, 디버깅 대화, 결과 해석의 기술", ready: false },
  { id: 8, title: "웹앱 심화: 반응형 UI", subtitle: "모바일·태블릿에서도 작동하는 공학 도구 만들기", ready: false },
  { id: 9, title: "API 활용 & 외부 데이터", subtitle: "공공 데이터·센서 데이터를 AI로 연동하기", ready: false },
  { id: 10, title: "AI 기능 통합", subtitle: "LLM API로 공학 Q&A 도구 만들기", ready: false },
  { id: 11, title: "시뮬레이션 & 수치해석", subtitle: "AI로 미분방정식 풀이와 결과 시각화", ready: false },
  { id: 12, title: "자동화 & 워크플로우", subtitle: "반복 업무를 AI 스크립트로 자동화하기", ready: false },
  { id: 13, title: "배포 & 포트폴리오", subtitle: "Vercel 배포, 나만의 공학 포트폴리오 구축", ready: false },
  { id: 14, title: "바이브코딩의 미래", subtitle: "AI 코딩의 한계, 윤리, 그리고 앞으로의 방향", ready: false },
  { id: 15, title: "기말 시험", subtitle: "온라인 시험 — 바이브코딩 종합 평가", ready: true, isExam: true },
];

const career = [
  { year: "2008-2011", label: "B.S. 서울대학교" },
  { year: "2011-2013", label: "M.S. 서울대학교" },
  { year: "2014-2018", label: "Ph.D. NTNU (노르웨이)" },
  { year: "2018-2021", label: "연구교수, 제주대학교" },
  { year: "2022", label: "연구조교수, 서울대학교" },
  { year: "2022-현재", label: "조교수, 인하대학교" },
];

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("mftel-unlocked") === "true") {
      setUnlocked(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === "MFTEL") {
      setUnlocked(true);
      sessionStorage.setItem("mftel-unlocked", "true");
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* ───────── Hero / Landing ───────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background expanding circle */}
        <motion.div
          className="absolute rounded-full z-0"
          style={{
            position: "absolute", top: "50%", left: "50%", x: "-50%", y: "-50%",
            background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #134e4a 100%)",
          }}
          initial={{ width: 0, height: 0 }}
          animate={{ width: "250vmax", height: "250vmax" }}
          transition={{ duration: 5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Blobs */}
        <div className="absolute inset-0 z-[1]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3" />
        </div>

        {showContent && (
          <div className="container relative z-10 mx-auto px-4 text-center">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-gray-300">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                2026 Fall Semester
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-3 leading-[1.1]">
              <AnimatedText text="바이브코딩" delay={0.1} />
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
              <AnimatedText text="기초" delay={0.45} />
            </h2>

            <motion.p
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              AI와 함께하는 새로운 코딩 패러다임
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <a
                href="#instructor"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/25 hover:scale-105"
              >
                강의 시작하기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </a>
            </motion.div>
          </div>
        )}
      </section>

      {/* ───────── Instructor ───────── */}
      <section id="instructor" className="relative py-24 bg-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
              Instructor
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">강사 소개</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row gap-8 items-center md:items-start"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-6xl font-bold shadow-xl shadow-violet-500/20">
                  P
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-white mb-1">박일웅 (Il Woong Park)</h3>
                <p className="text-lg text-violet-400 mb-4">조교수, 인하대학교 기계공학과</p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  다상유동 및 열공학 연구실(MFTEL)을 이끌고 있으며, 열에너지 저장, 비등 열전달, 원자로 안전 등을 연구하고 있습니다.
                  AI를 활용한 공학 교육의 새로운 방향을 모색하며, 이번 강의를 통해 바이브코딩의 기초를 전달합니다.
                </p>

                {/* Career Timeline */}
                <div className="space-y-3">
                  {career.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />
                      <span className="text-sm text-violet-400 font-mono w-24 flex-shrink-0">{item.year}</span>
                      <span className="text-gray-300 text-sm">{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                  <motion.a
                    href="https://mftel.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-lg">🔬</span>
                    MFTEL Lab
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm text-gray-300">
                    <span>🏫</span>
                    인하대학교
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── Lecture List ───────── */}
      <section id="lectures" className="relative py-24 bg-slate-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2" />
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-3xl translate-x-1/2" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
              Curriculum
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">강의 목록</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              14주 강의 + 기말 시험으로 구성되어 있습니다. 강의를 선택해 내용을 확인하세요.
            </p>
          </motion.div>

          {!unlocked && (
            <motion.div
              className="max-w-md mx-auto text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  <p className="text-gray-400 text-sm">2주차부터 접근하려면 패스워드를 입력하세요.</p>
                </div>
                <form onSubmit={handlePasswordSubmit} className="flex gap-2">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className={`flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors text-center tracking-widest`}
                    style={shake ? { animation: "shake 0.5s ease-in-out" } : {}}
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
                  >
                    Enter
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lectures.map((lec, i) => (
              <motion.div
                key={lec.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                {"isExam" in lec && lec.isExam ? (
                  <div
                    className="block p-5 rounded-2xl bg-gradient-to-br from-rose-500/10 to-amber-500/5 border-2 border-rose-500/20 opacity-60 cursor-not-allowed"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/50 to-amber-500/50 flex items-center justify-center text-white font-bold text-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-400 truncate">
                          {lec.title}
                        </h3>
                        <p className="text-sm text-rose-400/40 mt-0.5 truncate">{lec.subtitle}</p>
                        <p className="text-xs text-gray-600 mt-1">시험 기간에 활성화됩니다</p>
                      </div>
                    </div>
                  </div>
                ) : lec.ready && (lec.id === 1 || unlocked) ? (
                  <Link
                    href={`/lecture/${lec.id}`}
                    className="group block p-5 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 border border-violet-500/30 hover:border-violet-400/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm">
                        {lec.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white group-hover:text-violet-300 transition-colors truncate">
                          {lec.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-0.5 truncate">{lec.subtitle}</p>
                      </div>
                      <svg className="w-5 h-5 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ) : lec.ready && !unlocked ? (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 border border-slate-700/50 opacity-50 cursor-not-allowed">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-gray-400 font-bold text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-400 truncate">{lec.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5 truncate">{lec.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-slate-800/30 border border-slate-700/50 opacity-60">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-gray-400 font-bold text-sm">
                        {lec.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-400 truncate">{lec.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5 truncate">{lec.subtitle}</p>
                      </div>
                      <span className="flex-shrink-0 mt-1 px-2 py-0.5 rounded-full bg-slate-700/50 text-[10px] text-gray-500 uppercase tracking-wider">
                        soon
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            2026 Fall Semester | 바이브코딩 기초 | 인하대학교
          </p>
        </div>
      </footer>
    </main>
  );
}

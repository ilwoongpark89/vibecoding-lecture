"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "바이브코딩(Vibe Coding)의 핵심 개념으로 가장 적절한 것은?",
    options: [
      "코드를 한 줄씩 직접 타이핑하는 전통적 프로그래밍",
      "AI에게 자연어로 의도를 전달하여 프로그램을 만드는 방식",
      "바이너리 코드를 직접 작성하는 저수준 프로그래밍",
      "GUI 기반 드래그 앤 드롭 프로그래밍",
    ],
    correct: 1,
    explanation:
      "바이브코딩은 AI에게 자연어로 원하는 기능을 설명하면, AI가 코드를 생성해주는 새로운 프로그래밍 패러다임입니다.",
    category: "바이브코딩 기초",
  },
  {
    id: 2,
    question: "Claude Code와 Claude (claude.ai)의 가장 큰 차이점은?",
    options: [
      "Claude Code는 무료이고 Claude는 유료이다",
      "Claude Code는 터미널에서 실행되며 로컬 파일에 직접 접근할 수 있다",
      "Claude는 코딩만 가능하고 Claude Code는 대화만 가능하다",
      "둘은 완전히 동일한 서비스이다",
    ],
    correct: 1,
    explanation:
      "Claude Code는 터미널(CLI) 기반으로 로컬 파일 시스템에 직접 접근하여 파일을 읽고, 수정하고, 명령어를 실행할 수 있습니다.",
    category: "AI Agent",
  },
  {
    id: 3,
    question: "열전달 계산기를 바이브코딩으로 만들 때, AI에게 전달할 프롬프트로 가장 효과적인 것은?",
    options: [
      "열전달 계산기 만들어줘",
      "뉴턴의 냉각 법칙(q = hA△T)을 기반으로, 열전달 계수(h), 면적(A), 온도차(△T)를 입력하면 열유속을 계산하고 결과를 차트로 보여주는 웹 계산기를 만들어줘",
      "공학 프로그램 하나 만들어줘",
      "heat transfer please",
    ],
    correct: 1,
    explanation:
      "구체적인 물리 법칙, 입력/출력 변수, 시각화 방식을 명시하는 것이 프롬프트 엔지니어링의 핵심입니다. 모호한 요청은 원하는 결과를 얻기 어렵습니다.",
    category: "프롬프트 엔지니어링",
  },
  {
    id: 4,
    question: "다음 중 Git에서 팀 프로젝트 협업 시 올바른 워크플로우는?",
    options: [
      "main 브랜치에 직접 push한다",
      "feature 브랜치를 만들고, 작업 후 Pull Request를 통해 코드 리뷰 후 merge한다",
      "각자 별도의 저장소에서 작업하고 이메일로 코드를 공유한다",
      "한 명만 코드를 작성하고 나머지는 문서만 담당한다",
    ],
    correct: 1,
    explanation:
      "Feature branch → Pull Request → Code Review → Merge가 팀 협업의 표준 워크플로우입니다.",
    category: "Git 협업",
  },
  {
    id: 5,
    question: "CFD 시뮬레이션 결과를 웹에서 시각화할 때 적합한 접근 방식은?",
    options: [
      "시뮬레이션 결과를 스크린샷으로 찍어서 이미지로 올린다",
      "결과 데이터를 JSON으로 변환 후 D3.js나 Plotly 같은 라이브러리로 인터랙티브 시각화를 구현한다",
      "시뮬레이션 소프트웨어를 웹 브라우저에 설치한다",
      "결과를 텍스트 파일로 변환하여 그대로 출력한다",
    ],
    correct: 1,
    explanation:
      "시뮬레이션 데이터를 JSON 등의 웹 친화적 포맷으로 변환하고, 시각화 라이브러리를 활용하면 인터랙티브한 결과 탐색이 가능합니다.",
    category: "시뮬레이션 시각화",
  },
  {
    id: 6,
    question: "실험 데이터 관리 시스템을 구축할 때, 데이터베이스를 사용하는 가장 큰 이유는?",
    options: [
      "Excel보다 화면이 예쁘기 때문에",
      "데이터의 구조화된 저장, 빠른 검색, 동시 접근 제어, 백업이 가능하기 때문에",
      "교수님이 시켜서",
      "용량이 더 적기 때문에",
    ],
    correct: 1,
    explanation:
      "데이터베이스는 대량의 실험 데이터를 체계적으로 관리하고, 여러 연구원이 동시에 접근하며, 데이터 무결성을 보장합니다.",
    category: "데이터베이스",
  },
  {
    id: 7,
    question: "Vercel로 웹 애플리케이션을 배포할 때의 장점이 아닌 것은?",
    options: [
      "GitHub 저장소와 연동하면 push할 때 자동 배포된다",
      "무료 플랜으로 프로토타입 배포가 가능하다",
      "서버 하드웨어를 직접 관리해야 한다",
      "HTTPS(SSL)가 자동으로 제공된다",
    ],
    correct: 2,
    explanation:
      "Vercel은 서버리스 플랫폼으로, 서버 하드웨어를 직접 관리할 필요가 없습니다. 이것이 클라우드 배포의 핵심 장점입니다.",
    category: "배포",
  },
  {
    id: 8,
    question: "LLM API를 활용한 공학 Q&A 챗봇에서, '환각(hallucination)' 문제를 줄이기 위한 방법은?",
    options: [
      "AI의 답변을 무조건 신뢰한다",
      "RAG(검색 증강 생성)를 활용하여 신뢰할 수 있는 공학 데이터를 참조하게 한다",
      "질문을 최대한 모호하게 작성한다",
      "응답 속도를 최대한 빠르게 설정한다",
    ],
    correct: 1,
    explanation:
      "RAG(Retrieval-Augmented Generation)는 신뢰할 수 있는 문서나 데이터를 검색하여 LLM의 응답에 근거를 제공함으로써 환각을 줄입니다.",
    category: "AI 기능 통합",
  },
  {
    id: 9,
    question: "유체역학에서 레이놀즈 수(Re)의 물리적 의미로 올바른 것은?",
    options: [
      "유체의 온도와 압력의 비",
      "관성력과 점성력의 비",
      "유속과 음속의 비",
      "밀도와 점도의 합",
    ],
    correct: 1,
    explanation:
      "레이놀즈 수(Re = ρvL/μ)는 관성력과 점성력의 비를 나타내며, 유동이 층류인지 난류인지 판별하는 무차원수입니다.",
    category: "공학 기초",
  },
  {
    id: 10,
    question: "팀 프로젝트에서 코드 리뷰의 목적으로 가장 적절하지 않은 것은?",
    options: [
      "버그를 사전에 발견하기 위해",
      "코드 품질과 일관성을 유지하기 위해",
      "팀원의 실수를 지적하여 비난하기 위해",
      "서로의 코드를 이해하고 지식을 공유하기 위해",
    ],
    correct: 2,
    explanation:
      "코드 리뷰는 비난이 아닌, 코드 품질 향상과 지식 공유를 위한 건설적인 협업 과정입니다.",
    category: "팀 프로젝트",
  },
];

function getGrade(score: number, total: number) {
  const pct = (score / total) * 100;
  if (pct >= 90) return { grade: "A+", color: "text-emerald-400", msg: "Outstanding! 바이브코딩 마스터!" };
  if (pct >= 80) return { grade: "A", color: "text-emerald-400", msg: "Excellent! 훌륭한 성적입니다!" };
  if (pct >= 70) return { grade: "B+", color: "text-cyan-400", msg: "Good job! 잘 따라오셨습니다!" };
  if (pct >= 60) return { grade: "B", color: "text-cyan-400", msg: "Not bad! 조금 더 복습하면 완벽!" };
  if (pct >= 50) return { grade: "C+", color: "text-amber-400", msg: "복습이 필요합니다!" };
  return { grade: "F", color: "text-rose-400", msg: "강의를 다시 한번 확인해보세요!" };
}

export default function ExamPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");

  const q = questions[currentQ];
  const score = submitted ? answers.reduce((acc: number, a, i) => acc + (a === questions[i].correct ? 1 : 0), 0) : 0;
  const answered = answers.filter((a) => a !== null).length;

  const handleSelect = (optIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = optIndex;
    setAnswers(newAnswers);
    setShowExplanation(false);
  };

  const handleSubmit = () => {
    if (answered < questions.length) return;
    setSubmitted(true);
    setCurrentQ(0);
  };

  const gradeInfo = getGrade(score, questions.length);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">강의 목록</span>
          </Link>
          <span className="text-sm text-gray-500">Week 15 — 기말 시험</span>
        </div>
      </nav>

      <div className="pt-14">
        {!examStarted ? (
          /* ── Intro Screen ── */
          <section className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-lg w-full"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 mb-6 shadow-xl shadow-rose-500/20">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold mb-2">기말 시험</h1>
                <p className="text-gray-400">바이브코딩 기초 — 종합 평가</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700 mb-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  <span>총 {questions.length}문항 (객관식)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span>제출 후 해설과 점수를 바로 확인</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  <span>범위: 1주~14주 전체</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="이름"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
                <input
                  type="text"
                  placeholder="학번"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              <button
                onClick={() => {
                  if (studentName.trim() && studentId.trim()) setExamStarted(true);
                }}
                disabled={!studentName.trim() || !studentId.trim()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed hover:from-rose-400 hover:to-amber-400 transition-all shadow-lg shadow-rose-500/20"
              >
                시험 시작하기
              </button>
            </motion.div>
          </section>
        ) : submitted ? (
          /* ── Result Screen ── */
          <section className="min-h-[calc(100vh-56px)] py-16 px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <div className={`text-8xl font-bold mb-4 ${gradeInfo.color}`}>{gradeInfo.grade}</div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {studentName}님의 성적
                </h2>
                <p className="text-xl text-gray-400 mb-2">
                  {questions.length}문항 중 <span className={gradeInfo.color}>{score}문항</span> 정답
                </p>
                <p className="text-lg text-gray-500">{gradeInfo.msg}</p>
              </motion.div>

              {/* Review Questions */}
              <div className="space-y-6">
                {questions.map((question, qi) => {
                  const isCorrect = answers[qi] === question.correct;
                  return (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: qi * 0.05 }}
                      className={`p-6 rounded-2xl border ${isCorrect ? "bg-emerald-500/5 border-emerald-500/30" : "bg-rose-500/5 border-rose-500/30"}`}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"}`}>
                          {isCorrect ? "O" : "X"}
                        </span>
                        <div>
                          <span className="text-xs text-gray-500 font-medium">{question.category}</span>
                          <p className="text-white font-medium">{question.question}</p>
                        </div>
                      </div>
                      <div className="ml-10 space-y-2">
                        {question.options.map((opt, oi) => (
                          <div
                            key={oi}
                            className={`px-4 py-2 rounded-lg text-sm ${
                              oi === question.correct
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : oi === answers[qi] && oi !== question.correct
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 line-through"
                                : "text-gray-500"
                            }`}
                          >
                            {opt}
                          </div>
                        ))}
                        <div className="mt-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                          <p className="text-sm text-gray-400">
                            <span className="text-cyan-400 font-medium">해설: </span>
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all"
                >
                  강의 목록으로 돌아가기
                </Link>
              </div>
            </div>
          </section>
        ) : (
          /* ── Exam Screen ── */
          <section className="min-h-[calc(100vh-56px)] py-16 px-4">
            <div className="max-w-3xl mx-auto">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">
                    {currentQ + 1} / {questions.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    {answered}문항 답변 완료
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                {/* Question number pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setCurrentQ(i); setShowExplanation(false); }}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        i === currentQ
                          ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white scale-110"
                          : answers[i] !== null
                          ? "bg-slate-700 text-white"
                          : "bg-slate-800 text-gray-500"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQ}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-3">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-gray-400">{q.category}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed">
                    Q{q.id}. {q.question}
                  </h2>

                  <div className="space-y-3">
                    {q.options.map((opt, oi) => (
                      <motion.button
                        key={oi}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSelect(oi)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                          answers[currentQ] === oi
                            ? "bg-gradient-to-r from-rose-500/20 to-amber-500/20 border-rose-500/50 text-white"
                            : "bg-slate-800/50 border-slate-700 text-gray-300 hover:bg-slate-800 hover:border-slate-600"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                            answers[currentQ] === oi
                              ? "bg-rose-500 text-white"
                              : "bg-slate-700 text-gray-400"
                          }`}>
                            {String.fromCharCode(65 + oi)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={() => { setCurrentQ(Math.max(0, currentQ - 1)); setShowExplanation(false); }}
                  disabled={currentQ === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-gray-300 disabled:opacity-30 hover:bg-slate-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  이전
                </button>

                {currentQ === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={answered < questions.length}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold disabled:opacity-40 hover:from-rose-400 hover:to-amber-400 transition-all"
                  >
                    제출하기
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </button>
                ) : (
                  <button
                    onClick={() => { setCurrentQ(Math.min(questions.length - 1, currentQ + 1)); setShowExplanation(false); }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-gray-300 hover:bg-slate-700 transition-colors"
                  >
                    다음
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

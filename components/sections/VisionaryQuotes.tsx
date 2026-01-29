"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const visionaries = [
  {
    id: "jobs",
    name: "Steve Jobs",
    year: "1995",
    role: "Apple 공동 창업자",
    videoId: "BRTOlPdyPYU",
    startTime: 0,
    quote:
      "Everybody in this country should learn how to program a computer, because it teaches you how to think.",
    quoteKo:
      "이 나라의 모든 사람이 컴퓨터 프로그래밍을 배워야 합니다. 프로그래밍은 생각하는 법을 가르쳐주기 때문입니다.",
    context:
      "1995년, PBS 다큐멘터리 'Triumph of the Nerds' 인터뷰에서. 당시 Apple에서 쫓겨난 후 NeXT를 운영하던 시기. 프로그래밍을 '리버럴 아트(교양)'로 보았고, 법대에 가는 것처럼 사고방식 자체를 바꿔준다고 말했다.",
    keyMessage: "프로그래밍 = 사고력 훈련",
    color: "from-gray-400 to-gray-600",
    bgColor: "bg-gray-500/10",
    borderColor: "border-gray-500/20",
    accentColor: "text-gray-300",
  },
  {
    id: "huang",
    name: "Jensen Huang",
    year: "2024",
    role: "NVIDIA 창업자 & CEO",
    videoId: "8Pm2xEViNIo",
    startTime: 0,
    quote:
      "It is our job to create computing technology such that nobody has to program. The programming language is human. Everybody in the world is now a programmer.",
    quoteKo:
      "아무도 프로그래밍을 할 필요가 없는 컴퓨팅 기술을 만드는 것이 우리의 일입니다. 프로그래밍 언어는 인간의 언어입니다. 세상의 모든 사람이 이제 프로그래머입니다.",
    context:
      "2024년 2월, 두바이 World Government Summit에서. AI의 발전으로 자연어가 곧 프로그래밍 언어가 되었으며, 더 이상 아이들에게 코딩을 배우라고 할 필요가 없다고 선언. 대신 도메인 전문성(생물학, 농업, 제조 등)이 더 중요하다고 강조했다.",
    keyMessage: "프로그래밍 언어 = 인간의 언어",
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    accentColor: "text-emerald-300",
  },
];

export default function VisionaryQuotes() {
  const [activeTab, setActiveTab] = useState(0);
  const v = visionaries[activeTab];

  return (
    <section className="relative py-24 bg-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            Two Visions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            두 거인의{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-emerald-400">
              시대를 관통하는 메시지
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            1995년 Steve Jobs와 2024년 Jensen Huang — 30년의 시차를 두고 프로그래밍의 의미를 재정의합니다
          </p>
        </motion.div>

        {/* Tab selector */}
        <div className="flex gap-3 mb-10 justify-center flex-wrap">
          {visionaries.map((vis, i) => (
            <button
              key={vis.id}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl text-sm font-medium transition-all ${
                activeTab === i
                  ? `${vis.bgColor} ${vis.borderColor} border ${vis.accentColor}`
                  : "bg-slate-800 border border-slate-700 text-gray-400 hover:bg-slate-700"
              }`}
            >
              <span className="text-lg font-bold">{vis.year}</span>
              <span>{vis.name}</span>
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          {/* Quote card */}
          <div className={`rounded-2xl ${v.bgColor} border ${v.borderColor} p-8 mb-8`}>
            <div className="flex items-center gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">{v.name}</h3>
                <p className="text-sm text-gray-400">
                  {v.role} &middot; {v.year}
                </p>
              </div>
              <span
                className={`ml-auto px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${v.color} text-white`}
              >
                {v.keyMessage}
              </span>
            </div>

            {/* English quote */}
            <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-4 border-l-4 border-white/20 pl-6">
              &ldquo;{v.quote}&rdquo;
            </blockquote>

            {/* Korean translation */}
            <p className="text-base text-gray-400 leading-relaxed pl-6 mb-6">
              {v.quoteKo}
            </p>

            {/* Context */}
            <div className="rounded-xl bg-slate-900/50 border border-slate-700 p-4">
              <p className="text-xs text-gray-500 font-medium mb-1">배경</p>
              <p className="text-sm text-gray-400 leading-relaxed">{v.context}</p>
            </div>
          </div>

          {/* YouTube embed */}
          <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-800">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${v.videoId}?rel=0`}
                title={`${v.name} (${v.year})`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-400">
                {activeTab === 0
                  ? "Steve Jobs: The Lost Interview (1995) — Robert Cringley와의 인터뷰"
                  : "Jensen Huang at World Government Summit 2024 — AI 시대의 프로그래밍"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Comparison / Synthesis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            30년의 변화, 하나의 결론
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Jobs column */}
            <div className="rounded-xl bg-gray-500/5 border border-gray-500/20 p-6">
              <p className="text-xs font-bold text-gray-400 mb-3">1995 — Steve Jobs</p>
              <p className="text-lg font-bold text-white mb-2">
                &ldquo;코딩을 배워라&rdquo;
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                프로그래밍은 모든 사람이 배워야 할 <span className="text-white font-medium">사고력 훈련</span>이다.
                컴퓨터 과학은 교양(liberal art)이다.
              </p>
            </div>

            {/* Arrow / middle */}
            <div className="rounded-xl bg-gradient-to-b from-gray-500/5 to-emerald-500/5 border border-slate-700 p-6 flex flex-col items-center justify-center text-center">
              <p className="text-xs font-bold text-blue-400 mb-3">2024 — 그 사이 30년</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-blue-400">&#x2192;</span> 인터넷 & 모바일 혁명
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-violet-400">&#x2192;</span> 머신러닝 & 딥러닝
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-emerald-400">&#x2192;</span> LLM & 생성형 AI
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500">프로그래밍의 추상화 수준이<br />계속 높아져왔다</p>
            </div>

            {/* Huang column */}
            <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-6">
              <p className="text-xs font-bold text-emerald-400 mb-3">2024 — Jensen Huang</p>
              <p className="text-lg font-bold text-white mb-2">
                &ldquo;코딩을 배울 필요 없다&rdquo;
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                AI가 코딩을 대신하므로 <span className="text-white font-medium">도메인 전문성</span>이 더 중요하다.
                프로그래밍 언어는 이제 인간의 언어다.
              </p>
            </div>
          </div>

          {/* Synthesis */}
          <div className="mt-8 p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-emerald-500/10 border border-violet-500/20 text-center">
            <p className="text-2xl font-bold text-white mb-3">
              두 메시지의 교집합:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                바이브코딩
              </span>
            </p>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed mb-4">
              Jobs가 말한 &ldquo;사고력&rdquo;과 Huang이 말한 &ldquo;도메인 전문성&rdquo;은 같은 것을 가리킵니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
              <div className="rounded-xl bg-slate-900/50 border border-slate-700 p-4">
                <p className="text-sm text-blue-400 font-medium mb-1">Jobs의 시대</p>
                <p className="text-sm text-gray-400">프로그래밍을 배워야 문제를 구조화하고 해결할 수 있었다</p>
              </div>
              <div className="rounded-xl bg-slate-900/50 border border-slate-700 p-4">
                <p className="text-sm text-emerald-400 font-medium mb-1">Huang의 시대 (지금)</p>
                <p className="text-sm text-gray-400">도메인 지식을 가진 사람이 AI에게 자연어로 지시하면 된다</p>
              </div>
            </div>
            <p className="mt-6 text-lg text-amber-400 font-medium">
              기계공학도 여러분은 이미 &ldquo;도메인 전문성&rdquo;을 갖추고 있습니다.<br />
              바이브코딩은 그 전문성을 소프트웨어로 바꾸는 도구입니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

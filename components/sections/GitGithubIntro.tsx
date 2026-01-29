"use client";

import { motion } from "framer-motion";

const sections = [
  {
    id: "analogy",
    badge: "Step 0",
    title: "Git은 '무한 실행취소' 버튼이다",
    blocks: [
      {
        heading: "여러분의 일상에서",
        items: [
          {
            emoji: "📄",
            text: "보고서_최종.docx, 보고서_최종_수정.docx, 보고서_진짜최종.docx",
            label: "파일 복사로 버전 관리",
          },
          {
            emoji: "⌨️",
            text: "Ctrl+Z를 50번 누르면... 어디까지 돌아가는지 모름",
            label: "실행취소의 한계",
          },
          {
            emoji: "📋",
            text: "\"어제 고친 부분이 뭐였지?\" — 기억에 의존",
            label: "변경 이력 없음",
          },
        ],
      },
      {
        heading: "Git이 있으면",
        items: [
          {
            emoji: "📸",
            text: "매 순간을 '스냅샷'으로 저장 — 언제든 정확히 그 시점으로 돌아감",
            label: "무한 실행취소",
          },
          {
            emoji: "📝",
            text: "\"뉴턴 냉각법칙 계산기 추가\" — 왜 바꿨는지 메모까지 남김",
            label: "변경 이유 기록",
          },
          {
            emoji: "🔀",
            text: "\"A방향으로 해볼까, B방향으로 해볼까\" — 둘 다 해보고 나은 걸 선택",
            label: "평행우주 실험",
          },
        ],
      },
    ],
    bottomLine:
      "한 마디로: Git은 프로젝트의 '타임머신'입니다. 모든 변경 사항을 기억하고, 원하는 시점으로 자유롭게 이동할 수 있습니다.",
  },
  {
    id: "git",
    badge: "Step 1",
    title: "Git — 내 컴퓨터의 버전 관리 시스템",
    blocks: [
      {
        heading: "핵심 개념",
        items: [
          {
            emoji: "💻",
            text: "Git은 내 컴퓨터(로컬)에서 동작하는 프로그램입니다. 인터넷 없이도 작동합니다.",
            label: "로컬 프로그램",
          },
          {
            emoji: "📸",
            text: "\"지금 이 상태를 저장해둬\" = commit. 사진을 찍듯이 현재 코드 상태를 기록합니다.",
            label: "커밋 = 스냅샷",
          },
          {
            emoji: "📖",
            text: "커밋이 쌓이면 프로젝트의 '역사책'이 됩니다. 누가, 언제, 왜, 무엇을 바꿨는지 다 기록됩니다.",
            label: "히스토리",
          },
        ],
      },
      {
        heading: "공학도에게 Git이란",
        items: [
          {
            emoji: "🔬",
            text: "실험 노트를 쓰는 것과 같습니다. 모든 과정을 기록하고, 재현 가능하게 만드는 것.",
            label: "실험 노트",
          },
          {
            emoji: "🛡️",
            text: "AI가 코드를 엉뚱하게 바꿔도 이전 상태로 복구할 수 있는 안전장치.",
            label: "안전장치",
          },
          {
            emoji: "🎯",
            text: "MIT, Stanford 등 세계 모든 대학의 CS 수업에서 첫 번째로 가르치는 도구.",
            label: "업계 표준",
          },
        ],
      },
    ],
    bottomLine:
      "Linus Torvalds(리눅스 창시자)가 2005년에 만들었습니다. 전 세계 소프트웨어의 95% 이상이 Git으로 관리됩니다.",
  },
  {
    id: "github",
    badge: "Step 2",
    title: "GitHub — 클라우드 백업 + 공유 플랫폼",
    blocks: [
      {
        heading: "Git vs GitHub",
        items: [
          {
            emoji: "🔧",
            text: "Git = 내 컴퓨터에서 버전을 관리하는 '도구'",
            label: "Git (도구)",
          },
          {
            emoji: "☁️",
            text: "GitHub = Git으로 관리한 코드를 인터넷에 올리는 '서비스' (구글 드라이브 같은 것)",
            label: "GitHub (서비스)",
          },
          {
            emoji: "📌",
            text: "비유: Git = 카메라, GitHub = 사진을 올리는 클라우드 앨범",
            label: "핵심 비유",
          },
        ],
      },
      {
        heading: "GitHub를 쓰는 이유",
        items: [
          {
            emoji: "💾",
            text: "노트북이 고장나도 코드가 살아있음 — 클라우드 백업",
            label: "백업",
          },
          {
            emoji: "🌍",
            text: "어디서든 접속 가능 — 집, 학교, 카페 어디서든 작업 이어가기",
            label: "어디서든 접근",
          },
          {
            emoji: "📋",
            text: "포트폴리오 역할 — 취업할 때 \"제 GitHub 보세요\" 한 마디면 끝",
            label: "포트폴리오",
          },
        ],
      },
    ],
    bottomLine:
      "GitHub는 Microsoft가 2018년에 약 8조원에 인수했습니다. 전 세계 1억 명 이상의 개발자가 사용하는 가장 큰 코드 공유 플랫폼입니다.",
  },
  {
    id: "flow",
    badge: "Step 3",
    title: "작업 → 저장 → 백업, 이게 전부입니다",
    blocks: [
      {
        heading: "3단계로 끝나는 Git + GitHub",
        items: [
          {
            emoji: "1️⃣",
            text: "코드를 수정한다 (AI에게 시켜도 되고, 직접 해도 됨)",
            label: "작업 (Working)",
          },
          {
            emoji: "2️⃣",
            text: "git commit — \"지금 상태를 스냅샷으로 저장\" (내 컴퓨터에만 기록)",
            label: "저장 (Commit)",
          },
          {
            emoji: "3️⃣",
            text: "git push — \"이 스냅샷을 GitHub에도 올려줘\" (클라우드 백업)",
            label: "백업 (Push)",
          },
        ],
      },
      {
        heading: "바이브코딩에서의 실제 워크플로우",
        items: [
          {
            emoji: "💬",
            text: "AI에게 \"열전달 계산기 만들어줘\" → 코드 생성됨",
            label: "AI가 코드 생성",
          },
          {
            emoji: "✅",
            text: "결과를 확인하고 만족 → git commit -m \"열전달 계산기 추가\"",
            label: "만족하면 저장",
          },
          {
            emoji: "☁️",
            text: "git push → GitHub에 백업 완료. 안전!",
            label: "클라우드에 백업",
          },
        ],
      },
    ],
    bottomLine:
      "이게 전부입니다. 복잡한 기능은 나중에 필요할 때 배우면 됩니다. 작업 → 커밋 → 푸시, 이 3단계만 기억하세요.",
  },
];

export default function GitGithubIntro() {
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
            Fundamentals
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Git & GitHub,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              처음부터 이해하기
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            코딩을 모르는 사람도 반드시 알아야 할 현대 소프트웨어의 기본 인프라
          </p>
        </motion.div>

        {/* All sections stacked */}
        <div className="max-w-5xl mx-auto space-y-20">
          {sections.map((sec, si) => (
            <motion.div
              key={sec.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              {/* Section badge + title */}
              <div className="flex items-center gap-3 mb-8">
                <span className="flex-shrink-0 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  {sec.badge}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {sec.title}
                </h3>
              </div>

              {/* Two-column blocks */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {sec.blocks.map((block, bi) => (
                  <div
                    key={bi}
                    className="rounded-2xl bg-slate-800/60 border border-slate-700 p-6"
                  >
                    <h4 className="text-sm font-bold text-emerald-400 mb-5 uppercase tracking-wider">
                      {block.heading}
                    </h4>
                    <div className="space-y-4">
                      {block.items.map((item, ii) => (
                        <div key={ii} className="flex gap-3">
                          <span className="text-2xl flex-shrink-0 mt-0.5">
                            {item.emoji}
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1">
                              {item.label}
                            </p>
                            <p className="text-sm text-gray-300 leading-relaxed">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom line */}
              <div className="rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 p-5 text-center">
                <p className="text-gray-300 leading-relaxed">
                  {sec.bottomLine}
                </p>
              </div>

              {/* Divider between sections (except last) */}
              {si < sections.length - 1 && (
                <div className="flex justify-center mt-12">
                  <div className="w-px h-12 bg-gradient-to-b from-emerald-500/40 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Linus quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="rounded-2xl bg-slate-800/40 border border-slate-700 p-8">
            <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-4 border-l-4 border-emerald-500/40 pl-6">
              &ldquo;Talk is cheap. Show me the code.&rdquo;
            </blockquote>
            <p className="text-gray-400 pl-6 mb-2">
              &ldquo;말은 쉽다. 코드를 보여달라.&rdquo;
            </p>
            <div className="flex items-center gap-3 pl-6 mt-4">
              <div>
                <p className="text-white font-semibold">Linus Torvalds</p>
                <p className="text-sm text-gray-500">
                  Linux & Git 창시자 — Git을 단 10일 만에 만들었다 (2005)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-slate-800/40 border border-slate-700 p-4">
              <p className="text-3xl font-bold text-emerald-400">95%+</p>
              <p className="text-sm text-gray-400 mt-1">
                전 세계 소프트웨어 프로젝트가 Git 사용
              </p>
            </div>
            <div className="rounded-xl bg-slate-800/40 border border-slate-700 p-4">
              <p className="text-3xl font-bold text-cyan-400">1억+</p>
              <p className="text-sm text-gray-400 mt-1">
                GitHub 사용자 수
              </p>
            </div>
            <div className="rounded-xl bg-slate-800/40 border border-slate-700 p-4">
              <p className="text-3xl font-bold text-violet-400">3억+</p>
              <p className="text-sm text-gray-400 mt-1">
                GitHub에 올라온 프로젝트(Repository) 수
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

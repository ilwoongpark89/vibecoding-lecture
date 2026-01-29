"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Template {
  id: number;
  icon: string;
  category: string;
  description: string;
  template: string;
  example: string;
  color: string;
}

const templates: Template[] = [
  {
    id: 1,
    icon: "🔢",
    category: "계산 문제",
    description: "수치 해석, 열역학/유체역학 계산 문제를 풀 때",
    template:
      "[주어진 조건을 모두 나열: 온도, 압력, 유량, 물성치, 형상 치수 등].\n[사용할 공식 또는 상관식을 명시: Dittus-Boelter, Churchill-Chu 등].\n풀이과정을 단계별로 보여주고, 각 단계에서 사용하는 공식과 대입값을 명시해줘.\n최종 답은 SI 단위로, 유효숫자 3자리.\n결과의 물리적 타당성을 검증해줘.",
    example:
      "내경 25mm 원관에 80°C 물이 2m/s로 흐를 때, Dittus-Boelter 상관식(n=0.4, 가열 조건)으로 Nu와 h를 구해줘. 80°C 물 물성치를 명시하고, 풀이과정을 단계별로, SI 단위, 유효숫자 3자리로.",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: 2,
    icon: "📖",
    category: "개념 설명",
    description: "이론적 개념을 직관적으로 이해하고 싶을 때",
    template:
      "너는 [분야] 교수야.\n[개념]을 대학 3학년 기계공학과 학생에게 설명해줘.\n수식은 최소한으로, 물리적 직관을 중심으로.\n실생활 비유 하나 포함.\n핵심을 3문장으로 요약해줘.",
    example:
      "너는 열역학 교수야. '엔트로피'를 대학 3학년 기계공학과 학생에게 설명해줘. 수식은 최소한으로, 물리적 직관을 중심으로. 실생활 비유 하나 포함. 핵심을 3문장으로 요약해줘.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 3,
    icon: "💻",
    category: "코드 생성",
    description: "공학 계산 프로그램이나 시뮬레이션 코드를 작성할 때",
    template:
      "[프로그래밍 언어: Python/MATLAB 등].\n[만들 것: ~를 계산/시뮬레이션/시각화하는 프로그램].\n입력: [입력 변수와 단위].\n출력: [원하는 결과와 형식: 숫자, 그래프, 표 등].\n에러 처리 포함.\n주석은 한국어로.",
    example:
      "Python. 이중관 향류 열교환기의 LMTD와 필요 전열면적을 계산하는 프로그램. 입력: 고온측/저온측 입출구 온도(°C), 총괄열전달계수 U(W/m²·K), 열전달량 Q(W). 출력: LMTD, 필요면적 A. 에러 처리 포함. 주석은 한국어로.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    icon: "🔍",
    category: "설계 검토",
    description: "설계안의 타당성을 검토하고 개선점을 찾을 때",
    template:
      "다음 설계안을 검토해줘: [설계 조건과 사양을 상세히 기술].\n검토 항목:\n(1) 물리적 타당성 — 열역학 법칙, 물성치 범위 위반 여부\n(2) 적용 범위 확인 — 사용된 상관식/공식의 유효 범위\n(3) 개선 제안 3가지 — 성능, 비용, 안전성 관점",
    example:
      "다음 열교환기 설계를 검토해줘: 향류 이중관, 내관 SUS304 φ25×2t, U=500 W/m²·K, 고온측 엔진오일 120→80°C 0.3kg/s, 저온측 냉각수 25°C 0.5kg/s. (1) 물리적 타당성, (2) Dittus-Boelter 적용 범위, (3) 개선 제안 3가지.",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: 5,
    icon: "📝",
    category: "논문/보고서",
    description: "기술 보고서나 논문의 구조를 잡을 때",
    template:
      "[주제]에 대해 기술 보고서 구조를 잡아줘.\n서론-이론배경-방법-결과-결론 형식.\n각 섹션에 들어갈 핵심 포인트를 bullet으로.\n참고할 수 있는 주요 문헌/표준 3개 이상 제안.\n예상 분량: [페이지 수].",
    example:
      "'판형 열교환기의 오염계수가 성능에 미치는 영향'에 대해 기술 보고서 구조를 잡아줘. 서론-이론배경-방법-결과-결론 형식. 각 섹션 핵심 포인트를 bullet으로. 참고 문헌/표준 3개 이상. 예상 분량: A4 15페이지.",
    color: "from-rose-500 to-pink-500",
  },
  {
    id: 6,
    icon: "🐛",
    category: "디버깅",
    description: "코드 오류나 계산 오류를 찾아 수정할 때",
    template:
      "다음 코드에서 [증상: 에러 메시지, 잘못된 결과값 등] 문제가 있어.\n코드:\n[코드 붙여넣기]\n원인을 분석하고, 수정된 코드와 설명을 줘.\n수정 전후 출력 결과를 비교해줘.",
    example:
      "다음 Python 코드에서 Nu 값이 음수로 나오는 문제가 있어.\n코드:\n  Re = rho*V*D/mu\n  Nu = 0.023 * Re**0.8 * Pr**0.4\n  h = Nu * k / D\nrho=998, V=2, D=0.05, mu=0.001, Pr=7.0, k=0.6\n원인 분석하고 수정된 코드와 설명을 줘.",
    color: "from-indigo-500 to-violet-500",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium hover:bg-violet-500/20 transition-colors"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          복사됨!
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          템플릿 복사
        </>
      )}
    </button>
  );
}

export default function PromptTemplates() {
  return (
    <section className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
            Template Library
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            공학 프롬프트{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              템플릿
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            상황별 베스트 프롬프트 모음집. 복사해서 바로 쓰세요.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {templates.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl bg-slate-800/50 border border-slate-700 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{t.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${t.color} text-white`}
                        >
                          {t.id}
                        </span>
                        <h3 className="text-lg font-bold text-white">{t.category}</h3>
                      </div>
                      <p className="text-sm text-gray-400">{t.description}</p>
                    </div>
                  </div>
                  <CopyButton text={t.template} />
                </div>
              </div>

              {/* Template text */}
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-[10px] text-violet-400 uppercase tracking-wider font-medium mb-2">
                    템플릿
                  </p>
                  <div className="rounded-xl bg-violet-500/5 border border-violet-500/20 p-4">
                    <pre className="text-sm text-violet-200/90 font-mono whitespace-pre-wrap leading-relaxed">
                      {t.template}
                    </pre>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-cyan-400 uppercase tracking-wider font-medium mb-2">
                    이렇게 쓰면
                  </p>
                  <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-4">
                    <pre className="text-sm text-cyan-200/80 font-mono whitespace-pre-wrap leading-relaxed">
                      {t.example}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-4xl mx-auto text-center bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 rounded-2xl p-8"
        >
          <p className="text-xl text-white font-semibold">
            이 템플릿들을{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              자기 분야에 맞게 변형
            </span>
            해서 쓰세요.
          </p>
          <p className="text-gray-400 mt-3">
            템플릿은 출발점일 뿐입니다. 자신의 도메인 지식을 넣을수록 AI의 답변 품질이 올라갑니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

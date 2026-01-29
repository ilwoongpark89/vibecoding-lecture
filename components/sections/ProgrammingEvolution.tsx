"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface CodeLine {
  code: string;
  explain: string;
}

interface Era {
  year: string;
  title: string;
  desc: string;
  lines: CodeLine[];
  color: string;
  icon: React.ReactNode;
  impact: string;
  highlight?: boolean;
  output: { type: "terminal" | "plot" | "browser" | "terminal+plot"; content: string[] };
  image?: { url: string; alt: string; credit: string };
}

const eras: Era[] = [
  {
    year: "1940–50s",
    title: "기계어 & 어셈블리",
    desc: "컴퓨터에게 0과 1로 직접 명령. 펀치카드에 구멍을 뚫어 프로그램을 입력하던 시대.",
    lines: [
      { code: "MOV AX, 5", explain: "AX 레지스터(CPU 임시 저장소)에 숫자 5를 넣어라" },
      { code: "MOV BX, 3", explain: "BX 레지스터에 숫자 3을 넣어라" },
      { code: "ADD AX, BX", explain: "AX와 BX를 더해서 AX에 저장 → 결과: 8" },
      { code: "INT 21h", explain: "운영체제에게 '결과를 화면에 출력하라'고 요청 (인터럽트)" },
    ],
    color: "from-gray-500 to-slate-500",
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
    impact: "기계공학 영향: 초기 수치 해석의 시작",
    output: { type: "terminal", content: ["AX = 0005", "BX = 0003", "AX = 0008  (ADD result)", "", "Program terminated normally."] },
    image: {
      url: "/images/eras/eniac.jpg",
      alt: "ENIAC — 최초의 범용 전자 컴퓨터 (1945). 방 하나를 가득 채운 30톤짜리 기계.",
      credit: "U.S. Army Photo, Public Domain",
    },
  },
  {
    year: "1957",
    title: "Fortran 탄생",
    desc: "IBM이 개발한 최초의 고급 프로그래밍 언어. 'Formula Translation'의 약자로, 수학 공식을 직접 코드로 옮길 수 있게 됨.",
    lines: [
      { code: "PROGRAM HEAT", explain: "프로그램의 이름을 'HEAT'로 선언 — 프로그램의 시작점" },
      { code: "  REAL :: H, A, DT, Q", explain: "실수형 변수 4개를 선언 (열전달 계수, 면적, 온도차, 열유속)" },
      { code: "  H = 100.0", explain: "열전달 계수 h = 100 W/(m²·K)" },
      { code: "  A = 0.5", explain: "열전달 면적 A = 0.5 m²" },
      { code: "  DT = 50.0", explain: "온도차 ΔT = 50 K" },
      { code: '  Q = H * A * DT', explain: "뉴턴의 냉각 법칙: q = h × A × ΔT → 2500 W" },
      { code: '  PRINT *, "Q =", Q', explain: "계산 결과를 화면에 출력" },
      { code: "END PROGRAM HEAT", explain: "프로그램 종료" },
    ],
    color: "from-blue-500 to-indigo-500",
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    impact: "기계공학 영향: FEM, CFD 시뮬레이션의 기반 언어",
    output: { type: "terminal", content: ["$ ./heat", " Q =   2500.0000", "", "Program ended."] },
    image: {
      url: "/images/eras/ibm704.jpg",
      alt: "IBM 704 — Fortran이 처음 실행된 메인프레임 (1957). NASA에서도 사용.",
      credit: "NASA, Public Domain",
    },
  },
  {
    year: "1972",
    title: "C 언어",
    desc: "Dennis Ritchie가 Bell Labs에서 개발. 하드웨어에 가까우면서도 생산성이 높아 운영체제(UNIX)와 임베디드 시스템의 표준이 됨.",
    lines: [
      { code: "#include <stdio.h>", explain: "표준 입출력 라이브러리를 불러옴 (printf 사용을 위해)" },
      { code: "", explain: "" },
      { code: "int main() {", explain: "프로그램의 시작점인 main 함수 선언" },
      { code: "  double h = 100.0;", explain: "실수형 변수 h (열전달 계수) 선언 및 값 대입" },
      { code: "  double A = 0.5;", explain: "면적 A = 0.5 m²" },
      { code: "  double dT = 50.0;", explain: "온도차 ΔT = 50 K" },
      { code: "  double q = h * A * dT;", explain: "열유속 계산: q = h × A × ΔT" },
      { code: "", explain: "" },
      { code: '  printf("q = %.2f W\\n", q);', explain: "결과를 소수점 2자리까지 출력 (%.2f는 형식 지정자)" },
      { code: "  return 0;", explain: "프로그램이 정상 종료되었음을 운영체제에 알림" },
      { code: "}", explain: "main 함수의 끝" },
    ],
    color: "from-slate-400 to-gray-500",
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    impact: "기계공학 영향: 임베디드 시스템, 제어 프로그래밍",
    output: { type: "terminal", content: ["$ gcc heat.c -o heat && ./heat", "q = 2500.00 W"] },
    image: {
      url: "/images/eras/pdp11.jpg",
      alt: "PDP-11 — C 언어와 UNIX가 탄생한 미니컴퓨터 (1970s, Bell Labs)",
      credit: "Wikimedia Commons, CC BY-SA 3.0",
    },
  },
  {
    year: "1980s",
    title: "MATLAB",
    desc: "Cleve Moler가 학생들이 LINPACK을 쉽게 쓰도록 개발. 행렬 연산과 시각화가 내장된 공학 계산 환경의 혁명.",
    lines: [
      { code: "% 뉴턴의 냉각 법칙 계산", explain: "주석(comment) — %로 시작하면 컴퓨터가 무시함. 사람을 위한 메모" },
      { code: "h = 100;  A = 0.5;  dT = 50;", explain: "변수 3개를 한 줄에 선언 — 타입 선언 불필요! (MATLAB의 편리함)" },
      { code: "q = h * A * dT;", explain: "열유속 계산 — 수학 공식 그대로 작성" },
      { code: "", explain: "" },
      { code: "h_range = 10:10:1000;", explain: "h를 10부터 1000까지 10 간격으로 배열 생성 (100개의 값)" },
      { code: "q_values = h_range * A * dT;", explain: "배열 전체에 대해 한 번에 계산! (벡터 연산)" },
      { code: "", explain: "" },
      { code: "plot(h_range, q_values, 'r-', 'LineWidth', 2)", explain: "빨간 실선(r-)으로 그래프 그리기, 선 두께 2" },
      { code: "xlabel('h (W/m²·K)')", explain: "x축 라벨 설정" },
      { code: "ylabel('q (W)')", explain: "y축 라벨 설정" },
      { code: "title('열유속 vs 열전달 계수')", explain: "그래프 제목 설정" },
      { code: "grid on", explain: "격자선 표시 — 값을 읽기 쉽게" },
    ],
    color: "from-orange-500 to-red-500",
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    impact: "기계공학 영향: 수치 해석, 신호 처리, 제어 설계의 표준 도구",
    output: { type: "plot", content: ["MATLAB_PLOT"] },
    image: {
      url: "/images/eras/ibm5150.jpg",
      alt: "IBM PC 5150 (1981) — MATLAB이 처음 보급된 개인용 컴퓨터 시대의 시작",
      credit: "Wikimedia Commons, CC BY-SA 3.0",
    },
  },
  {
    year: "1991",
    title: "Python",
    desc: "Guido van Rossum이 개발. '읽기 쉬운 코드'를 철학으로, 과학 계산부터 웹 개발까지 범용으로 확산.",
    lines: [
      { code: "import numpy as np", explain: "수치 계산 라이브러리 NumPy를 np라는 이름으로 불러옴" },
      { code: "import matplotlib.pyplot as plt", explain: "그래프 라이브러리를 plt라는 이름으로 불러옴" },
      { code: "", explain: "" },
      { code: "h, A, dT = 100, 0.5, 50", explain: "3개 변수를 한 줄에 대입 (Python만의 간결한 문법)" },
      { code: "q = h * A * dT", explain: "열유속 계산 — 세미콜론도, 타입 선언도 불필요" },
      { code: "print(f'q = {q:.1f} W')", explain: "f-string으로 결과 출력 — {q:.1f}는 소수점 1자리" },
      { code: "", explain: "" },
      { code: "h_range = np.arange(10, 1001, 10)", explain: "NumPy로 10~1000 배열 생성" },
      { code: "plt.plot(h_range, h_range * A * dT)", explain: "한 줄로 계산 + 그래프 그리기" },
      { code: "plt.xlabel('h (W/m²·K)')", explain: "축 라벨 설정" },
      { code: "plt.show()", explain: "그래프 창 열기" },
    ],
    color: "from-yellow-500 to-green-500",
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    impact: "기계공학 영향: 머신러닝, 데이터 분석, 자동화 스크립트",
    output: { type: "terminal+plot", content: ["$ python heat.py", "q = 2500.0 W"] },
    image: {
      url: "/images/eras/sgi_indy.jpg",
      alt: "SGI Indy (1993) — Python이 성장한 90년대 워크스테이션. 과학 계산의 핵심 장비.",
      credit: "Wikimedia Commons, CC BY-SA 3.0",
    },
  },
  {
    year: "2021",
    title: "GitHub Copilot",
    desc: "AI가 코드를 제안하기 시작. 개발자가 의도를 주석으로 쓰면 AI가 코드를 자동 완성. 인간-AI 협업 코딩의 시작.",
    lines: [
      { code: "// 열전달 계수에 따른 열유속을 계산하는 함수", explain: "사람이 주석을 작성하면..." },
      { code: "function calcHeatFlux(h, A, dT) {", explain: "⚡ AI가 함수 이름과 매개변수를 자동 생성" },
      { code: "  return h * A * dT;", explain: "⚡ AI가 물리 법칙에 맞는 계산식을 자동 완성" },
      { code: "}", explain: "" },
      { code: "", explain: "" },
      { code: "// h 범위에 대한 q 값을 차트로 시각화", explain: "다시 주석을 쓰면..." },
      { code: "const data = hRange.map(h => ({", explain: "⚡ AI가 데이터 가공 코드를 자동 생성" },
      { code: "  h, q: calcHeatFlux(h, 0.5, 50)", explain: "⚡ 위에서 만든 함수를 활용하여 계산" },
      { code: "}));", explain: "" },
    ],
    color: "from-purple-500 to-pink-500",
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    impact: "패러다임 전환: 코드를 '쓰는' 것에서 '검토하는' 것으로",
    output: { type: "terminal", content: ["// 주석 작성 → Tab 키 → AI가 코드 자동 완성", "✓ calcHeatFlux 함수 생성됨", "✓ 시각화 코드 자동 생성됨", "", "→ 개발자는 코드를 '검토'만 하면 OK"] },
    image: {
      url: "/images/eras/macbook.jpg",
      alt: "MacBook Pro — AI 코딩 도구가 실행되는 현대의 개발 환경",
      credit: "Wikimedia Commons, CC BY-SA 4.0",
    },
  },
  {
    year: "2025~",
    title: "바이브코딩",
    desc: "코드를 전혀 모르더라도 자연어로 AI와 대화하며 프로그램을 만든다. 누구나 개발자가 되는 시대.",
    lines: [
      { code: "나: 열전달 계산기를 만들어줘.", explain: "코드가 아닌 자연어로 요청" },
      { code: "    h, A, ΔT를 입력하면", explain: "입력 변수를 일상 언어로 설명" },
      { code: "    q를 계산하고 차트로 보여줘.", explain: "출력 형태까지 대화로 지정" },
      { code: "", explain: "" },
      { code: "AI: 네, 만들겠습니다.", explain: "AI가 요구사항을 이해하고..." },
      { code: "    → 파일 생성, 코드 작성, 실행", explain: "코드 작성부터 실행까지 AI가 전부 처리" },
      { code: "    → 브라우저에서 확인 가능!", explain: "사용자는 결과만 확인하면 끝!" },
    ],
    color: "from-violet-500 to-fuchsia-500",
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    impact: "기계공학 영향: 비전공자도 공학 도구를 직접 제작 가능",
    highlight: true,
    output: { type: "browser", content: ["BROWSER_PREVIEW"] },
  },
];

/* ── Annotated code block ── */
function AnnotatedCode({ lines, color }: { lines: CodeLine[]; color: string }) {
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  return (
    <div className="rounded-xl bg-slate-950 border border-slate-700 overflow-hidden">
      {/* code header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 border-b border-slate-700">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-2 text-[10px] text-gray-600 font-mono">코드를 한 줄씩 살펴보세요 — 마우스를 올려보세요</span>
      </div>
      <div className="p-1">
        {lines.map((line, i) => {
          if (!line.code && !line.explain) {
            return <div key={i} className="h-3" />;
          }
          const isHovered = hoveredLine === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredLine(i)}
              onMouseLeave={() => setHoveredLine(null)}
              className={`group relative rounded-lg px-3 py-1 transition-colors cursor-default ${
                isHovered ? "bg-slate-800" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Line number */}
                <span className="text-[10px] text-gray-600 font-mono w-5 text-right flex-shrink-0 mt-0.5 select-none">
                  {line.code ? i + 1 : ""}
                </span>
                {/* Code */}
                <code className={`text-xs font-mono flex-1 ${isHovered ? "text-white" : "text-gray-400"} transition-colors whitespace-pre`}>
                  {line.code}
                </code>
              </div>
              {/* Explanation tooltip */}
              {line.explain && isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`mt-1 ml-8 px-3 py-2 rounded-lg bg-gradient-to-r ${color} text-white text-xs leading-relaxed`}
                >
                  {line.explain}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Simulated output panels (togglable) ── */
function TerminalOutput({ content }: { content: string[] }) {
  return (
    <div className="rounded-xl bg-black border border-slate-700 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border-b border-slate-700">
        <span className="text-[10px] text-green-400 font-mono">▶ 실행 결과</span>
      </div>
      <div className="p-3 font-mono text-xs leading-relaxed">
        {content.map((line, i) => (
          <div key={i} className={line ? "text-green-400" : "h-2"}>{line}</div>
        ))}
        <div className="mt-1 text-gray-600">█</div>
      </div>
    </div>
  );
}

function PlotOutput({ title, barColor }: { title: string; barColor: string }) {
  const points = Array.from({ length: 10 }, (_, i) => ({
    h: (i + 1) * 100,
    q: (i + 1) * 100 * 0.5 * 50,
  }));
  const maxQ = points[points.length - 1].q;
  return (
    <div className="rounded-xl bg-white border border-slate-700 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border-b border-slate-300">
        <span className="text-[10px] text-slate-600 font-mono">{title}</span>
      </div>
      <div className="p-4">
        <div className="relative h-40 flex items-end gap-[2px]">
          <div className="absolute -left-1 top-0 bottom-0 flex flex-col justify-between text-[8px] text-slate-500">
            <span>{maxQ}</span>
            <span>{maxQ / 2}</span>
            <span>0</span>
          </div>
          <div className="ml-8 flex items-end gap-1 flex-1 h-full border-l border-b border-slate-300 pl-1 pb-1">
            {points.map((p, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${(p.q / maxQ) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`flex-1 ${barColor} rounded-t-sm relative`}
              >
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] text-slate-500">{p.h}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="text-center mt-6 text-[10px] text-slate-500">h (W/m²·K)</div>
        <div className="text-center text-[10px] text-slate-600 font-semibold mt-1">q = h × 0.5 × 50</div>
      </div>
    </div>
  );
}

function OutputPanel({ output, color }: { output: Era["output"]; color: string }) {
  const [open, setOpen] = useState(false);

  const renderContent = () => {
    if (output.type === "terminal") {
      return <TerminalOutput content={output.content} />;
    }

    if (output.type === "plot") {
      return <PlotOutput title="Figure 1 — 열유속 vs 열전달 계수" barColor="bg-red-500" />;
    }

    if (output.type === "terminal+plot") {
      return (
        <div className="space-y-3">
          <TerminalOutput content={output.content} />
          <PlotOutput title="matplotlib — 열유속 vs 열전달 계수" barColor="bg-blue-500" />
        </div>
      );
    }

    if (output.type === "browser") {
      return (
        <div className="rounded-xl bg-white border border-slate-700 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border-b border-slate-300">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="ml-2 flex-1 bg-white rounded px-2 py-0.5 text-[9px] text-slate-400 border border-slate-200">localhost:3000</span>
          </div>
          <div className="p-5 bg-gradient-to-br from-slate-50 to-violet-50">
            <h4 className="text-sm font-bold text-slate-800 mb-3">열전달 계산기</h4>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: "h (W/m²·K)", val: "100" },
                { label: "A (m²)", val: "0.5" },
                { label: "ΔT (K)", val: "50" },
              ].map((f) => (
                <div key={f.label}>
                  <div className="text-[9px] text-slate-500 mb-0.5">{f.label}</div>
                  <div className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 font-mono">{f.val}</div>
                </div>
              ))}
            </div>
            <div className="bg-violet-100 border border-violet-200 rounded-lg px-3 py-2 text-center">
              <div className="text-[10px] text-violet-500">열유속 (q)</div>
              <div className="text-lg font-bold text-violet-700">2,500.0 W</div>
            </div>
            <div className="mt-2 text-[9px] text-slate-400 text-center">AI가 대화만으로 만든 웹 앱</div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
          open
            ? `bg-gradient-to-r ${color} text-white`
            : "bg-slate-700/60 text-gray-300 hover:bg-slate-700"
        }`}
      >
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-90" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {open ? "실행 결과 닫기" : "▶ 실행 결과 보기"}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="mt-3"
        >
          {renderContent()}
        </motion.div>
      )}
    </div>
  );
}

export default function ProgrammingEvolution() {
  return (
    <section id="evolution" className="relative py-24 bg-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            History of Programming
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            프로그래밍의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">진화</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            기계어에서 자연어까지 — 80년간 프로그래밍은 끊임없이 인간에게 가까워져 왔습니다.
            <br />
            <span className="text-gray-500">각 코드 위에 마우스를 올리면 한 줄씩 설명을 볼 수 있습니다.</span>
          </p>
        </motion.div>

        {/* Timeline cards */}
        <div className="max-w-4xl mx-auto space-y-10">
          {eras.map((era, i) => (
            <motion.div
              key={era.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`p-6 md:p-8 rounded-2xl border backdrop-blur-sm ${
                era.highlight
                  ? "bg-violet-500/10 border-violet-500/30"
                  : "bg-slate-800/50 border-slate-700"
              }`}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${era.color} text-white`}>
                  {era.icon}
                </div>
                <div>
                  <span className={`text-sm font-mono ${era.highlight ? "text-violet-400" : "text-blue-400"}`}>{era.year}</span>
                  <h3 className="text-xl font-bold text-white">{era.title}</h3>
                </div>
                {/* Step indicator */}
                <div className="ml-auto hidden md:flex items-center gap-1">
                  {eras.map((_, j) => (
                    <div
                      key={j}
                      className={`w-2 h-2 rounded-full ${j === i ? `bg-gradient-to-r ${era.color}` : j < i ? "bg-slate-600" : "bg-slate-800"}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-5">{era.desc}</p>

              {/* Image + Code side by side on desktop */}
              {era.image ? (
                <div className="grid md:grid-cols-[1fr_280px] gap-5 mb-0">
                  {/* Annotated Code */}
                  <AnnotatedCode lines={era.lines} color={era.color} />
                  {/* Era image */}
                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 flex flex-col">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={era.image.url}
                      alt={era.image.alt}
                      className="w-full h-48 object-contain bg-slate-800 p-2"
                      loading="lazy"
                    />
                    <div className="p-3">
                      <p className="text-xs text-gray-300 leading-snug">{era.image.alt}</p>
                      <p className="text-[10px] text-gray-600 mt-1">{era.image.credit}</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Annotated Code — full width for vibe coding era */
                <AnnotatedCode lines={era.lines} color={era.color} />
              )}

              {/* Execution Output */}
              <OutputPanel output={era.output} color={era.color} />

              {/* ME impact */}
              <div className="mt-4">
                <span className="text-[11px] px-3 py-1 rounded-full bg-slate-700/80 text-gray-400">
                  {era.impact}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-16 p-8 rounded-2xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">핵심 흐름</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-300">
            <span className="px-4 py-2 rounded-xl bg-slate-800">기계어 (0, 1)</span>
            <svg className="w-5 h-5 text-gray-600 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="px-4 py-2 rounded-xl bg-slate-800">고급 언어 (코드)</span>
            <svg className="w-5 h-5 text-gray-600 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="px-4 py-2 rounded-xl bg-slate-800">스크립트 (간단한 코드)</span>
            <svg className="w-5 h-5 text-gray-600 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 border border-violet-500/30 text-violet-300 font-semibold">자연어 (대화)</span>
          </div>
          <p className="text-gray-500 mt-6 text-sm">
            프로그래밍은 항상 더 <span className="text-violet-400">인간에게 가까운 방향</span>으로 진화해왔습니다.
            <br />바이브코딩은 그 흐름의 자연스러운 다음 단계입니다.
            <br /><span className="text-gray-600 text-xs">다만 추상화 수준이 높아질수록 세밀한 제어, 디버깅, 보안 측면에서 새로운 과제가 생깁니다.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

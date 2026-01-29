"use client";

import { motion } from "framer-motion";

const principles = [
  {
    num: 1,
    title: "입력 검증",
    bad: {
      label: "Bad",
      desc: "음수 면적을 입력해도 아무 경고 없이 계산됨",
      code: `<input type="number" value={A}
  onChange={e => setA(e.target.value)} />
// A = -2 → Q = h × (-2) × ΔT = 음수
// 물리적으로 무의미한 결과 출력`,
    },
    good: {
      label: "Good",
      desc: "빨간 경고 표시 + 물리적 범위 안내",
      code: `<input type="number" value={A} min={0}
  onChange={e => {
    const val = Number(e.target.value);
    if (val < 0) setError("면적은 음수가 될 수 없습니다");
    else setA(val);
  }} />
// 범위: 0.001 ~ 100 m² (일반 열교환기)`,
    },
  },
  {
    num: 2,
    title: "단위 명확성",
    bad: {
      label: "Bad",
      desc: "숫자만 입력하는 필드 — 어떤 단위인지 알 수 없음",
      code: `<label>온도</label>
<input type="number" value={T} />
// 100이 °C인지 °F인지 K인지 불명확
// → 실무에서 치명적 오류 발생`,
    },
    good: {
      label: "Good",
      desc: "입력 옆에 단위 라벨 + SI/영국 단위 전환 제공",
      code: `<label>표면 온도 (Tₛ)</label>
<div className="flex items-center gap-2">
  <input type="number" value={Ts} />
  <span className="text-gray-400">°C</span>
  <button onClick={toggleUnit}>
    {unit === 'SI' ? '→ °F' : '→ °C'}
  </button>
</div>`,
    },
  },
  {
    num: 3,
    title: "실시간 계산",
    bad: {
      label: "Bad",
      desc: '"계산" 버튼을 클릭해야만 결과가 나타남',
      code: `function handleCalculate() {
  const result = h * A * (Ts - Tinf);
  setQ(result);
}
// 버튼 클릭 전에는 결과가 비어있음
// 입력을 바꿀 때마다 버튼을 눌러야 함`,
    },
    good: {
      label: "Good",
      desc: "값 변경 즉시 결과가 업데이트됨 (리액티브)",
      code: `const Q = useMemo(() => {
  return h * A * (Ts - Tinf);
}, [h, A, Ts, Tinf]);
// 입력이 바뀌면 자동으로 재계산
// 즉각적인 피드백 → 파라미터 감각 형성`,
    },
  },
  {
    num: 4,
    title: "시각적 피드백",
    bad: {
      label: "Bad",
      desc: "숫자만 나열 — 결과의 크기를 직관적으로 파악 불가",
      code: `<div>결과</div>
<p>q = 12500</p>
<p>Q = 6250</p>
// 12500이 큰 건지 작은 건지?
// 다른 조건과 비교가 불가`,
    },
    good: {
      label: "Good",
      desc: "바 차트, 색상 코딩, 온도 시각화",
      code: `<div className="bg-orange-500/10 rounded-xl p-4">
  <span className="text-2xl font-bold text-orange-300">
    {Q.toLocaleString()} W
  </span>
  <div className="h-3 bg-slate-700 rounded-full">
    <div style={{width: \`\${Q/maxQ*100}%\`}}
      className="h-full bg-orange-500 rounded-full"/>
  </div>
</div>`,
    },
  },
  {
    num: 5,
    title: "공식 표시",
    bad: {
      label: "Bad",
      desc: "블랙박스 — 어떤 공식이 사용되는지 알 수 없음",
      code: `// 내부적으로 계산만 하고 공식을 표시하지 않음
const result = someCalculation(inputs);
return <div>{result}</div>
// 사용자: "이 숫자가 어떻게 나온 거지?"
// → 신뢰할 수 없는 계산기`,
    },
    good: {
      label: "Good",
      desc: "사용 공식 + 대입 과정 + 참고문헌 명시",
      code: `<div className="formula">
  q = h × (Tₛ − T∞)  {/* 뉴턴 냉각법칙 */}
  q = 100 × (150 − 25)  {/* 값 대입 */}
  q = 12,500 W/m²  {/* 결과 */}
</div>
<cite>Incropera, Fundamentals of Heat
  and Mass Transfer, 8th Ed., Eq. 1.3a</cite>`,
    },
  },
  {
    num: 6,
    title: "에러 처리",
    bad: {
      label: "Bad",
      desc: "NaN, Infinity 같은 프로그래밍 에러가 그대로 노출됨",
      code: `const R = L / (k * A);
// k = 0 입력 시: R = Infinity
// L = "abc" 입력 시: R = NaN
// 화면에 "NaN W" 표시 → 사용자 혼란`,
    },
    good: {
      label: "Good",
      desc: "친절한 에러 메시지 + 해결 방법 안내",
      code: `if (k === 0) {
  return (
    <Alert type="warning">
      열전도도(k)가 0입니다.
      완전 단열재는 존재하지 않습니다.
      최소값: 0.01 W/m·K (에어로겔)
    </Alert>
  );
}
if (isNaN(R)) return <Alert>유효한 숫자를 입력하세요</Alert>;`,
    },
  },
];

export default function CalcUXPrinciples() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-medium mb-4">
            UX Principles
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            좋은 공학 계산기의 조건
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            AI에게 계산기를 만들라고 할 때, 이 6가지를 반드시 요구하세요
          </p>
        </motion.div>

        {/* Principles */}
        <div className="space-y-8">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-slate-900/60 border border-slate-700/50 overflow-hidden"
            >
              {/* Principle header */}
              <div className="bg-slate-800/80 border-b border-slate-700 px-6 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-300 font-bold text-sm">
                  {p.num}
                </div>
                <h3 className="text-base font-bold text-white">{p.title}</h3>
              </div>

              {/* Bad vs Good */}
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-700/50">
                {/* Bad */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                      BAD
                    </span>
                    <span className="text-sm text-gray-400">{p.bad.desc}</span>
                  </div>
                  <pre className="bg-red-950/20 border border-red-500/20 rounded-lg p-3 text-[11px] text-red-300/80 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {p.bad.code}
                  </pre>
                </div>

                {/* Good */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                      GOOD
                    </span>
                    <span className="text-sm text-gray-400">{p.good.desc}</span>
                  </div>
                  <pre className="bg-green-950/20 border border-green-500/20 rounded-lg p-3 text-[11px] text-green-300/80 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {p.good.code}
                  </pre>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom: combined prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl bg-orange-500/5 border border-orange-500/20 p-6 md:p-8"
        >
          <h4 className="text-sm font-semibold text-orange-300 uppercase tracking-wider mb-4">
            AI에게 이 6가지를 요구하는 프롬프트 예시
          </h4>
          <pre className="bg-slate-900 rounded-lg p-5 text-sm text-amber-200/90 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto border border-slate-700">
{`"뉴턴 냉각법칙 계산기를 만들어줘. 다음 조건을 반드시 지켜줘:

1. 입력 검증: h와 A는 양수만 허용. 범위를 벗어나면 빨간 경고 + 물리적 범위 안내
2. 단위 명확성: 모든 입력/출력에 단위 라벨 표시. SI ↔ 영국 단위 전환 토글
3. 실시간 계산: 버튼 없이 입력 변경 즉시 결과 업데이트 (useMemo 사용)
4. 시각적 피드백: 결과를 색상 코딩된 카드로 표시. 온도차를 바 차트로 시각화
5. 공식 표시: 사용 공식, 대입 과정, 참고문헌을 계산기 하단에 표시
6. 에러 처리: 0으로 나누기, NaN 등에 대해 친절한 한국어 메시지 표시

React + TypeScript + Tailwind CSS. 다크 테마, 오렌지 색상 사용."`}
          </pre>
          <p className="text-xs text-gray-500 mt-3">
            이 하나의 프롬프트에 6가지 원칙이 모두 포함되어 있습니다. 구체적으로 요구할수록 좋은 결과를 얻습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const bugCases = [
  {
    num: 1,
    title: "단위 혼동 — °C와 K",
    situation:
      "뉴턴 냉각법칙에서 ΔT는 °C나 K 둘 다 같은 값이지만, 복사 열전달(σT⁴)에서는 반드시 절대온도(K)를 사용해야 합니다. AI가 °C를 그대로 넣어버리는 경우가 흔합니다.",
    badCode: `// AI가 생성한 코드 (잘못됨)
const sigma = 5.67e-8; // Stefan-Boltzmann 상수
const Ts = 150;  // °C ← 여기가 문제!
const Tinf = 25; // °C

const q_rad = sigma * (Ts**4 - Tinf**4);
// q_rad = 5.67e-8 × (150⁴ − 25⁴)
// = 2.87 W/m²  ← 완전히 틀린 값`,
    goodCode: `// 올바른 코드
const sigma = 5.67e-8;
const Ts_K = 150 + 273.15;  // 423.15 K
const Tinf_K = 25 + 273.15; // 298.15 K

const q_rad = sigma * (Ts_K**4 - Tinf_K**4);
// q_rad = 5.67e-8 × (423.15⁴ − 298.15⁴)
// = 1,413 W/m²  ← 올바른 값 (490배 차이!)`,
    tip: "복사 열전달 계산이 포함되면 반드시 온도 단위를 확인하세요. AI에게 '온도를 켈빈으로 변환한 후 계산해'라고 명시적으로 요청하세요.",
  },
  {
    num: 2,
    title: "상관식 적용 범위 무시",
    situation:
      "Dittus-Boelter 상관식 (Nu = 0.023 × Re^0.8 × Pr^n)은 Re > 10,000 (난류)에서만 유효합니다. AI는 Re 값을 확인하지 않고 무조건 이 식을 적용합니다.",
    badCode: `// AI가 생성한 코드 (잘못됨)
function calcNusselt(Re, Pr) {
  // Dittus-Boelter 상관식 — 항상 적용
  const Nu = 0.023 * Math.pow(Re, 0.8) * Math.pow(Pr, 0.4);
  return Nu;
}
// Re = 800 (층류)에도 이 식을 적용
// → 완전히 틀린 Nu 값`,
    goodCode: `// 올바른 코드
function calcNusselt(Re, Pr) {
  if (Re < 2300) {
    // 층류: 일정 벽온도 조건
    return 3.66;
  } else if (Re < 10000) {
    // 천이 영역: Gnielinski 상관식
    const f = Math.pow(0.790 * Math.log(Re) - 1.64, -2);
    return (f/8) * (Re - 1000) * Pr /
      (1 + 12.7 * Math.sqrt(f/8) * (Math.pow(Pr, 2/3) - 1));
  } else {
    // 난류: Dittus-Boelter (Re > 10,000)
    return 0.023 * Math.pow(Re, 0.8) * Math.pow(Pr, 0.4);
  }
}`,
    tip: "AI에게 '유동 상태(층류/천이/난류)에 따라 다른 상관식을 적용하고, 적용 범위를 벗어나면 경고를 표시해줘'라고 요청하세요.",
  },
  {
    num: 3,
    title: "물성치 온도 의존성 무시",
    situation:
      "AI는 물의 점성도를 20°C 기준 고정값(μ = 1.002×10⁻³ Pa·s)으로 사용합니다. 하지만 80°C에서는 μ = 0.355×10⁻³로 약 1/3입니다. Re가 3배 달라져 층류/난류 판정이 바뀔 수 있습니다.",
    badCode: `// AI가 생성한 코드 (잘못됨)
const mu = 1.002e-3;  // 20°C 고정값!
const rho = 998;      // 20°C 고정값!

function calcReynolds(velocity, diameter) {
  return rho * velocity * diameter / mu;
}
// T = 80°C에서: Re 계산값이 실제의 1/3
// → 실제로는 난류인데 층류로 판정`,
    goodCode: `// 올바른 코드: 온도별 물성치 보간
const waterProps = {
  // [T(°C)]: { rho(kg/m³), mu(Pa·s), k(W/m·K), Pr }
  20:  { rho: 998.2, mu: 1.002e-3, k: 0.601, Pr: 7.01 },
  40:  { rho: 992.2, mu: 0.653e-3, k: 0.631, Pr: 4.34 },
  60:  { rho: 983.2, mu: 0.467e-3, k: 0.654, Pr: 2.99 },
  80:  { rho: 971.8, mu: 0.355e-3, k: 0.670, Pr: 2.22 },
  100: { rho: 958.4, mu: 0.282e-3, k: 0.679, Pr: 1.75 },
};

function getProps(T) {
  // 선형 보간으로 중간 온도 물성치 계산
  return interpolate(waterProps, T);
}`,
    tip: "AI에게 '물성치를 온도의 함수로 처리하고, 참고 데이터 테이블을 포함해줘'라고 요청하세요. 최소 5개 온도점의 데이터를 제공하면 더 정확합니다.",
  },
  {
    num: 4,
    title: "부호 오류 — 물리적 해석 부재",
    situation:
      "Q = h × A × (Ts − Tinf)에서 표면 온도가 유체 온도보다 낮으면(Ts < Tinf) 음수가 됩니다. AI는 음수를 그대로 출력할 뿐, '열이 유체에서 표면으로 흐른다'는 물리적 해석을 제공하지 않습니다.",
    badCode: `// AI가 생성한 코드 (불완전)
const Q = h * A * (Ts - Tinf);
return <div>Q = {Q} W</div>;

// Ts = 20°C, Tinf = 80°C 일 때:
// Q = 100 × 0.5 × (20 - 80) = -3000 W
// 화면에 "Q = -3000 W" 만 표시
// 사용자: "음수가 뭘 의미하지...?"`,
    goodCode: `// 올바른 코드
const Q = h * A * (Ts - Tinf);
const isHeating = Q > 0;  // 표면 → 유체
const isCooling = Q < 0;  // 유체 → 표면

return (
  <div>
    <span>|Q| = {Math.abs(Q).toLocaleString()} W</span>
    {isHeating && (
      <span className="text-red-400">
        ↑ 표면에서 유체로 열전달 (가열)
      </span>
    )}
    {isCooling && (
      <span className="text-blue-400">
        ↓ 유체에서 표면으로 열전달 (냉각)
      </span>
    )}
    {Q === 0 && (
      <span className="text-gray-400">
        열평형 상태 (온도차 없음)
      </span>
    )}
  </div>
);`,
    tip: "공학 계산기에서 부호는 물리적 방향을 의미합니다. AI에게 '음수 결과가 나올 때 물리적 의미를 함께 표시해줘'라고 요청하세요.",
  },
  {
    num: 5,
    title: "수렴 문제 — 반복 계산의 함정",
    situation:
      "출구 온도를 구하는 문제는 반복 계산(iteration)이 필요합니다. 물성치가 온도에 의존하고, 온도는 물성치에 의존하기 때문입니다. AI가 초기값을 잘못 설정하면 발산하거나 무한루프에 빠집니다.",
    badCode: `// AI가 생성한 코드 (위험)
function calcOutletTemp(Tin, Tw, h, A, mDot, cp) {
  let Tout = Tin; // 초기 추정값
  while (true) {  // 무한루프 가능성!
    const Tm = (Tin + Tout) / 2;
    const props = getProps(Tm);
    const Q = h * A * (Tw - Tm);
    const newTout = Tin + Q / (mDot * props.cp);
    if (Math.abs(newTout - Tout) < 0.01) break;
    Tout = newTout;
  }
  // 수렴하지 않으면 브라우저 멈춤!
  return Tout;
}`,
    goodCode: `// 올바른 코드
function calcOutletTemp(Tin, Tw, h, A, mDot, cp) {
  let Tout = (Tin + Tw) / 2; // 더 나은 초기값
  const MAX_ITER = 100;
  const TOL = 0.01;

  for (let i = 0; i < MAX_ITER; i++) {
    const Tm = (Tin + Tout) / 2;
    const props = getProps(Tm);
    const Q = h * A * (Tw - Tm);
    const newTout = Tin + Q / (mDot * props.cp);

    if (Math.abs(newTout - Tout) < TOL) {
      return { Tout: newTout, converged: true, iter: i+1 };
    }
    Tout = 0.5 * Tout + 0.5 * newTout; // 완화계수
  }
  return { Tout, converged: false, iter: MAX_ITER };
  // 수렴 여부를 사용자에게 알림!
}`,
    tip: "반복 계산에는 (1) 최대 반복 횟수 제한, (2) 수렴 판정 기준, (3) 완화 계수(relaxation factor), (4) 수렴 실패 처리가 필수입니다.",
  },
];

export default function CalcDebugCases() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-medium mb-4">
            Debug Guide
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            AI가 만든 계산기, 이런 실수를 합니다
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            AI는 코드를 잘 생성하지만, 공학적 판단은 여러분이 해야 합니다
          </p>
        </motion.div>

        {/* Bug cases */}
        <div className="space-y-8">
          {bugCases.map((bug, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden"
            >
              {/* Case header */}
              <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-sm">
                  {bug.num}
                </div>
                <h3 className="text-base font-bold text-white">{bug.title}</h3>
              </div>

              {/* Situation */}
              <div className="px-6 py-4 border-b border-slate-700/50">
                <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
                  상황
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {bug.situation}
                </p>
              </div>

              {/* Bad vs Good code */}
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-700/50">
                {/* Bad */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                      AI의 잘못된 코드
                    </span>
                  </div>
                  <pre className="bg-red-950/20 border border-red-500/20 rounded-lg p-3 text-[11px] text-red-300/80 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {bug.badCode}
                  </pre>
                </div>

                {/* Good */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                      올바른 코드
                    </span>
                  </div>
                  <pre className="bg-green-950/20 border border-green-500/20 rounded-lg p-3 text-[11px] text-green-300/80 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {bug.goodCode}
                  </pre>
                </div>
              </div>

              {/* Tip */}
              <div className="bg-orange-500/5 border-t border-orange-500/20 px-6 py-3">
                <div className="flex items-start gap-2">
                  <span className="text-orange-400 text-xs font-bold mt-0.5">TIP</span>
                  <p className="text-sm text-gray-300">{bug.tip}</p>
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
          className="mt-12 text-center"
        >
          <div className="inline-block bg-orange-500/10 border border-orange-500/30 rounded-2xl px-8 py-6 max-w-3xl">
            <p className="text-lg font-bold text-orange-300 mb-2">
              핵심 메시지
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              AI는 수식을 코드로 바꾸는 데 탁월하지만, <span className="text-orange-300 font-semibold">물리적 의미를 이해하지 못합니다.</span>{" "}
              단위 확인, 적용 범위 검증, 결과의 물리적 타당성 판단은{" "}
              <span className="text-amber-300 font-semibold">여러분의 몫</span>입니다.
              AI가 만든 코드는 반드시 알려진 값으로 검증하세요.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

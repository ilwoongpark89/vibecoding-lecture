"use client";

import { motion } from "framer-motion";

const sensorCards = [
  { label: "진동 가속도", value: "2.4 mm/s", status: "정상", statusColor: "text-green-400", borderColor: "border-green-500/30", bgColor: "bg-green-500/10", icon: "📳" },
  { label: "베어링 온도", value: "67°C", status: "주의", statusColor: "text-yellow-400", borderColor: "border-yellow-500/30", bgColor: "bg-yellow-500/10", icon: "🌡️" },
  { label: "회전속도", value: "3,600 RPM", status: "정상", statusColor: "text-green-400", borderColor: "border-green-500/30", bgColor: "bg-green-500/10", icon: "🔄" },
  { label: "소음 레벨", value: "78 dB", status: "정상", statusColor: "text-green-400", borderColor: "border-green-500/30", bgColor: "bg-green-500/10", icon: "🔊" },
];

const alertHistory = [
  { time: "14:32:15", sensor: "베어링 온도", value: "85°C", status: "경고", color: "text-red-400" },
  { time: "14:28:03", sensor: "진동 가속도", value: "4.2 mm/s", status: "주의", color: "text-yellow-400" },
  { time: "13:45:22", sensor: "베어링 온도", value: "72°C", status: "주의", color: "text-yellow-400" },
  { time: "12:10:08", sensor: "소음 레벨", value: "82 dB", status: "주의", color: "text-yellow-400" },
  { time: "10:05:30", sensor: "회전속도", value: "3,601 RPM", status: "정상", color: "text-green-400" },
];

const fftBars = [
  { freq: "1x", height: 85, label: "기본 주파수" },
  { freq: "", height: 15 },
  { freq: "2x", height: 45, label: "2차 고조파" },
  { freq: "", height: 10 },
  { freq: "3x", height: 20 },
  { freq: "", height: 8 },
  { freq: "4x", height: 12 },
  { freq: "", height: 5 },
  { freq: "5x", height: 8 },
  { freq: "", height: 3 },
];

const prompts = [
  "IoT 센서 모니터링 대시보드를 만들어줘. 회전기계(펌프/터빈)의 진동, 온도, RPM, 소음 4가지 센서 상태를 카드로 보여줘.",
  "진동 파형(사인파) 시간축 차트와 FFT 스펙트럼 바 차트를 추가해줘. 1x, 2x 고조파를 강조 표시해줘.",
  "알림 이력 테이블과 이상 탐지 경고 기능을 추가해줘. 임계값 초과 시 빨간색으로 강조하고 정비 필요 메시지를 표시해줘.",
];

export default function SensorMonitoring() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-4">
            Week 6 — IoT Monitoring
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            실시간 센서 모니터링 대시보드
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            공장의 회전기계(펌프, 터빈)에 센서를 달아 실시간으로 상태를 감시하는 대시보드
          </p>
        </motion.div>

        {/* Mock Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-14 rounded-2xl border border-slate-700 bg-slate-800 overflow-hidden shadow-2xl"
        >
          <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">⚙️ Rotating Machinery Monitor</h3>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                LIVE
              </span>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Sensor status cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sensorCards.map((card, i) => (
                <div key={i} className={`rounded-lg bg-slate-900/80 border ${card.borderColor} p-4`}>
                  <p className="text-xs text-gray-500 mb-1">{card.icon} {card.label}</p>
                  <p className="text-xl font-bold text-white">{card.value}</p>
                  <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full ${card.bgColor} ${card.statusColor}`}>
                    {card.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Vibration waveform */}
              <div className="md:col-span-2 rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                <p className="text-xs text-gray-500 mb-3">진동 파형 (Vibration Waveform)</p>
                <div className="h-36 relative overflow-hidden rounded">
                  <svg className="w-full h-full" viewBox="0 0 600 120" preserveAspectRatio="none">
                    {[30, 60, 90].map((y) => (
                      <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#334155" strokeWidth="0.5" />
                    ))}
                    {/* Sine wave */}
                    <path
                      d={`M ${Array.from({ length: 300 }, (_, i) => {
                        const x = i * 2;
                        const y = 60 + Math.sin(i * 0.12) * 35 + Math.sin(i * 0.24) * 10 + Math.sin(i * 0.03) * 5;
                        return `${x},${y}`;
                      }).join(" L ")}`}
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <div className="absolute bottom-1 left-0 right-0 flex justify-between px-2 text-[8px] text-gray-600">
                    <span>0s</span><span>0.5s</span><span>1.0s</span><span>1.5s</span><span>2.0s</span>
                  </div>
                </div>
              </div>

              {/* FFT spectrum */}
              <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                <p className="text-xs text-gray-500 mb-3">FFT 스펙트럼</p>
                <div className="flex items-end gap-1 h-36">
                  {fftBars.map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                      <div
                        className={`w-full rounded-t ${
                          bar.freq === "1x" || bar.freq === "2x"
                            ? "bg-gradient-to-t from-teal-600 to-cyan-400"
                            : "bg-slate-600"
                        }`}
                        style={{ height: `${bar.height}%` }}
                      />
                      {bar.freq && (
                        <span className={`text-[8px] mt-1 ${
                          bar.freq === "1x" || bar.freq === "2x" ? "text-teal-400 font-bold" : "text-gray-500"
                        }`}>{bar.freq}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Critical alert */}
            <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4 flex items-center gap-4">
              <span className="text-2xl">🚨</span>
              <div>
                <p className="text-sm font-bold text-red-400">이상 탐지: 베어링 온도 85°C 초과 — 정비 필요</p>
                <p className="text-xs text-gray-400 mt-1">14:32:15 감지 | 임계값: 80°C | 현재: 85°C | 추세: 상승 중</p>
              </div>
            </div>

            {/* Alert history table */}
            <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
              <p className="text-xs text-gray-500 mb-3">알림 이력</p>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-500 border-b border-slate-700">
                    <th className="pb-2 text-left">시간</th>
                    <th className="pb-2 text-left">센서</th>
                    <th className="pb-2 text-left">값</th>
                    <th className="pb-2 text-left">상태</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  {alertHistory.map((row, i) => (
                    <tr key={i} className="border-b border-slate-800">
                      <td className="py-1.5 font-mono">{row.time}</td>
                      <td className="py-1.5">{row.sensor}</td>
                      <td className="py-1.5">{row.value}</td>
                      <td className={`py-1.5 font-semibold ${row.color}`}>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Prompts */}
        <div className="max-w-4xl mx-auto mb-14">
          <h3 className="text-xl font-bold text-white text-center mb-6">
            이 대시보드를 만든 <span className="text-teal-400">3개의 프롬프트</span>
          </h3>
          <div className="space-y-4">
            {prompts.map((prompt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="flex gap-4 items-start p-5 rounded-xl bg-slate-800/60 border border-slate-700"
              >
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 text-sm font-bold">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-300 leading-relaxed">&quot;{prompt}&quot;</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border border-teal-500/20"
        >
          <p className="text-gray-300 leading-relaxed mb-4">
            <span className="text-teal-400 font-semibold">Grafana</span>와 <span className="text-teal-400 font-semibold">ThingsBoard</span>는
            산업 현장에서 실제로 사용되는 오픈소스 IoT 모니터링 플랫폼입니다.
          </p>
          <p className="text-xs text-gray-500">
            참고: Grafana (grafana.com) · ThingsBoard (thingsboard.io) · ISO 10816 진동 기준
          </p>
        </motion.div>
      </div>
    </section>
  );
}

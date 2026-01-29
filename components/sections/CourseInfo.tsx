"use client";

import { motion } from "framer-motion";

const grading = [
  { label: "출석", value: "10%", color: "bg-cyan-500" },
  { label: "과제", value: "20%", color: "bg-violet-500" },
  { label: "중간 프로젝트", value: "15%", color: "bg-fuchsia-500" },
  { label: "팀 프로젝트", value: "35%", color: "bg-rose-500" },
  { label: "기말 시험", value: "20%", color: "bg-amber-500" },
];

const schedule = [
  { weeks: "1~6주", phase: "기초", desc: "바이브코딩 개념, 웹 개발, 데이터 시각화, 공학 계산 자동화" },
  { weeks: "7주", phase: "중간", desc: "개인 프로젝트 발표 & 피드백" },
  { weeks: "8~13주", phase: "심화 & 팀", desc: "팀 프로젝트 진행, 시뮬레이션 시각화, AI 통합, 배포" },
  { weeks: "14주", phase: "발표", desc: "팀 프로젝트 최종 발표 & 시연" },
  { weeks: "15주", phase: "시험", desc: "기말 시험 (온라인)" },
];

const prerequisites = [
  { item: "노트북 (macOS / Windows / Linux)", required: true },
  { item: "Claude Pro 구독 ($20/월)", required: true },
  { item: "GitHub 계정", required: true },
  { item: "프로그래밍 경험", required: false, note: "없어도 됩니다!" },
  { item: "웹 개발 지식", required: false, note: "수업에서 배웁니다" },
];

export default function CourseInfo() {
  return (
    <section id="course-info" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
            Course Info
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">수업 안내</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            알아두어야 할 수업 정보를 정리했습니다.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Grading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-700"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              평가 비율
            </h3>
            <div className="space-y-4">
              {grading.map((item) => {
                const pct = parseInt(item.value);
                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-gray-300 text-sm font-medium">{item.label}</span>
                      <span className="text-white font-bold">{item.value}</span>
                    </div>
                    <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${item.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <p className="text-sm text-gray-300">
                <span className="text-rose-400 font-semibold">팀 프로젝트 (35%)</span>가 가장 큰 비중입니다.
                8주차부터 팀을 구성하여 기계공학 관련 웹 애플리케이션을 개발합니다.
              </p>
            </div>
          </motion.div>

          {/* Schedule Overview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-700"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              주차별 일정 요약
            </h3>
            <div className="space-y-4">
              {schedule.map((item, i) => (
                <motion.div
                  key={item.weeks}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-16 text-right">
                    <span className="text-sm font-mono text-amber-400">{item.weeks}</span>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    {i < schedule.length - 1 && <div className="w-0.5 flex-1 bg-slate-700 mt-1" />}
                  </div>
                  <div className="pb-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-gray-400 font-medium">{item.phase}</span>
                    <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Prerequisites */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mt-10 p-6 rounded-2xl bg-slate-900 border border-slate-700"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            준비물 체크리스트
          </h3>
          <div className="space-y-3">
            {prerequisites.map((item, i) => (
              <motion.div
                key={item.item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                {item.required ? (
                  <span className="flex-shrink-0 w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                ) : (
                  <span className="flex-shrink-0 w-6 h-6 rounded-md bg-slate-700 text-gray-500 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                )}
                <span className="text-gray-300">{item.item}</span>
                {"note" in item && item.note && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400">{item.note}</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

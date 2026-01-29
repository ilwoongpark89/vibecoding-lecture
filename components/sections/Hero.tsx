"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function AnimatedText({ text, delay, onComplete }: { text: string; delay: number; onComplete?: () => void }) {
  const lastIndex = text.length - 1;
  return (
    <span>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{
            opacity: 0.35,
            y: 25,
            x: 18,
            filter: "blur(5px)"
          }}
          animate={{
            opacity: 1,
            y: 0,
            x: 0,
            filter: "blur(0px)"
          }}
          transition={{
            duration: 0.3,
            delay: delay + index * 0.025,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          onAnimationComplete={index === lastIndex ? onComplete : undefined}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [showContent, setShowContent] = useState(false);
  const [showGradient, setShowGradient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Expanding circle background animation */}
      <motion.div
        className="absolute rounded-full z-0"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #134e4a 100%)",
        }}
        initial={{ width: 0, height: 0 }}
        animate={{ width: "250vmax", height: "250vmax" }}
        transition={{
          duration: 5,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Background gradient blobs */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-[2] overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-5xl mx-auto text-center">
          {showContent && (
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  2026 Fall Lecture
                </span>
              </motion.div>

              {/* Main Title */}
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
                <AnimatedText text="바이브코딩" delay={0.1} />
              </h1>

              {/* Subtitle with gradient */}
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] relative">
                <span className="invisible">기초</span>
                <span className={`absolute inset-0 text-white transition-opacity duration-700 ${showGradient ? "opacity-0" : "opacity-100"}`}>
                  <AnimatedText text="기초" delay={0.4} onComplete={() => setShowGradient(true)} />
                </span>
                <span className={`absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 transition-opacity duration-700 ${showGradient ? "opacity-100" : "opacity-0"}`}>
                  기초
                </span>
              </h2>

              {/* Description */}
              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              >
                AI와 함께하는 새로운 코딩 패러다임
                <br />
                <span className="text-gray-400">코드를 작성하지 않고, 대화로 프로그램을 만드는 시대</span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
              >
                <a
                  href="#ai-agents"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105"
                >
                  시작하기
                </a>
                <a
                  href="#ai-agents"
                  className="px-8 py-4 rounded-full border border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  AI Agent 알아보기
                </a>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex flex-col items-center gap-2 text-gray-400"
                >
                  <span className="text-sm">Scroll</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

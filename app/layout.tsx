import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "바이브코딩 기초 | Vibe Coding Fundamentals",
  description: "AI 시대의 새로운 코딩 패러다임, 바이브코딩을 배워보세요. Claude, ChatGPT 등 다양한 AI Agent를 활용한 프로그래밍 입문 강의입니다.",
  openGraph: {
    title: "바이브코딩 기초 | Vibe Coding Fundamentals",
    description: "AI 시대의 새로운 코딩 패러다임, 바이브코딩을 배워보세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import "./globals.css";

const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dot",
  preload: false,
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel-en",
});

export const metadata: Metadata = {
  title: "特定してみた展 | Web体験版",
  description: "SNS投稿画像に残されたヒントから、撮影場所を特定する体験型コンテンツ。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1846ff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${dotGothic.variable} ${pressStart.variable}`}>
      <body>{children}</body>
    </html>
  );
}

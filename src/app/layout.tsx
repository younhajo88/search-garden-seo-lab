import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_KR, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";

const sans = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "검색정원 SEO 실험실 | Next.js 구글 검색 노출 기록",
    template: "%s | 검색정원 SEO 실험실",
  },
  description:
    "Next.js와 Vercel로 만든 사이트가 Google 검색에 노출되는 과정을 기록합니다. sitemap, robots.txt, Search Console 확인 순서를 초보자 눈높이로 정리합니다.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "검색정원 SEO 실험실",
    title: "검색정원 SEO 실험실",
    description: "Next.js 사이트의 Google 검색 노출 과정을 직접 관찰하는 기록",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "taFJwXAeavD_MHRqCIUpePGKeMKJkzNCQLEIKoyHS04",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${sans.variable} ${display.variable}`}>
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            <span className="brand-mark">檢</span>
            <span>
              검색정원
              <small>SEO EXPERIMENT LOG</small>
            </span>
          </Link>
          <nav aria-label="주 메뉴">
            <Link href="/guides">실험 노트</Link>
            <Link href="/about">관찰 방법</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>검색정원 SEO 실험실 · Next.js 검색 노출 관찰 프로젝트</p>
          <p>마지막 갱신: 2026년 6월 2일</p>
        </footer>
      </body>
    </html>
  );
}

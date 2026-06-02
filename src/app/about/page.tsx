import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO 검색 노출 관찰 방법",
  description:
    "검색정원 SEO 실험실에서 Next.js 사이트의 Google 검색 노출을 관찰하는 방법과 기록 기준입니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="article-shell">
      <div>
        <header className="article-header">
          <p className="eyebrow">HOW TO OBSERVE</p>
          <h1>SEO는 한 번의 설정이 아니라 관찰입니다.</h1>
          <p className="article-description">
            검색정원 SEO 실험실은 작은 사이트를 공개하고 Google이 페이지를
            발견하고 색인하는 흐름을 확인하기 위해 만들었습니다.
          </p>
        </header>
        <div className="article-body">
          <h2>이번 실험에서 확인할 것</h2>
          <ul>
            <li>배포한 사이트의 HTML에 고유한 제목과 설명이 들어가는가</li>
            <li>sitemap.xml과 robots.txt를 외부에서 열 수 있는가</li>
            <li>Google Search Console에서 sitemap을 읽을 수 있는가</li>
            <li>site:도메인 검색과 고유 문구 검색에서 결과가 나타나는가</li>
          </ul>
          <h2>순위를 서두르지 않습니다</h2>
          <p>
            새 사이트의 첫 목표는 경쟁이 큰 검색어 1위가 아닙니다. 기술적으로
            막힌 곳 없이 페이지가 발견되고, 유용한 기록을 꾸준히 추가할 수 있는
            구조인지 확인하는 것입니다.
          </p>
        </div>
      </div>
      <aside className="article-aside">
        <p>프로젝트 시작일: 2026-06-02</p>
        <p>관찰 주기: 주 1회</p>
      </aside>
    </article>
  );
}

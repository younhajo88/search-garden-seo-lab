import Link from "next/link";
import { guides } from "@/data/guides";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site";

export default function Home() {
  const siteUrl = getSiteUrl();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "검색정원 SEO 실험실",
          url: siteUrl,
          description:
            "Next.js 사이트가 Google 검색에 노출되는 과정을 직접 기록하는 초보자용 SEO 실험 노트",
        }}
      />
      <section className="hero">
        <p className="eyebrow">NEXT.JS SEO FIELD NOTES</p>
        <h1>
          검색 결과에 싹이 트는지,
          <br />
          직접 확인합니다.
        </h1>
        <p className="hero-copy">
          검색정원 SEO 실험실은 Next.js 사이트를 만들고 Google에 발견되는
          과정을 기록합니다. 어려운 용어보다 실제 확인 순서를 남깁니다.
        </p>
        <div className="hero-actions">
          <Link className="button primary" href="/guides">
            실험 노트 읽기
          </Link>
          <Link className="button secondary" href="/about">
            관찰 방법 보기
          </Link>
        </div>
      </section>

      <section className="signal-grid" aria-label="SEO 실험의 핵심 원칙">
        <article>
          <span>01</span>
          <h2>발견 가능하게</h2>
          <p>sitemap과 내부 링크로 검색 로봇이 페이지를 찾을 길을 만듭니다.</p>
        </article>
        <article>
          <span>02</span>
          <h2>이해 가능하게</h2>
          <p>페이지마다 제목, 설명, 구조화 데이터를 명확하게 작성합니다.</p>
        </article>
        <article>
          <span>03</span>
          <h2>측정 가능하게</h2>
          <p>배포일과 색인 확인일을 기록하고 Search Console에서 비교합니다.</p>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LATEST NOTES</p>
            <h2>처음 읽을 실험 노트</h2>
          </div>
          <Link href="/guides">전체 노트 보기 →</Link>
        </div>
        <div className="card-grid">
          {guides.map((guide) => (
            <article className="guide-card" key={guide.slug}>
              <p className="card-meta">
                {guide.category} · {guide.readingTime}
              </p>
              <h3>
                <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
              </h3>
              <p>{guide.description}</p>
              <Link className="text-link" href={`/guides/${guide.slug}`}>
                노트 읽기 →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "SEO 실험 노트",
  description:
    "Next.js 사이트의 Google 검색 노출을 관찰하며 작성한 sitemap, robots.txt, Search Console 실험 노트입니다.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">EXPERIMENT NOTES</p>
          <h1>SEO 실험 노트</h1>
        </div>
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
  );
}

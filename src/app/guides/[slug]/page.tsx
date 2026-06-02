import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { getGuide, guides } from "@/data/guides";
import { getSiteUrl, SITE_NAME } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuide((await params).slug);

  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  const url = `${getSiteUrl()}/guides/${guide.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          datePublished: guide.publishedAt,
          dateModified: guide.updatedAt,
          mainEntityOfPage: url,
          author: { "@type": "Organization", name: SITE_NAME },
          publisher: { "@type": "Organization", name: SITE_NAME },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "홈", item: getSiteUrl() },
            {
              "@type": "ListItem",
              position: 2,
              name: "SEO 실험 노트",
              item: `${getSiteUrl()}/guides`,
            },
            { "@type": "ListItem", position: 3, name: guide.title, item: url },
          ],
        }}
      />
      <article className="article-shell">
        <div>
          <header className="article-header">
            <p className="eyebrow">
              {guide.category} · {guide.readingTime}
            </p>
            <h1>{guide.title}</h1>
            <p className="article-description">{guide.description}</p>
          </header>
          <div className="article-body">
            {guide.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
        <aside className="article-aside">
          <p>발행일: {guide.publishedAt}</p>
          <p>수정일: {guide.updatedAt}</p>
          <Link className="text-link" href="/guides">
            ← 전체 노트
          </Link>
        </aside>
      </article>
    </>
  );
}

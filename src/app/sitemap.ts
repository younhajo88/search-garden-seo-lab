import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    { url: siteUrl, lastModified: "2026-06-02", priority: 1 },
    { url: `${siteUrl}/guides`, lastModified: "2026-06-02", priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: "2026-06-02", priority: 0.6 },
    ...guides.map((guide) => ({
      url: `${siteUrl}/guides/${guide.slug}`,
      lastModified: guide.updatedAt,
      priority: 0.7,
    })),
  ];
}

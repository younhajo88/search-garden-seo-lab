export const SITE_NAME = "검색정원 SEO 실험실";

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://example.com"
  );
}

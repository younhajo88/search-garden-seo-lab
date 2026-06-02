export type GuideSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: "google-indexing-vercel-nextjs",
    title: "Vercel에 배포한 Next.js 사이트가 구글에 검색되는지 확인하는 순서",
    description:
      "사이트를 공개한 뒤 Google 색인 여부를 확인하는 가장 단순한 관찰 절차를 정리합니다.",
    category: "INDEXING",
    readingTime: "4분",
    publishedAt: "2026-06-02",
    updatedAt: "2026-06-02",
    sections: [
      {
        title: "배포 직후 바로 검색되지 않아도 이상하지 않습니다",
        paragraphs: [
          "새 사이트를 Vercel에 공개했다고 해서 같은 날 Google 검색 결과에 반드시 나타나는 것은 아닙니다. 검색 로봇이 페이지를 발견하고, 읽고, 색인에 반영하는 시간이 필요합니다.",
          "첫 번째 목표는 인기 검색어의 상단 노출이 아닙니다. 내 사이트가 검색 엔진에 발견되고 색인되는 과정을 확인하는 것입니다.",
        ],
      },
      {
        title: "첫 번째 확인은 site: 검색입니다",
        items: [
          "Google 검색창에 site:내도메인.example 을 입력합니다.",
          "검색정원 SEO 실험실처럼 사이트에서만 쓰는 고유한 이름도 검색합니다.",
          "Search Console의 URL 검사에서 홈 주소와 새 글 주소를 각각 확인합니다.",
          "배포일, 색인 요청일, 처음 검색된 날짜를 따로 기록합니다.",
        ],
      },
      {
        title: "검색 결과가 없을 때 살펴볼 항목",
        paragraphs: [
          "robots.txt가 전체 사이트를 막고 있지 않은지, 페이지에 noindex가 들어가지 않았는지, sitemap.xml에 공개 페이지 주소가 포함되어 있는지 확인합니다. 이 실험 사이트는 세 항목을 코드로 명시했습니다.",
        ],
      },
    ],
  },
  {
    slug: "nextjs-sitemap-robots-basics",
    title: "Next.js sitemap.xml과 robots.txt를 초보자 관점에서 이해하기",
    description:
      "검색 로봇에게 공개 페이지의 위치와 sitemap 주소를 알려 주는 두 파일의 역할을 비교합니다.",
    category: "TECHNICAL SEO",
    readingTime: "5분",
    publishedAt: "2026-06-02",
    updatedAt: "2026-06-02",
    sections: [
      {
        title: "sitemap.xml은 공개 페이지의 안내 지도입니다",
        paragraphs: [
          "sitemap.xml은 검색 엔진이 알아야 할 대표 URL을 모아 둔 파일입니다. sitemap이 있다고 검색 순위가 자동으로 올라가지는 않지만, 새 사이트의 공개 페이지를 확인하기 쉽게 만듭니다.",
        ],
      },
      {
        title: "robots.txt는 크롤링 규칙을 알려 줍니다",
        paragraphs: [
          "robots.txt는 검색 로봇이 어느 경로를 방문할 수 있는지 알려 주는 파일입니다. 이 프로젝트에서는 전체 공개를 허용하고 sitemap.xml 주소를 함께 제공합니다.",
          "robots.txt에서 허용했다고 모든 페이지가 반드시 색인되는 것은 아닙니다. 발견, 크롤링, 색인은 서로 다른 단계입니다.",
        ],
      },
      {
        title: "배포 후 직접 열어 볼 주소",
        items: [
          "https://내도메인.example/sitemap.xml",
          "https://내도메인.example/robots.txt",
          "https://내도메인.example/guides",
        ],
      },
    ],
  },
  {
    slug: "search-console-first-checklist",
    title: "Google Search Console 등록 후 첫 주에 기록할 것",
    description:
      "초보자가 숫자에 휩쓸리지 않고 색인 실험을 관찰하기 위한 짧은 체크리스트입니다.",
    category: "MEASUREMENT",
    readingTime: "4분",
    publishedAt: "2026-06-02",
    updatedAt: "2026-06-02",
    sections: [
      {
        title: "먼저 기준 날짜를 남깁니다",
        paragraphs: [
          "배포 날짜와 Search Console 속성 등록 날짜를 기록합니다. sitemap 제출 날짜와 URL 검사에서 색인 생성을 요청한 날짜도 적어 두면 변화를 해석하기 쉬워집니다.",
        ],
      },
      {
        title: "매일 확인할 필요는 없습니다",
        paragraphs: [
          "Google 검색 반영은 즉시 일어나지 않을 수 있습니다. 첫 주에는 홈, 가이드 목록, 개별 글 한 개를 정해 같은 URL의 상태를 비교합니다.",
        ],
      },
      {
        title: "기록표에 넣을 항목",
        items: [
          "확인 날짜",
          "site:도메인 검색 결과 유무",
          "고유 문구 검색 결과 유무",
          "Search Console URL 검사 상태",
          "수정하거나 새로 발행한 페이지",
        ],
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

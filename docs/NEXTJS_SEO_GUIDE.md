# Next.js SEO 기본 가이드

이 문서는 Next.js App Router 프로젝트에서 검색 노출을 준비할 때 확인할 항목을 정리합니다.

SEO의 목표는 모든 코드를 서버에서 실행하는 것이 아닙니다. Googlebot이 공개 URL을 방문했을 때 페이지의 주제와 핵심 내용을 완성된 HTML로 읽을 수 있게 만드는 것이 중요합니다.

## 1. 검색 노출이 필요한 URL을 먼저 정하기

검색 결과에서 사용자가 방문할 가치가 있는 공개 페이지를 각각 URL로 만듭니다.

```text
/                     서비스 소개
/games                게임 목록
/games/tetris         게임별 소개, 규칙, 조작법
/guides/how-to-play   초보자 가이드
```

로그인 이후의 개인 화면이나 게임 실행 전용 화면은 검색 노출 대상에서 제외할 수 있습니다.

```text
/login
/settings
/games/tetris/play
```

## 2. `layout.tsx`: 사이트 공통 메타데이터 설정

루트 `layout.tsx`에는 사이트 이름, 기본 설명, 제목 템플릿, 언어, 검색 허용 여부를 작성합니다.

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Text Battle | AI 캐릭터 PvP RPG",
    template: "%s | Text Battle",
  },
  description: "AI 캐릭터를 만들고 성장시키는 PvP RPG입니다.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
```

규칙:

- `<html lang="ko">`처럼 페이지의 주 언어를 지정합니다.
- 모든 페이지에 같은 제목을 사용하지 않습니다.
- 제목은 페이지 내용을 구체적으로 설명합니다.
- 설명은 검색 결과의 소개 문구 후보입니다. 페이지마다 고유하게 작성합니다.

## 3. `page.tsx`: 핵심 내용을 HTML에 포함하기

검색에 노출할 제목과 설명은 브라우저에서 API 요청이 끝난 뒤에만 보이도록 만들지 않습니다.

```tsx
// src/app/page.tsx: 기본적으로 Server Component
import { CharacterCarousel } from "./character-carousel";

export default async function HomePage() {
  const characters = await getPopularCharacters();

  return (
    <main>
      <h1>텍스트로 만드는 AI 캐릭터 PvP RPG</h1>
      <p>
        캐릭터의 설정과 능력을 직접 작성하고 다른 플레이어와 대결하세요.
      </p>

      <section>
        <h2>인기 캐릭터</h2>
        {characters.map((character) => (
          <article key={character.id}>
            <h3>{character.name}</h3>
            <p>{character.description}</p>
          </article>
        ))}
      </section>

      <CharacterCarousel initialCharacters={characters} />
    </main>
  );
}
```

규칙:

- 페이지마다 내용을 대표하는 `<h1>`을 하나 둡니다.
- 하위 주제는 `<h2>`, `<h3>` 순서로 구조화합니다.
- 검색에 중요한 텍스트는 이미지나 Canvas 안에만 넣지 않습니다.
- 데이터가 필요한 공개 콘텐츠는 서버에서 가져와 HTML에 포함합니다.
- 관련 페이지는 `<Link>`로 연결하여 Googlebot과 사용자가 이동할 길을 만듭니다.

## 4. 클라이언트 컴포넌트: 상호작용에만 사용하기

버튼, 슬라이더, 로그인 상태, Canvas 게임처럼 브라우저 기능이 필요한 부분은 클라이언트 컴포넌트로 분리합니다.

```tsx
// src/app/character-carousel.tsx
"use client";

import { useState } from "react";

export function CharacterCarousel({ initialCharacters }) {
  const [selected, setSelected] = useState(0);

  return (
    <button onClick={() => setSelected((selected + 1) % initialCharacters.length)}>
      다음 캐릭터
    </button>
  );
}
```

규칙:

- 페이지 전체에 무조건 `"use client"`를 붙이지 않습니다.
- 검색에 중요한 본문은 서버 컴포넌트에 남깁니다.
- 클라이언트 컴포넌트에는 필요한 초기 데이터만 props로 전달합니다.
- 로딩 화면만 초기 HTML에 있고 핵심 내용은 나중에 나타나는 구조를 피합니다.

## 5. 페이지별 메타데이터 작성

고정 페이지에는 `metadata`를 작성합니다.

```tsx
// src/app/games/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 캐릭터 게임 목록",
  description: "대결할 수 있는 AI 캐릭터 게임과 규칙을 확인하세요.",
  alternates: { canonical: "/games" },
};
```

동적 페이지에는 `generateMetadata()`를 사용합니다.

```tsx
// src/app/games/[slug]/page.tsx
import type { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGame(slug);

  return {
    title: game.title,
    description: game.description,
    alternates: { canonical: `/games/${slug}` },
  };
}
```

규칙:

- 각 URL에는 고유한 `title`과 `description`을 둡니다.
- 같은 콘텐츠가 여러 주소에서 열릴 수 있다면 대표 주소를 `canonical`로 지정합니다.
- 존재하지 않는 동적 경로는 `notFound()`로 404를 반환합니다.

## 6. 데이터 갱신 방식 선택

콘텐츠의 성격에 따라 렌더링 방식을 고릅니다.

| 콘텐츠 | 권장 방식 | 예시 |
| --- | --- | --- |
| 거의 바뀌지 않는 소개, 가이드 | SSG | 게임 소개, 규칙 |
| 일정 주기로 바뀌는 공개 데이터 | ISR | 인기 캐릭터, 주간 랭킹 |
| 요청 시점마다 최신이어야 하는 공개 데이터 | SSR | 실시간 대회 상태 |
| 사용자별 화면, 게임 조작 | CSR | 로그인 정보, Canvas 전투 |

ISR 예시:

```tsx
export const revalidate = 300; // 최대 5분 간격으로 HTML 갱신
```

SSR 예시:

```tsx
const rankings = await fetch("https://api.example.com/rankings", {
  cache: "no-store",
}).then((response) => response.json());
```

SSG, ISR, SSR 모두 Googlebot에게 완성된 HTML을 제공할 수 있습니다. SEO를 위해 모든 페이지를 SSR로 만들 필요는 없습니다.

## 7. `sitemap.ts`: 공개 URL 알리기

sitemap에는 검색에 노출할 대표 URL만 포함합니다.

```tsx
// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://example.com", priority: 1 },
    { url: "https://example.com/games", priority: 0.8 },
    { url: "https://example.com/games/tetris", priority: 0.7 },
  ];
}
```

규칙:

- 로그인 페이지, 설정 페이지, 중복 URL은 제외합니다.
- 실제로 존재하고 `200 OK`를 반환하는 canonical URL만 넣습니다.
- 새 공개 페이지가 추가되면 sitemap에도 포함합니다.

## 8. `robots.ts`: 크롤링 규칙 제공

```tsx
// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/settings/", "/api/"],
    },
    sitemap: "https://example.com/sitemap.xml",
  };
}
```

주의:

- `robots.txt` 차단은 비밀 보호 기능이 아닙니다. 개인정보는 인증으로 보호합니다.
- 검색 결과에서 제외할 페이지는 필요에 따라 `noindex`도 사용합니다.
- sitemap 주소가 실제 서비스 도메인을 가리키는지 확인합니다.

## 9. 검색 제외가 필요한 페이지

```tsx
// src/app/settings/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};
```

`/settings`, `/my-page`, 결제 완료 페이지처럼 검색 결과에서 가치가 없거나 개인화된 화면에 사용합니다.

## 10. 구조화 데이터 추가

구조화 데이터는 페이지의 의미를 명확하게 전달하는 보조 수단입니다. 검색 순위를 자동으로 올리는 기능은 아닙니다.

```tsx
const article = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "초보자를 위한 AI 캐릭터 대결 가이드",
  datePublished: "2026-06-02",
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
/>;
```

페이지에 실제로 보이는 내용과 일치하는 데이터만 작성합니다.

## 11. 이미지와 성능

```tsx
import Image from "next/image";

<Image
  src="/images/tetris-guide.png"
  alt="테트리스 게임 조작 화면"
  width={1200}
  height={630}
/>;
```

규칙:

- 의미 있는 이미지에는 내용을 설명하는 `alt`를 작성합니다.
- 장식용 이미지는 빈 `alt=""`를 사용합니다.
- 모바일에서도 읽기 쉬운 화면을 만듭니다.
- 큰 이미지와 불필요한 JavaScript를 줄여 로딩 속도를 관리합니다.

## 12. 배포 후 확인 순서

```text
https://example.com/
https://example.com/robots.txt
https://example.com/sitemap.xml
```

1. 공개 URL이 `200 OK`를 반환하는지 확인합니다.
2. 페이지 HTML에 제목, 설명, 본문, canonical URL이 있는지 확인합니다.
3. Google Search Console에서 URL 접두어 속성을 등록합니다.
4. `sitemap.xml`을 제출합니다.
5. URL 검사에서 대표 페이지의 색인 생성을 요청합니다.
6. 며칠 뒤 `site:example.com`과 고유한 사이트 이름으로 검색합니다.

## 13. 자주 하는 오해

- sitemap을 제출한다고 검색 순위가 바로 오르지는 않습니다.
- SSR을 사용한다고 자동으로 SEO가 좋아지지는 않습니다.
- Googlebot은 정적 페이지도 필요에 따라 다시 방문합니다.
- 페이지 수보다 사용자의 질문에 답하는 고유한 콘텐츠가 중요합니다.
- 숨겨진 키워드를 반복하거나 의미 없는 글을 대량 생성하면 도움이 되지 않습니다.

## 공식 참고 문서

- [Google SEO 기본 가이드](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google JavaScript SEO 기본사항](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Next.js Metadata API](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Next.js sitemap.xml](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js robots.txt](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)

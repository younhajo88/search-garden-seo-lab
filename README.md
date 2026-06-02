# 검색정원 SEO 실험실

Next.js 사이트를 Vercel에 배포하고 Google 검색 노출 과정을 관찰하기 위한 학습 프로젝트입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## 배포 전에 설정할 환경 변수

Vercel 프로젝트의 Settings > Environment Variables에서 아래 값을 실제 서비스 주소로 설정합니다.

```text
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

도메인을 연결하면 값을 새 도메인으로 바꾸고 다시 배포합니다. 이 값은 canonical URL, sitemap.xml, robots.txt, JSON-LD에 사용됩니다.

## 첫 배포 후 확인

아래 주소가 외부에서 열리는지 확인합니다.

```text
https://your-project.vercel.app/
https://your-project.vercel.app/sitemap.xml
https://your-project.vercel.app/robots.txt
https://your-project.vercel.app/guides
```

그 다음 [Google Search Console](https://search.google.com/search-console/)에 사이트를 등록하고 `sitemap.xml`을 제출합니다. URL 검사에서 홈과 가이드 글 하나의 색인 생성을 요청합니다.

## 검색 관찰 기록

| 확인 날짜 | `site:` 검색 | 고유 문구 검색 | Search Console 상태 | 변경 사항 |
| --- | --- | --- | --- | --- |
| 2026-06-02 | 확인 대기 | 확인 대기 | URL 접두어 속성 인증, sitemap 제출 | Vercel 첫 배포 및 Search Console 등록 |

고유 문구는 `검색정원 SEO 실험실`을 사용합니다. 검색 반영에는 시간이 걸릴 수 있으므로 주 1회 같은 조건으로 확인합니다.

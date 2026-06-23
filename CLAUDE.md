# 별 수가르기 — Claude Code 작업 규칙

초등 1학년 아이용 **수 가르기·모으기** 학습 PWA. `byeol-sudoku`(별 사냥 스도쿠)와 같은 "별" 시리즈로,
**단일 파일 정적 사이트**다. 태블릿에서 직접 풀고(풀기), A4 문제지로 출력(출력)할 수 있다.
- 배포(예정): https://hyessung0806.github.io/byeol-sugarugi/  ← **아직 원격 저장소·Pages 미설정**
- 현재는 로컬 git 저장소만 존재. (원격/Pages 설정은 README A 참고 — 다음 단계)

## 파일 구조 (모두 저장소 루트에 위치)
- `index.html` — 앱 전체 (HTML + CSS + JS 한 파일). 거의 모든 작업은 여기서.
- `manifest.json` — PWA 정보 (이름, 아이콘, theme)
- `sw.js` — 오프라인 캐싱 서비스워커
- `icon-192.png` / `icon-512.png` / `icon-maskable-512.png` — 앱 아이콘 (수 가르기 8→5,3 + 별)
- `README.md` / `HANDOFF.md` / `GALAXY_TAB_설치가이드.md` — 설치·맥락 문서

## 작업이 끝나면 항상 (필수)
1. `git add . && git commit -m "<요약>"` (한국어). 원격이 생기면 `git push`까지 해야 사이트에 반영.
2. 앱 동작/파일을 바꿨으면 **`sw.js`의 캐시 버전을 올린다**: `byeolsugarugi-v1` → `v2` → …
   (안 올리면 태블릿에 예전 버전이 캐시되어 그대로 보임)
3. 작업이 완료되면 루트 규칙대로 `Hand-off/작업_핸드오프_YYYY-MM-DD.md`에 기록 + 함께 커밋.
4. 모든 파일은 **루트에 유지**. 하위 폴더로 옮기면 Pages 주소가 깨짐.

## 설정 상수 (index.html `<script>` 위쪽)
- `STAGES[]` : 난이도 사다리. 한 줄 추가로 새 단계 생성. 예) `{ key:"s20", label:"20까지", min:11, max:20 }`
- `POINTS=100` : 한 문제 점수
- `DEFAULTS` : 처음 설정값 — `{ type, dailyTarget, levelTarget }`
  - `type`: `split`(가르기) / `merge`(모으기) / `mix`(섞기) — **풀기 사이드바 ‘유형’에서 선택**. `optsForType()`가 생성옵션으로 변환. (옛 split/merge/shuffle 저장값은 loadSave에서 type으로 자동 변환)
  - `dailyTarget` 하루 미션 수 / `levelTarget` 단계 통과 문제 수 (부모 모드에서 조절)
- 저장키: `byeolsugarugi_save_v1`

## 핵심 구조 (index.html 섹션 번호)
1. STAGES/상수 · 2. Store 저장소 · 3. `makeProblem`(수 가르기/모으기 생성) · 4. `bondSVG`(다이어그램)
5. 풀기 모드 · 6. 단계/진행도 · 7. 축하 모달 · 8. 기록(도장판) · 9. 출력 학습지 · 10. 부모 모드 · 11. 시작

- **문제 단위**: `{ W, A, B, style:'split'|'merge', blank:'top'|'left'|'right' }`, 항상 `A+B===W`, 부분 ≥1.
- **다이어그램**: 전부 인라인 SVG(`bondSVG`). 화면(play)·인쇄(print)·정답(answer) 3가지 모드. 인쇄 시 벡터라 깨끗.
- **부모 모드**: 제목 길게 누르기(`bindLongPress`) → 비번. 단계 개방, 미션/통과 수 조절, **기록 초기화(`resetProgress`, 2탭 확인 → 점수·별·도장·maxLevel 0, 비번·설정 유지)**, 비번 변경/초기화. (유형은 풀기 사이드바에서 선택)

## 지켜야 할 원칙
- 저장은 localStorage지만 **항상 `Store` 래퍼(try/catch + 메모리 폴백)** 를 거친다. 직접 호출 금지.
- 아이용 → 문구는 쉽고 격려하는 톤. 점수·도장·연속 보상 구조 유지.
- **외부 라이브러리·CDN 없이 단일 파일** 유지 (오프라인 동작 보장).
- 진행 기록(점수·도장)은 기기 데이터 → 재배포해도 안 지워짐.
- 출력 학습지 디자인은 **자체 디자인**(funmom 등 외부 브랜딩 복제 금지). 문제는 매번 새로 생성.

## 테스트
빌드 없음. 로컬 확인: `python3 -m http.server 8000` → http://localhost:8000
(서비스워커·PWA 설치는 localhost 또는 https에서만 동작)

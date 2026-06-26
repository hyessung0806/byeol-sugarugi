---
type: project
aliases:
  - 별 수가르기
  - 수 가르기 모으기
description: "Single-file PWA for number bonds (split/merge) practice for a 1st-grade child (star series): solve on tablet plus infinite A4 worksheet printing. Reference for status: built, verified, deployed, real-device confirmed and wrapped up; only optional extensions remain."
author:
  - "[[김혜성]]"
date created: 2026-06-24
date modified: 2026-06-26
tags:
  - project
  - 별시리즈
  - PWA
status: 완료
started: 2026-06-22
updated: 2026-06-24
remarks: "실기기 확인까지 마치고 마무리(2026-06-26). 도장 조건 가르기20+모으기20(자동안내)·자동업데이트(네트워크우선 sw) 동작. 추가 필요 시(선택): 효과음·셈 도우미·가르기 3칸"
deploy: "https://hyessung0806.github.io/byeol-sugarugi/"
stack: "단일 파일 PWA (HTML/CSS/JS, 무 CDN)"
---

# byeol-sugarugi

## 개요
초등 1학년 딸용 **수 가르기·모으기** 학습 PWA. `byeol-sudoku`의 자매 앱(별 시리즈). 태블릿에서 직접 풀고(키패드 입력·별 보상·단계 사다리), A4 학습지로 무한 출력(9문제+정답지). 부모 모드로 난이도·기록 관리.

## 산출물
- `index.html`(풀기·출력·기록·부모 모드 전부) · `manifest.json` · `sw.js`(캐시 v9, 네트워크 우선) · 아이콘 3종
- GitHub Pages 배포 완료

## 최근 작업
- 최신 핸드오프: [작업_핸드오프_2026-06-24.md](Hand-off/작업_핸드오프_2026-06-24.md)
- 결론(06-24): 도장 조건을 **가르기 20 + 모으기 20**(앱 자동 안내로 항상 40문제→도장, 과거 도장 보존 마이그레이션)으로 변경 + `sw.js` **네트워크 우선**으로 재설치 없는 자동 업데이트. 시뮬 1.2만 회·마이그레이션 검증 통과.
- 이전(06-22): 코드·검증(생성기 8만+회·jsdom 회귀)·배포 + 피드백 7건 반영.

## 남은 작업
- **(2026-06-26) 실기기 확인까지 마치고 프로젝트 마무리.** 추가 요청이 생기면 그때 재개.
- (선택) 효과음 / 셈 도우미(점 표시) / 가르기 3칸 등 확장

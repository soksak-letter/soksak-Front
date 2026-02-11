# ✉️ 속삭편지 (Soksak Letter)

> 나를 만나는 질문, 타인과 나누는 익명 편지
> 과도한 자극의 시대에, **성찰과 진정성 있는 연결**을 다시 꺼내는 편지 서비스

사용자 서비스: https://www.soksak-letter.com/

<!-- 어드민: [https://(어드민링크)](https://%28어드민링크%29) -->

<img width="1920" height="1080" alt="soksak_main" src="https://github.com/user-attachments/assets/3075779c-e47f-4555-9f59-4ac92872fd46" />

<br />
<br />

## 🐵 Team 천숭이

### 팀명: 천숭이

가**천**대(FE: 3명, BE: 3명) + **숭**실대(PM, Designer, FE) => **천숭이**

### R&R

| 분야   | 이름                                             | 포지션                                           |
| ------ | ------------------------------------------------ | ------------------------------------------------ |
| PM     | 세이/소아연                                      | 프로젝트 매니징, 요구사항 정의, 일정/리스크 관리 |
| Design | 우니/조정운                                      | 디자인 시스템, UX/UI, 프로토타입                 |
| FE     | 젠/김지원, 예디/차예린, 에잇/양수지, 유니/남지윤 | 사용자 플로우 구현, API 연동, 상태/캐시 관리     |
| BE     | 푸미/김서준, 두부/조연준, 규식/박승주            | API/DB 설계, 인증/보안, 배포/운영                |

<br />

## 📮 서비스 개요

### 서비스 정의

**나를 만나는 질문, 타인과 나누는 익명 편지 서비스**

- 매일 도착하는 “오늘의 질문”에 답하며 생각을 정리하고
- 매칭된 상대와 **최대 10회** 편지를 주고받으며
- **3일 뒤 나에게 오는 편지(D+3)** 로 리텐션과 회복 경험을 만든다

<br />

## 🎯 문제 정의

### 1) 문제 상황

현대의 AI/SNS 사용자는 숏폼·SNS·AI Slop 등 **도파민성 정보 과잉**에 노출되어,
감정적으로 지쳤을 때 즉각적인 자극에 의존하게 됩니다.
그 결과 “생각할 시간”이 줄어 **자기 성찰**이 어려워지고, 장기적으로 번아웃/고립감이 누적됩니다.

### 2) 문제 원인

- 근본 원인: **내면의 불안정성** + **건강한 사유를 위한 창구 부재**
- 쉬운 해결(즉각 자극, AI 의존)로 고통을 회피하는 습관 강화
- 기존 해결책(일기/명상 앱)은 부담·지루함으로 **지속 사용 유도 실패**

### 3) 문제 영향

- 자기 객관화 능력 저하 → 감정 소모 증가
- 외부 자극 의존 강화 → 심리적 피로/고립감 악화
- 장기적으로 정신적 건강에 부정적 영향

<br />

## 💡 목적(Why) & 배경(Background)

### 서비스 목적(Why)

**편지의 가치를 통해, 사용자에게 성찰과 소통의 기회를 제공하여 장기적인 심리적 안정감을 준다.**

### 배경(Background)

| Fact                                      | Insight                                                        |
| ----------------------------------------- | -------------------------------------------------------------- |
| 디지털 디톡스/도파민 디톡스 트렌드 확산   | 사용자는 자극의 악순환에 지쳤고, **습관 교정형 경험**을 원한다 |
| SNS 사용 증가 ↔ 비교 심화로 인한 고립감   | 외로움은 연결의 부재가 아니라 **연결의 품질 문제**다           |
| 심리상담 시장 성장, 사회적 고립 이슈 확대 | 큰 비용/시간 없이 일상 속에서 **예방적 자기관리** 니즈가 있다  |

참고(예시): 서울시 ‘사회적 고립’ 정책 자료: [https://www.seoul.go.kr/policy/view.do?id=1056&lan=KO](https://www.seoul.go.kr/policy/view.do?id=1056&lan=KO)

<br />

## 👀 주요 사용자(Target User)

- 대학생
- 20대 직장인
- 20대 AI/SNS 헤비 유저

<br />

## 🧭 User Journey Map

> “유입 → 탐색 → 매칭/소통 → 종료/피드백 → 재방문/확장”의 경험을 한 장으로 설계

| 단계        | 1. 유입 및 온보딩                                | 2. 탐색               | 3. 매칭 및 소통           | 4. 종료 및 피드백          | 5. 재방문 및 확장                  |
| ----------- | ------------------------------------------------ | --------------------- | ------------------------- | -------------------------- | ---------------------------------- |
| 사용자 목표 | 빠르게 가입하고 가치 확인                        | 오늘의 질문 확인      | 티키타카 되는 대화        | 깔끔한 마무리/평가         | 기록 확인/추가 작성                |
| 주요 행동   | 소셜 로그인 → 프로필 → **D+3 편지(필수)** → 알림 | 질문 확인 → 답변 작성 | 발송→매칭→교환(최대 10회) | 종료(10회/48h) → 온도/태그 | **3일 전 편지 도착** → 주간 리포트 |
| 터치포인트  | 랜딩/온보딩/OS 알림                              | 홈(오늘의 질문 카드)  | 채팅방/카운터             | 리뷰 모달/종료 페이지      | 보관함/리포트/DatePicker           |
| 기회요인    | Lock-in(미래 보상)                               | 희소성(24h)           | 품질관리(답장률/온도)     | 데이터 선순환              | 유료화 확장                        |

<img width="3901" height="2900" alt="soksak_ia" src="https://github.com/user-attachments/assets/786471c4-e3dc-44c1-97c3-e27a262510f7" />
<img width="1920" height="1080" alt="soksak_userjourneymap" src="https://github.com/user-attachments/assets/a22c9668-906f-4119-b5e4-436e804021d1" />

<br />
<br />

## 🧩 핵심 기능

- **오늘의 질문(24시간)**  
   매일 질문 갱신 / 카운트다운 / 답변 진입

- **익명 매칭 & 편지 교환(최대 10회, 48시간)**  
   대화 횟수 카운트, 만료 처리

- **D+3 나에게 쓰는 편지(온보딩 필수)**
  “미래의 나”에게 보내는 예약 편지, 알림으로 회수

- **종료 리뷰(온도 슬라이더 + 후기 태그)**  
   경험 데이터 수집 → 다음 매칭 품질 개선

- **주간 리포트**  
   일주일 기록 요약/감정 분포/키워드 인사이트 제공

- **친구 기능 / 테마 배경 / 폰트 옵션 / 예약 편지 확장**

<br />

## 🔍 System Architecture

<img width="1034" height="677" alt="soksak_infrastructure" src="https://github.com/user-attachments/assets/7f4e0445-0ff0-48dd-b4ad-6ced6cec9115" />

<br />
<br />

## 🗃️ ERD

<img width="5704" height="3247" alt="soksak_erd" src="https://github.com/user-attachments/assets/317862c5-174f-46ea-8502-99a84a7f0450" />

<br />
<br />

## **💻 Technology**

### Web

- ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black)![TypeScript](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white)
- ![React-Query](https://img.shields.io/badge/reactquery-FF4154?style=flat-square&logo=react-query&logoColor=white)
  ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=flat-square&logo=TanStackQuery&logoColor=white)
  ![Zustand](https://img.shields.io/badge/zustand-000000?style=flat-square&logo=zustand&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/tailwindcss-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/framer_motion-0055FF?style=flat-square&logo=framer&logoColor=white)

### Server

- ![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ%20IDEA-000000.svg?style=flat-square&logo=intellij-idea&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
  ![Gradle](https://img.shields.io/badge/Gradle-02303A.svg?style=flat-square&logo=Gradle&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-black?style=flat-square&logo=JSON%20web%20tokens)
- ![MySQL](https://img.shields.io/badge/MySQL-%2300f.svg?style=flat-square&logo=mysql&logoColor=white)
- ![GitHub Actions](https://img.shields.io/badge/Github%20Actions-%232671E5.svg?style=flat-square&logo=githubactions&logoColor=white)
  ![Docker](https://img.shields.io/badge/Docker-%230db7ed.svg?style=flat-square&logo=docker&logoColor=white)
  ![Nginx](https://img.shields.io/badge/Nginx-%23009639.svg?style=flat-square&logo=nginx&logoColor=white)

### Co-working Tool

- ![Github](https://img.shields.io/badge/Github-181717.svg?style=flat-square&logo=github&logoColor=white)
  ![Notion](https://img.shields.io/badge/Notion-000000.svg?style=flat-square&logo=notion&logoColor=white)

<br>

## **🐾 기술 스택 선정 이유**

### **📘 Web 스택 선정 이유**

- React + Vite  
   속삭편지는 모바일 375px 고정 UI 기반의 SPA 서비스로, SSR이 필수적인 구조는 아닙니다. 빠른 개발 속도와 가벼운 번들 환경을 제공하는 Vite 기반 React 구조를 채택하여 개발 효율성과 빌드 속도를 동시에 확보하였습니다.

- TypeScript  
   편지, 매칭, 리포트 등 도메인이 명확하고 API 응답 구조가 중요한 서비스 특성상 타입 안정성이 중요합니다. TypeScript를 통해 협업 시 의도를 명확히 하고, 리팩토링 과정에서 발생할 수 있는 오류를 사전에 방지하고자 선정하였습니다.

- TanStack Query  
   서버 데이터와 클라이언트 상태를 분리하여 관리하기 위해 TanStack Query를 도입하였습니다. 캐싱, 자동 refetch, 로딩/에러 상태 관리 기능을 활용하여 API 중심 구조에서 안정적인 데이터 흐름을 유지하고자 하였습니다.

- Zustand  
   전역 상태를 최소한으로 관리하기 위해 경량 상태 관리 라이브러리인 Zustand를 채택하였습니다. 불필요한 보일러플레이트 없이 직관적인 store 구조를 유지할 수 있으며, 인증 상태나 모달 관리 등 UI 중심 전역 상태에 적합하다고 판단하였습니다.

- Tailwind CSS  
   Figma 기반 디자인 시스템을 빠르게 구현하기 위해 Tailwind CSS를 사용하였습니다. 유틸리티 클래스 기반 스타일링을 통해 일관된 디자인을 유지하면서도 개발 속도를 높일 수 있어 선정하였습니다.

- Framer Motion  
   편지 전환, 모달 등장 등 감성적인 인터랙션이 중요한 서비스 특성을 고려하여 Framer Motion을 도입하였습니다. 직관적인 API와 부드러운 애니메이션 구현이 가능하여 사용자 경험을 강화할 수 있었습니다.

<br />

### **📗 Server 스택 선정 이유**

- Node.js + Express  
   속삭편지는 REST 기반 API 서버 구조로 설계되었습니다. 빠른 개발과 유연한 라우팅 구성이 가능한 Node.js와 Express를 활용하여 프론트엔드와의 협업 효율을 높이고자 하였습니다.

- MySQL  
   편지, 유저, 매칭, 리뷰 등 관계형 데이터 구조가 명확한 서비스이기 때문에 트랜잭션과 무결성을 보장하는 RDBMS인 MySQL을 채택하였습니다. 데이터의 안정성과 일관성을 유지하는 데 중점을 두었습니다.

- Redis  
   매칭 대기열 처리 및 캐싱과 같이 빠른 응답이 필요한 영역을 최적화하기 위해 Redis를 사용하였습니다. 이를 통해 서버 부하를 줄이고 응답 속도를 개선하고자 하였습니다.

- JWT  
   무상태 인증 구조를 유지하기 위해 JWT 기반 인증 방식을 적용하였습니다. 서버 확장성과 인증 처리의 단순화를 고려하여 해당 방식을 채택하였습니다.

<br />

## 🔖 Naming Rules (Front 기준)

### 폴더 규칙

- 모든 폴더는 **소문자 또는 kebab-case**
  - 예: `weekly-report`, `bottom-sheet`

- 도메인 단위로 분리 (`feed`, `letters`, `friend` 등)
- 공통 UI는 `common/`
- 전역 동작 컴포넌트는 `system/`

### 컴포넌트 파일

- React 컴포넌트: `PascalCase.tsx`
- Page 컴포넌트: `PascalCasePage.tsx`
- Tab/Section/Modal 등 역할이 드러나는 이름 사용
  - 예: `FriendTopTabs`, `LetterCard`, `ModalFrame`

### Hook

- 반드시 `use`로 시작
- camelCase
- 도메인별 하위 폴더 유지

### Store (Zustand)

- `camelCaseStore.ts`
  - 예: `activityStore.ts`

### API

- 도메인 단위 파일
  - `friend.ts`
  - `weeklyReport.ts`

<br />

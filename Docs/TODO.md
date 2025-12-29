# 🎯 Furniture Simulator - TODO List

**프로젝트:** Unity + React 가구 배치 시뮬레이터  
**기간:** 2025년 12월 - 2026년 3월  
**마지막 업데이트:** 2025년 12월 29일

---

## 🚀 현재 진행 중

### Week 6 Day 1 (다음! 12/30 화요일)
- [ ] Unity 프로젝트 상태 확인
- [ ] WebGL 빌드 최종 확인
- [ ] React 프로젝트 준비
- [ ] react-unity-webgl 라이브러리 조사
- [ ] 통합 전략 수립

---

## ✅ 완료

### Week 1 (12/6-8)
- [x] Unity 6 설치 및 프로젝트 생성
- [x] 카메라 컨트롤러 (구면좌표계)
- [x] 가구 에셋 임포트 (5개)
- [x] 방 모델링 (4x4x3m)
- [x] Git/GitHub 설정

### Week 2 (12/9-15)
- [x] Raycast 기반 가구 배치
- [x] 고스트 미리보기 시스템
- [x] 가구 선택 시스템 (클릭)
- [x] 가구 이동 (드래그)
- [x] 가구 회전 (Q/E 키)
- [x] 가구 삭제 (Delete 키)
- [x] CollisionChecker 유틸리티 구현
- [x] 충돌 감지 (초록/빨강)
- [x] Material 메모리 최적화

### Week 3 Day 1 (12/16)
- [x] WebCommunication.cs 작성
- [x] WebBridge.jslib 작성
- [x] Unity → JavaScript 통신 구조
- [x] JavaScript → Unity 통신 구조
- [x] 위치 + 회전 정보 전송
- [x] FurniturePlacer 통합
- [x] Editor 테스트 (Space, T 키)

### Week 3 Day 2 (12/17-18) 🎉
- [x] FurnitureData.cs 작성
- [x] JSON 데이터 구조 설계
- [x] PositionData 클래스 (Vector3 직렬화)
- [x] FurnitureListData 클래스 (배열 + 메타데이터)
- [x] SendJSON() 메서드 구현
- [x] SendAllFurnitureData() 메서드 구현
- [x] 가구 가격/카테고리 데이터 추가
- [x] JSON 직렬화 성공
- [x] WebBridge.jslib JSON 파싱 추가
- [x] Editor 테스트 (J 키)

### Week 3 Day 3-4 ⏭️
- [x] 스킵 (React UI로 대체 예정)
  - Unity UI는 Month 2에서 React로 구현
  - 시간 효율적 사용

### Week 3 Day 5-7 (12/19) 🎉
- [x] WebGL 빌드 설정
- [x] Gzip 압축 적용 (.unityweb)
- [x] test.html 양방향 통신 구현
- [x] 브라우저 테스트 완료
- [x] Unity-JS JSON 데이터 전송
- [x] 웹 압축 기초 가이드 작성
- [x] README.md 완성 (14KB, 609줄)
- [x] **Week 3 완료!** 🎊

### Week 4 ⏭️
- [x] 스킵 (시간 효율화)
  - Unity 최적화는 Week 8에서 React 통합하면서
  - 10일 단축 유지!

### Month 2 Week 5 Day 1 (12월 중순) 🎉
- [x] React 개발 환경 세팅
- [x] TypeScript React 프로젝트 생성 (furniture-app)
- [x] 폴더 구조 이해
- [x] JSX 문법 학습 (중괄호, className)
- [x] 첫 컴포넌트 만들기 (Button.tsx)
- [x] Props 개념 및 사용법
- [x] CSS 스타일링 (인라인 vs 클래스)
- [x] useState Hook 학습
- [x] Counter 컴포넌트 실습
- [x] FurnitureCounter 실습
- [x] 이벤트 핸들링 (onClick)
- [x] TypeScript 타입 정의
- [x] **React 기초 완성!** ✨

### Month 2 Week 5 Day 2 (12월 중순) 🎉
- [x] 리스트 렌더링 (map, key prop)
- [x] 조건부 렌더링 (if/else, 삼항, &&)
- [x] useEffect Hook
  - [x] 생명주기 (Mount/Update/Unmount)
  - [x] Cleanup 함수
  - [x] 의존성 배열
  - [x] 타이머 예시
- [x] Input/Form 다루기
  - [x] 텍스트 입력 (value, onChange)
  - [x] 체크박스
  - [x] 라디오 버튼
  - [x] Form 제출 (onSubmit)
- [x] Todo 앱 기본 기능
  - [x] 할 일 추가
  - [x] 할 일 완료 체크
  - [x] 할 일 삭제
  - [x] 통계 표시
- [x] localStorage 자동 저장/불러오기
- [x] 컴포넌트 분리
  - [x] TodoForm.tsx
  - [x] TodoList.tsx
  - [x] TodoItem.tsx
  - [x] TodoStats.tsx
- [x] 타입 파일 분리 (types.ts)
- [x] **기본 Todo 앱 완성!** ✨

### Month 2 Week 5 Day 3 (12/29 월) 🎉
- [x] useRef Hook 심화 학습
  - [x] DOM 요소 참조
  - [x] 자동 포커스
  - [x] 텍스트 전체 선택
  - [x] 조건부 실행 (useEffect)
- [x] Todo 앱 완전 고도화
  - [x] 필터링 시스템
    - [x] 전체/진행중/완료 버튼
    - [x] 필터 상태 관리
    - [x] filteredTodos 계산
  - [x] 검색 기능
    - [x] 검색 Input 추가
    - [x] 대소문자 구분 없이 검색
    - [x] 검색 결과 개수 표시
  - [x] 필터 + 검색 조합 구현
  - [x] 수정 기능 (Edit)
    - [x] 수정 모드 상태 관리
    - [x] 더블클릭으로 수정 모드 진입
    - [x] 수정 버튼으로 수정 모드 진입
    - [x] useRef로 자동 포커스
    - [x] 텍스트 전체 선택 (.select())
    - [x] Enter 키로 저장
    - [x] Escape 키로 취소
    - [x] 포커스 잃으면 자동 저장 (onBlur)
  - [x] UX 개선
    - [x] 버튼 클릭 충돌 문제 발견
    - [x] 레이아웃 변경 (세로 배치)
    - [x] 수정 모드 시각적 구분
    - [x] 단축키 안내 메시지
- [x] **Todo 앱 완전 완성!** 🔥

### Week 5 Day 5-7 (TypeScript 심화)
- [x] 스킵 (Unity-React 통합하면서 배우기로 결정)
  - TypeScript는 실전에서 학습
  - 시간 효율적 사용

**Week 5 최종 결과:**
- [x] React Hooks 마스터 (useState, useEffect, useRef)
- [x] 컴포넌트 설계 능력
- [x] TypeScript 기본 타입 관리
- [x] 실전 수준 Todo 앱
- [x] localStorage 활용
- [x] 필터링 + 검색 시스템
- [x] **Week 5 완료!** 🎊

---

## 📋 예정 작업

### Week 6: Unity-React 통합

#### Day 1 (12/30 화) ⏳
- [ ] Unity 프로젝트 열기 및 상태 확인
- [ ] WebGL 빌드 최종 테스트
- [ ] React 프로젝트 준비 (furniture-app)
- [ ] react-unity-webgl 라이브러리 조사
  - [ ] 공식 문서 읽기
  - [ ] 사용 예시 확인
  - [ ] 설치 방법 파악
- [ ] 통합 전략 수립

#### Day 2-3 (수-목)
- [ ] react-unity-webgl 설치
  ```bash
  npm install react-unity-webgl
  ```
- [ ] Unity 빌드 파일을 React 프로젝트에 복사
  ```
  public/unity-build/
  └── Build/
      ├── build.data
      ├── build.framework.js
      ├── build.loader.js
      └── build.wasm
  ```
- [ ] UnityPlayer 컴포넌트 작성
- [ ] useUnityContext Hook 사용
- [ ] 기본 렌더링 테스트
- [ ] 로딩 상태 처리

#### Day 4-5 (금-토)
- [ ] Unity → React 통신 구현
  - [ ] addEventListener 사용
  - [ ] 가구 배치 이벤트 수신
  - [ ] JSON 데이터 파싱
- [ ] React → Unity 통신 구현
  - [ ] sendMessage 사용
  - [ ] 가구 선택 명령 전송
  - [ ] Unity에서 명령 처리
- [ ] 양방향 통신 디버깅 및 테스트

#### Day 6-7 (토-일)
- [ ] 간단한 가구 선택 UI (React)
- [ ] 버튼 클릭 → Unity에 전달
- [ ] Unity에서 가구 배치
- [ ] 배치 완료 → React에 알림
- [ ] 상태 동기화 확인
- [ ] 통합 테스트

**Week 6 예상 결과물:**
- Unity + React 통합 프로젝트 ✅
- 양방향 통신 구조 ✅
- 기본 인터랙션 ✅

---

### Week 7: UI 구현

#### Day 1-2
- [ ] 가구 목록 사이드바 디자인
- [ ] 가구 카드 컴포넌트
- [ ] 카테고리별 분류
- [ ] CSS 스타일링 (TailwindCSS or Styled-components 결정)
- [ ] 가구 선택 인터랙션

#### Day 3-4
- [ ] 비용 계산기 컴포넌트
- [ ] 배치된 가구 목록 표시
- [ ] 개별 가구 삭제 버튼
- [ ] 총 비용 표시
- [ ] 통계 패널

#### Day 5-7
- [ ] 저장/불러오기 기능
  - [ ] 현재 배치 저장 (localStorage)
  - [ ] 저장된 배치 불러오기
  - [ ] 여러 배치 관리
- [ ] UI/UX 폴리싱
- [ ] 반응형 디자인 (선택)
- [ ] 애니메이션 추가

**Week 7 예상 결과물:**
- 완성된 React UI
- 저장/불러오기 시스템

---

### Week 8: 배포 + 마무리

#### Day 1-3
- [ ] 추가 기능 (선택)
  - [ ] 평면도 미니맵
  - [ ] 측정 도구
  - [ ] 가구 검색
  - [ ] 배치 애니메이션

#### Day 4-7
- [ ] 프로젝트 최적화
  - [ ] Unity WebGL 빌드 최적화
  - [ ] React 번들 크기 최적화
  - [ ] 로딩 속도 개선
- [ ] Vercel 배포
  - [ ] 계정 생성
  - [ ] 프로젝트 연결
  - [ ] 배포 설정
  - [ ] 도메인 연결 (선택)
- [ ] README 완성
  - [ ] 프로젝트 설명
  - [ ] 기능 목록
  - [ ] 기술 스택
  - [ ] 스크린샷/GIF
  - [ ] 데모 링크
- [ ] 데모 영상 촬영
  - [ ] 화면 녹화
  - [ ] 3-5분 시연
  - [ ] 편집 (선택)
- [ ] GitHub 정리
  - [ ] 코드 정리
  - [ ] 주석 추가
  - [ ] 문서 업데이트

**Week 8 예상 결과물:**
- 배포된 웹사이트 ✅
- 완성된 포트폴리오 프로젝트 ✅
- **프로젝트 1 완성!** 🎉

---

## 🔧 개선 사항 (나중에)

### 고급 기능 (Month 3 추가 가능)
- [ ] 실시간 가격 계산 애니메이션
- [ ] Undo/Redo 기능 (명령 패턴)
- [ ] 가구 복사 기능
- [ ] 스냅 그리드 (격자에 맞춤)
- [ ] 가구 그룹화
- [ ] 평면도 2D 미니맵
- [ ] 다양한 방 크기 선택
- [ ] 벽/바닥 색상 변경
- [ ] 조명 제어

### UI/UX
- [ ] 다크모드/라이트모드
- [ ] 다국어 지원
- [ ] 튜토리얼 모드
- [ ] 단축키 가이드
- [ ] 모바일 최적화

---

## 🐛 버그 & 이슈

### 알려진 문제
- 없음 (현재 모두 해결됨!)

### 해결됨
- [x] Material 메모리 누수 (OnDestroy 추가)
- [x] FurnitureSelector null 체크
- [x] 회전 시 충돌 감지 부정확 → CollisionChecker로 해결
- [x] 드래그 중 충돌 감지 → StopDrag에서 처리
- [x] 코드 중복 → CollisionChecker 유틸리티로 해결
- [x] Todo 앱 수정 모드 버튼 충돌 → 레이아웃 변경으로 해결

---

## 📚 학습 노트

### Week 1-2에서 배운 Unity 개념
- Raycast (화면 → 3D 공간 변환)
- Material 메모리 관리 (.material vs .sharedMaterial)
- Layer 시스템 (LayerMask)
- 구면좌표계 수학 (카메라 회전)
- Physics.OverlapBox 충돌 감지
- Bounds.Encapsulate (여러 Collider 합치기)

### Week 3에서 배운 Unity-Web 개념
- Unity WebGL 통신 구조
- jslib 파일 작성법
- [DllImport("__Internal")] 사용
- Unity → JavaScript (C# → JS)
- JavaScript → Unity (SendMessage)
- CustomEvent 발생 및 리스닝
- JSON 직렬화/역직렬화
- [Serializable] 속성
- JsonUtility.ToJson()
- 복잡한 데이터 구조 전송

### Week 5에서 배운 React 개념
- JSX 문법 (중괄호, className)
- 컴포넌트 (함수형)
- Props & State
- Hooks
  - **useState:** 상태 관리
  - **useEffect:** 생명주기, 부수효과
    - Mount/Update/Unmount
    - Cleanup 함수
    - 의존성 배열
  - **useRef:** DOM 참조, 값 저장
    - 자동 포커스
    - 텍스트 선택
    - 리렌더링 없이 값 보관
- 이벤트 핸들링
- 조건부 렌더링 (if, &&, 삼항)
- 리스트 렌더링 (map, key)
- Form 다루기 (value, onChange, onSubmit)
- localStorage (저장/불러오기)
- 컴포넌트 분리 및 Props 전달
- TypeScript 타입 정의
- 타입 파일 분리 (.ts)

### 마스터한 패턴
- **React 불변성:** Spread 연산자 (...) 사용
- **조건부 포커스:** useEffect + useRef
- **필터링 + 검색:** 복합 조건
- **레이아웃 변경:** UX 문제 해결
- **Material 관리:** 메모리 누수 방지

### 참고 문서
- [구면좌표계 가이드](/mnt/project/구면좌표계_수학_공식_가이드.md)
- [Material 관리 가이드](/mnt/project/Unity_Material_메모리_관리_가이드.md)
- [Git 브랜치 전략](/mnt/project/Git_브랜치_전략_가이드.md)
- [Git 커밋 메시지](/mnt/project/Git_커밋_메시지_가이드.md)
- [React 핵심개념 Q&A](/mnt/user-data/outputs/React_핵심개념_QnA.md) ← New!
- [Unity WebGL 문서](https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html)
- [JsonUtility 문서](https://docs.unity3d.com/ScriptReference/JsonUtility.html)
- [React 공식 문서](https://react.dev)

---

## 🎯 이번 주 목표

**Week 6 (12/29 ~ 1/4):**
- [ ] Day 1 (12/29 월): Unity-React 통합 준비 ⏳ **오늘!**
- [ ] Day 2-3 (화-수): react-unity-webgl 설치 & 렌더링
- [ ] Day 4-5 (목-금): 양방향 통신 구현
- [ ] Day 6-7 (토-일): 기본 인터랙션 완성

**목표:** Unity와 React가 서로 대화하게 만들기! 🚀

---

## 📊 전체 진행 상황

```
✅ Week 1: Unity 기초 (3일) - 100%
✅ Week 2: 핵심 기능 (8일) - 100%
✅ Week 3: WebGL 통신 & 빌드 (3일) - 100%
⏭️ Week 4: 스킵 (시간 절약)
✅ Week 5: React 기초 (3일) - 100%
⏳ Week 6: Unity-React 통합 (7일) - 0%
□ Week 7: UI 구현 (7일) - 0%
□ Week 8: 배포 (7일) - 0%

완료: 17일 / 60일
진행률: 28.3%
시간 단축: 10일! 🔥
상태: 빠른 진행 중 🚀
현재 날짜: 2025년 12월 29일 (월)
다음: 2025년 12월 30일 (화) - Week 6 시작!
```

---

## 🔄 최근 변경 사항

### 2025-12-29 (Week 5 Day 3 완료) 🎉
- useRef Hook 심화 학습 완료
  - DOM 참조 방법
  - 자동 포커스 구현
  - 텍스트 전체 선택
  - 조건부 실행 패턴
- Todo 앱 완전 고도화 완성!
  - 필터링 시스템 (전체/진행중/완료)
  - 검색 기능 (대소문자 무시)
  - 필터 + 검색 조합
  - 수정 기능 (Edit)
    - 더블클릭 + 수정 버튼
    - 자동 포커스 + 텍스트 선택
    - Enter/Esc 단축키
    - 포커스 잃으면 자동 저장
  - UX 개선
    - 버튼 충돌 문제 해결
    - 레이아웃 변경 (세로 배치)
    - 단축키 안내
- React Hooks 완전 마스터!
  - useState, useEffect, useRef
- **Week 5 완료!** 🎊
- **다음: Week 6 (Unity-React 통합)**

### 2025-12-중순 (Week 5 Day 2 완료)
- 리스트 렌더링 (map, key prop)
- 조건부 렌더링 (if/else, 삼항, &&)
- useEffect Hook 마스터
  - 생명주기 (Mount/Update/Unmount)
  - Cleanup 함수
  - 의존성 배열
- Input/Form 완전 정복
- Todo 앱 기본 기능 완성
  - CRUD (추가/읽기/수정/삭제)
  - localStorage 자동 저장
- 컴포넌트 분리 (TodoForm, TodoList, TodoItem, TodoStats)
- 타입 파일 분리 (types.ts)
- React_핵심개념_QnA.md 문서 생성

### 2025-12-중순 (Week 5 Day 1 완료)
- React TypeScript 프로젝트 생성 (furniture-app)
- JSX 문법 학습 완료
- 컴포넌트 3개 제작 (Button, Counter, FurnitureCounter)
- Props와 State (useState) 개념 습득
- CSS 스타일링 (인라인 + 클래스)
- 이벤트 핸들링 (onClick)
- TypeScript 타입 정의 학습
- **React 기초 완성!**
- **Month 2 Week 5 시작!**

### 2025-12-19 (Week 3 Day 5-7 완료)
- WebGL 빌드 완료 (Gzip 압축)
- test.html 양방향 통신 구현
- 브라우저 테스트 성공
- 웹 압축 기초 가이드 작성 (13KB)
- README.md 완성 (14KB, 609줄)
- **Week 3 완료!**
- **10일 단축 달성!**

### 2025-12-18 (Week 3 Day 2 완료)
- FurnitureData.cs 추가
- JSON 데이터 구조 구현
- SendAllFurnitureData() 메서드
- 가구 가격/카테고리 시스템
- WebBridge.jslib JSON 파싱
- J 키 테스트 성공

### 2025-12-16 (Week 3 Day 1 완료)
- WebCommunication.cs, WebBridge.jslib 추가
- Unity-JavaScript 양방향 통신 구조 완성
- 위치 + 회전 정보 전송 구현
- Editor 테스트 성공

### 2025-12-15 (Week 2 완료)
- CollisionChecker 유틸리티 클래스 추가
- 코드 중복 완전 제거
- 여러 Collider 지원 구현
- Week 2 완료! 🎉

---

## 🎮 테스트 키 정리

```
Unity Editor 테스트 키:
- Space: 일반 메시지 전송 테스트
- T: 가구 배치 알림 테스트
- J: JSON 데이터 전송 테스트

Unity 게임 조작 키:
- 숫자 1-5: 가구 선택
- 클릭: 가구 배치
- 드래그: 가구 이동
- Q/E: 가구 회전
- Delete/D: 가구 삭제

React Todo 앱 단축키:
- Enter: 수정 저장
- Esc: 수정 취소
- 더블클릭: 수정 모드
```

---

## 💡 다음 단계

**Week 6 시작! Unity + React 통합!** 🎯

**준비물 체크:**
```
□ Unity 프로젝트 (Furniture Simulator)
  - 위치: 어디에 있나요?
  - 상태: 마지막 작업 기억하시나요?
  
□ WebGL 빌드 파일
  - Build/ 폴더 있나요?
  - 최신 빌드인가요?
  
□ React 프로젝트 (furniture-app)
  - 위치: 어디에 있나요?
  - npm start 작동하나요?
```

**예상 난이도:**
```
⭐⭐⭐⭐ (새로운 영역!)

하지만:
✅ Unity 완성되어 있음
✅ React 기초 탄탄함
✅ WebGL 빌드 경험 있음
✅ 통신 구조 이해함

→ 충분히 할 수 있어요! 💪
```

**학습 자료:**
```
react-unity-webgl 공식:
https://github.com/jeffreylanters/react-unity-webgl

공식 문서:
https://react-unity-webgl.dev/

예제 코드:
https://github.com/jeffreylanters/react-unity-webgl/tree/main/example
```

---

## 📊 진행 통계

```
전체 기간: 84일 (12주)
완료: 17일
진행률: 28.3%

시간 단축: 10일!
- Week 1-3: 7일 단축
- Week 4 스킵: 3일 절약

여유 시간 활용 계획:
→ 포트폴리오 완성도 UP
→ Three.js 프로젝트 강화
→ 코딩테스트 연습
→ 취업 준비 강화

학습 현황:
✅ Unity 완성
✅ WebGL 빌드 마스터
✅ React Hooks 완전 마스터
✅ TypeScript 기본 마스터
✅ localStorage 활용
✅ 컴포넌트 설계
⏳ Unity-React 통합 준비 중

강점:
✅ 체계적인 학습
✅ 문제 해결 능력
✅ 빠른 학습 속도
✅ 꾸준함
```

---

**다음 작업:** Week 6 Day 1 - Unity-React 통합 준비! 🎯

---

**마지막 업데이트:** 2025년 12월 29일 (월)  
**버전:** 5.0  
**Status:** Week 5 완료! 🎉  
**Next:** Week 6 Day 1 (12/30 화) - Unity-React 통합 시작!

**내일부터 본격적인 통합 작업!** 🚀🔥  
**화이팅!** 💪✨
# 🎯 Furniture Simulator - TODO List

**프로젝트:** Unity + React 가구 배치 시뮬레이터  
**기간:** 2025년 12월 - 2026년 3월  
**마지막 업데이트:** 2025년 1월 4일

---

## 🚀 현재 진행 중

### Week 7 Day 1-2 (다음! 1/6-7)
- [ ] 가구 가격 시스템 추가
  - [ ] 가구 데이터에 가격 추가
  - [ ] Unity에서 가격 정보 전송
  - [ ] React에서 가격 정보 수신
- [ ] 비용 계산기 구현
  - [ ] 총 비용 계산
  - [ ] 개별 가구 비용 표시
  - [ ] UI에 비용 패널 추가

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
- [x] Editor 테스ト (J 키)

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

### Month 2 Week 6 Day 1 (12/31 수) 🎉
- [x] Unity 프로젝트 상태 확인
  - [x] 프로젝트 열기
  - [x] 가구 배치/이동/회전/삭제 테스트
  - [x] 스크립트 확인
- [x] WebGL 빌드 최종 확인
  - [x] Build 폴더 확인
  - [x] Python 로컬 서버 실행
  - [x] 브라우저 테스트 (localhost:8000)
  - [x] 양방향 통신 테스트 (Space, T, J 키)
- [x] react-unity-webgl 라이브러리 조사
  - [x] 공식 문서 읽기
  - [x] useUnityContext Hook 이해
  - [x] Unity 컴포넌트 사용법 파악
  - [x] 통신 방법 (sendMessage, addEventListener) 이해
- [x] React 프로젝트 확인
  - [x] furniture-app 실행
  - [x] Todo 앱 정상 작동 확인
- [x] **Week 6 Day 1 완료!** ✨

### Month 2 Week 6 Day 2 (1/3 토) 🎉
- [x] react-unity-webgl 설치
  - [x] npm install react-unity-webgl
- [x] Unity 빌드 파일을 React 프로젝트로 복사
  - [x] WebGL_Build/FurnitureSimulator/Build/
  - [x] → furniture-app/public/unity-build/Build/
- [x] UnityPlayer 컴포넌트 생성
  - [x] src/components/UnityPlayer.tsx 작성
  - [x] useUnityContext Hook 사용
  - [x] 로딩 상태 처리 (isLoaded, loadingProgression)
  - [x] 로딩 바 UI 구현
  - [x] Unity 컴포넌트 렌더링
- [x] App.tsx 수정
  - [x] UnityPlayer import
  - [x] 기본 레이아웃
- [x] 기본 렌더링 테스트
  - [x] React에서 Unity 실행 확인
  - [x] 가구 배치 작동 확인
  - [x] 오타 수정 (framwork → framework)
- [x] **Unity + React 통합 성공!** 🔥🎊

### Month 2 Week 6 Day 3 (1/3 토) 🎉
- [x] Unity → React 통신 구현
  - [x] window.addEventListener 사용 (react-unity-webgl의 addEventListener와 구분)
  - [x] 'FurniturePlaced' 이벤트 리스닝
  - [x] event.detail에서 데이터 추출
  - [x] handleFurniturePlaced 함수 작성
  - [x] useEffect로 이벤트 리스너 등록/해제
- [x] React UI 패널 추가
  - [x] 왼쪽: Unity 앱 / 오른쪽: React UI 레이아웃
  - [x] 마지막 이벤트 메시지 표시 컴포넌트
  - [x] 배치된 가구 목록 표시 컴포넌트
  - [x] 상태 관리 (placedFurniture, lastMessage)
- [x] Unity 스크립트 확인
  - [x] WebCommunication.cs NotifyFurniturePlaced 확인
  - [x] WebBridge.jslib 이벤트 이름 확인
  - [x] FurniturePlaced vs OnFurniturePlaced 이슈 해결
- [x] 통신 테스트
  - [x] Unity에서 가구 배치 시 React UI 업데이트 확인
  - [x] Console 로그 확인
  - [x] 이벤트 데이터 파싱 확인
- [x] **Unity → React 통신 완료!** 🎉

**학습 내용:**
- react-unity-webgl의 addEventListener는 Unity의 Application.ExternalCall용
- 우리의 CustomEvent는 window.addEventListener 사용해야 함
- useEffect 의존성 배열: 빈 배열 [] = 마운트 시 1번만 실행
- 매 프레임 실행 = 의존성 배열 없음 (위험!)

**다음:**
- React → Unity 통신 구현 (Day 4)

### Month 2 Week 6 Day 4 (1/4 일) 🎉
- [x] React → Unity 통신 구현
  - [x] 가구 선택 버튼 UI 추가
  - [x] sendMessage로 Unity에 명령 전송
  - [x] WebCommunication.SelectFurnitureFromJS 작성
  - [x] FurniturePlacer.SelectFurnitureFromIndex 작성
- [x] 양방향 통신 완성
  - [x] React 버튼 → Unity 가구 선택
  - [x] Unity 배치 → React UI 업데이트
  - [x] 완전한 양방향 통신 확인
- [x] **React → Unity 통신 완료!** 🎉
- [x] **Week 6 Day 3-4 완료!** 🎊

**학습 내용:**
- Unity의 SendMessage API는 내장되어 있음 (jslib 불필요)
- React → Unity는 SendMessage 사용
- Unity → React는 CustomEvent + jslib 필요
- 비대칭적이지만 각각의 이유가 있음

### Month 2 Week 6 Day 5 (1/4 일) 🎉
- [x] 가구 정보 개선
  - [x] FurnitureItem 타입 정의 (id, furniture, position, rotation, timestamp)
  - [x] 위치 표시 (X, Y, Z)
  - [x] 회전 표시 (각도)
  - [x] 시간 정보 (toLocaleTimeString)
- [x] 고유 ID 시스템 구현
  - [x] Furniture.cs에 furnitureId 추가 ([SerializeField] private + getter)
  - [x] SetId 메서드 구현
  - [x] FurniturePlacer에서 타임스탬프 기반 ID 생성
  - [x] WebCommunication에 ID 파라미터 추가
  - [x] WebBridge.jslib 수정 (ID 포함)
- [x] 삭제 기능 구현
  - [x] React handleDeleteFurniture 함수
  - [x] Unity DeleteFurnitureFromJS 함수
  - [x] FindObjectsOfType로 ID 기반 검색 (임시 방법)
  - [x] Unity에서 가구 삭제 (Destroy)
  - [x] React 상태 업데이트 (filter)
  - [x] 양방향 삭제 동기화 완료
- [x] UI 레이아웃 개선
  - [x] 오른쪽 패널 너비 조정 (1000px, minWidth, flexShrink: 0)
  - [x] 배경색 통일 (body, 부모 div)
  - [x] Flex 레이아웃 문제 해결
- [x] **삭제 기능 완성!** 🔥
- [x] **Week 6 Day 5 완료!** 🎊

**학습 내용:**
- C# 접근 제어자 ([SerializeField] private + public getter)
- FindObjectsOfType는 임시 방법 (나중에 FurnitureManager로 리팩토링 예정)
- Flex 레이아웃: flexShrink: 0으로 고정 크기 보장
- width: 100%는 부모 크기, 하위 요소가 넘을 수 있음

**다음:**
- 통계 패널 추가 (선택사항)

### Month 2 Week 6 Day 6 (1/6 화) 🎉
- [x] UI 폴리싱 완료
  - [x] 색상 테마 시스템 구축
  - [x] theme 객체로 색상/간격/폰트 통일
  - [x] spacing 시스템 (xs, sm, md, lg, xl)
  - [x] fontSize 시스템 (large, medium, small)
  - [x] borderRadius 시스템
- [x] 버튼 스타일 개선
  - [x] padding 통일 (theme.spacing 활용)
  - [x] 호버 효과 부드럽게 (transition)
  - [x] 색상 일관성 유지
- [x] 레이아웃 최적화
  - [x] 간격 통일
  - [x] 폰트 크기 일관성
  - [x] 전문적인 UI 완성
- [x] **UI 폴리싱 완료!** ✨
- [x] **Week 6 Day 6 완료!** 🎊

**학습 내용:**
- CSS Box Model (padding vs margin)
- padding은 요소 크기, margin은 요소 간 간격
- 테마 시스템으로 일관된 디자인 유지
- transition으로 부드러운 애니메이션

**다음:**
- Week 7: React UI 개발 (가격 시스템, 비용 계산기)

---

## 📋 예정 작업

### Week 6: Unity-React 통합

#### Day 3-4 (1/4-5) ⏳
- [ ] Unity → React 통신 구현
  - [ ] Unity에서 이벤트 발생
  - [ ] React에서 addEventListener로 수신
  - [ ] 가구 배치 이벤트 처리
  - [ ] JSON 데이터 파싱
- [ ] React → Unity 통신 구현
  - [ ] React 버튼 만들기
  - [ ] sendMessage로 Unity에 명령 전송
  - [ ] Unity에서 명령 처리
  - [ ] 가구 선택/배치 제어
- [ ] 양방향 통신 디버깅 및 테스트
  - [ ] Console 로그 확인
  - [ ] 데이터 흐름 검증

#### Day 5-6 (1/6-7)
- [ ] 간단한 가구 선택 UI (React)
  - [ ] 가구 버튼 목록
  - [ ] 선택 상태 표시
- [ ] React-Unity 인터랙션
  - [ ] 버튼 클릭 → Unity 가구 선택
  - [ ] Unity 배치 → React 상태 업데이트
- [ ] 배치된 가구 목록 표시
  - [ ] 가구 이름, 위치 정보
  - [ ] 삭제 버튼
- [ ] 상태 동기화 확인
- [ ] 통합 테스트

#### Day 7 (주말)
- [ ] 전체 통합 테스트
- [ ] 버그 수정
- [ ] UI/UX 개선
- [ ] 코드 정리

**Week 6 예상 결과물:**
- Unity + React 완전 통합 ✅
- 양방향 통신 구조 ✅
- 기본 UI 인터랙션 ✅

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
- [x] Unity WebGL CORS 에러 → Python 로컬 서버로 해결
- [x] React에서 Unity 파일 로드 실패 → 오타 수정 (framwork → framework)

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

### Week 6에서 배운 React-Unity 통합
- **react-unity-webgl 라이브러리**
  - useUnityContext Hook
  - unityProvider, isLoaded, loadingProgression
  - Unity 컴포넌트 사용
- **Unity WebGL 빌드 관리**
  - 빌드 파일 구조
  - public 폴더에 배치
  - 압축 설정 (Gzip → Disabled)
- **로딩 상태 관리**
  - 로딩 바 구현
  - 조건부 렌더링으로 UX 개선
- **파일 경로 설정**
  - loaderUrl, dataUrl, frameworkUrl, codeUrl
- **Unity → React 통신** (Day 3)
  - window.addEventListener vs react-unity-webgl의 addEventListener 차이
  - CustomEvent와 event.detail 사용
  - WebBridge.jslib의 이벤트 이름 확인 중요성
  - useEffect 의존성 배열 이해
    - 빈 배열 [] = 마운트 시 1번만 실행
    - 의존성 있음 = 의존성 변경 시마다 실행
    - 없음 = 매 렌더링마다 실행 (위험!)
  - 이벤트 리스너 등록/해제 패턴

### 마스터한 패턴
- **React 불변성:** Spread 연산자 (...) 사용
- **조건부 포커스:** useEffect + useRef
- **필터링 + 검색:** 복합 조건
- **레이아웃 변경:** UX 문제 해결
- **Material 관리:** 메모리 누수 방지
- **Unity-React 통합:** useUnityContext Hook 활용

### 참고 문서
- [구면좌표계 가이드](/mnt/project/구면좌표계_수학_공식_가이드.md)
- [Material 관리 가이드](/mnt/project/Unity_Material_메모리_관리_가이드.md)
- [Git 브랜치 전략](/mnt/project/Git_브랜치_전략_가이드.md)
- [Git 커밋 메시지](/mnt/project/Git_커밋_메시지_가이드.md)
- [React 핵심개념 Q&A](React_핵심개념_QnA.md)
- [Unity WebGL 문서](https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html)
- [JsonUtility 문서](https://docs.unity3d.com/ScriptReference/JsonUtility.html)
- [React 공식 문서](https://react.dev)
- [react-unity-webgl 문서](https://react-unity-webgl.dev/)

---

## 🎯 이번 주 목표

**Week 6 (12/31 ~ 1/7):**
- [x] Day 1 (12/31 수): Unity-React 통합 준비 ✅
- [x] Day 2 (1/3 토): react-unity-webgl 설치 & 렌더링 ✅
- [ ] Day 3-4 (1/4-5): 양방향 통신 구현 ⏳ **다음!**
- [ ] Day 5-6 (1/6-7): 기본 UI 추가
- [ ] Day 7 (주말): 통합 테스트

**목표:** Unity와 React가 완벽하게 대화하게 만들기! 🚀

---

## 📊 전체 진행 상황

```
✅ Week 1: Unity 기초 (3일) - 100%
✅ Week 2: 핵심 기능 (8일) - 100%
✅ Week 3: WebGL 통신 & 빌드 (3일) - 100%
⏭️ Week 4: 스킵 (시간 절약)
✅ Week 5: React 기초 (3일) - 100%
🔥 Week 6: Unity-React 통합 (7일) - 43% (Day 3 완료)
  ✅ Day 1: 준비 완료
  ✅ Day 2: 통합 성공
  ✅ Day 3: Unity → React 통신 완료
  ⏳ Day 4: React → Unity 통신
  □ Day 5-6: UI 추가
  □ Day 7: 테스트
□ Week 7: UI 구현 (7일) - 0%
□ Week 8: 배포 (7일) - 0%

완료: 20일 / 60일
진행률: 33.3%
시간 단축: 10일! 🔥
상태: 빠른 진행 중 🚀
현재 날짜: 2025년 1월 3일 (토)
다음: 2025년 1월 4일 (일) - Week 6 Day 4 시작!
```

---

## 🔄 최근 변경 사항

### 2025-01-03 (Week 6 Day 3 완료) 🎉
- Unity → React 통신 구현 성공!
  - window.addEventListener 사용 (CustomEvent 방식)
  - react-unity-webgl의 addEventListener와 차이점 이해
  - event.detail에서 가구 배치 데이터 추출
  - useEffect 의존성 배열 학습 (빈 배열 = 마운트 시 1번)
- React UI 패널 추가
  - 왼쪽: Unity 앱 / 오른쪽: React UI 구조
  - 마지막 이벤트 메시지 표시
  - 배치된 가구 목록 실시간 업데이트
- Unity 스크립트 검증
  - WebCommunication.cs, WebBridge.jslib 확인
  - 이벤트 이름 매칭 (FurniturePlaced)
- **Unity → React 단방향 통신 완료!** 🎊
- **다음: React → Unity 통신 (Day 4)**

### 2025-01-03 (Week 6 Day 2 완료) 🎉
- react-unity-webgl 설치 완료
- Unity 빌드 파일 복사 성공
  - public/unity-build/Build/ 구조 생성
- UnityPlayer 컴포넌트 작성
  - useUnityContext Hook 활용
  - 로딩 상태 관리 (isLoaded, loadingProgression)
  - 로딩 바 UI 구현
  - Unity 컴포넌트 렌더링
- App.tsx 수정 (UnityPlayer 통합)
- 오타 수정 (framwork → framework)
- **Unity가 React 안에서 실행 성공!** 🔥
- 가구 배치/이동/회전/삭제 모두 작동
- **Unity-React 통합 핵심 완료!**
- **다음: 양방향 통신 구현**

### 2025-12-31 (Week 6 Day 1 완료)
- Unity 프로젝트 상태 확인
- WebGL 빌드 확인
- Python 로컬 서버 실행
- 양방향 통신 테스트 (Space, T, J 키)
- react-unity-webgl 문서 읽기
- useUnityContext, sendMessage, addEventListener 이해
- React 프로젝트 확인
- **모든 준비 완료!**

### 2025-12-29 (Week 5 Day 3 완료)
- useRef Hook 심화 학습 완료
- Todo 앱 완전 고도화 완성
- 필터링 + 검색 + 수정 기능
- UX 개선 (버튼 충돌 해결)
- **Week 5 완료!**

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

React + Unity 앱:
- 현재: Unity 조작 키 그대로 사용
- 다음: React 버튼으로도 제어 가능하게 구현 예정
```

---

## 📊 진행 통계

```
전체 기간: 84일 (12주)
완료: 22일
진행률: 36.7%

시간 단축: 11일!
- Week 1-3: 7일 단축
- Week 4 스킵: 3일 절약
- Week 6 Day 7: 1일 절약

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
✅ Unity-React 통합 성공! 🔥
✅ 양방향 통신 완성! 🎊
✅ 고유 ID 시스템 구현
✅ 삭제 기능 완성
✅ UI 테마 시스템 구축
⏳ Week 7 시작 (가격 시스템)

강점:
✅ 체계적인 학습
✅ 문제 해결 능력
✅ 빠른 학습 속도
✅ 꾸준함
✅ 오타도 스스로 잡아냄!
```

---

**다음 작업:** Week 7 Day 1-2 - 가격 시스템 & 비용 계산기! 🎯

---

**마지막 업데이트:** 2025년 1월 6일 (화)  
**버전:** 7.0  
**Status:** Week 6 완료! 🎉  
**Next:** Week 7 Day 1-2 (1/6-7) - 가격 시스템 구현!

**Week 6 완료! UI 폴리싱까지!** 🚀✨  
**Week 7 시작: React UI 본격 개발!** 💰🎨
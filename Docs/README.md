# 📚 Furniture Simulator - Documentation

**프로젝트:** Unity + React 가구 배치 시뮬레이터  
**목적:** 개발 중 배운 개념과 기술을 체계적으로 정리

---

## 📋 목차

### 🔧 Git
- **[브랜치 전략](Git/브랜치_전략.md)** - Git 브랜치 관리 워크플로우
- **[커밋 메시지](Git/커밋_메시지.md)** - 효과적인 커밋 메시지 작성법

### 🎮 Unity
- **[Null 체크](Unity/Null_체크.md)** ⚠️ - Unity Object의 올바른 null 체크 방법 (중요!)
- **[Material 메모리](Unity/Material_메모리.md)** - Material 메모리 관리와 누수 방지

### 📐 Math
- **[구면좌표계](Math/구면좌표계.md)** - 카메라 컨트롤러의 수학적 원리

### 🗺️ Roadmap
- **[3개월 로드맵](Roadmap/3개월_로드맵.md)** - 웹 프론트엔드 전향 전체 계획

---

## 🔍 빠른 검색

### Git 관련
```
브랜치 관리가 필요할 때    → Git/브랜치_전략.md
커밋 메시지 작성할 때      → Git/커밋_메시지.md
```

### Unity 개발
```
null 체크로 에러 날 때      → Unity/Null_체크.md (필독!)
Material 색상 변경할 때     → Unity/Material_메모리.md
카메라 회전 구현할 때       → Math/구면좌표계.md
```

### 학습 계획
```
전체 진행 상황 확인         → Roadmap/3개월_로드맵.md
```

---

## ⚠️ 중요 가이드

### 반드시 읽어야 할 문서

1. **[Unity Null 체크](Unity/Null_체크.md)** 🔥🔥🔥
   - Unity Object에서 `is null` 사용 금지!
   - `== null`만 사용해야 하는 이유
   - 버그 방지 필수 지식

2. **[Material 메모리](Unity/Material_메모리.md)** 🔥🔥
   - `.material` 사용 시 OnDestroy() 필수
   - 메모리 누수 방지

---

## 📝 문서 작성 규칙

### 이 폴더의 문서들은:
- ✅ **요약본**: 핵심 내용만 간결하게
- ✅ **빠른 참조**: 5분 내로 확인 가능
- ✅ **실전 중심**: 코드 예시 포함
- ✅ **링크 제공**: 상세 가이드 연결

### 전체 상세 가이드는:
- 프로젝트 루트의 `*_가이드.md` 파일 참조
- 예: `Git_브랜치_전략_가이드.md`

---

## 🗂️ 폴더 구조

```
Docs/
├── README.md              ← 이 파일 (인덱스)
├── Git/                   ← Git 관련
│   ├── 브랜치_전략.md
│   └── 커밋_메시지.md
├── Unity/                 ← Unity 개발
│   ├── Null_체크.md
│   └── Material_메모리.md
├── Math/                  ← 수학/알고리즘
│   └── 구면좌표계.md
└── Roadmap/               ← 학습 계획
    └── 3개월_로드맵.md
```

---

## 💡 사용 팁

### VS Code에서 빠르게 찾기
```
Cmd + P (Mac) / Ctrl + P (Win)
→ "Docs/" 입력
→ 파일명 검색
```

### 카테고리별 탐색
```
Git 관련       → Docs/Git/
Unity 개발     → Docs/Unity/
수학 공식      → Docs/Math/
학습 계획      → Docs/Roadmap/
```

---

## 📅 업데이트 이력

- **2024-12-12:** Docs 폴더 생성, 초기 문서 추가
  - Git 브랜치 전략, 커밋 메시지
  - Unity Null 체크, Material 메모리
  - 구면좌표계, 3개월 로드맵

---

## 🎯 다음 추가 예정

- [ ] Unity 충돌 감지 가이드
- [ ] React 기초 가이드
- [ ] WebGL 통신 가이드
- [ ] Three.js 기초

---

**마지막 업데이트:** 2024년 12월 12일  
**관리자:** 진 (jjinijj)

**Happy Coding! 🚀**

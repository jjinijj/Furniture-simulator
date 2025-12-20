# 🎯 Furniture Simulator - TODO List

**프로젝트:** Unity + React 가구 배치 시뮬레이터  
**기간:** 2025년 12월 - 2026년 3월  
**마지막 업데이트:** 2025년 12월 20일

---

## 🚀 현재 진행 중

### Week 5 Day 2 (다음!)
- [ ] 리스트 렌더링 (map 사용)
- [ ] 조건부 렌더링 (if, &&, 삼항연산자)
- [ ] useEffect Hook
- [ ] Input/Form 다루기
- [ ] 간단한 Todo 앱 실습

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

### Month 2 Week 5 Day 1 (12/20) 🎉
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

---

## 📋 예정 작업

### Week 3 Day 3-4 (예정)
**선택 1: 추가 기능**
- [ ] 벽/바닥 색상 변경 시스템
- [ ] 조명 제어 (On/Off, 밝기)
- [ ] 가구 정보 표시 UI
- [ ] 가격 표시 시스템

**선택 2: 바로 빌드**
- [ ] Week 3 Day 5-7로 스킵
- [ ] WebGL 빌드 시작

### Week 3 Day 5-7 (예정)
- [ ] WebGL 빌드 설정
- [ ] 압축 형식 설정 (Gzip)
- [ ] 코드 최적화 (Size)
- [ ] WebGL 빌드 실행
- [ ] test.html로 양방향 통신 테스트
- [ ] 브라우저에서 실제 테스트
- [ ] 빌드 최적화
- [ ] README 작성 (Unity 파트)

---

## 🔧 개선 사항 (나중에)

### 고급 기능 (Month 2 고도화)
- [ ] 실시간 가격 계산 UI
- [ ] Undo/Redo 기능
- [ ] 가구 복사 기능
- [ ] 스냅 그리드
- [ ] 가구 그룹화
- [ ] 평면도 미니맵

### UI/UX (Month 2 - React)
- [ ] React 가구 목록 UI
- [ ] 비용 계산기
- [ ] 저장/불러오기
- [ ] 카테고리 필터
- [ ] 검색 기능

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

---

## 📚 학습 노트

### Week 1-2에서 배운 개념
- Raycast (화면 → 3D 공간)
- Material 메모리 관리 (.material vs .sharedMaterial)
- Layer 시스템 (LayerMask)
- 구면좌표계 수학
- Physics.OverlapBox 충돌 감지
- Bounds.Encapsulate (여러 Collider 합치기)

### Week 3에서 배운 개념
- Unity WebGL 통신 구조
- jslib 파일 작성
- [DllImport("__Internal")]
- Unity → JavaScript (C# → JS)
- JavaScript → Unity (SendMessage)
- CustomEvent 발생
- JSON 직렬화/역직렬화
- [Serializable] 속성
- JsonUtility.ToJson()
- 복잡한 데이터 구조 전송

### 참고 문서
- [구면좌표계 가이드](/mnt/project/구면좌표계_수학_공식_가이드.md)
- [Material 관리 가이드](/mnt/project/Unity_Material_메모리_관리_가이드.md)
- [Git 브랜치 전략](/mnt/project/Git_브랜치_전략_가이드.md)
- [Git 커밋 메시지](/mnt/project/Git_커밋_메시지_가이드.md)
- [Unity WebGL 문서](https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html)
- [JsonUtility 문서](https://docs.unity3d.com/ScriptReference/JsonUtility.html)

---

## 🎯 이번 주 목표

**Week 3 (12/16-22):**
- [x] Day 1 (12/16): Unity-JavaScript 통신 구조 ✅
- [x] Day 2 (12/17-18): JSON 데이터 전송 ✅
- [ ] Day 3-4 (12/19-20): 추가 기능 or 스킵
- [ ] Day 5-7 (주말): WebGL 빌드 & 테스트

---

## 📊 전체 진행 상황

```
✅ Week 1: Unity 기초 (3일) - 100%
✅ Week 2: 핵심 기능 (8일) - 100%
✅ Week 3: WebGL 통신 & 빌드 (3일) - 100%
⏭️ Week 4: 스킵 (시간 절약)
✅ Week 5 Day 1: React 기초 - 100%
⏳ Week 5 Day 2-7: 진행 예정

완료: 15일 / 60일
진행률: 25.0%
시간 단축: 10일! 🔥
상태: 빠른 진행 중 🚀
현재 날짜: 2025년 12월 20일 (토)
```

---

## 🔄 최근 변경 사항

### 2025-12-20 (Week 5 Day 1 완료) 🎉
- React TypeScript 프로젝트 생성 (furniture-app)
- JSX 문법 학습 완료
- 컴포넌트 3개 제작 (Button, Counter, FurnitureCounter)
- Props와 State (useState) 개념 습득
- CSS 스타일링 (인라인 + 클래스)
- 이벤트 핸들링 (onClick)
- TypeScript 타입 정의 학습
- **React 기초 완성!**
- **Month 2 Week 5 시작!**

### 2025-12-19 (Week 3 Day 5-7 완료) 🎉
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
현재 테스트 키:
- Space: 일반 메시지 전송 테스트
- T: 가구 배치 알림 테스트
- J: JSON 데이터 전송 테스트 ← Day 2 추가!

게임 조작 키:
- 숫자 1-5: 가구 선택
- 클릭: 가구 배치
- 드래그: 가구 이동
- Q/E: 가구 회전
- Delete/D: 가구 삭제
```

---

## 💡 다음 단계 결정

**Week 3 완료! 다음은?** 🎯

**옵션 A: Week 4 (원래 계획)**
```
내용:
- Unity 최적화
- 버그 수정
- React 학습 준비

소요: 3일

장점: 로드맵 완전 이행
단점: 시간 소요, 큰 효과 없음
```

**옵션 B: 빠른 진행 (추천!) ⭐**
```
내용:
- Week 4 스킵
- 바로 Month 2 Week 5 시작
- React 기초 학습

절약: 3일 (총 10일 단축!)

장점:
✅ 시간 효율적
✅ 빠른 프로젝트 완성
✅ 추가 포트폴리오 가능
✅ 최적화는 나중에 (Week 8)

추천 이유:
- Unity 부분 충분히 완성됨
- 최적화는 React 통합하면서
- 10일 = 포트폴리오 1개 더!
```

---

**추천 일정 (12/21부터):**
```
12/20 (토): React 기초 완료 ✅
12/21 (일): React 심화 학습
12/22-25: Week 5 완료
→ 빠른 진행!
```

---

## 📊 진행 통계

```
전체 기간: 60일
완료: 15일 (Week 1-3 + Week 5 Day 1)
진행률: 25%

시간 단축: 10일!
- Week 1-3: 7일 단축
- Week 4 스킵: 3일 절약

여유 시간 활용:
→ 추가 포트폴리오
→ 코딩테스트 연습
→ 취업 준비 강화

학습 현황:
✅ Unity 완성
✅ WebGL 빌드
✅ React 기초 완료
⏳ React 심화 진행 중
```

---

**다음 작업:** Week 5 Day 2 (리스트 렌더링, useEffect) 🎯

---

**마지막 업데이트:** 2025년 12월 20일 (토)  
**버전:** 4.0  
**Status:** Week 5 Day 1 완료! 🎉  
**Next:** Week 5 Day 2 (12/22~)

**화이팅! 🚀🔥**
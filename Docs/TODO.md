# 🎯 Furniture Simulator - TODO List

**프로젝트:** Unity + React 가구 배치 시뮬레이터  
**기간:** 2025년 12월 - 2026년 3월  
**마지막 업데이트:** 2025년 12월 16일

---

## 🚀 현재 진행 중

### Week 3 Day 2 (다음)
- [ ] JSON 형식 데이터 전송
- [ ] 가구 목록 전체 전송
- [ ] 복잡한 데이터 구조 통신

---

## ✅ 완료

### Week 1 (12/6-8)
- [x] Unity 6 설치 및 프로젝트 생성
- [x] 카메라 컨트롤러 (구면좌표계)
- [x] 가구 에셋 임포트 (5개)
- [x] 방 모델링 (4x4x3m)
- [x] Git/GitHub 설정

### Week 2 Day 1-2 (12/9-10)
- [x] Raycast 기반 가구 배치
- [x] 고스트 미리보기 시스템
- [x] 가구 선택 시스템 (클릭)
- [x] 시각적 피드백 (색상 변경)
- [x] UI 정보 표시

### Week 2 Day 3 (12/11)
- [x] 가구 이동 (드래그) 시스템
- [x] 마우스 따라 실시간 이동
- [x] 바닥에만 이동 가능
- [x] 드래그 종료시 선택 해제

### Week 2 Day 4-5 (12/12)
- [x] 가구 삭제 시스템 (Delete 키)
- [x] 가구 회전 시스템 (Q/E 키)
- [x] UX 개선: 드래그 후 선택 유지
- [x] 자연스러운 작업 흐름 구현
- [x] 통합 회전 입력 처리

### Week 2 Day 6-7 (12/15)
- [x] CollisionChecker 유틸리티 클래스 구현
- [x] 코드 중복 제거 (DRY 원칙)
- [x] 여러 Collider 지원 (Bounds.Encapsulate)
- [x] Ghost 충돌 감지 (초록/빨강)
- [x] 드래그 중 충돌 감지
- [x] Material 메모리 최적화

### Week 3 Day 1 (12/16) 🎉
- [x] WebCommunication.cs 작성
- [x] WebBridge.jslib 작성
- [x] Unity → JavaScript 통신 구조
- [x] JavaScript → Unity 통신 구조
- [x] 위치 + 회전 정보 전송
- [x] FurniturePlacer 통합
- [x] Editor 테스트 성공

---

## 📋 예정 작업

### Week 3 Day 2-3 (예정)
- [ ] JSON 형식 데이터 전송
- [ ] 가구 목록 전체 전송 (배열)
- [ ] 비용 계산 데이터 전송
- [ ] JavaScript에서 Unity 제어 테스트

### Week 3 Day 4-5 (예정)
- [ ] 추가 기능 구현
  - [ ] 벽/바닥 색상 변경
  - [ ] 조명 On/Off
  - [ ] 가구 정보 표시 (이름, 크기, 가격)

### Week 3 Day 6-7 (예정)
- [ ] WebGL 빌드 설정
- [ ] WebGL 빌드 & 테스트
- [ ] test.html로 양방향 통신 테스트
- [ ] 빌드 최적화 (압축, 텍스처)
- [ ] README 작성 (Unity 파트)

---

## 🔧 개선 사항 (나중에)

### 고급 기능 (Week 8 고도화)
- [ ] 실시간 충돌 표시 (드래그 중 빨간색)
- [ ] 회전 후 자동 충돌 재검사
- [ ] Undo/Redo 기능
- [ ] 가구 복사 기능
- [ ] 스냅 그리드
- [ ] 가구 그룹화

### UI/UX (Month 2 - React)
- [ ] 가구 목록 UI
- [ ] 비용 계산기
- [ ] 저장/불러오기
- [ ] 평면도 미니맵

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

### 참고 문서
- [구면좌표계 가이드](Docs/Math/구면좌표계_수학_공식_가이드.md)
- [Material 관리 가이드](Docs/Unity/Unity_Material_메모리_관리_가이드.md)
- [Git 브랜치 전략](Docs/Git/Git_브랜치_전략_가이드.md)
- [Git 커밋 메시지](Docs/Git/Git_커밋_메시지_가이드.md)
- [Unity 공식 WebGL 문서](https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html)

---

## 🎯 이번 주 목표

**Week 3 (12/16-22):**
- [x] Day 1: Unity-JavaScript 통신 구조 ✅
- [ ] Day 2: JSON 데이터 전송
- [ ] Day 3-4: 추가 기능
- [ ] Day 5-7: WebGL 빌드 & 테스트

---

## 📊 전체 진행 상황

```
✅ Week 1: Unity 기초 (3일) - 100%
✅ Week 2: 핵심 기능 (7일) - 100%
🔄 Week 3: WebGL 통신 (1/7일) - 14%

완료: 11일 / 60일
진행률: 18.3%
상태: 순조롭게 진행 중 🚀
```

---

## 🔄 최근 변경 사항

### 2025-12-16 (Week 3 Day 1)
- WebCommunication.cs, WebBridge.jslib 추가
- Unity-JavaScript 양방향 통신 구조 완성
- 위치 + 회전 정보 전송 구현
- Editor 테스트 성공

### 2025-12-15 (Week 2 Day 6-7)
- CollisionChecker 유틸리티 클래스 추가
- 코드 중복 완전 제거
- 여러 Collider 지원 구현
- Week 2 완료! 🎉

### 2025-12-12 (Week 2 Day 4-5)
- 회전 시스템 구현
- 삭제 기능 추가
- 통합 회전 입력 처리

---

**다음 작업:** Week 3 Day 2 - JSON 데이터 전송 🚀
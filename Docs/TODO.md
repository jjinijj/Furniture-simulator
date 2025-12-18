# 🎯 Furniture Simulator - TODO List

**프로젝트:** Unity + React 가구 배치 시뮬레이터  
**기간:** 2025년 12월 - 2026년 3월  
**마지막 업데이트:** 2025년 12월 18일

---

## 🚀 현재 진행 중

### Week 3 Day 3-4 (다음)
- [ ] 추가 기능 구현 (선택)
  - [ ] 벽/바닥 색상 변경
  - [ ] 조명 On/Off
  - [ ] 가구 정보 UI

또는

- [ ] Day 5-7로 스킵
  - [ ] WebGL 빌드 시작
  - [ ] 최적화 & 테스트

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
✅ Week 2: 핵심 기능 (7일) - 100%
✅ Week 3 Day 1: WebGL 통신 구조 - 100%
✅ Week 3 Day 2: JSON 데이터 - 100%
⏳ Week 3 Day 3-7: 남음

완료: 12일 / 60일
진행률: 20.0%
상태: 순조롭게 진행 중 🚀
현재 날짜: 2025년 12월 18일 (목)
```

---

## 🔄 최근 변경 사항

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

**선택지:**

**A. Day 3-4 추가 기능 구현 (2일)**
```
장점:
✅ 로드맵대로 진행
✅ 기능 완성도 Up
✅ 포트폴리오 임팩트

단점:
⏰ 시간 소요
⏰ 주말까지 연장 가능
```

**B. Day 5-7로 스킵 (주말 빌드)**
```
장점:
✅ 빠른 진행
✅ 핵심 기능 완료
✅ Week 3 마무리

단점:
❌ 추가 기능 생략
❌ 약간 아쉬움
```

**추천:** 
- 내일(금) 컨디션 보고 결정
- 여유 있으면 Day 3 시작
- 바쁘면 주말 빌드로

---

**다음 작업:** 결정 필요 - Day 3 or Day 5 🎯

---

**마지막 업데이트:** 2025년 12월 18일 (목)  
**버전:** 2.0  
**다음 업데이트:** Day 3 시작 시 또는 빌드 시작 시

**화이팅! 🚀**
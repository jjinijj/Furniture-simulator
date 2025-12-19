# 🪑 Furniture Simulator

**Unity WebGL + React 가구 배치 시뮬레이터**

[![Unity](https://img.shields.io/badge/Unity-6.0-black?logo=unity)](https://unity.com/)
[![WebGL](https://img.shields.io/badge/WebGL-Enabled-green)](https://www.khronos.org/webgl/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📖 프로젝트 소개

실시간 3D 가구 배치 및 비용 계산을 제공하는 웹 기반 인테리어 시뮬레이터입니다.  
Unity WebGL과 React를 결합하여 브라우저에서 직접 실행 가능한 interactive 3D 애플리케이션입니다.

### ✨ 주요 특징

- **🎮 실시간 3D 렌더링**: Unity 엔진 기반 고품질 3D 그래픽
- **🪑 직관적인 가구 배치**: 클릭, 드래그, 회전으로 간편한 배치
- **🔍 스마트 충돌 감지**: 실시간 가구 간 겹침 감지 및 시각적 피드백
- **💰 자동 비용 계산**: 배치된 가구의 총 비용 실시간 집계
- **🌐 크로스 플랫폼**: 웹 브라우저에서 즉시 실행 (설치 불필요)
- **📡 Unity-JavaScript 통신**: 양방향 실시간 데이터 교환

---

## 🎯 개발 목표

### 기술적 목표
- Unity WebGL과 React의 효과적인 통합 구조 설계
- 브라우저 환경에서 최적화된 3D 렌더링 구현
- Unity와 JavaScript 간 안정적인 양방향 통신 시스템

### 비즈니스 목표
- 인테리어 업계의 디지털 트랜스포메이션 기여
- 고객이 직접 가구 배치를 시뮬레이션하여 구매 결정 지원
- 온라인 가구 쇼핑의 사용자 경험 개선

---

## 🛠️ 기술 스택

### Unity (3D 엔진)
- **Unity 6** (2023.2+)
- **C# 9.0**
- **Unity WebGL Build**
- **IL2CPP**

### 핵심 시스템
- **Physics System**: Raycast, Collider, LayerMask
- **Input System**: Both (Old + New)
- **Rendering**: Universal Render Pipeline (URP)

### 웹 기술
- **JavaScript** (ES6+)
- **WebGL** 2.0
- **WebAssembly** (WASM)
- **HTML5 Canvas**

### 통신
- **jslib** (Unity-JavaScript Bridge)
- **DllImport** (P/Invoke)
- **CustomEvent** (Browser Event System)
- **JSON** 직렬화/역직렬화

---

## 📦 프로젝트 구조

```
FurnitureSimulator/
├── Assets/
│   ├── Scenes/
│   │   └── RoomScene.unity           # 메인 씬
│   ├── Scripts/
│   │   ├── Camera/
│   │   │   └── CameraController.cs  # 구면좌표계 카메라
│   │   ├── Furniture/
│   │   │   ├── Furniture.cs         # 가구 기본 클래스
│   │   │   ├── FurnitureSelector.cs # 선택/이동/회전 시스템
│   │   │   └── FurniturePlacer.cs   # 배치 시스템
│   │   ├── Utils/
│   │   │   └── CollisionChecker.cs  # 충돌 감지 유틸리티
│   │   └── WebGL/
│   │       ├── WebCommunication.cs  # Unity-JS 통신
│   │       └── FurnitureData.cs     # 데이터 구조
│   ├── Prefabs/                     # 가구 프리팹들
│   ├── Materials/                   # 재질
│   └── Plugins/
│       └── WebGL/
│           └── WebBridge.jslib      # JavaScript 브릿지
├── WebGL_Build/                     # WebGL 빌드 결과물
└── README.md
```

---

## 🎮 주요 기능

### 1. 가구 배치 시스템

**Raycast 기반 배치:**
```csharp
// FurniturePlacer.cs
Ray ray = mainCamera.ScreenPointToRay(Input.mousePosition);
if (Physics.Raycast(ray, out RaycastHit hit, maxDistance, floorLayer)) {
      Vector3 position = hit.point;
      position.y += 0.5f;
      ghostFurniture.transform.position = position;
}
```

**특징:**
- ✅ 마우스 클릭으로 바닥 위치 감지
- ✅ 고스트 미리보기
- ✅ 배치 가능/불가능 여부 표시

---

### 2. 가구 선택 & 이동

**드래그 시스템:**
```csharp
// FurnitureSelector.cs
Ray ray = mainCamera.ScreenPointToRay(Input.mousePosition);
RaycastHit hit;

if(Physics.Raycast(ray, out hit, Mathf.Infinity, floorLayer))
{
    selectedFurniture.MoveTo(hit.point);
}
// Furniture.cs
public void MoveTo(Vector3 floorPosition)
{
    if (!isDragging) return;
    Vector3 newPosition = floorPosition;
    newPosition.y += heightOffset;
        
    transform.position = newPosition;
}
```

**특징:**
- ✅ 클릭으로 가구 선택 (노란색 하이라이트)
- ✅ 드래그로 자유로운 이동
- ✅ 선택 해제 (ESC)

---

### 3. 가구 회전

**90도 단위 회전:**
```csharp
// Furniture.cs
public void Rotate(float angle) {
    transform.Rotate(Vector3.up, angle);
    CheckCollisionAfterRotation();
}
```

**조작:**
- **Q 키**: -90° 회전 (왼쪽)
- **E 키**: +90° 회전 (오른쪽)

---

### 4. 충돌 감지 시스템

**CollisionChecker 유틸리티:**
```csharp
public static class CollisionChecker {
    public static bool IsOverlapping(GameObject target, LayerMask layerMask) {
        Bounds bounds = GetFurnitureBounds(target.transform);
        Collider[] overlaps = Physics.OverlapBox(
            bounds.center,
            bounds.extents,
            target.transform.rotation,
            layerMask
        );

    }
}
```

**시각적 피드백:**
- 🟢 **초록색**: 배치 가능
- 🔴 **빨간색**: 다른 가구와 겹침

**특징:**
- ✅ 여러 Collider 지원 (자식 오브젝트)
- ✅ Layer 기반 필터링

---

### 5. 카메라 컨트롤

**구면좌표계 카메라:**
```csharp
// CameraController.cs
float x = distance * Mathf.Sin(pitch * Mathf.Deg2Rad) * Mathf.Sin(yaw * Mathf.Deg2Rad);
float y = distance * Mathf.Cos(pitch * Mathf.Deg2Rad);
float z = distance * Mathf.Sin(pitch * Mathf.Deg2Rad) * Mathf.Cos(yaw * Mathf.Deg2Rad);

transform.position = target.position + new Vector3(x, y, z);
transform.LookAt(target);
```

**조작:**
- **마우스 휠**: 줌 인/아웃
- **우클릭 드래그**: 카메라 회전

---

### 6. Unity-JavaScript 통신

**Unity → JavaScript:**
```csharp
// WebCommunication.cs
[DllImport("__Internal")]
private static extern void SendJSONToJS(string json);

public void SendAllFurnitureData() {
    FurnitureListData data = CollectFurnitureData();
    string json = JsonUtility.ToJson(data, true);
    SendJSONToJS(json);
}
```

**JavaScript → Unity:**
```javascript
// test.html
unityInstance.SendMessage('WebCommunication', 'RequestAllFurnitureData', '');
```

**jslib 브릿지:**
```javascript
// WebBridge.jslib
mergeInto(LibraryManager.library, {
    SendJSONToJS: function(jsonPtr) {
        var data = JSON.parse(UTF8ToString(jsonPtr));
        window.dispatchEvent(new CustomEvent('UnityJSON', { detail: data }));
    }
});
```

**데이터 구조:**
```json
{
  "type": "furnitureList",
  "furniture": [
    {
      "id": 0,
      "name": "Sofa",
      "position": { "x": 2.5, "y": 0.5, "z": 3.0 },
      "rotation": 0.0,
      "price": 300000,
      "category": "living"
    }
  ],
  "totalCost": 300000,
  "furnitureCount": 1,
  "timestamp": 1734646800000
}
```

---

## 🎨 디자인 패턴

### 1. Singleton Pattern
```csharp
public class WebCommunication : MonoBehaviour {
    private static WebCommunication instance;
    public static WebCommunication Instance => instance;
    
    void Awake() {
        if (instance == null) {
            instance = this;
            DontDestroyOnLoad(gameObject);
        }
    }
}
```

### 2. Component Pattern
```csharp
public class Furniture : MonoBehaviour {
    private Renderer furnitureRenderer;
    private Material furnitureMaterial;
    
    void Start() {
        furnitureRenderer = GetComponentInChildren<Renderer>();
        furnitureMaterial = furnitureRenderer.material; // 인스턴스 생성
    }
    
    void OnDestroy() {
        if (furnitureMaterial != null) {
            Destroy(furnitureMaterial); // 메모리 정리
        }
    }
}
```

### 3. Utility Pattern
```csharp
public static class CollisionChecker {
    public static bool IsOverlapping(GameObject furniture, LayerMask layer) {
        // 재사용 가능한 유틸리티 메서드
    }
}
```

---

## 🚀 빌드 & 실행

### 요구사항
- Unity 6 (2023.2 이상)
- 최신 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- Python 3 (로컬 서버용) 또는 VS Code Live Server

### Unity에서 빌드

**1. Build Settings:**
```
File → Build Settings
Platform: WebGL
Switch Platform
```

**2. Player Settings:**
```
Resolution and Presentation:
  - Template: Default
  
Publishing Settings:
  - Compression Format: Gzip ✅
  - Decompression Fallback: ✅
  - Data Caching: ✅
  
Other Settings:
  - Color Space: Gamma
  - Managed Stripping Level: Medium
  - Code Optimization: Speed
```

**3. Build:**
```
Build 버튼 클릭
저장 위치: WebGL-Build/
대기 시간: 5-15분
```

---

### 로컬 실행

**방법 1: Python 서버 (추천)**
```bash
cd FurnitureSimulator
python3 -m http.server 8000
```

**방법 2: VS Code Live Server**
```
1. VS Code에서 프로젝트 열기
2. index.html 우클릭
3. "Open with Live Server"
```

**브라우저에서:**
```
http://localhost:8000
http://localhost:8000/test.html (테스트 페이지)
```

---

## 🎮 사용 방법

### 키보드 조작

| 키 | 기능 |
|----|------|
| **1-5** | 가구 선택 (Sofa, Table, Chair, Bed, Bookshelf) |
| **Q** | 선택된 가구 왼쪽 회전 (-90°) |
| **E** | 선택된 가구 오른쪽 회전 (+90°) |
| **Delete / D** | 선택된 가구 삭제 |
| **J** | JSON 데이터 전송 (테스트) |
| **Space** | 테스트 메시지 전송 |
| **T** | 가구 배치 알림 전송 |

### 마우스 조작

| 동작 | 기능 |
|------|------|
| **좌클릭** | 가구 선택 / 바닥 클릭하여 배치 |
| **드래그** | 선택된 가구 이동 |
| **우클릭 드래그** | 카메라 회전 |
| **마우스 휠** | 카메라 줌 인/아웃 |

---

## 📊 성능 최적화

### 빌드 크기

**압축 전:**
```
Total: ~20MB
- .data: 10MB
- .framework: 8MB
- .wasm: 2MB
```

**압축 후 (Gzip):**
```
Total: ~6MB (70% 감소)
- .data.unityweb: 3MB
- .framework.js.unityweb: 2.5MB
- .wasm.unityweb: 0.5MB
```

### 로딩 시간

| 연결 | 압축 전 | 압축 후 |
|------|---------|---------|
| **WiFi (50Mbps)** | 3.2초 | 1.0초 |
| **4G (10Mbps)** | 16초 | 4.8초 |
| **3G (2Mbps)** | 80초 | 24초 |

---

## 🧪 테스트

### 기능 테스트

**배치 시스템:**
```
✅ 가구 5종 모두 배치 가능
✅ 고스트 미리보기 작동
✅ 바닥 외 영역 클릭 시 무시
```

**선택 & 이동:**
```
✅ 가구 클릭 시 노란색 하이라이트
✅ 드래그로 자유 이동
✅ 빈 공간 클릭 시 선택 해제
```

**회전:**
```
✅ Q/E 키로 90도 회전
✅ 회전 후 충돌 감지
✅ 여러 번 회전 가능
```

**충돌 감지:**
```
✅ 가구끼리 겹칠 때 빨간색
✅ 배치 가능할 때 초록색
✅ 회전 시에도 정확한 감지
```

**삭제:**
```
✅ Delete/D 키로 삭제
✅ Material 메모리 정리
✅ 선택 상태 해제
```

**Unity-JS 통신:**
```
✅ J 키로 JSON 전송
✅ 브라우저 Console에 데이터 표시
✅ 양방향 통신 작동
```

---

## 🐛 알려진 이슈 & 해결

### 1. Material 메모리 누수
**문제:**
```csharp
renderer.material // 매번 새 인스턴스 생성
```

**해결:**
```csharp
void OnDestroy() {
    if (furnitureMaterial != null) {
        Destroy(furnitureMaterial);
    }
}
```

### 2. 회전 후 충돌 감지 부정확
**문제:**
```
Physics.OverlapBox가 회전 고려 안 함
```

**해결:**
```csharp
Collider[] overlaps = Physics.OverlapBox(
    center,
    extents,
    transform.rotation, // ← 회전 전달
    furnitureLayer
);
```

### 3. 여러 Collider 처리
**문제:**
```
GetComponent<Collider>()는 하나만 가져옴
```

**해결:**
```csharp
Collider[] colliders = furniture.GetComponentsInChildren<Collider>();
Bounds combined = colliders[0].bounds;
foreach (var col in colliders) {
    combined.Encapsulate(col.bounds);
}
```

---

## 📚 학습 자료

### 프로젝트에서 사용된 개념

**Unity:**
- [Raycast](https://docs.unity3d.com/ScriptReference/Physics.Raycast.html)
- [LayerMask](https://docs.unity3d.com/ScriptReference/LayerMask.html)
- [Bounds](https://docs.unity3d.com/ScriptReference/Bounds.html)
- [Material Management](https://docs.unity3d.com/ScriptReference/Material.html)

**WebGL:**
- [Unity WebGL](https://docs.unity3d.com/Manual/webgl.html)
- [jslib](https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html)
- [DllImport](https://docs.microsoft.com/en-us/dotnet/api/system.runtime.interopservices.dllimportattribute)

**수학:**
- [구면좌표계](https://en.wikipedia.org/wiki/Spherical_coordinate_system)
- [삼각함수](https://en.wikipedia.org/wiki/Trigonometric_functions)

---

## 🎯 향후 계획

### Month 2 (React 통합)
- [ ] React UI 구현
- [ ] 가구 목록 사이드바
- [ ] 비용 계산기
- [ ] 저장/불러오기 기능 (LocalStorage)
- [ ] Unity-React 양방향 통신 고도화

### Month 2+ (고급 기능)
- [ ] 벽/바닥 색상 변경
- [ ] 조명 제어 (On/Off, 밝기)
- [ ] Undo/Redo 기능
- [ ] 스냅 그리드
- [ ] 평면도 미니맵
- [ ] 3D 측정 도구

### 배포
- [ ] Vercel 배포
- [ ] 최적화 (Code Splitting, Lazy Loading)
- [ ] PWA 지원
- [ ] 모바일 반응형

---

## 👨‍💻 개발자

**진형 Kim**
- GitHub: [@jjinijj](https://github.com/jjinijj)
- 경력: 6-7년 (Unity, Flutter, 게임/앱 개발)
- 전향: 웹 프론트엔드 (3D 웹 특화)

---

## 📄 라이선스

MIT License

---

## 🙏 감사의 글

- **Unity Technologies**: Unity 엔진 제공
- **Asset Store Creators**: Low Poly 가구 에셋
- **Anthropic (Claude)**: 개발 멘토링 및 기술 자문

---

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면:
- GitHub Issues: [여기](https://github.com/jjinijj/FurnitureSimulator/issues)
- Email: your.email@example.com

---

**⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!**

**🔗 [Live Demo](https://furniture-simulator.vercel.app)** (배포 후 링크 추가)

---

**Last Updated:** 2025년 12월 19일  
**Version:** 1.0.0  
**Status:** 🚧 In Development (Month 1 Complete!)

# 🌐 Unity WebGL 통신 완벽 가이드

**작성일:** 2025년 12월 18일  
**프로젝트:** Furniture Simulator (Unity + React)  
**목적:** Unity와 JavaScript 간 통신의 원리와 구현 방법 완벽 이해

---

## 📋 목차

1. [WebGL이란?](#webgl이란)
2. [Unity WebGL의 구조](#unity-webgl의-구조)
3. [jslib 파일 동작 원리](#jslib-파일-동작-원리)
4. [DllImport 메커니즘](#dllimport-메커니즘)
5. [Unity → JavaScript 통신](#unity--javascript-통신)
6. [JavaScript → Unity 통신](#javascript--unity-통신)
7. [JSON 직렬화 심화](#json-직렬화-심화)
8. [CustomEvent 시스템](#customevent-시스템)
9. [메모리 관리](#메모리-관리)
10. [성능 최적화](#성능-최적화)
11. [실전 패턴](#실전-패턴)
12. [디버깅 팁](#디버깅-팁)

---

## 🎯 WebGL이란?

### 기본 개념

**WebGL (Web Graphics Library)**
```
웹 브라우저에서 GPU 가속 3D 그래픽을 
렌더링하기 위한 JavaScript API

특징:
- 플러그인 없이 작동
- 모든 주요 브라우저 지원
- OpenGL ES 2.0 기반
```

### Unity WebGL

**Unity가 WebGL로 빌드되면:**
```
Unity C# 코드
    ↓ (IL2CPP)
WebAssembly (WASM)
    ↓
JavaScript
    ↓
브라우저에서 실행
```

**주요 특징:**
```
✅ 웹 브라우저에서 Unity 게임 실행
✅ 설치 불필요
✅ 크로스 플랫폼 (PC, 모바일)
✅ JavaScript와 통신 가능
```

---

## 🏗️ Unity WebGL의 구조

### 빌드 결과물

**WebGL 빌드 시 생성되는 파일:**
```
Build/
├── Build/
│   ├── build.data          ← 게임 에셋 (텍스처, 모델 등)
│   ├── build.framework.js  ← Unity 런타임
│   ├── build.loader.js     ← 로더
│   └── build.wasm          ← 컴파일된 게임 코드 (WebAssembly)
├── index.html              ← HTML 페이지
└── TemplateData/           ← UI 에셋
```

### 각 파일의 역할

**1. build.wasm (WebAssembly)**
```
역할: Unity C# 코드가 컴파일된 결과
크기: 수 MB ~ 수십 MB
특징: 
  - 바이너리 형식
  - 네이티브에 가까운 속도
  - IL2CPP로 변환됨
```

**2. build.framework.js**
```
역할: Unity 엔진 런타임
내용:
  - 렌더링 시스템
  - 물리 엔진
  - 입력 처리
  - 통신 브릿지
```

**3. build.data**
```
역할: 게임 에셋 데이터
내용:
  - 텍스처
  - 3D 모델
  - 오디오
  - 씬 데이터
압축: Gzip or Brotli
```

### 실행 흐름

```
1. 브라우저에서 index.html 로드
   ↓
2. build.loader.js 실행
   ↓
3. build.framework.js 로드
   ↓
4. build.wasm 로드 및 초기화
   ↓
5. build.data 로드 (에셋)
   ↓
6. Unity 게임 시작
   ↓
7. JavaScript ↔ Unity 통신 가능
```

---

## 🔧 jslib 파일 동작 원리

### jslib 파일이란?

**정의:**
```
Unity WebGL 빌드 시 JavaScript 코드를 
직접 삽입하기 위한 특수 파일 형식

위치: Assets/Plugins/WebGL/*.jslib
확장자: 반드시 .jslib
```

### 기본 구조

```javascript
// WebBridge.jslib
mergeInto(LibraryManager.library, {
    
    // 함수 정의
    FunctionName: function(param1, param2) {
        // JavaScript 코드
    },
    
    AnotherFunction: function() {
        // JavaScript 코드
    }
    
});
```

### mergeInto의 역할

**mergeInto란?**
```javascript
mergeInto(target, source)
```

**동작:**
```
Unity의 빌드 시스템이 jslib 파일을 읽어서
build.framework.js에 함수들을 병합(merge)함

결과:
LibraryManager.library.FunctionName = function(...) { ... }

→ C#에서 DllImport로 호출 가능!
```

### 빌드 프로세스

```
1. Unity 빌드 시작
   ↓
2. Assets/Plugins/WebGL/*.jslib 파일들 스캔
   ↓
3. mergeInto 블록 추출
   ↓
4. build.framework.js에 함수 병합
   ↓
5. 빌드 완료
   ↓
6. C#에서 DllImport로 호출 가능
```

### 함수 이름 규칙

**중요:**
```javascript
// jslib 파일
MyFunction: function() { ... }

// C# 코드
[DllImport("__Internal")]
private static extern void MyFunction();

→ 이름이 정확히 일치해야 함!
```

---

## 🔗 DllImport 메커니즘

### DllImport란?

**C#의 DllImport 속성:**
```csharp
using System.Runtime.InteropServices;

[DllImport("__Internal")]
private static extern void FunctionName();
```

**역할:**
```
외부 라이브러리의 함수를 
C# 코드에서 호출하기 위한 방법

Windows: .dll 파일
macOS: .dylib 파일
Linux: .so 파일
WebGL: JavaScript 함수!
```

### "__Internal"의 의미

**일반 플랫폼:**
```csharp
// Windows
[DllImport("user32.dll")]
private static extern int MessageBox(...);

// 외부 DLL 파일 명시
```

**WebGL:**
```csharp
[DllImport("__Internal")]
private static extern void MyFunction();

// "__Internal" = 내부 (build.framework.js 내부)
// jslib로 병합된 함수를 의미
```

### 데이터 타입 변환

**C# → JavaScript 타입 매칭:**

| C# 타입 | JavaScript 타입 | 설명 |
|---------|----------------|------|
| `int` | `number` | 32비트 정수 |
| `float` | `number` | 부동소수점 |
| `double` | `number` | 부동소수점 |
| `bool` | `number` | 0 또는 1 |
| `string` | `number` | 문자열 포인터! |

**문자열 특수 처리:**
```
C# string → JavaScript에서는 메모리 포인터로 전달됨!
→ UTF8ToString() 함수로 변환 필요
```

### 예시: 전체 흐름

**1. jslib 파일:**
```javascript
// WebBridge.jslib
mergeInto(LibraryManager.library, {
    SendMessageToJS: function(messagePtr) {
        // messagePtr는 문자열의 메모리 주소!
        var message = UTF8ToString(messagePtr);
        console.log('받은 메시지:', message);
    }
});
```

**2. C# 코드:**
```csharp
// WebCommunication.cs
using System.Runtime.InteropServices;

#if UNITY_WEBGL && !UNITY_EDITOR
[DllImport("__Internal")]
private static extern void SendMessageToJS(string message);
#endif

public void SendMessage(string msg)
{
#if UNITY_WEBGL && !UNITY_EDITOR
    SendMessageToJS(msg);  // JavaScript 함수 호출!
#endif
}
```

**3. 빌드 시:**
```
1. jslib → build.framework.js에 병합
2. DllImport → JavaScript 함수 연결
3. SendMessageToJS 호출 가능!
```

---

## 📤 Unity → JavaScript 통신

### 기본 구조

```
Unity C#
    ↓ [DllImport]
jslib 함수
    ↓
JavaScript 코드
    ↓
브라우저 (Console, DOM, CustomEvent 등)
```

### 문자열 전달

**C# 코드:**
```csharp
[DllImport("__Internal")]
private static extern void SendString(string text);

public void Test()
{
    SendString("Hello JavaScript!");
}
```

**jslib 코드:**
```javascript
SendString: function(textPtr) {
    // 1. 메모리 포인터 → 문자열 변환
    var text = UTF8ToString(textPtr);
    
    // 2. JavaScript에서 사용
    console.log('Unity에서 받음:', text);
    alert(text);
}
```

**UTF8ToString이 필요한 이유:**
```
Unity C# string → WebAssembly 메모리의 UTF-8 바이트 배열
→ JavaScript는 메모리 주소만 받음
→ UTF8ToString으로 실제 문자열로 변환
```

### 숫자 전달

**C# 코드:**
```csharp
[DllImport("__Internal")]
private static extern void SendNumbers(int a, float b, double c);

public void Test()
{
    SendNumbers(42, 3.14f, 2.718);
}
```

**jslib 코드:**
```javascript
SendNumbers: function(a, b, c) {
    // 숫자는 그대로 전달됨
    console.log('int:', a);      // 42
    console.log('float:', b);    // 3.14...
    console.log('double:', c);   // 2.718...
}
```

### 복잡한 데이터 전달

**문제:**
```
C# 클래스/구조체는 직접 전달 불가!
→ JSON 문자열로 변환 필요
```

**해결책:**
```csharp
// C#
[Serializable]
public class PlayerData
{
    public string name;
    public int level;
    public float health;
}

[DllImport("__Internal")]
private static extern void SendPlayerData(string jsonData);

public void SendData(PlayerData data)
{
    string json = JsonUtility.ToJson(data);
    SendPlayerData(json);
}
```

```javascript
// JavaScript
SendPlayerData: function(jsonPtr) {
    var jsonString = UTF8ToString(jsonPtr);
    var data = JSON.parse(jsonString);
    
    console.log('Name:', data.name);
    console.log('Level:', data.level);
    console.log('Health:', data.health);
}
```

---

## 📥 JavaScript → Unity 통신

### SendMessage 메서드

**기본 구조:**
```javascript
unityInstance.SendMessage(
    'GameObject이름',
    '메서드이름',
    '파라미터'
);
```

**Unity Instance 얻기:**
```javascript
// Unity 빌드 시 생성
createUnityInstance(canvas, config).then((instance) => {
    window.unityInstance = instance;
});
```

### 파라미터 타입

**JavaScript에서 Unity로:**

| JavaScript 타입 | Unity C# 타입 | 설명 |
|----------------|--------------|------|
| `string` | `string` | 문자열 |
| `number` | `int`, `float` | 숫자 |
| 없음 | 파라미터 없음 | 공백 문자열 전달 |

**중요:** 
```
SendMessage는 파라미터를 1개만 받음!
→ 여러 데이터는 JSON 문자열로
```

### 예시: 기본 사용

**JavaScript:**
```javascript
// 버튼 클릭 시
button.onclick = function() {
    unityInstance.SendMessage(
        'GameManager',    // GameObject 이름
        'StartGame',      // 메서드 이름
        ''                // 파라미터 (없으면 빈 문자열)
    );
};
```

**Unity C#:**
```csharp
// GameManager.cs (GameObject 이름과 일치)
public class GameManager : MonoBehaviour
{
    // public 메서드여야 함!
    public void StartGame()
    {
        Debug.Log("JavaScript에서 게임 시작 요청!");
    }
}
```

### 예시: 문자열 전달

**JavaScript:**
```javascript
unityInstance.SendMessage(
    'PlayerController',
    'SetPlayerName',
    'Alice'
);
```

**Unity C#:**
```csharp
public class PlayerController : MonoBehaviour
{
    public void SetPlayerName(string name)
    {
        Debug.Log($"플레이어 이름: {name}");
    }
}
```

### 예시: 숫자 전달

**JavaScript:**
```javascript
unityInstance.SendMessage(
    'ScoreManager',
    'AddScore',
    '100'  // 문자열로 전달!
);
```

**Unity C#:**
```csharp
public class ScoreManager : MonoBehaviour
{
    public void AddScore(string scoreStr)
    {
        int score = int.Parse(scoreStr);
        Debug.Log($"점수 추가: {score}");
    }
    
    // 또는 int 파라미터
    public void AddScore(int score)
    {
        Debug.Log($"점수 추가: {score}");
    }
}
```

### 예시: JSON 데이터 전달

**JavaScript:**
```javascript
var playerData = {
    name: 'Alice',
    level: 10,
    health: 100
};

unityInstance.SendMessage(
    'PlayerController',
    'LoadPlayerData',
    JSON.stringify(playerData)
);
```

**Unity C#:**
```csharp
[Serializable]
public class PlayerData
{
    public string name;
    public int level;
    public int health;
}

public class PlayerController : MonoBehaviour
{
    public void LoadPlayerData(string jsonData)
    {
        PlayerData data = JsonUtility.FromJson<PlayerData>(jsonData);
        Debug.Log($"플레이어: {data.name}, 레벨: {data.level}");
    }
}
```

### 주의사항

**1. GameObject가 씬에 존재해야 함**
```
SendMessage는 GameObject 이름으로 찾음
→ Hierarchy에 있어야 함
→ DontDestroyOnLoad로 유지 권장
```

**2. 메서드는 public이어야 함**
```csharp
// ❌ 작동 안 함
private void MyMethod() { }

// ✅ 작동함
public void MyMethod() { }
```

**3. 파라미터는 1개만**
```javascript
// ❌ 여러 개 안 됨
SendMessage('Obj', 'Method', param1, param2);

// ✅ JSON으로 전달
var data = {param1: val1, param2: val2};
SendMessage('Obj', 'Method', JSON.stringify(data));
```

**4. 비동기 응답 없음**
```
SendMessage는 일방향 통신
→ Unity의 결과를 바로 받을 수 없음
→ Unity에서 다시 JavaScript로 전송 필요
```

---

## 📦 JSON 직렬화 심화

### JsonUtility vs Newtonsoft.Json

**Unity 내장: JsonUtility**
```csharp
using UnityEngine;

[Serializable]
public class MyData
{
    public int value;
}

string json = JsonUtility.ToJson(myData);
MyData data = JsonUtility.FromJson<MyData>(json);
```

**장점:**
```
✅ Unity 내장 (추가 설치 불필요)
✅ 빠름
✅ WebGL에서 안정적
```

**단점:**
```
❌ Dictionary 지원 안 됨
❌ Properties 지원 안 됨
❌ 기능 제한적
```

**외부 라이브러리: Newtonsoft.Json (JSON.NET)**
```csharp
using Newtonsoft.Json;

string json = JsonConvert.SerializeObject(myData);
MyData data = JsonConvert.DeserializeObject<MyData>(json);
```

**장점:**
```
✅ 기능 풍부
✅ Dictionary 지원
✅ 복잡한 구조 지원
```

**단점:**
```
❌ WebGL에서 크기 증가
❌ 느림
❌ 별도 설치 필요
```

**추천:**
```
WebGL 프로젝트 → JsonUtility 사용!
```

### [Serializable] 속성

**필수:**
```csharp
// ❌ 직렬화 안 됨
public class MyData
{
    public int value;
}

// ✅ 직렬화 됨
[Serializable]
public class MyData
{
    public int value;
}
```

**역할:**
```
Unity에게 "이 클래스는 직렬화 가능하다"고 알려줌
→ JsonUtility.ToJson() 사용 가능
```

### 직렬화 규칙

**지원되는 타입:**
```csharp
[Serializable]
public class SupportedTypes
{
    // ✅ 기본 타입
    public int intValue;
    public float floatValue;
    public bool boolValue;
    public string stringValue;
    
    // ✅ Unity 타입 (일부)
    public Vector3 position;
    public Color color;
    
    // ✅ 배열
    public int[] numbers;
    public string[] names;
    
    // ✅ List
    public List<int> list;
    
    // ✅ 중첩 클래스 ([Serializable] 필요)
    public NestedData nested;
}
```

**지원 안 되는 타입:**
```csharp
[Serializable]
public class NotSupported
{
    // ❌ Dictionary
    public Dictionary<string, int> dict;
    
    // ❌ Properties
    public int Value { get; set; }
    
    // ❌ readonly
    public readonly int constant = 10;
    
    // ❌ static
    public static int staticValue;
}
```

### Vector3 직렬화 문제

**문제:**
```csharp
[Serializable]
public class MyData
{
    public Vector3 position;  // 직렬화는 되지만...
}

// 결과 JSON:
// {"position":{"x":1.0,"y":2.0,"z":3.0}}
```

**더 나은 방법:**
```csharp
[Serializable]
public class PositionData
{
    public float x;
    public float y;
    public float z;
    
    public PositionData(Vector3 pos)
    {
        x = pos.x;
        y = pos.y;
        z = pos.z;
    }
    
    public Vector3 ToVector3()
    {
        return new Vector3(x, y, z);
    }
}

[Serializable]
public class MyData
{
    public PositionData position;
}
```

**이유:**
```
✅ JavaScript에서 접근 쉬움
✅ 명확한 구조
✅ 크로스 플랫폼 호환성
```

### Pretty Print

**읽기 쉬운 JSON:**
```csharp
string json = JsonUtility.ToJson(data, true);
// true = prettyPrint

// 결과:
// {
//   "name": "Alice",
//   "level": 10
// }
```

**압축된 JSON:**
```csharp
string json = JsonUtility.ToJson(data, false);
// false = 압축

// 결과:
// {"name":"Alice","level":10}
```

**사용 시기:**
```
개발/디버깅: prettyPrint = true
프로덕션: prettyPrint = false (크기 절약)
```

---

## 🎪 CustomEvent 시스템

### CustomEvent란?

**정의:**
```javascript
브라우저의 이벤트 시스템을 확장한
사용자 정의 이벤트

기본 이벤트: click, keydown, load 등
커스텀 이벤트: 원하는 이름으로 정의
```

### 기본 사용법

**이벤트 발생:**
```javascript
// 이벤트 생성
var event = new CustomEvent('myEvent', {
    detail: { message: 'Hello!' }
});

// 이벤트 발생
window.dispatchEvent(event);
```

**이벤트 수신:**
```javascript
// 리스너 등록
window.addEventListener('myEvent', function(e) {
    console.log('받은 데이터:', e.detail);
});
```

### Unity-JS 통신에서의 활용

**jslib에서 이벤트 발생:**
```javascript
// WebBridge.jslib
SendMessageToJS: function(messagePtr) {
    var message = UTF8ToString(messagePtr);
    
    // CustomEvent 발생
    window.dispatchEvent(new CustomEvent('UnityMessage', {
        detail: { 
            message: message,
            timestamp: Date.now()
        }
    }));
}
```

**HTML/React에서 수신:**
```javascript
// React 컴포넌트
useEffect(() => {
    const handleUnityMessage = (event) => {
        console.log('Unity 메시지:', event.detail.message);
    };
    
    window.addEventListener('UnityMessage', handleUnityMessage);
    
    // 클린업
    return () => {
        window.removeEventListener('UnityMessage', handleUnityMessage);
    };
}, []);
```

### 장점

**1. 느슨한 결합 (Loose Coupling)**
```
Unity → CustomEvent → 여러 리스너

하나의 이벤트를 여러 곳에서 받을 수 있음
→ 코드 유연성 Up
```

**2. 표준 패턴**
```
브라우저 기본 이벤트 시스템 활용
→ 추가 라이브러리 불필요
→ 모든 브라우저 지원
```

**3. 데이터 전달 용이**
```
detail 객체에 복잡한 데이터 전달 가능
→ 구조화된 정보 전송
```

### 실전 패턴

**이벤트 타입별 처리:**
```javascript
// jslib
SendJSON: function(jsonPtr) {
    var jsonString = UTF8ToString(jsonPtr);
    var data = JSON.parse(jsonString);
    
    // 타입별 이벤트 발생
    if (data.type === 'furniturePlaced') {
        window.dispatchEvent(new CustomEvent('FurniturePlaced', {
            detail: data
        }));
    } else if (data.type === 'scoreUpdate') {
        window.dispatchEvent(new CustomEvent('ScoreUpdate', {
            detail: data
        }));
    }
}
```

```javascript
// React
window.addEventListener('FurniturePlaced', (e) => {
    updateFurnitureList(e.detail);
});

window.addEventListener('ScoreUpdate', (e) => {
    updateScore(e.detail.score);
});
```

---

## 💾 메모리 관리

### WebAssembly 메모리

**구조:**
```
Unity WebGL은 WebAssembly 메모리를 사용

WebAssembly Memory
├── Stack (함수 호출, 지역 변수)
├── Heap (동적 할당)
│   ├── Unity 오브젝트
│   ├── 텍스처
│   ├── 메시 데이터
│   └── 문자열 등
└── Static Data (전역 변수)
```

### 문자열 메모리

**C# → JavaScript 문자열 전달 시:**
```
1. C# string → UTF-8 바이트 배열
2. WebAssembly 메모리에 저장
3. 메모리 주소(포인터)를 JavaScript로 전달
4. JavaScript에서 UTF8ToString으로 읽기
```

**메모리 누수 방지:**
```javascript
// ❌ 나쁜 예
SendMessage: function(ptr) {
    var str = UTF8ToString(ptr);
    // str은 JavaScript 문자열
    // Unity는 메모리 자동 관리
}

// ✅ 좋은 예 (일반적으로 자동 관리됨)
SendMessage: function(ptr) {
    var str = UTF8ToString(ptr);
    // Unity가 메모리 관리
    // 추가 작업 불필요
}
```

**Unity는 자동으로 메모리를 관리합니다!**

### JavaScript 객체 수명

**CustomEvent 데이터:**
```javascript
SendJSON: function(jsonPtr) {
    var jsonString = UTF8ToString(jsonPtr);
    var data = JSON.parse(jsonString);
    
    // data는 JavaScript 객체
    // JavaScript GC가 관리
    window.dispatchEvent(new CustomEvent('UnityJSON', {
        detail: data
    }));
    
    // 이벤트 전달 후 data는 GC 대상
}
```

### 메모리 최적화 팁

**1. 불필요한 데이터 전송 최소화**
```csharp
// ❌ 나쁜 예 - 매 프레임 전송
void Update()
{
    SendPosition(transform.position);  // 초당 60회!
}

// ✅ 좋은 예 - 변경 시에만
Vector3 lastPosition;
void Update()
{
    if (Vector3.Distance(transform.position, lastPosition) > 0.1f)
    {
        SendPosition(transform.position);
        lastPosition = transform.position;
    }
}
```

**2. JSON 크기 최소화**
```csharp
// ❌ 나쁜 예
[Serializable]
public class VerboseData
{
    public string veryLongDescriptiveName;
    public string anotherVeryLongName;
}

// ✅ 좋은 예
[Serializable]
public class CompactData
{
    public string name;  // 짧은 키 이름
    public string desc;
}
```

**3. 배치 전송**
```csharp
// ❌ 나쁜 예 - 개별 전송
foreach (var item in items)
{
    SendItem(item);  // N회 호출
}

// ✅ 좋은 예 - 한 번에 전송
SendAllItems(items);  // 1회 호출
```

---

## ⚡ 성능 최적화

### 통신 최적화

**1. 호출 빈도 제한**
```csharp
// Throttle 패턴
private float lastSendTime;
private const float sendInterval = 0.1f;  // 100ms

void Update()
{
    if (Time.time - lastSendTime > sendInterval)
    {
        SendData();
        lastSendTime = Time.time;
    }
}
```

**2. Debounce 패턴**
```csharp
private Coroutine debounceCoroutine;

public void OnValueChanged()
{
    if (debounceCoroutine != null)
        StopCoroutine(debounceCoroutine);
    
    debounceCoroutine = StartCoroutine(DebounceCoroutine());
}

IEnumerator DebounceCoroutine()
{
    yield return new WaitForSeconds(0.3f);
    SendData();
}
```

### JSON 최적화

**1. 구조 최적화**
```csharp
// ❌ 비효율적
[Serializable]
public class Inefficient
{
    public List<Vector3> positions;  // Vector3 직렬화
}

// ✅ 효율적
[Serializable]
public class Efficient
{
    public float[] posX;  // 평면 배열
    public float[] posY;
    public float[] posZ;
}
```

**2. Pretty Print 끄기**
```csharp
// 개발
string json = JsonUtility.ToJson(data, true);   // +30% 크기

// 프로덕션
string json = JsonUtility.ToJson(data, false);  // 압축
```

### DllImport 최적화

**1. 조건부 컴파일**
```csharp
#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")]
    private static extern void MyFunction();
#endif

public void CallFunction()
{
#if UNITY_WEBGL && !UNITY_EDITOR
    MyFunction();
#else
    // Editor에서는 대체 로직
    Debug.Log("WebGL 전용 기능");
#endif
}
```

**이점:**
```
✅ Editor에서 에러 방지
✅ 빌드 크기 최소화
✅ 플랫폼별 최적화
```

---

## 🎨 실전 패턴

### Singleton 패턴

**WebCommunication 싱글톤:**
```csharp
public class WebCommunication : MonoBehaviour
{
    private static WebCommunication instance;
    public static WebCommunication Instance
    {
        get
        {
            if (instance == null)
            {
                var go = new GameObject("WebCommunication");
                instance = go.AddComponent<WebCommunication>();
                DontDestroyOnLoad(go);
            }
            return instance;
        }
    }
    
    void Awake()
    {
        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else if (instance != this)
        {
            Destroy(gameObject);
        }
    }
}
```

**사용:**
```csharp
// 어디서든 접근 가능
WebCommunication.Instance.SendMessage("Hello");
```

### 이벤트 기반 아키텍처

**Unity 이벤트:**
```csharp
using UnityEngine.Events;

[Serializable]
public class FurnitureEvent : UnityEvent<FurnitureData> { }

public class FurnitureManager : MonoBehaviour
{
    public FurnitureEvent OnFurniturePlaced;
    
    public void PlaceFurniture(FurnitureData data)
    {
        // 가구 배치 로직
        
        // 이벤트 발생
        OnFurniturePlaced?.Invoke(data);
    }
}

public class WebCommunication : MonoBehaviour
{
    void Start()
    {
        var manager = FindObjectOfType<FurnitureManager>();
        manager.OnFurniturePlaced.AddListener(OnFurniturePlaced);
    }
    
    void OnFurniturePlaced(FurnitureData data)
    {
        SendToJavaScript(data);
    }
}
```

### 커맨드 패턴

**JavaScript → Unity 커맨드:**
```csharp
public interface ICommand
{
    void Execute();
}

public class AddFurnitureCommand : ICommand
{
    private string furnitureName;
    
    public AddFurnitureCommand(string name)
    {
        furnitureName = name;
    }
    
    public void Execute()
    {
        // 가구 추가 로직
    }
}

public class CommandManager : MonoBehaviour
{
    public void ExecuteCommand(string commandJson)
    {
        var data = JsonUtility.FromJson<CommandData>(commandJson);
        
        ICommand command = null;
        switch (data.type)
        {
            case "addFurniture":
                command = new AddFurnitureCommand(data.name);
                break;
            // ... 다른 커맨드들
        }
        
        command?.Execute();
    }
}
```

---

## 🐛 디버깅 팁

### Console 활용

**JavaScript Console:**
```javascript
// jslib
SendMessage: function(ptr) {
    var msg = UTF8ToString(ptr);
    console.log('[Unity → JS]', msg);
    console.log('타입:', typeof msg);
    console.log('길이:', msg.length);
}
```

**Unity Console:**
```csharp
public void SendMessage(string msg)
{
    Debug.Log($"[SendMessage] {msg}");
    Debug.Log($"길이: {msg.Length}");
    
    SendToJS(msg);
}
```

### 에러 처리

**jslib에서:**
```javascript
SendJSON: function(jsonPtr) {
    try {
        var jsonString = UTF8ToString(jsonPtr);
        var data = JSON.parse(jsonString);
        
        console.log('[Unity → JS] Success:', data);
        
    } catch (e) {
        console.error('[Unity → JS] Error:', e);
        console.error('Raw JSON:', jsonString);
    }
}
```

**Unity에서:**
```csharp
public void SendJSON(string json)
{
    try
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        SendJSONToJS(json);
#endif
        Debug.Log($"[JSON Sent] {json}");
    }
    catch (Exception e)
    {
        Debug.LogError($"[JSON Error] {e.Message}");
    }
}
```

### 브라우저 개발자 도구

**Chrome DevTools:**
```
F12 → Console 탭

확인할 것:
1. console.log 출력
2. 에러 메시지 (빨간색)
3. 경고 메시지 (노란색)
4. Network 탭 (리소스 로딩)
5. Performance 탭 (성능 분석)
```

### Unity Editor 테스트

**조건부 로그:**
```csharp
public void SendMessage(string msg)
{
#if UNITY_WEBGL && !UNITY_EDITOR
    SendMessageToJS(msg);
    Debug.Log($"[Unity → JS] {msg}");
#else
    Debug.Log($"[Unity → JS (Editor)] {msg}");
#endif
}
```

**결과:**
```
Editor: [Unity → JS (Editor)] Hello
WebGL: [Unity → JS] Hello (실제 전송)
```

---

## 📚 참고 자료

### 공식 문서

**Unity:**
- [WebGL: Interacting with browser scripting](https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html)
- [JsonUtility](https://docs.unity3d.com/ScriptReference/JsonUtility.html)
- [WebGL Build Options](https://docs.unity3d.com/Manual/webgl-building.html)

**MDN (Mozilla):**
- [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
- [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

### 추가 학습

**WebAssembly:**
- [WebAssembly 공식 사이트](https://webassembly.org/)
- [Understanding WebAssembly text format](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format)

**Unity WebGL 최적화:**
- [Unity WebGL Performance](https://docs.unity3d.com/Manual/webgl-performance.html)
- [IL2CPP](https://docs.unity3d.com/Manual/IL2CPP.html)

---

## ✅ 체크리스트

### 이해해야 할 핵심 개념

**기본:**
- [ ] WebGL이 무엇인지
- [ ] Unity WebGL 빌드 구조
- [ ] jslib 파일의 역할
- [ ] DllImport 메커니즘
- [ ] Unity ↔ JavaScript 통신 방향

**중급:**
- [ ] 문자열 전달 (UTF8ToString)
- [ ] JSON 직렬화/역직렬화
- [ ] CustomEvent 시스템
- [ ] SendMessage 사용법
- [ ] 메모리 관리 기본

**고급:**
- [ ] 성능 최적화 기법
- [ ] 디자인 패턴 적용
- [ ] 에러 처리
- [ ] 디버깅 기법

---

## 🎯 실습 과제

### 기초 과제

**1. 간단한 통신:**
```
Unity 버튼 클릭 → JavaScript alert 띄우기
```

**2. 양방향 통신:**
```
JavaScript 버튼 → Unity 큐브 색상 변경
```

**3. JSON 전송:**
```
Unity에서 플레이어 데이터(이름, 점수) → JavaScript 표시
```

### 중급 과제

**1. 실시간 동기화:**
```
Unity 오브젝트 이동 → JavaScript에서 위치 추적
```

**2. 이벤트 시스템:**
```
여러 Unity 이벤트 → 각각 다른 JavaScript 핸들러
```

**3. 데이터 수집:**
```
JavaScript에서 여러 데이터 입력 → Unity로 전송 → 처리
```

---

## 🎉 마무리

### 핵심 요약

**Unity → JavaScript:**
```
1. jslib 파일 작성
2. [DllImport("__Internal")]
3. C# 함수 호출
4. JavaScript 실행
```

**JavaScript → Unity:**
```
1. unityInstance.SendMessage()
2. GameObject 이름 지정
3. public 메서드 호출
4. Unity에서 처리
```

**데이터 전송:**
```
- 단순 데이터: 직접 전달
- 복잡한 데이터: JSON 사용
- 문자열: UTF8ToString 변환
```

### 추가 학습 방향

**다음 단계:**
```
1. React와 Unity 통합
2. 상태 관리 (Redux, Zustand)
3. WebSocket 실시간 통신
4. 최적화 고급 기법
```

---

**문서 버전:** 1.0  
**마지막 업데이트:** 2025년 12월 18일  
**작성자:** Claude (Anthropic)  
**프로젝트:** Furniture Simulator

**Happy Coding! 🚀**

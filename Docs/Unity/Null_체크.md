# ⚠️ Unity Null 체크 가이드

**작성일:** 2024년 12월 12일  
**중요도:** 🔥🔥🔥 매우 중요!

## 🚨 핵심 규칙

**Unity Object는 반드시 `== null` 사용!**

```csharp
// ✅ 올바름
if (gameObject == null) { }
if (transform != null) { }

// ❌ 틀림 (UNT0029 경고)
if (gameObject is null) { }
if (transform is not null) { }
```

---

## 🔍 왜 is null이 안 되는가?

### Unity의 "Fake Null"

```csharp
GameObject obj = gameObject;
Destroy(obj);  // 오브젝트 파괴

// Unity의 == null
if (obj == null)  // ✅ true (Destroyed 감지)
{
    // "파괴되었습니다!"
}

// C#의 is null
if (obj is null)  // ❌ false (못 감지!)
{
    // "참조는 살아있어요!" (위험!)
}
```

### 차이점

| 체크 방법 | C# null | Destroyed | 안전 |
|-----------|---------|-----------|------|
| `== null` | ✅ | ✅ | ✅ 완전 |
| `is null` | ✅ | ❌ | ❌ 불완전 |

---

## 🐛 실제 버그 시나리오

```csharp
GameObject enemy;

void Update()
{
    // 적이 죽으면 Destroy(enemy) 호출됨
    
    // ❌ 위험! 크래시 발생
    if (enemy is not null)
    {
        enemy.transform.position = ...;  // 💥 에러!
    }
    
    // ✅ 안전
    if (enemy != null)
    {
        enemy.transform.position = ...;  // ✓ OK
    }
}
```

---

## 📊 정리

### Unity Object

```csharp
// Unity Object 타입들
GameObject, Transform, Renderer, Collider,
Camera, MonoBehaviour, Component, 등등...

// ✅ 사용
if (obj == null) { }
if (obj != null) { }

// ❌ 사용 금지
if (obj is null) { }
if (obj is not null) { }
```

### 일반 C# 클래스

```csharp
// 일반 클래스 (Unity가 아닌)
MyClass obj;

// ✅ 둘 다 OK
if (obj == null) { }
if (obj is null) { }
```

---

## 🔗 참고

**Microsoft Unity Analyzers - UNT0029:**
- https://github.com/microsoft/Microsoft.Unity.Analyzers/blob/main/doc/UNT0029.md
- "Pattern matching with null on Unity objects"

---

**핵심 요약:**
```
Unity Object → == null 필수!
is null → Destroyed 못 잡음 → 버그!
```

# 🎨 Unity Material 메모리 관리 가이드

**작성일:** 2024년 12월 12일  
**중요도:** 🔥🔥 높음

## 🧠 핵심 개념

**GameObject 파괴 시 Material 인스턴스는 자동으로 제거되지 않음!**

---

## 🎭 .material vs .sharedMaterial

### Renderer.material (인스턴스 생성)

```csharp
Material myMaterial = renderer.material;  // 새 인스턴스 생성!
```

**특징:**
- ✅ 개별 오브젝트마다 독립적 제어
- ❌ 매번 새 인스턴스 생성 → 메모리 사용
- ❌ 수동 메모리 관리 필수!

### Renderer.sharedMaterial (원본 참조)

```csharp
Material myMaterial = renderer.sharedMaterial;  // 원본 참조
```

**특징:**
- ✅ 메모리 효율적
- ✅ 메모리 관리 불필요
- ❌ 모든 오브젝트에 영향
- ❌ 원본 Asset 변경됨 (위험!)

---

## ✅ 올바른 메모리 관리

### 방법 1: OnDestroy() 사용 (필수!)

```csharp
public class Furniture : MonoBehaviour
{
    private Material furnitureMaterial;
    
    void Start()
    {
        furnitureMaterial = GetComponent<Renderer>().material;
        furnitureMaterial.color = Color.red;
    }
    
    void OnDestroy()
    {
        // ✅ Material 인스턴스 명시적 제거
        if (furnitureMaterial != null)
        {
            Destroy(furnitureMaterial);
        }
    }
}
```

### 방법 2: sharedMaterial (읽기만 할 때)

```csharp
void Start()
{
    // 읽기만 (수정 안 함)
    Material mat = renderer.sharedMaterial;
    Debug.Log(mat.name);
    
    // OnDestroy() 불필요!
}
```

---

## ⚠️ 주의사항

### 절대 하지 말 것

```csharp
// ❌ Update에서 반복 호출
void Update()
{
    renderer.material.color = Color.red;  // 매 프레임 새 인스턴스!
}

// ❌ OnDestroy() 없이 .material 사용
void Start()
{
    renderer.material.color = Color.red;
}
// OnDestroy() 없음 → 메모리 누수!
```

### 올바른 방법

```csharp
// ✅ 캐싱 + OnDestroy()
private Material cachedMaterial;

void Start()
{
    cachedMaterial = renderer.material;
}

void Update()
{
    cachedMaterial.color = Color.red;  // 인스턴스 재사용
}

void OnDestroy()
{
    Destroy(cachedMaterial);
}
```

---

## 📊 규칙 정리

| 상황 | 사용 | OnDestroy() 필요 |
|------|------|------------------|
| 색상 변경 | .material | ✅ 필수 |
| 읽기만 | .sharedMaterial | ❌ 불필요 |
| Update 반복 | 캐싱 + .material | ✅ 필수 |

전체 상세 가이드는 프로젝트 루트의 `Unity_Material_메모리_관리_가이드.md` 참조.

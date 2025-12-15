using UnityEngine;

/// <summary>
/// 가구 충돌 검사 클래스
/// Furniture, FurniturePlacer에서 사용
/// </summary>

public static class CollisionChecker
{
    public static Bounds GetFurnitureBounds(Transform furniture)
    {
        Collider[] colliders = furniture.GetComponentsInChildren<Collider>();

        if(colliders.Length == 0)
        {
            return new Bounds(furniture.position, Vector3.zero);
        }

        Bounds combineBounds = colliders[0].bounds;

        for(int i = 1; i < colliders.Length; ++i)
        {
            combineBounds.Encapsulate(colliders[i].bounds);
        }

        return combineBounds;
    }

    public static bool IsOverlapping(GameObject target, LayerMask layerMask)
    {
        if (target == null)
            return false;
        
        Debug.Log($"{target.name}, {layerMask.value}");
        // 크기 계산
        Bounds bounds = GetFurnitureBounds(target.transform);

        // Overlap 체크
        Collider[] colliders = Physics.OverlapBox(
            bounds.center,
            bounds.extents,
            target.transform.rotation,
            layerMask,  // 특정 레이어만 감지
            QueryTriggerInteraction.Ignore
        );
    
        // 자기 자신은 충돌에서 제외
        foreach(Collider hit in colliders)
        {
            if (!hit.transform.IsChildOf(target.transform))
            {
                Debug.Log(hit.gameObject.name);
                return true;
            }
        }

        return false;
    }
}
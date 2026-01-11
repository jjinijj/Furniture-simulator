using System.Collections.Generic;
using UnityEngine;

public class Furniture : MonoBehaviour
{
    [Header("Visual")]
    public Color normalColor = Color.white;
    public Color selectedColor = Color.cyan;

    private FurnitureItemData data;
    public FurnitureItemData ItemData => data;
    private bool isSelected = false;
    private bool isDragging = false;
    private float heightOffset = 0.5f;
    private Renderer furnitureRenderer;
    private Material[] furnitureMaterials;
    private LayerMask layerMask;
    private Color[] originalcolors;

    private Vector3 originPosition;
    private Quaternion originRotation;

    [SerializeField]
    private string furnitureId; // 고유 id
    public string FurnitureId => furnitureId;
    public void SetId(string id)
    {
        if(string.IsNullOrEmpty(furnitureId))
        {
            furnitureId = id;
            Debug.Log($"Furniture ID set : {id}");
        }
        else
        {
            Debug.LogWarning("ID already set");
        }
    }

    public void SetData(FurnitureItemData furnitureItemdata)
    {
        data = furnitureItemdata;
    }

    void Start()
    {
        furnitureRenderer = GetComponentInChildren<MeshRenderer>();
        if (furnitureRenderer != null)
        {
            furnitureMaterials = furnitureRenderer.materials;

            originalcolors = new Color[furnitureMaterials.Length];
            for (int i = 0; i < furnitureMaterials.Length; i++)
            {
                originalcolors[i] = furnitureMaterials[i].color;
            }

            if(furnitureMaterials.Length == 0)
            {
                Debug.LogError($"{gameObject.name} has not Material.");
            }

            SetLayerRecursively(gameObject, LayerMask.NameToLayer("Furniture"));
        }
        else
        {
            Debug.LogError($"{gameObject.name} has not Renderer.");
        }
    }

    void SetLayerRecursively(GameObject obj, int layer)
    {
        obj.layer = layer;
        foreach (Transform child in obj.transform)
        {
            SetLayerRecursively(child.gameObject, layer);
        }
    }

    public void Select()
    {
        isSelected = true;
        UpdateVisual();
        originPosition = transform.position;
        originRotation = transform.rotation;
        Debug.Log($"The {gameObject.name} is selected");
    }

    public void Deselect()
    {
        isSelected = false;
        UpdateVisual();
        transform.position = originPosition;
        transform.rotation = originRotation;
        Debug.Log($"The {gameObject.name} is deselected");
    }

    void UpdateVisual()
    {
        if(furnitureMaterials == null)
            return;

        if (isSelected)
        {
            for(int i = 0; i < furnitureMaterials.Length; ++i)
            {
                furnitureMaterials[i].color = selectedColor;
            }
        }
        else
        {
             for(int i = 0; i < furnitureMaterials.Length; ++i)
            {
                furnitureMaterials[i].color = originalcolors[i];
            }
        }
    }

// 드래그 시작
    public void StartDrag()
    {
        isDragging = true;
        Debug.Log($"{gameObject.name} 드래그 시작");
    }
    
    // 위치 이동
    public void MoveTo(Vector3 floorPosition)
    {
        if (!isDragging) return;
        //Debug.Log($"드래그 업데이트 {floorPosition}");
        Vector3 newPosition = floorPosition;
        newPosition.y += heightOffset;
        
        transform.position = newPosition;
    }
    
    // 드래그 끝
    public void StopDrag()
    {
        isDragging = false;
        Debug.Log($"{gameObject.name} 드래그 완료");

        bool isOverlapping = CollisionChecker.IsOverlapping(gameObject, 1 << gameObject.layer);
        Debug.Log(isOverlapping);
        if (isOverlapping)
        {
            transform.position = originPosition;
            transform.rotation = originRotation;
        }
        else
        {
            Vector3 newPosition = transform.position;
            newPosition.y -= heightOffset;
            transform.position = newPosition;

            originPosition = transform.position;
            originRotation = transform.rotation;
        }
        
        UpdateVisual();
    }

    public void Rotate(float angle)
    {
        transform.Rotate(0f, angle, 0f);
        originRotation = transform.rotation;
    }

    public void Delete()
    {
        Debug.Log($"{gameObject.name} deleted");
        Destroy(gameObject);
    }

    void OnDestroy()
    {
        if(furnitureMaterials == null)
            return;
            
        foreach(Material material in furnitureMaterials)
        {
            Destroy(material);
        }
    }
}

using TMPro;
using Unity.Mathematics;
using Unity.VisualScripting;
using UnityEditor.UIElements;
using UnityEngine;

public class FurniturePlacer : MonoBehaviour
{
    [Header("Furniture Settings")]
    public GameObject[] furniturePrefabs; // 가구 프리팹 배열

    [Header("Placement Settings")]
    public LayerMask floorLayer; // 바닥 레이어

    [Header("UI")]
    public TextMeshProUGUI selectedMark;
    public Color ghostColor = new Color(1f, 1f, 1f, 0.5f); // 반투명

    private int selectedFurnitureIndex = -1; // 현재 선택된 가구 인덱스
    private Camera mainCamera;
    private GameObject ghostFuniture;
    private FurnitureSelector furnitureSelector;
    private bool isPlacementMode = false; 

    void Start()
    {
        mainCamera = Camera.main;;
        furnitureSelector = GetComponent<FurnitureSelector>();

        if(furnitureSelector == null)
        {
            Debug.LogError("FunitureSelector is Null");
        }

        if (selectedMark)
        {
            selectedMark.text = "";
        }
    }
    
    void Update()
    {
        // 키 입력
        HandleInput();

        // 배치 모드일때만 고스트 업데이트
        if (isPlacementMode)
        {
            UpdateGhostPosition();
        }
    }

    void HandleInput()
    {
        int newIndex = GetNumberKeyInput();
        if(newIndex != -1 && newIndex < furniturePrefabs.Length)
        {
            SelectFurnitureForPlacement(newIndex);
        }

        // 마우스 좌클릭
        if (Input.GetMouseButtonDown(0))
        {
            if (isPlacementMode)
            {
                PlaceFurniture();
            }
            else
            {
                furnitureSelector.TrySelectFurniture();
            }
        }

        // ESC - 모드 취소
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            if (isPlacementMode)
            {
                ExitPlacementMode();
            }
            else
            {
                furnitureSelector.DeselectCurrentFurniture();
            }
        }
    }

    int GetNumberKeyInput()
    {
        if (Input.GetKeyDown(KeyCode.Alpha1)) return 0;
        if (Input.GetKeyDown(KeyCode.Alpha2)) return 1;
        if (Input.GetKeyDown(KeyCode.Alpha3)) return 2;
        if (Input.GetKeyDown(KeyCode.Alpha4)) return 3;
        if (Input.GetKeyDown(KeyCode.Alpha5)) return 4;
        if (Input.GetKeyDown(KeyCode.Alpha6)) return 5;
        if (Input.GetKeyDown(KeyCode.Alpha7)) return 6;
        if (Input.GetKeyDown(KeyCode.Alpha8)) return 7;
        
        return -1;
    }

    void SelectFurnitureForPlacement(int index)
    {
        // 이전과 같은 가구면 무시
        if(isPlacementMode && selectedFurnitureIndex == index)
            return;

        // 배치모드
        selectedFurnitureIndex = index;
        isPlacementMode = true;

        // 선택모드 해제
        furnitureSelector.DeselectCurrentFurniture();

        // 고스트 생성
        CreateGhostFurniture();

        // UI 업데이트
        UpdateSelectedMarkUI();

        Debug.Log($"배치모드 : {furniturePrefabs[index].name}");
    }

    void CreateGhostFurniture()
    {
        // 기존 고스트 제거
        if (ghostFuniture)
        {
            Destroy(ghostFuniture);
        }
        
        // 고스트 생성
        ghostFuniture = Instantiate(
            furniturePrefabs[selectedFurnitureIndex],
            Vector3.zero,
            Quaternion.identity
        );

        ghostFuniture.name = "Ghost_" + furniturePrefabs[selectedFurnitureIndex].name;

        // 충돌 방지
        Collider[] colliders = ghostFuniture.GetComponents<Collider>();
        foreach(Collider col in colliders)
        {
            col.enabled = false;
        }

        Furniture furniture = ghostFuniture.GetComponent<Furniture>();
        if (furniture)
        {
            Destroy(furniture);
        }

        // 반투명 효과
        SetGhostTransparency();
    }

    void SetGhostTransparency()
    {
        Renderer[] renderers = ghostFuniture.GetComponentsInChildren<Renderer>();
        foreach (Renderer rend in renderers)
        {
            Material[] materials = rend.materials;
            foreach (Material mat in materials)
            {
                // Transparent 모드로 변경
                mat.SetFloat("_Mode", 3);  // Transparent
                mat.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.SrcAlpha);
                mat.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
                mat.SetInt("_ZWrite", 0);
                mat.DisableKeyword("_ALPHATEST_ON");
                mat.EnableKeyword("_ALPHABLEND_ON");
                mat.DisableKeyword("_ALPHAPREMULTIPLY_ON");
                mat.renderQueue = 3000;

                // 색상 변경 (반투명)
                Color color = mat.color;
                color.a = ghostColor.a;
                mat.color = color;
            }
        }
    }

    void UpdateGhostPosition()
    {
        if(ghostFuniture == null)
        {
            return;
        }

        Ray ray = mainCamera.ScreenPointToRay(Input.mousePosition);
        RaycastHit hit;

        if(Physics.Raycast(ray, out hit, Mathf.Infinity, floorLayer))
        {
            Vector3 position = hit.point;
            position.y += 0.5f;

            ghostFuniture.transform.position = position;
        }
    }

    void PlaceFurniture()
    {
        if(ghostFuniture == null)
        {
            return;
        }
        
        Vector3 position = ghostFuniture.transform.position;
        position.y -= 0.5f;
        GameObject furniture = Instantiate(
            furniturePrefabs[selectedFurnitureIndex],
            position,
            ghostFuniture.transform.rotation
        );

        furniture.AddComponent<Furniture>();

        Debug.Log($"가구 배치: {furniture.name} at {position}");
    }

    void ExitPlacementMode()
    {
        isPlacementMode = false;
        selectedFurnitureIndex = -1;

        // 고스트 제거
        if (ghostFuniture != null)
        {
            Destroy(ghostFuniture);
            ghostFuniture = null;
        }

        // UI 초기화
        if (selectedMark != null)
        {
            selectedMark.text = "";
        }

        Debug.Log("배치 모드 종료");
    }

    void UpdateSelectedMarkUI()
    {
        if (selectedMark == null) return;

        string text = "";
        for (int i = 0; i < selectedFurnitureIndex; i++)
        {
            text += "\n";
        }
        text += ">>";

        selectedMark.text = text;
    }

    void OnDestroy()
    {
        // 고스트 정리
        if (ghostFuniture != null)
        {
            Destroy(ghostFuniture);
        }
    }
}
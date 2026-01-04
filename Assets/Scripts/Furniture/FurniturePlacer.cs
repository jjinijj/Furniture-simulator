using TMPro;
using UnityEngine;

public class FurniturePlacer : MonoBehaviour
{
    [Header("Furniture Settings")]
    public GameObject[] furniturePrefabs; // 가구 프리팹 배열

    [Header("Placement Settings")]
    public LayerMask floorLayer; // 바닥 레이어
    public LayerMask furnitureLayer; // 가구 레이어

    [Header("UI")]
    public TextMeshProUGUI selectedMark;
    public Color ghostColor = new Color(1f, 1f, 1f, 0.5f); // 반투명

    private int selectedFurnitureIndex = -1; // 현재 선택된 가구 인덱스
    private Camera mainCamera;
    private GameObject ghostFurniture;
    private MaterialPropertyBlock ghostMBP;
    private FurnitureSelector furnitureSelector;
    private enum MODE { PLACE_MODE, MOVE_MODE , NONE};
    private MODE currentMode = MODE.NONE;
    private bool canPlace = true;   // 설치 가능 여부

    void Start()
    {
        mainCamera = Camera.main;;
        furnitureSelector = GetComponent<FurnitureSelector>();

        if(furnitureSelector == null)
        {
            Debug.LogError("FurnitureSelector is Null");
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
        if (currentMode == MODE.PLACE_MODE)
        {
            UpdateGhostPosition();
        }
    }

    void HandleInput()
    {
        // 키버튼으로 설치할 가구 선택
        int newIndex = GetNumberKeyInput();
        if(newIndex != -1 && newIndex < furniturePrefabs.Length)
        {
            SelectFurnitureForPlacement(newIndex);
        }

        HandleRotationInput();

        // 설치모드 : 가구 설치, 가구 회전, 설치모드 취소
        if(currentMode == MODE.PLACE_MODE)
        {
            

            if (Input.GetMouseButtonDown(0))
            {
                PlaceFurniture();
            }
            if (Input.GetKeyDown(KeyCode.Escape))
            {
                ExitPlacementMode();
            }

            return;
        }

        if(currentMode == MODE.NONE)
        {
            // 설치된 가구 선택
            if (Input.GetMouseButtonDown(0))
            {
                furnitureSelector.TrySelectFurniture();
            }

            // 설치된 가구 드래그 이동
            if (Input.GetMouseButton(0))
            {
                furnitureSelector.UpdateDrag();
            }
            if (Input.GetMouseButtonUp(0))
            {
                furnitureSelector.EndDrag();
            }
            if (Input.GetKeyDown(KeyCode.Escape))
            {
                furnitureSelector.DeselectCurrentFurniture();
            }

            // 설치된 가구 삭제
            if (Input.GetKeyDown(KeyCode.D))
            {
                furnitureSelector.TryDeleteSelected();   
            }

        }        
    }

    void HandleRotationInput()
    {
        if (Input.GetKeyDown(KeyCode.Q))
        {
            HandleRotate(-90f);
        }
        if (Input.GetKeyDown(KeyCode.E))
        {
            HandleRotate(90f);
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
    
    void HandleRotate(float angle)
    {
        if(currentMode == MODE.PLACE_MODE && ghostFurniture)
        {
            ghostFurniture.transform.Rotate(0f, angle, 0f);
        }
        else if(currentMode == MODE.NONE)
        {
            furnitureSelector.RotateSelected(angle);
        }
    }

    public void SelectFurnitureForPlacement(int index)
    {
        // 이전과 같은 가구면 무시
        if(currentMode == MODE.PLACE_MODE && selectedFurnitureIndex == index)
            return;

        // 배치모드
        selectedFurnitureIndex = index;
        currentMode = MODE.PLACE_MODE;

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
        if (ghostFurniture != null)
        {
            Destroy(ghostFurniture);
        }
        
        // 고스트 생성
        ghostFurniture = Instantiate(
            furniturePrefabs[selectedFurnitureIndex],
            Vector3.zero,
            Quaternion.identity
        );

        if(ghostMBP == null)
        {
            ghostMBP = new MaterialPropertyBlock();
        }

        ghostFurniture.name = "Ghost_" + furniturePrefabs[selectedFurnitureIndex].name;
        SetLayerRecursively(ghostFurniture, LayerMask.NameToLayer("Ghost"));

        Furniture furniture = ghostFurniture.GetComponent<Furniture>();
        if (furniture != null)
        {
            Destroy(furniture);
        }
    }

    // 재귀 레이어 설정
    void SetLayerRecursively(GameObject obj, int layer)
    {
        obj.layer = layer;
        foreach (Transform child in obj.transform)
        {
            SetLayerRecursively(child.gameObject, layer);
        }
    }

    void UpdateGhostPosition()
    {
        if(ghostFurniture == null)
        {
            return;
        }

        Ray ray = mainCamera.ScreenPointToRay(Input.mousePosition);
        RaycastHit hit;

        if(Physics.Raycast(ray, out hit, Mathf.Infinity, floorLayer))
        {
            Vector3 position = hit.point;
            position.y += 0.5f;

            ghostFurniture.transform.position = position;
        }

        // 충돌 감지
        canPlace = !CollisionChecker.IsOverlapping(ghostFurniture, furnitureLayer);
        Color guideColor = canPlace ? Color.green : Color.red;

        Renderer[] renderers = ghostFurniture.GetComponentsInChildren<Renderer>();

        foreach(Renderer render in renderers)
        {
            render.GetPropertyBlock(ghostMBP);
            ghostMBP.SetColor("_BaseColor", guideColor);
            render.SetPropertyBlock(ghostMBP);
        }
    }

    void PlaceFurniture()
    {
        if(ghostFurniture == null)
        {
            return;
        }

        Debug.Log(canPlace);
        // 기존 가구와 충돌 중일때는 설치 안함
        if(canPlace == false)
        {
            return;
        }
        
        Vector3 position = ghostFurniture.transform.position;
        position.y -= 0.5f;
        GameObject furniture = Instantiate(
            furniturePrefabs[selectedFurnitureIndex],
            position,
            ghostFurniture.transform.rotation
        );

        string furnitureId = System.DateTime.Now.Ticks.ToString();

        if(furniture.GetComponent<Furniture>() == null)
        {
            furniture.AddComponent<Furniture>();
        }

        Furniture furnitureScript = furniture.GetComponent<Furniture>();
        furnitureScript.SetId(furnitureId);

        if(WebCommunication.Instance != null)
        {
            WebCommunication.Instance.NotifyFurniturePlaced(
                furnitureScript
            );
        }

        Debug.Log($"가구 배치: {furniture.name} at {position}");


    }

    void ExitPlacementMode()
    {
        currentMode = MODE.NONE;
        selectedFurnitureIndex = -1;

        // 고스트 제거
        if (ghostFurniture != null)
        {
            Destroy(ghostFurniture);
            ghostFurniture = null;
            
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
        if (ghostFurniture != null)
        {
            Destroy(ghostFurniture);
        }
    }
}

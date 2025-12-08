using TMPro;
using Unity.Mathematics;
using UnityEngine;

public class FurniturePlacer : MonoBehaviour
{
    [Header("Furniture Settings")]
    public GameObject[] furniturePrefabs; // 가구 프리팹 배열

    [Header("Placement Settings")]
    public LayerMask floorLayer; // 바닥 레이어

    [Header("Selected Mark")]
    public TextMeshProUGUI selectedMark;

    private int selectedFurnitureIndex = 0; // 현재 선택된 가구 인덱스
    private Camera mainCamera;

    void Start()
    {
        mainCamera = Camera.main;
    }

    void Update()
    {
        // 마우스 좌클릭
        if (Input.GetMouseButtonDown(0))
        {
            PlaceFurniture();
        }

        // 숫자키로 가구 선택 (1-5)
        if (Input.GetKeyDown(KeyCode.Alpha1)) selectedFurnitureIndex = 0;
        if (Input.GetKeyDown(KeyCode.Alpha2)) selectedFurnitureIndex = 1;
        if (Input.GetKeyDown(KeyCode.Alpha3)) selectedFurnitureIndex = 2;
        if (Input.GetKeyDown(KeyCode.Alpha4)) selectedFurnitureIndex = 3;
        if (Input.GetKeyDown(KeyCode.Alpha5)) selectedFurnitureIndex = 4;
        if (Input.GetKeyDown(KeyCode.Alpha6)) selectedFurnitureIndex = 5;
        if (Input.GetKeyDown(KeyCode.Alpha7)) selectedFurnitureIndex = 6;
        if (Input.GetKeyDown(KeyCode.Alpha8)) selectedFurnitureIndex = 7;

        if(selectedFurnitureIndex >= 0 && selectedFurnitureIndex < furniturePrefabs.Length)
        {
            string text = "";

            for(int i = 0; i < selectedFurnitureIndex; ++i)
            {
                text += "\n";
            }

            text += ">>";

            selectedMark.text = text;
        }
    }

    void PlaceFurniture()
    {
        Ray ray = mainCamera.ScreenPointToRay(Input.mousePosition);
        RaycastHit hit;

        if(Physics.Raycast(ray, out hit, Mathf.Infinity, floorLayer))
        {
            Vector3 spawnPosition = hit.point;
            spawnPosition.y += 0.5f;
            
            if(selectedFurnitureIndex < furniturePrefabs.Length)
            {
                GameObject furniture = Instantiate(
                    furniturePrefabs[selectedFurnitureIndex],
                    spawnPosition,
                    Quaternion.identity
                );

                Debug.Log($"가구배치 : {furniture.name} at {spawnPosition}");
            }
        }

    }

}
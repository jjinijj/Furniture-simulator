using UnityEngine;
using System.Collections.Generic;

public class FurnitureDatabase : MonoBehaviour
{
    // Singleton
    public static FurnitureDatabase Instance { get; private set; }
    
    // Inspector에서 설정
    public GameObject[] furniturePrefabs;
    
    // 로드된 데이터
    private List<FurnitureItemData> furnitureList;
    
    // Getter
    public int GetFurnitureCount()
    {
        return furnitureList != null ? furnitureList.Count : 0;
    }
    
    public FurnitureItemData GetFurnitureData(int index)
    {
        if (furnitureList != null && index >= 0 && index < furnitureList.Count)
            return furnitureList[index];
        
        return null;
    }

    // UUID로 찾기
    public FurnitureItemData GetFurnitureByTypeId(string furnitureTypeId)
    {
        return furnitureList.Find(f => f.furnitureTypeId == furnitureTypeId);
    }

    public FurnitureItemData GetFurnitureData(string typdId)
    {
        foreach(FurnitureItemData data in furnitureList)
        {
            if(data.furnitureTypeId == typdId)
            {
                return data;
            }
        }

        Debug.LogWarning($"FurnitureItemData is null. furnitureTypeId : {typdId}");
        return null;
    }
    
    void Awake()
    {
        // Singleton 설정
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
            return;
        }
        
        // CSV 로드
        LoadFurnitureData();
    }
    
    void LoadFurnitureData()
    {
        furnitureList = new List<FurnitureItemData>();
        
        // CSV 파일 로드
        TextAsset csvFile = Resources.Load<TextAsset>("furniture_data");
        
        if (csvFile == null)
        {
            Debug.LogError("[FurnitureDatabase] furniture_data.csv not found in Resources folder!");
            return;
        }
        
        Debug.Log("[FurnitureDatabase] CSV file loaded successfully");
        
        // CSV 파싱
        string[] lines = csvFile.text.Split('\n');
        
        Debug.Log($"[FurnitureDatabase] Total lines in CSV: {lines.Length}");
        
        // 첫 줄은 헤더, 스킵
        for (int i = 1; i < lines.Length; i++)
        {
            string line = lines[i].Trim();
            
            // 빈 줄 스킵
            if (string.IsNullOrWhiteSpace(line))
                continue;
            
            // 쉼표로 분리
            string[] values = line.Split(',');
            
            if (values.Length < 5)
            {
                Debug.LogWarning($"[FurnitureDatabase] Invalid line {i}: {line}");
                continue;
            }
            
            string typeId = values[0].Trim();
            string prefabName = values[1].Trim();
            string displayName = values[2].Trim();
            string category = values[3].Trim();
            
            if (!int.TryParse(values[4].Trim(), out int price))
            {
                Debug.LogWarning($"[FurnitureDatabase] Invalid price for {prefabName}: {values[2]}");
                continue;
            }
            
            // Prefab 찾기 (이름으로 매칭)
            GameObject prefab = System.Array.Find(
                furniturePrefabs,
                p => p.name == prefabName
            );
            
            if (prefab != null)
            {
                furnitureList.Add(new FurnitureItemData
                {
                    furnitureTypeId = typeId,
                    prefab = prefab,
                    prefabName = prefabName,
                    displayName = displayName,
                    category = category,
                    price = price
                });
                
                Debug.Log($"[FurnitureDatabase] Loaded: {displayName} (₩{price:N0})");
            }
            else
            {
                Debug.LogWarning($"[FurnitureDatabase] Prefab not found: {prefabName}");
            }
        }
        
        Debug.Log($"[FurnitureDatabase] Total furniture loaded: {furnitureList.Count}");
    }
}
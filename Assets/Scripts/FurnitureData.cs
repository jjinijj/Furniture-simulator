using System;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// 가구 데이터
/// JSON 직렬화
/// </summary>

[Serializable]
public class FurnitureData
{
    public int id;
    public string name;
    public PositionData position;
    public float rotation;
    public int price;
    public string category;

    public FurnitureData(int id, string name, Vector3 pos, float rot, int price, string category)
    {
        this.id = id;
        this.name = name;
        this.position = new PositionData(pos);
        this.rotation = rot;
        this.price = price;
        this.category = category;
    }
}

/// <summary>
/// 위치 데이터
/// </summary>
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
}

/// <summary>
/// 가구 목록
/// </summary>
[Serializable]
public class FurnitureListData
{
    public string type = "furnitureList";
    public List<FurnitureData> furniture;
    public int totalCost;
    public int furnitureCount;
    public long timestamp;

    public FurnitureListData()
    {
        furniture = new List<FurnitureData>();
        totalCost = 0;
        furnitureCount = 0;
        timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
    }

    public void AddFurniture(FurnitureData data)
    {
        furniture.Add(data);
        totalCost += data.price;
        furnitureCount = furniture.Count;
    }
}
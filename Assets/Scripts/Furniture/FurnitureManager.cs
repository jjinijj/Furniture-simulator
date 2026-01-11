using System.Collections.Generic;
using System.Linq;
using Unity.VisualScripting;
using UnityEngine;

public class FurnitureManager: MonoBehaviour
{
    public static FurnitureManager Instance { get; private set; }
    private Dictionary<string, Furniture> placedFurnitures;

    void Awake()
    {
        if(Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
            return;
        }

        placedFurnitures = new Dictionary<string, Furniture>();
    }

    public void AddFurniture(Furniture furniture)
    {
        if (placedFurnitures.ContainsKey(furniture.FurnitureId))
        {
            Debug.LogWarning($"Already Added : {furniture.FurnitureId}");
            return;
        }

        Debug.Log($"Added Furniture : {furniture.FurnitureId}");

        placedFurnitures.Add(furniture.FurnitureId, furniture);
    }

    public void RemoveFurniture(string furnitureId)
    {
        if (placedFurnitures.TryGetValue(furnitureId, out Furniture furniture))
        {
            placedFurnitures.Remove(furnitureId);
            GameObject.Destroy(furniture.gameObject);
            Debug.Log($"Delete Furniture : {furnitureId}");
        }
        else
        {
            Debug.LogWarning($"Furniture not placed : {furnitureId}");
        }
    }

    public void RemoveAllFurnitures()
    {
        var furnitureList = GetAllFurniture();
        furnitureList.ForEach((furniture) =>
        {
            GameObject.Destroy(furniture.gameObject);
        });

        placedFurnitures.Clear();
    }

    public Furniture FindFurnitureByFurnitureID(string id)
    {
        if (placedFurnitures.TryGetValue(id, out Furniture furniture))
        {
            return furniture;
        }

        Debug.LogError($"Furniture not placed : {id}");

        return null;
    }

    public List<Furniture> GetAllFurniture()
    {
        return placedFurnitures.Values.ToList<Furniture>();
    }
}
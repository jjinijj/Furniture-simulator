using System.Collections.Generic;
using UnityEngine;

public class Furniture : MonoBehaviour
{
    [Header("Visual")]
    public Color normalColor = Color.white;
    public Color selectedColor = Color.cyan;

    private bool isSelected = false;
    private Renderer furnitureRenderer;
    private List<Material> furnitureMaterial;
    private List<Color> originalcolor;

    void Start()
    {
        furnitureRenderer = GetComponentInChildren<MeshRenderer>();
        if (furnitureRenderer)
        {
            furnitureMaterial = new List<Material>();
            furnitureRenderer.GetMaterials(furnitureMaterial);

            originalcolor = new List<Color>();

            foreach(Material material in furnitureMaterial)
            {
                originalcolor.Add(material.color);
            }

            if(furnitureMaterial == null)
            {
                Debug.LogError($"{gameObject.name} has not Material.");
            }
        }
        else
        {
            Debug.LogError($"{gameObject.name} has not Renderer.");
        }
    }

    public void Select()
    {
        isSelected = true;
        UpdateVisual();
        Debug.Log($"The {gameObject.name} is selected");
    }

    public void Deselect()
    {
        isSelected = false;
        UpdateVisual();
        Debug.Log($"The {gameObject.name} is deselected");
    }

    void UpdateVisual()
    {
        if (isSelected)
        {
            for(int i = 0; i < furnitureMaterial.Count; ++i)
            {
                furnitureMaterial[i].color = selectedColor;
            }
        }
        else
        {
             for(int i = 0; i < furnitureMaterial.Count; ++i)
            {
                furnitureMaterial[i].color = originalcolor[i];
            }
        }
    }

    void OnDestroy()
    {
        foreach(Material material in furnitureMaterial)
        {
            Destroy(material);
        }
    }
}

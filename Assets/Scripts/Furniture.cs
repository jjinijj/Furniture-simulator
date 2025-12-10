using System.Collections.Generic;
using UnityEngine;

public class Furniture : MonoBehaviour
{
    [Header("Visual")]
    public Color normalColor = Color.white;
    public Color selectedColor = Color.cyan;

    private bool isSelected = false;
    private Renderer furnitureRenderer;
    private Material[] furnitureMaterials;
    private Color[] originalcolors;

    void Start()
    {
        furnitureRenderer = GetComponentInChildren<MeshRenderer>();
        if (furnitureRenderer)
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

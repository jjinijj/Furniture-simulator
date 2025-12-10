using UnityEngine;
using TMPro;

public class FurnitureSelector : MonoBehaviour
{
    [Header("Selection Settings")]
    public LayerMask furnitureLayer;

    [Header("UI")]
    public TextMeshProUGUI selectionInfoText;

    private Furniture selectedFurniture = null;
    private Camera mainCamera;

    void Start()
    {
        mainCamera = Camera.main;

        if (selectionInfoText)
        {
            Debug.LogError($"selectionInfoText is Null.");
        }
    }

    

    public void TrySelectFurniture()
    {
        Ray ray = mainCamera.ScreenPointToRay(Input.mousePosition);
        RaycastHit hit;

        if(Physics.Raycast(ray, out hit))
        {
            Furniture furniture = hit.collider.GetComponent<Furniture>();

            if(furniture)   SelectFurniture(furniture);
            else            DeselectCurrentFurniture(); 
        }
    }

    void SelectFurniture(Furniture furniture)
    {
        if(selectedFurniture) 
            selectedFurniture.Deselect();

        selectedFurniture = furniture;
        selectedFurniture.Select();
    }

    public void DeselectCurrentFurniture()
    {
        if(selectedFurniture)   
            selectedFurniture.Deselect();
        
        selectedFurniture = null;
    }

    void UpdateUI()
    {
        if (selectionInfoText)
        {
            selectionInfoText.text = (selectedFurniture) ? $"select {selectedFurniture.name}" : "deselected";
        }
    }


}

using UnityEngine;
using TMPro;

public class FurnitureSelector : MonoBehaviour
{
    [Header("Selection Settings")]
    public LayerMask furnitureLayer;
    public LayerMask floorLayer;

    [Header("UI")]
    public TextMeshProUGUI selectionInfoText;

    private Furniture selectedFurniture = null;
    private Camera mainCamera;
    private bool isDragging = false;

    void Start()
    {
        mainCamera = Camera.main;

        if (selectionInfoText == null)
        {
            Debug.LogError($"selectionInfoText is Null.");
        }
    }

    

    public void TrySelectFurniture()
    {
        Ray ray = mainCamera.ScreenPointToRay(Input.mousePosition);
        RaycastHit hit;

        if(Physics.Raycast(ray, out hit, Mathf.Infinity, furnitureLayer))
        {
            Furniture furniture = hit.collider.GetComponent<Furniture>();

            if(furniture)   SelectFurniture(furniture);
            else            DeselectCurrentFurniture(); 
        }
    }

    public void UpdateDrag()
    {
        if(selectedFurniture == null)
            return;

        if(isDragging == false)
        {
            isDragging = true;
            selectedFurniture.StartDrag();
        }

        Ray ray = mainCamera.ScreenPointToRay(Input.mousePosition);
        RaycastHit hit;

        if(Physics.Raycast(ray, out hit, Mathf.Infinity, floorLayer))
        {
            selectedFurniture.MoveTo(hit.point);
        }
    }

    public void EndDrag()
    {
        if(selectedFurniture != null && isDragging)
        {
            selectedFurniture.StopDrag();
            isDragging = false;
        }
    }

    void SelectFurniture(Furniture furniture)
    {
        if(selectedFurniture) 
            selectedFurniture.Deselect();

        selectedFurniture = furniture;
        selectedFurniture.Select();
        UpdateUI();
    }

    public void DeselectCurrentFurniture()
    {
        if(selectedFurniture)   
            selectedFurniture.Deselect();
        selectedFurniture = null;
        
        UpdateUI();
    }

    public void TryDeleteSelected()
    {
        if (selectedFurniture)
        {
            Debug.Log($"Deleting {selectedFurniture.gameObject.name}");
            selectedFurniture.Delete();
            selectedFurniture = null;
            UpdateUI();
        }
    }

    public void RotateSelected(float angle)
    {
        if (selectedFurniture)
        {
            selectedFurniture.Rotate(angle);
        }
    }

    void UpdateUI()
    {
        if (selectionInfoText != null)
        {
            if (selectedFurniture)
            {
                selectionInfoText.text = $"Selected: {selectedFurniture.gameObject.name}";
            }
            else
            {
                selectionInfoText.text = "No selection (Click furniture to select)";
            }
        }
    }
}

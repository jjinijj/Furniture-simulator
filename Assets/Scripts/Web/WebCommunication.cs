using UnityEngine;
using System.Runtime.InteropServices;
using Unity.VisualScripting;
using Unity.Mathematics;
using System.Collections.Generic;

/// <summary>
/// Unity와 JavaScript 간 통신을 관리하는 클래스
/// </summary>

public class WebCommunication : MonoBehaviour
{
    // Singleton패턴
    public static WebCommunication Instance
    {
        get;
        private set;
    }

    void Awake()
    {
        if(Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }

    //==================================================
    // Unity -> JavaScript (C# -> JS)
    //==================================================
#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")]
    private static extern void SendMessageToJS(string message);

    [DllImport("__Internal")]
    private static extern void SendFurniturePlaced(string furnitureId, string furnitureName, string price, float x, float y, float z, float rotateY);

    [DllImport("__Internal")]
    private static extern void SendJSONToJS(string json);
#endif

///<Summary>
/// JsavaScript로 일반 메시지 전송
/// </Summary>

    public void SendToJavaScript(string message)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        SendMessageToJS(message);
        Debug.Log($"[Unity -> JS] {message}");
#else   
        Debug.Log($"[Unity -> JS(Editor) {message}]");
#endif
    }

    ///<summary>
    /// 가구 배치 정보를 JavaScript로 전송
    /// </summary>

    public void NotifyFurniturePlaced(Furniture furniture)
    {
        float rotationY = furniture.transform.rotation.eulerAngles.y;
        Debug.Log(furniture.FurnitureId);

#if UNITY_WEBGL && !UNITY_EDITOR
        SendFurniturePlaced(
            furniture.FurnitureId,
            furniture.name, 
            furniture.price,
            furniture.transform.position.x, 
            furniture.transform.position.y, 
            furniture.transform.position.z,
            rotationY);
        Debug.Log($"[Unity -> JS] Furniture Placed : {furniture.name} at {furniture.transform.position}, rotation: {rotationY}");
#else
        Debug.Log($"[Unity -> JS (Editor)] Furniture Placed : {furniture.name} at {furniture.transform.position}, rotation: {rotationY}");
#endif
    }

    /// <summary>
    /// Json 데이터를 JavaScript로 전송
    /// </summary>
    public void SendJSON(string json)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        SendJSONToJS(json);
        Debug.Log($"[Unity -> JS] JSON Data : {json}");
#else
        Debug.Log($"Unity -> JS(Editor) JSON Data : {json}");
#endif
    }

    /// <summary>
    /// 현재 배치된 모든 가구 정보를 JSON으로 전송
    /// </summary>
    public void SendAllFurnitureData()
    {
        // 모든 가구 찾기
        Furniture[] addFuniture = FindObjectsByType<Furniture>(FindObjectsSortMode.None);

        // 데이터 구조 생성
        FurnitureListData listData = new FurnitureListData();

        int id = 0;
        foreach(Furniture furniture in addFuniture)
        {
            string cleanname = furniture.name.Replace("Clone", "").Trim();

            FurnitureData data = new FurnitureData(
                id++,
                cleanname,
                furniture.transform.position,
                furniture.transform.rotation.y,
                GetFurniturePrice(furniture.ItemData.displayName),
                GetFurnitureCategory(furniture.ItemData.displayName)
            );

            listData.AddFurniture(data);
        }

        string json = JsonUtility.ToJson(listData, true);

        SendJSON(json);

        Debug.Log($"[Furniture Data] sent {listData.furnitureCount} furniture, Total: {listData.totalCost:N0}원");
    }

    /// <summary>
    /// 가구 이름으로 가격 가져오기
    /// </summary>
    private int GetFurniturePrice(string furnitureName)
    {

        FurnitureItemData data = FurnitureDatabase.Instance.GetFurnitureData(furnitureName);
        if(data != null)
        {
            return data.price;
        }

        return 0;
    }

    /// <summary>
    /// 가구 이름으로 카테고리 찾기
    /// </summary>
    private string GetFurnitureCategory(string furnitureName)
    {
        FurnitureItemData data = FurnitureDatabase.Instance.GetFurnitureData(furnitureName);
        if(data != null)
        {
            return data.category;
        }

        return "etc";
    }

    //==============================================
    // JavaScript -> Unity(JS -> C#)
    // =============================================

    ///<summary>
    /// JavaScript에서 호출 : 일반 메시지 수신
    /// </summary>
    public void ReceiveMessageFromJS(string message)
    {
        Debug.Log($"[JS -> Unity] Received : {message}");

        // TODO : 메시지에 따른 처리
    }

    ///<summary>
    /// JavaScript에서 호출 : 가구 추가 요청
    /// </summary>

    public void AddFuniture(string furnitureIndex)
    {
        Debug.Log($"[JS -> Unity] Add Funiture Request: {furnitureIndex}");

        // TODO : FuniturePlacer를 통해 가구 추가
    }

    ///<summary>
    /// JavaScript에서 호출 : 씬 리셋 요청
    /// </summary>
    public void ResetScene()
    {
        Debug.Log($"[JS -> Unity] Reset Scene Request");

        // TODO : 모든 가구 삭제
    }

    /// <summary>
    /// JavaScript에서 호출 : 모든 가구 데이처 요청
    /// </summary>
    public void RequestAllFurnitureData()
    {
        Debug.Log("[JS -> Unity] Request All Furniture Data");
        SendAllFurnitureData();
    } 

    //==================================================
    // JavaScript -> Unity (JS -> C#)
    //==================================================
    /// <summary>
    /// 가구 선택 요청
    /// </summary>
    public void SelectFurnitureFromJS(string furnitureindex)
    {
        Debug.Log($"[JS -> Unity] Select Furniture : {furnitureindex}");

        int index;
        if(int.TryParse(furnitureindex, out index))
        {
            FurniturePlacer placer = FindAnyObjectByType<FurniturePlacer>();
            if(placer != null)
            {
                placer.SelectFurnitureForPlacement(index);
                Debug.Log($"[Unity] Furiture {index}");
            }
            else
            {
                Debug.LogWarning($"[Unity] FurniturePlacer not found!");
            }
        }
        else
        {
            Debug.LogError($"[Unity] Invalid furnitureIndex : {furnitureindex}");
        }
    }

    /// <summary>
    /// 가구 삭제 요청
    /// </summary>
    public void DeleteFurnitureFromJS(string furnitureId)
    {
        Debug.Log($"[JS -> Unity] Delete Furniture: {furnitureId}");

        Furniture[] allFuniture = FindObjectsByType<Furniture>(FindObjectsSortMode.None);   
        foreach(Furniture furniture in allFuniture)
        {
            if(furniture.FurnitureId == furnitureId)
            {
                Debug.Log($"[Unity] Furniture deleted : {furnitureId}");
                furniture.Delete();
                return;
            }
        }

        Debug.LogWarning($"[Unity] Furniture not found: {furnitureId}");
    }
    

    // ============================================
    // 테스트용 메서드
    // ============================================

    void Update()
    {
        // 테스트: Space 키로 메시지 전송
        if (Input.GetKeyDown(KeyCode.Space))
        {
            SendToJavaScript("Hello from Unity!");
        }

        // 테스트: T 키로 가구 배치 알림
        if (Input.GetKeyDown(KeyCode.T))
        {
            //NotifyFurniturePlaced("TestSofa", new Vector3(1, 0, 1), Quaternion.Euler(0, 45, 0));
        }

        if (Input.GetKeyDown(KeyCode.J))
        {
            SendAllFurnitureData();
        }
    }

}